'use client'

import { useRef } from 'react'
import { Box, IconButton, Tooltip, Slider, Typography, Divider } from '@mui/material'
import {
  MousePointer2,
  Hand,
  Type,
  Smartphone,
  Image,
  Square,
  ZoomIn,
  ZoomOut,
  Maximize,
  Trash2,
  Copy,
  FlipHorizontal,
  FlipVertical,
  Lock,
  Unlock,
} from 'lucide-react'
import { COLORS } from '@/constants/colors'
import { useEditorStore } from '@/store/editorStore'
import { useCanvasStore } from '@/store/canvasStore'
import type { ToolType } from '@/types/editor'

const tools: { id: ToolType; icon: typeof MousePointer2; label: string; shortcut?: string }[] = [
  { id: 'select', icon: MousePointer2, label: 'Select', shortcut: 'V' },
  { id: 'hand', icon: Hand, label: 'Pan', shortcut: 'H' },
  { id: 'text', icon: Type, label: 'Add Text', shortcut: 'T' },
  { id: 'device', icon: Smartphone, label: 'Add Device', shortcut: 'D' },
  { id: 'image', icon: Image, label: 'Upload Image', shortcut: 'I' },
  { id: 'shape', icon: Square, label: 'Add Shape', shortcut: 'R' },
]

export default function EditorToolbar() {
  const activeTool = useEditorStore((state) => state.activeTool)
  const setActiveTool = useEditorStore((state) => state.setActiveTool)
  const zoom = useEditorStore((state) => state.zoom)
  const setZoom = useEditorStore((state) => state.setZoom)
  const selectedElementId = useEditorStore((state) => state.selectedElementId)
  
  const deleteSelected = useCanvasStore((state) => state.deleteSelected)
  const addText = useCanvasStore((state) => state.addText)
  const addShape = useCanvasStore((state) => state.addShape)
  const addRandomDevice = useCanvasStore((state) => state.addRandomDevice)
  const addScreenshotToDevice = useCanvasStore((state) => state.addScreenshotToDevice)
  const currentDeviceId = useCanvasStore((state) => state.currentDeviceId)
  const canvas = useCanvasStore((state) => state.canvas)
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // Handle tool click
  const handleToolClick = (toolId: ToolType) => {
    setActiveTool(toolId)
    
    switch (toolId) {
      case 'text':
        addText('New Text')
        setActiveTool('select')
        break
      case 'device':
        addRandomDevice()
        setActiveTool('select')
        break
      case 'shape':
        addShape('rectangle')
        setActiveTool('select')
        break
      case 'image':
        fileInputRef.current?.click()
        break
      case 'hand':
        // Enable pan mode on canvas
        if (canvas) {
          canvas.defaultCursor = 'grab'
          canvas.selection = false
          canvas.forEachObject((obj: any) => {
            obj.selectable = false
          })
        }
        break
      case 'select':
        // Disable pan mode
        if (canvas) {
          canvas.defaultCursor = 'default'
          canvas.selection = true
          canvas.forEachObject((obj: any) => {
            // Don't make background selectable
            if (obj.name !== 'background') {
              obj.selectable = true
            }
          })
        }
        break
    }
  }
  
  // Handle image upload - auto-place in device if device exists
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string
        // Auto-place in device if device exists
        if (currentDeviceId) {
          addScreenshotToDevice(dataUrl)
        } else {
          // Add as regular image if no device
          const { fabric } = useCanvasStore.getState()
          if (canvas && fabric) {
            const imgElement = document.createElement('img')
            imgElement.crossOrigin = 'anonymous'
            imgElement.onload = () => {
              const img = new fabric.Image(imgElement, {
                left: canvas.width / 2,
                top: 500,
                originX: 'center',
                originY: 'center',
                selectable: true,
                hasControls: true,
                hasBorders: true,
              })
              const maxWidth = canvas.width * 0.6
              const maxHeight = 700
              const scale = Math.min(maxWidth / img.width!, maxHeight / img.height!, 1)
              img.scale(scale)
              canvas.add(img)
              canvas.setActiveObject(img)
              canvas.renderAll()
            }
            imgElement.src = dataUrl
          }
        }
      }
      reader.readAsDataURL(file)
    }
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    setActiveTool('select')
  }
  
  // Duplicate selected object
  const handleDuplicate = () => {
    if (!canvas) return
    const activeObj = canvas.getActiveObject()
    if (!activeObj) return
    
    activeObj.clone((cloned: any) => {
      cloned.set({
        left: (activeObj.left || 0) + 20,
        top: (activeObj.top || 0) + 20,
      })
      canvas.add(cloned)
      canvas.setActiveObject(cloned)
      canvas.renderAll()
    })
  }
  
  // Flip horizontal
  const handleFlipHorizontal = () => {
    if (!canvas) return
    const activeObj = canvas.getActiveObject()
    if (!activeObj) return
    
    activeObj.set('flipX', !activeObj.flipX)
    canvas.renderAll()
  }
  
  // Flip vertical
  const handleFlipVertical = () => {
    if (!canvas) return
    const activeObj = canvas.getActiveObject()
    if (!activeObj) return
    
    activeObj.set('flipY', !activeObj.flipY)
    canvas.renderAll()
  }
  
  // Lock/unlock object
  const handleToggleLock = () => {
    if (!canvas) return
    const activeObj = canvas.getActiveObject()
    if (!activeObj) return
    
    const isLocked = activeObj.lockMovementX && activeObj.lockMovementY
    
    activeObj.set({
      lockMovementX: !isLocked,
      lockMovementY: !isLocked,
      lockScalingX: !isLocked,
      lockScalingY: !isLocked,
      lockRotation: !isLocked,
      hasControls: isLocked,
      selectable: true, // Keep selectable to unlock later
    })
    canvas.renderAll()
  }
  
  // Check if current object is locked
  const isObjectLocked = () => {
    if (!canvas) return false
    const activeObj = canvas.getActiveObject()
    if (!activeObj) return false
    return activeObj.lockMovementX && activeObj.lockMovementY
  }

  const handleZoomChange = (_: Event, value: number | number[]) => {
    setZoom((value as number) / 100)
  }

  return (
    <Box
      sx={{
        height: 52,
        px: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        bgcolor: COLORS.background.tertiary,
        borderBottom: `1px solid ${COLORS.border.primary}`,
      }}
    >
      {/* Hidden file input for image upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        style={{ display: 'none' }}
      />
      
      {/* Left - Tools */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        {tools.map((tool) => {
          const isActive = activeTool === tool.id
          return (
            <Tooltip
              key={tool.id}
              title={`${tool.label}${tool.shortcut ? ` (${tool.shortcut})` : ''}`}
            >
              <IconButton
                onClick={() => handleToolClick(tool.id)}
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 1.5,
                  color: isActive ? COLORS.accent.primary : COLORS.text.tertiary,
                  bgcolor: isActive ? COLORS.accent.light : 'transparent',
                  transition: 'all 0.15s ease',
                  '&:hover': {
                    bgcolor: isActive ? COLORS.accent.light : COLORS.background.elevated,
                    color: isActive ? COLORS.accent.primary : COLORS.text.secondary,
                  },
                }}
              >
                <tool.icon size={20} />
              </IconButton>
            </Tooltip>
          )
        })}
      </Box>

      {/* Center - Zoom Controls */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Tooltip title="Zoom Out">
          <IconButton
            onClick={() => setZoom(Math.max(0.1, zoom - 0.1))}
            sx={{ color: COLORS.text.secondary }}
            size="small"
          >
            <ZoomOut size={18} />
          </IconButton>
        </Tooltip>

        <Box sx={{ width: 120, display: 'flex', alignItems: 'center' }}>
          <Slider
            value={zoom * 100}
            onChange={handleZoomChange}
            min={10}
            max={200}
            sx={{
              color: COLORS.accent.primary,
              '& .MuiSlider-thumb': {
                width: 14,
                height: 14,
              },
              '& .MuiSlider-track': {
                height: 4,
              },
              '& .MuiSlider-rail': {
                height: 4,
                bgcolor: COLORS.border.secondary,
              },
            }}
          />
        </Box>

        <Typography
          variant="caption"
          sx={{
            color: COLORS.text.secondary,
            minWidth: 45,
            textAlign: 'center',
          }}
        >
          {Math.round(zoom * 100)}%
        </Typography>

        <Tooltip title="Zoom In">
          <IconButton
            onClick={() => setZoom(Math.min(2, zoom + 0.1))}
            sx={{ color: COLORS.text.secondary }}
            size="small"
          >
            <ZoomIn size={18} />
          </IconButton>
        </Tooltip>

        <Tooltip title="Fit to Screen (25%)">
          <IconButton
            onClick={() => setZoom(0.25)}
            sx={{ color: COLORS.text.secondary }}
            size="small"
          >
            <Maximize size={18} />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Right - Selection Actions */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        {selectedElementId && (
          <>
            <Divider
              orientation="vertical"
              sx={{ height: 24, mx: 1, bgcolor: COLORS.border.primary }}
            />

            <Tooltip title="Duplicate (Ctrl+D)">
              <IconButton
                onClick={handleDuplicate}
                sx={{
                  color: COLORS.text.tertiary,
                  '&:hover': { color: COLORS.text.secondary },
                }}
                size="small"
              >
                <Copy size={18} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Flip Horizontal">
              <IconButton
                onClick={handleFlipHorizontal}
                sx={{
                  color: COLORS.text.tertiary,
                  '&:hover': { color: COLORS.text.secondary },
                }}
                size="small"
              >
                <FlipHorizontal size={18} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Flip Vertical">
              <IconButton
                onClick={handleFlipVertical}
                sx={{
                  color: COLORS.text.tertiary,
                  '&:hover': { color: COLORS.text.secondary },
                }}
                size="small"
              >
                <FlipVertical size={18} />
              </IconButton>
            </Tooltip>

            <Tooltip title={isObjectLocked() ? "Unlock" : "Lock"}>
              <IconButton
                onClick={handleToggleLock}
                sx={{
                  color: isObjectLocked() ? COLORS.accent.primary : COLORS.text.tertiary,
                  '&:hover': { color: COLORS.text.secondary },
                }}
                size="small"
              >
                {isObjectLocked() ? <Unlock size={18} /> : <Lock size={18} />}
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete (Del)">
              <IconButton
                onClick={deleteSelected}
                sx={{
                  color: COLORS.text.tertiary,
                  '&:hover': { color: COLORS.coral.primary },
                }}
                size="small"
              >
                <Trash2 size={18} />
              </IconButton>
            </Tooltip>
          </>
        )}
      </Box>
    </Box>
  )
}

