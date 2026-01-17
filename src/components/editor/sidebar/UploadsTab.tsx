'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Box, Typography, LinearProgress, Button, Tooltip } from '@mui/material'
import { Upload, Image, Trash2, Smartphone, ImagePlus } from 'lucide-react'
import { COLORS } from '@/constants/colors'
import { useCanvasStore } from '@/store/canvasStore'

interface UploadedFile {
  id: string
  name: string
  url: string
  type: 'image' | 'screenshot'
}

export default function UploadsTab() {
  const [uploads, setUploads] = useState<UploadedFile[]>([])
  const [uploading, setUploading] = useState(false)
  const [usedInDevice, setUsedInDevice] = useState<string | null>(null) // Track which upload is in device
  const addImage = useCanvasStore((state) => state.addImage)
  const addScreenshotToDevice = useCanvasStore((state) => state.addScreenshotToDevice)
  const removeScreenshotFromDevice = useCanvasStore((state) => state.removeScreenshotFromDevice)
  const currentDeviceId = useCanvasStore((state) => state.currentDeviceId)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploading(true)
    
    // Simulate upload delay then add to local state
    setTimeout(() => {
      const newUploads: UploadedFile[] = acceptedFiles.map((file) => ({
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: file.name,
        url: URL.createObjectURL(file),
        type: 'image',
      }))
      
      setUploads((prev) => [...prev, ...newUploads])
      setUploading(false)
      
      // Auto-place the first image in device if device exists
      if (newUploads.length > 0 && currentDeviceId) {
        addScreenshotToDevice(newUploads[0].url)
        setUsedInDevice(newUploads[0].id)
      }
    }, 500)
  }, [currentDeviceId, addScreenshotToDevice])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
    },
    multiple: true,
  })

  const handleDelete = (id: string) => {
    // If this upload was used in device, remove the screenshot from canvas too
    if (usedInDevice === id) {
      removeScreenshotFromDevice()
      setUsedInDevice(null)
    }
    setUploads((prev) => prev.filter((upload) => upload.id !== id))
  }

  return (
    <Box>
      {/* Tip for adding screenshots */}
      {currentDeviceId && (
        <Box
          sx={{
            mb: 2,
            p: 1.5,
            borderRadius: 1.5,
            bgcolor: COLORS.accent.light,
            border: `1px solid ${COLORS.accent.primary}`,
          }}
        >
          <Typography variant="caption" sx={{ color: COLORS.accent.primary, fontWeight: 500 }}>
            💡 Device selected! Upload a screenshot and click "To Device" to place it in the phone screen.
          </Typography>
        </Box>
      )}
      
      {/* Upload Dropzone */}
      <Box
        {...getRootProps()}
        sx={{
          p: 4,
          borderRadius: 2,
          border: `2px dashed ${isDragActive ? COLORS.accent.primary : COLORS.border.secondary}`,
          bgcolor: isDragActive ? COLORS.accent.light : COLORS.background.tertiary,
          cursor: 'pointer',
          textAlign: 'center',
          transition: 'all 0.2s ease',
          mb: 3,
          '&:hover': {
            borderColor: COLORS.accent.primary,
            bgcolor: COLORS.accent.light,
          },
        }}
      >
        <input {...getInputProps()} />
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 2,
            bgcolor: COLORS.accent.light,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 2,
          }}
        >
          <Upload size={24} color={COLORS.accent.primary} />
        </Box>
        <Typography variant="body2" sx={{ color: COLORS.text.primary, mb: 0.5 }}>
          {isDragActive ? 'Drop files here' : 'Drag & drop images'}
        </Typography>
        <Typography variant="caption" sx={{ color: COLORS.text.tertiary }}>
          or click to browse
        </Typography>
      </Box>

      {/* Upload Progress */}
      {uploading && (
        <Box sx={{ mb: 3 }}>
          <LinearProgress
            sx={{
              borderRadius: 1,
              bgcolor: COLORS.background.elevated,
              '& .MuiLinearProgress-bar': {
                bgcolor: COLORS.accent.primary,
              },
            }}
          />
          <Typography
            variant="caption"
            sx={{ color: COLORS.text.tertiary, mt: 1, display: 'block' }}
          >
            Uploading...
          </Typography>
        </Box>
      )}

      {/* Uploaded Files */}
      {uploads.length > 0 ? (
        <>
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
            Your Uploads ({uploads.length})
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 1.5,
            }}
          >
            {uploads.map((upload) => (
              <Box
                key={upload.id}
                sx={{
                  position: 'relative',
                  aspectRatio: '1',
                  borderRadius: 2,
                  overflow: 'hidden',
                  border: `1px solid ${COLORS.border.primary}`,
                  transition: 'all 0.2s ease',
                  '&:hover .overlay': {
                    opacity: 1,
                  },
                  '&:hover': {
                    borderColor: COLORS.accent.primary,
                  },
                }}
              >
                <Box
                  component="img"
                  src={upload.url}
                  alt={upload.name}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                {/* Hover Overlay with Actions */}
                <Box
                  className="overlay"
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    bgcolor: 'rgba(0,0,0,0.75)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1,
                    opacity: 0,
                    transition: 'opacity 0.2s ease',
                    p: 1,
                  }}
                >
                  {/* Add to Device Button */}
                  <Tooltip title={currentDeviceId ? "Add to Device Screen" : "Add a device first"}>
                    <Box
                      onClick={(e) => {
                        e.stopPropagation()
                        if (currentDeviceId) {
                          addScreenshotToDevice(upload.url)
                          setUsedInDevice(upload.id) // Track which upload is in device
                        }
                      }}
                      sx={{
                        p: 1,
                        px: 1.5,
                        borderRadius: 1,
                        bgcolor: currentDeviceId ? COLORS.accent.primary : COLORS.background.elevated,
                        color: currentDeviceId ? COLORS.background.primary : COLORS.text.tertiary,
                        cursor: currentDeviceId ? 'pointer' : 'not-allowed',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        width: '100%',
                        justifyContent: 'center',
                        '&:hover': {
                          bgcolor: currentDeviceId ? COLORS.accent.secondary : COLORS.background.elevated,
                        },
                      }}
                    >
                      <Smartphone size={14} />
                      To Device
                    </Box>
                  </Tooltip>
                  
                  {/* Add as Image Button */}
                  <Box
                    onClick={(e) => {
                      e.stopPropagation()
                      addImage(upload.url)
                    }}
                    sx={{
                      p: 1,
                      px: 1.5,
                      borderRadius: 1,
                      bgcolor: COLORS.background.elevated,
                      color: COLORS.text.primary,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      fontSize: '0.7rem',
                      fontWeight: 500,
                      width: '100%',
                      justifyContent: 'center',
                      '&:hover': {
                        bgcolor: COLORS.background.tertiary,
                      },
                    }}
                  >
                    <ImagePlus size={14} />
                    As Image
                  </Box>
                  
                  {/* Delete Button */}
                  <Box
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDelete(upload.id)
                    }}
                    sx={{
                      p: 1,
                      px: 1.5,
                      borderRadius: 1,
                      bgcolor: COLORS.coral.primary,
                      color: '#fff',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      fontSize: '0.7rem',
                      fontWeight: 500,
                      width: '100%',
                      justifyContent: 'center',
                      '&:hover': {
                        bgcolor: COLORS.coral.secondary,
                      },
                    }}
                  >
                    <Trash2 size={14} />
                    Delete
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </>
      ) : (
        <Box
          sx={{
            textAlign: 'center',
            py: 4,
            color: COLORS.text.tertiary,
          }}
        >
          <Image size={40} style={{ opacity: 0.3, marginBottom: 8 }} />
          <Typography variant="body2">No uploads yet</Typography>
          <Typography variant="caption">
            Upload screenshots or images to use in your design
          </Typography>
        </Box>
      )}
    </Box>
  )
}

