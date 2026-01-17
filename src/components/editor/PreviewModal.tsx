'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Dialog,
  Box,
  Typography,
  IconButton,
} from '@mui/material'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { COLORS } from '@/constants/colors'
import { useEditorStore } from '@/store/editorStore'
import { useCanvasStore } from '@/store/canvasStore'

export default function PreviewModal() {
  const isOpen = useEditorStore((state) => state.isPreviewModalOpen)
  const setOpen = useEditorStore((state) => state.setPreviewModalOpen)
  const project = useEditorStore((state) => state.project)
  const currentScreenIndex = useEditorStore((state) => state.currentScreenIndex)
  
  const canvas = useCanvasStore((state) => state.canvas)

  const [previewIndex, setPreviewIndex] = useState(0)
  const [screenPreviews, setScreenPreviews] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Generate previews when modal opens
  useEffect(() => {
    if (isOpen && project && canvas) {
      generatePreviews()
    }
  }, [isOpen, project, canvas])

  // Reset preview index when modal opens
  useEffect(() => {
    if (isOpen) {
      setPreviewIndex(currentScreenIndex)
    }
  }, [isOpen, currentScreenIndex])

  // Function to burn watermark into image
  const addWatermarkToImage = (dataUrl: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => {
        const tempCanvas = document.createElement('canvas')
        tempCanvas.width = img.width
        tempCanvas.height = img.height
        const ctx = tempCanvas.getContext('2d')
        
        if (ctx) {
          // Draw the original image
          ctx.drawImage(img, 0, 0)
          
          // Save context state
          ctx.save()
          
          // Draw diagonal watermarks across the entire image
          ctx.globalAlpha = 0.15
          ctx.fillStyle = '#FFFFFF'
          ctx.font = 'bold 48px Arial'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          
          // Rotate for diagonal watermarks
          const text = 'PREVIEW ONLY'
          const spacing = 300
          
          // Calculate how many watermarks we need
          const diagonal = Math.sqrt(img.width * img.width + img.height * img.height)
          const rows = Math.ceil(diagonal / spacing) + 2
          const cols = Math.ceil(diagonal / spacing) + 2
          
          ctx.translate(img.width / 2, img.height / 2)
          ctx.rotate(-30 * Math.PI / 180)
          
          for (let row = -rows; row <= rows; row++) {
            for (let col = -cols; col <= cols; col++) {
              ctx.fillText(text, col * spacing, row * spacing)
            }
          }
          
          ctx.restore()
          
          // Draw center watermark
          ctx.save()
          ctx.globalAlpha = 0.4
          ctx.fillStyle = '#FFFFFF'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          
          // Main text
          ctx.font = 'bold 72px Arial'
          ctx.shadowColor = 'rgba(0, 0, 0, 0.8)'
          ctx.shadowBlur = 20
          ctx.shadowOffsetX = 0
          ctx.shadowOffsetY = 4
          ctx.fillText('PREVIEW', img.width / 2, img.height / 2 - 30)
          
          // Sub text
          ctx.font = '24px Arial'
          ctx.fillText('EXPORT TO REMOVE WATERMARK', img.width / 2, img.height / 2 + 40)
          
          ctx.restore()
          
          // Add a subtle grid pattern for extra protection
          ctx.save()
          ctx.globalAlpha = 0.03
          ctx.strokeStyle = '#FFFFFF'
          ctx.lineWidth = 1
          
          for (let x = 0; x < img.width; x += 50) {
            ctx.beginPath()
            ctx.moveTo(x, 0)
            ctx.lineTo(x, img.height)
            ctx.stroke()
          }
          for (let y = 0; y < img.height; y += 50) {
            ctx.beginPath()
            ctx.moveTo(0, y)
            ctx.lineTo(img.width, y)
            ctx.stroke()
          }
          ctx.restore()
        }
        
        resolve(tempCanvas.toDataURL('image/png'))
      }
      img.src = dataUrl
    })
  }

  const generatePreviews = async () => {
    if (!project || !canvas) return
    
    setIsLoading(true)
    const previews: string[] = []
    
    // Save current canvas state
    const currentCanvasData = JSON.stringify(canvas.toJSON(['name', 'data', 'selectable', 'evented', 'hasControls', 'hasBorders', 'lockMovementX', 'lockMovementY', 'lockRotation', 'lockScalingX', 'lockScalingY']))
    
    for (let i = 0; i < project.screens.length; i++) {
      let screenData: string | null = null
      
      if (i === currentScreenIndex) {
        screenData = currentCanvasData
      } else {
        screenData = project.screens[i]?.canvasData || null
      }
      
      if (screenData) {
        // Load this screen's data
        await new Promise<void>((resolve) => {
          canvas.loadFromJSON(JSON.parse(screenData!), () => {
            canvas.renderAll()
            resolve()
          })
        })
        
        // Wait for images to load
        await new Promise((resolve) => setTimeout(resolve, 150))
        
        // Generate clean preview first
        const cleanDataUrl = canvas.toDataURL({
          format: 'png',
          quality: 1,
          multiplier: 0.5, // Lower resolution for preview
        })
        
        // Burn watermark into the image
        const watermarkedDataUrl = await addWatermarkToImage(cleanDataUrl)
        previews.push(watermarkedDataUrl)
      } else {
        // Empty screen placeholder
        previews.push('')
      }
    }
    
    // Restore original canvas state
    await new Promise<void>((resolve) => {
      canvas.loadFromJSON(JSON.parse(currentCanvasData), () => {
        canvas.renderAll()
        resolve()
      })
    })
    
    setScreenPreviews(previews)
    setIsLoading(false)
  }

  const handlePrevious = useCallback(() => {
    setPreviewIndex((prev) => (prev > 0 ? prev - 1 : project?.screens.length ? project.screens.length - 1 : 0))
  }, [project?.screens.length])

  const handleNext = useCallback(() => {
    setPreviewIndex((prev) => (project?.screens.length ? (prev < project.screens.length - 1 ? prev + 1 : 0) : 0))
  }, [project?.screens.length])

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrevious()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      } else if (e.key === 'Escape') {
        setOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, handlePrevious, handleNext, setOpen])

  const handleClose = () => {
    setOpen(false)
  }

  // Prevent right-click
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    return false
  }

  if (!project) return null

  const totalScreens = project.screens.length

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth={false}
      fullScreen
      PaperProps={{
        sx: {
          bgcolor: 'rgba(0, 0, 0, 0.95)',
          backgroundImage: 'none',
        },
      }}
    >
      {/* Close button */}
      <IconButton
        onClick={handleClose}
        sx={{
          position: 'absolute',
          top: 20,
          right: 20,
          color: COLORS.text.primary,
          bgcolor: 'rgba(255, 255, 255, 0.1)',
          zIndex: 10,
          '&:hover': {
            bgcolor: 'rgba(255, 255, 255, 0.2)',
          },
        }}
      >
        <X size={24} />
      </IconButton>

      {/* Screen counter */}
      <Box
        sx={{
          position: 'absolute',
          top: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
        }}
      >
        <Typography
          sx={{
            color: COLORS.text.primary,
            fontSize: '1rem',
            fontWeight: 500,
            bgcolor: 'rgba(255, 255, 255, 0.1)',
            px: 3,
            py: 1,
            borderRadius: 2,
          }}
        >
          Screen {previewIndex + 1} of {totalScreens}
        </Typography>
      </Box>

      {/* Main preview area */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '100%',
          position: 'relative',
          userSelect: 'none',
        }}
        onContextMenu={handleContextMenu}
      >
        {/* Previous button */}
        {totalScreens > 1 && (
          <IconButton
            onClick={handlePrevious}
            sx={{
              position: 'absolute',
              left: 40,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 60,
              height: 60,
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              color: COLORS.text.primary,
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.2)',
              },
              transition: 'all 0.2s ease',
            }}
          >
            <ChevronLeft size={32} />
          </IconButton>
        )}

        {/* Preview image with watermark */}
        <Box
          sx={{
            position: 'relative',
            maxWidth: '80vw',
            maxHeight: '85vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {isLoading ? (
            <Box
              sx={{
                width: 300,
                height: 500,
                bgcolor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography sx={{ color: COLORS.text.tertiary }}>
                Generating preview...
              </Typography>
            </Box>
          ) : screenPreviews[previewIndex] ? (
            <Box
              sx={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 2,
                boxShadow: '0 25px 80px rgba(0, 0, 0, 0.5)',
              }}
            >
              {/* The preview image */}
              <Box
                component="img"
                src={screenPreviews[previewIndex]}
                alt={`Screen ${previewIndex + 1}`}
                draggable={false}
                onContextMenu={handleContextMenu}
                sx={{
                  maxWidth: '80vw',
                  maxHeight: '85vh',
                  objectFit: 'contain',
                  display: 'block',
                  pointerEvents: 'none',
                }}
              />
              
              {/* Note: Watermark is now burned into the image itself for protection */}
            </Box>
          ) : (
            <Box
              sx={{
                width: 300,
                height: 500,
                bgcolor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography sx={{ color: COLORS.text.tertiary }}>
                No content
              </Typography>
            </Box>
          )}
        </Box>

        {/* Next button */}
        {totalScreens > 1 && (
          <IconButton
            onClick={handleNext}
            sx={{
              position: 'absolute',
              right: 40,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 60,
              height: 60,
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              color: COLORS.text.primary,
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.2)',
              },
              transition: 'all 0.2s ease',
            }}
          >
            <ChevronRight size={32} />
          </IconButton>
        )}
      </Box>

      {/* Screen thumbnails at bottom */}
      {totalScreens > 1 && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 30,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 2,
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            p: 2,
            borderRadius: 2,
          }}
          onContextMenu={handleContextMenu}
        >
          {project.screens.map((_, index) => (
            <Box
              key={index}
              onClick={() => setPreviewIndex(index)}
              sx={{
                width: 50,
                height: 80,
                borderRadius: 1,
                overflow: 'hidden',
                cursor: 'pointer',
                border: index === previewIndex ? `2px solid ${COLORS.accent.primary}` : '2px solid transparent',
                transition: 'all 0.2s ease',
                opacity: index === previewIndex ? 1 : 0.6,
                '&:hover': {
                  opacity: 1,
                },
              }}
            >
              {screenPreviews[index] ? (
                <Box
                  component="img"
                  src={screenPreviews[index]}
                  alt={`Thumbnail ${index + 1}`}
                  draggable={false}
                  onContextMenu={handleContextMenu}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    pointerEvents: 'none',
                  }}
                />
              ) : (
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    bgcolor: COLORS.background.tertiary,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography sx={{ fontSize: '0.7rem', color: COLORS.text.muted }}>
                    {index + 1}
                  </Typography>
                </Box>
              )}
            </Box>
          ))}
        </Box>
      )}

      {/* Keyboard hint */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 30,
          right: 30,
          display: 'flex',
          gap: 1.5,
          alignItems: 'center',
        }}
      >
        <Typography sx={{ color: COLORS.text.muted, fontSize: '0.75rem' }}>
          Use
        </Typography>
        <Box
          sx={{
            px: 1,
            py: 0.5,
            bgcolor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: 1,
            fontSize: '0.7rem',
            color: COLORS.text.tertiary,
          }}
        >
          ← →
        </Box>
        <Typography sx={{ color: COLORS.text.muted, fontSize: '0.75rem' }}>
          to navigate
        </Typography>
      </Box>
    </Dialog>
  )
}

