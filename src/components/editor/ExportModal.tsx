'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Checkbox,
  FormControlLabel,
  LinearProgress,
  Chip,
} from '@mui/material'
import { Download, FileImage, Archive, Check } from 'lucide-react'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { COLORS } from '@/constants/colors'
import { useEditorStore } from '@/store/editorStore'
import { useCanvasStore } from '@/store/canvasStore'

type ExportFormat = 'png' | 'jpg'
type ExportScale = 1 | 2 | 3

export default function ExportModal() {
  const isOpen = useEditorStore((state) => state.isExportModalOpen)
  const setOpen = useEditorStore((state) => state.setExportModalOpen)
  const project = useEditorStore((state) => state.project)
  const currentScreenIndex = useEditorStore((state) => state.currentScreenIndex)
  
  const canvas = useCanvasStore((state) => state.canvas)
  const fabric = useCanvasStore((state) => state.fabric)

  const [format, setFormat] = useState<ExportFormat>('png')
  const [scale, setScale] = useState<ExportScale>(1)
  const [includeAllScreens, setIncludeAllScreens] = useState(true)
  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)
  const [exportComplete, setExportComplete] = useState(false)

  const handleFormatChange = (
    _: React.MouseEvent<HTMLElement>,
    newFormat: ExportFormat | null
  ) => {
    if (newFormat) setFormat(newFormat)
  }

  const handleScaleChange = (
    _: React.MouseEvent<HTMLElement>,
    newScale: ExportScale | null
  ) => {
    if (newScale) setScale(newScale)
  }

  const handleExport = async () => {
    if (!project || !canvas || !fabric) return

    setIsExporting(true)
    setExportProgress(0)
    setExportComplete(false)

    try {
      const zip = new JSZip()
      
      // Determine which screens to export
      const screenIndices = includeAllScreens
        ? project.screens.map((_, index) => index)
        : [currentScreenIndex]

      // Create a folder for the project
      const folder = zip.folder(project.name.replace(/[^a-z0-9]/gi, '_'))
      if (!folder) throw new Error('Failed to create folder')

      // Save current canvas state first
      const currentCanvasData = JSON.stringify(canvas.toJSON(['name', 'data', 'selectable', 'evented', 'hasControls', 'hasBorders', 'lockMovementX', 'lockMovementY', 'lockRotation', 'lockScalingX', 'lockScalingY']))
      
      for (let i = 0; i < screenIndices.length; i++) {
        const screenIndex = screenIndices[i]
        setExportProgress(((i + 0.5) / screenIndices.length) * 100)
        
        // Get the screen data
        let screenCanvasData: string | null = null
        
        if (screenIndex === currentScreenIndex) {
          // Current screen - use current canvas state
          screenCanvasData = currentCanvasData
        } else {
          // Other screen - use stored canvas data
          screenCanvasData = project.screens[screenIndex]?.canvasData || null
        }
        
        if (screenCanvasData) {
          // Load the screen data into canvas temporarily
          await new Promise<void>((resolve) => {
            canvas.loadFromJSON(JSON.parse(screenCanvasData!), () => {
              canvas.renderAll()
              resolve()
            })
          })
          
          // Wait a bit for images to load
          await new Promise((resolve) => setTimeout(resolve, 100))
        }
        
        // Export the canvas as image
        const dataURL = canvas.toDataURL({
          format: format === 'png' ? 'png' : 'jpeg',
          quality: format === 'jpg' ? 0.95 : 1,
          multiplier: scale,
        })
        
        // Convert data URL to blob
        const response = await fetch(dataURL)
        const blob = await response.blob()

        // Add to zip
        const fileName = `screen_${String(screenIndex + 1).padStart(2, '0')}_${scale}x.${format}`
        folder.file(fileName, blob)

        setExportProgress(((i + 1) / screenIndices.length) * 100)
        
        // Small delay for visual feedback
        await new Promise((resolve) => setTimeout(resolve, 100))
      }
      
      // Restore original canvas state
      await new Promise<void>((resolve) => {
        canvas.loadFromJSON(JSON.parse(currentCanvasData), () => {
          canvas.renderAll()
          resolve()
        })
      })

      // Generate and download zip
      const zipBlob = await zip.generateAsync({ type: 'blob' })
      saveAs(zipBlob, `${project.name.replace(/[^a-z0-9]/gi, '_')}_screenshots.zip`)

      setExportComplete(true)
    } catch (error) {
      console.error('Export failed:', error)
    } finally {
      setIsExporting(false)
    }
  }

  const handleClose = () => {
    if (!isExporting) {
      setOpen(false)
      setExportComplete(false)
      setExportProgress(0)
    }
  }

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: COLORS.background.secondary,
          border: `1px solid ${COLORS.border.primary}`,
          borderRadius: 3,
        },
      }}
    >
      <DialogTitle
        sx={{
          fontFamily: '"Clash Display", sans-serif',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        <Archive size={24} color={COLORS.accent.primary} />
        Export Screenshots
      </DialogTitle>

      <DialogContent>
        {exportComplete ? (
          <Box
            sx={{
              textAlign: 'center',
              py: 4,
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                bgcolor: COLORS.accent.light,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 3,
              }}
            >
              <Check size={40} color={COLORS.accent.primary} />
            </Box>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Export Complete!
            </Typography>
            <Typography variant="body2" sx={{ color: COLORS.text.secondary }}>
              Your screenshots have been downloaded as a ZIP file.
            </Typography>
          </Box>
        ) : isExporting ? (
          <Box sx={{ py: 4 }}>
            <Typography variant="body2" sx={{ color: COLORS.text.secondary, mb: 2 }}>
              Exporting screenshots...
            </Typography>
            <LinearProgress
              variant="determinate"
              value={exportProgress}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: COLORS.background.elevated,
                '& .MuiLinearProgress-bar': {
                  bgcolor: COLORS.accent.primary,
                  borderRadius: 4,
                },
              }}
            />
            <Typography
              variant="caption"
              sx={{ color: COLORS.text.tertiary, mt: 1, display: 'block' }}
            >
              {Math.round(exportProgress)}%
            </Typography>
          </Box>
        ) : (
          <>
            {/* Format Selection */}
            <Typography
              variant="overline"
              sx={{
                color: COLORS.text.tertiary,
                fontSize: '0.7rem',
                letterSpacing: 1,
                mb: 1.5,
                display: 'block',
              }}
            >
              Export Format
            </Typography>

            <ToggleButtonGroup
              value={format}
              exclusive
              onChange={handleFormatChange}
              fullWidth
              sx={{
                mb: 3,
                '& .MuiToggleButton-root': {
                  py: 1.5,
                  border: `1px solid ${COLORS.border.primary}`,
                  '&.Mui-selected': {
                    bgcolor: COLORS.accent.light,
                    borderColor: COLORS.accent.primary,
                  },
                },
              }}
            >
              <ToggleButton value="png">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FileImage size={18} />
                  PNG
                  <Chip label="Recommended" size="small" sx={{ ml: 1, height: 20, fontSize: '0.65rem' }} />
                </Box>
              </ToggleButton>
              <ToggleButton value="jpg">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FileImage size={18} />
                  JPEG
                </Box>
              </ToggleButton>
            </ToggleButtonGroup>

            {/* Scale Selection */}
            <Typography
              variant="overline"
              sx={{
                color: COLORS.text.tertiary,
                fontSize: '0.7rem',
                letterSpacing: 1,
                mb: 1.5,
                display: 'block',
              }}
            >
              Export Scale
            </Typography>

            <ToggleButtonGroup
              value={scale}
              exclusive
              onChange={handleScaleChange}
              fullWidth
              sx={{
                mb: 3,
                '& .MuiToggleButton-root': {
                  py: 1.5,
                  border: `1px solid ${COLORS.border.primary}`,
                  '&.Mui-selected': {
                    bgcolor: COLORS.accent.light,
                    borderColor: COLORS.accent.primary,
                  },
                },
              }}
            >
              <ToggleButton value={1}>1x</ToggleButton>
              <ToggleButton value={2}>2x</ToggleButton>
              <ToggleButton value={3}>3x</ToggleButton>
            </ToggleButtonGroup>

            {/* Options */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={includeAllScreens}
                  onChange={(e) => setIncludeAllScreens(e.target.checked)}
                  sx={{
                    color: COLORS.text.tertiary,
                    '&.Mui-checked': {
                      color: COLORS.accent.primary,
                    },
                  }}
                />
              }
              label={
                <Typography variant="body2">
                  Export all screens ({project?.screens.length || 0})
                </Typography>
              }
            />

            {/* Summary */}
            <Box
              sx={{
                mt: 3,
                p: 2,
                borderRadius: 2,
                bgcolor: COLORS.background.tertiary,
                border: `1px solid ${COLORS.border.primary}`,
              }}
            >
              <Typography variant="caption" sx={{ color: COLORS.text.tertiary }}>
                Export Summary
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Typography variant="body2" sx={{ color: COLORS.text.secondary }}>
                  Files
                </Typography>
                <Typography variant="body2" sx={{ color: COLORS.text.primary }}>
                  {includeAllScreens ? project?.screens.length : 1} × {format.toUpperCase()}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                <Typography variant="body2" sx={{ color: COLORS.text.secondary }}>
                  Resolution
                </Typography>
                <Typography variant="body2" sx={{ color: COLORS.text.primary }}>
                  {1290 * scale} × {2796 * scale}px
                </Typography>
              </Box>
            </Box>
          </>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        {exportComplete ? (
          <Button
            variant="contained"
            onClick={handleClose}
            fullWidth
            sx={{
              bgcolor: COLORS.accent.primary,
              color: COLORS.background.primary,
              '&:hover': { bgcolor: COLORS.accent.secondary },
            }}
          >
            Done
          </Button>
        ) : (
          <>
            <Button
              onClick={handleClose}
              disabled={isExporting}
              sx={{ color: COLORS.text.secondary }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleExport}
              disabled={isExporting}
              startIcon={<Download size={18} />}
              sx={{
                bgcolor: COLORS.accent.primary,
                color: COLORS.background.primary,
                '&:hover': { bgcolor: COLORS.accent.secondary },
              }}
            >
              Export ZIP
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  )
}

