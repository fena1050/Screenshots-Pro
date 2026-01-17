'use client'

import { useState, useEffect, useCallback } from 'react'
import { Box, Typography, TextField, Slider, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material'
import { COLORS } from '@/constants/colors'
import { useEditorStore } from '@/store/editorStore'
import { useCanvasStore } from '@/store/canvasStore'
import { FONTS } from '@/constants/fonts'

export default function PropertyPanel() {
  const selectedElementId = useEditorStore((state) => state.selectedElementId)

  return (
    <Box
      sx={{
        width: 280,
        borderLeft: `1px solid ${COLORS.border.primary}`,
        bgcolor: COLORS.background.secondary,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: 3,
          py: 2,
          borderBottom: `1px solid ${COLORS.border.primary}`,
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 600, color: COLORS.text.primary }}
        >
          Properties
        </Typography>
      </Box>

      {/* Content */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          p: 2,
        }}
      >
        {selectedElementId ? (
          <SelectedElementProperties elementId={selectedElementId} />
        ) : (
          <CanvasProperties />
        )}
      </Box>
    </Box>
  )
}

function CanvasProperties() {
  const canvasWidth = useEditorStore((state) => state.canvasWidth)
  const canvasHeight = useEditorStore((state) => state.canvasHeight)
  const setCanvasSize = useEditorStore((state) => state.setCanvasSize)
  const canvas = useCanvasStore((state) => state.canvas)

  const clearCanvasSelection = () => {
    if (canvas) {
      canvas.discardActiveObject()
      canvas.renderAll()
    }
  }

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const width = parseInt(e.target.value) || 1290
    setCanvasSize(width, canvasHeight)
  }

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const height = parseInt(e.target.value) || 2796
    setCanvasSize(canvasWidth, height)
  }

  const handleResetToDefault = () => {
    setCanvasSize(1290, 2796)
  }

  const handleInputFocus = () => {
    clearCanvasSelection()
  }

  return (
    <Box>
      <Typography
        variant="overline"
        sx={{
          color: COLORS.text.tertiary,
          fontSize: '0.7rem',
          letterSpacing: 1,
          mb: 2,
          display: 'block',
        }}
      >
        Canvas Size
      </Typography>

      <Box 
        sx={{ display: 'flex', gap: 1.5, mb: 2 }}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <TextField
          label="Width"
          value={canvasWidth}
          onChange={handleWidthChange}
          onFocus={handleInputFocus}
          size="small"
          type="number"
          fullWidth
          InputProps={{
            endAdornment: <Typography variant="caption" sx={{ color: COLORS.text.tertiary }}>px</Typography>,
          }}
        />
        <TextField
          label="Height"
          value={canvasHeight}
          onChange={handleHeightChange}
          onFocus={handleInputFocus}
          size="small"
          type="number"
          fullWidth
          InputProps={{
            endAdornment: <Typography variant="caption" sx={{ color: COLORS.text.tertiary }}>px</Typography>,
          }}
        />
      </Box>

      {/* Default Button */}
      <Box
        onClick={() => {
          clearCanvasSelection()
          handleResetToDefault()
        }}
        sx={{
          p: 1.5,
          borderRadius: 1.5,
          bgcolor: COLORS.accent.primary,
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          mb: 4,
          '&:hover': {
            bgcolor: COLORS.accent.secondary,
          },
        }}
      >
        <Typography variant="body2" sx={{ color: '#fff', fontWeight: 600 }}>
          Reset to Default (1290 × 2796)
        </Typography>
      </Box>

      <Typography
        variant="overline"
        sx={{
          color: COLORS.text.tertiary,
          fontSize: '0.7rem',
          letterSpacing: 1,
          mb: 2,
          display: 'block',
        }}
      >
        Quick Actions
      </Typography>

      <Box
        sx={{
          p: 3,
          borderRadius: 2,
          bgcolor: COLORS.background.tertiary,
          border: `1px solid ${COLORS.border.primary}`,
          textAlign: 'center',
        }}
      >
        <Typography variant="body2" sx={{ color: COLORS.text.tertiary, mb: 1 }}>
          Select an element to edit its properties
        </Typography>
        <Typography variant="caption" sx={{ color: COLORS.text.muted }}>
          Click on text, device, or shape on the canvas
        </Typography>
      </Box>
    </Box>
  )
}

function SelectedElementProperties({ elementId }: { elementId: string }) {
  const canvas = useCanvasStore((state) => state.canvas)
  
  // State for element properties
  const [posX, setPosX] = useState(0)
  const [posY, setPosY] = useState(0)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [fontSize, setFontSize] = useState(72)
  const [fontFamily, setFontFamily] = useState('Clash Display')
  const [fontWeight, setFontWeight] = useState('700')
  const [fillColor, setFillColor] = useState('#FFFFFF')
  const [opacity, setOpacity] = useState(100)
  const [rotation, setRotation] = useState(0)
  const [isTextElement, setIsTextElement] = useState(false)
  
  // Get selected object and read its properties
  const getSelectedObject = useCallback(() => {
    if (!canvas) return null
    return canvas.getActiveObject()
  }, [canvas])
  
  // Update state from selected object
  useEffect(() => {
    const obj = getSelectedObject()
    if (!obj) return
    
    setPosX(Math.round(obj.left || 0))
    setPosY(Math.round(obj.top || 0))
    setWidth(Math.round((obj.width || 0) * (obj.scaleX || 1)))
    setHeight(Math.round((obj.height || 0) * (obj.scaleY || 1)))
    setOpacity(Math.round((obj.opacity || 1) * 100))
    setRotation(Math.round(obj.angle || 0))
    setFillColor(obj.fill as string || '#FFFFFF')
    
    // Check if it's a text element
    const isText = obj.type === 'i-text' || obj.type === 'text' || obj.type === 'textbox'
    setIsTextElement(isText)
    
    if (isText) {
      setFontSize(obj.fontSize || 72)
      setFontFamily(obj.fontFamily || 'Clash Display')
      setFontWeight(String(obj.fontWeight || '700'))
    }
  }, [elementId, getSelectedObject])
  
  // Listen for canvas object modifications
  useEffect(() => {
    if (!canvas) return
    
    const handleObjectModified = () => {
      const obj = getSelectedObject()
      if (!obj) return
      
      setPosX(Math.round(obj.left || 0))
      setPosY(Math.round(obj.top || 0))
      setWidth(Math.round((obj.width || 0) * (obj.scaleX || 1)))
      setHeight(Math.round((obj.height || 0) * (obj.scaleY || 1)))
      setRotation(Math.round(obj.angle || 0))
    }
    
    canvas.on('object:modified', handleObjectModified)
    canvas.on('object:moving', handleObjectModified)
    canvas.on('object:scaling', handleObjectModified)
    canvas.on('object:rotating', handleObjectModified)
    
    return () => {
      canvas.off('object:modified', handleObjectModified)
      canvas.off('object:moving', handleObjectModified)
      canvas.off('object:scaling', handleObjectModified)
      canvas.off('object:rotating', handleObjectModified)
    }
  }, [canvas, getSelectedObject])
  
  // Update handlers
  const updateObject = useCallback((property: string, value: any) => {
    const obj = getSelectedObject()
    if (!obj || !canvas) return
    
    obj.set(property, value)
    canvas.renderAll()
  }, [canvas, getSelectedObject])
  
  const handlePosXChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value) || 0
    setPosX(val)
    updateObject('left', val)
  }
  
  const handlePosYChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value) || 0
    setPosY(val)
    updateObject('top', val)
  }
  
  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const obj = getSelectedObject()
    if (!obj || !canvas) return
    const val = parseInt(e.target.value) || 100
    setWidth(val)
    const newScaleX = val / (obj.width || 1)
    obj.set('scaleX', newScaleX)
    canvas.renderAll()
  }
  
  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const obj = getSelectedObject()
    if (!obj || !canvas) return
    const val = parseInt(e.target.value) || 100
    setHeight(val)
    const newScaleY = val / (obj.height || 1)
    obj.set('scaleY', newScaleY)
    canvas.renderAll()
  }
  
  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value) || 72
    setFontSize(val)
    updateObject('fontSize', val)
  }
  
  const handleFontFamilyChange = (e: SelectChangeEvent) => {
    const font = FONTS.find(f => f.id === e.target.value)
    if (font) {
      setFontFamily(font.family)
      updateObject('fontFamily', font.family)
    }
  }
  
  const handleFontWeightChange = (e: SelectChangeEvent) => {
    const val = e.target.value
    setFontWeight(val)
    updateObject('fontWeight', val)
  }
  
  const handleColorChange = (color: string) => {
    setFillColor(color)
    updateObject('fill', color)
  }
  
  const handleOpacityChange = (_: Event, value: number | number[]) => {
    const val = value as number
    setOpacity(val)
    updateObject('opacity', val / 100)
  }
  
  const handleRotationChange = (_: Event, value: number | number[]) => {
    const val = value as number
    setRotation(val)
    updateObject('angle', val)
  }
  
  const currentFontId = FONTS.find(f => f.family === fontFamily)?.id || 'clash-display'

  return (
    <Box>
      {/* Position & Size */}
      <Typography
        variant="overline"
        sx={{
          color: COLORS.text.tertiary,
          fontSize: '0.7rem',
          letterSpacing: 1,
          mb: 2,
          display: 'block',
        }}
      >
        Position
      </Typography>

      <Box sx={{ display: 'flex', gap: 1.5, mb: 3 }}>
        <TextField
          label="X"
          value={posX}
          onChange={handlePosXChange}
          size="small"
          type="number"
          fullWidth
        />
        <TextField
          label="Y"
          value={posY}
          onChange={handlePosYChange}
          size="small"
          type="number"
          fullWidth
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 1.5, mb: 4 }}>
        <TextField
          label="Width"
          value={width}
          onChange={handleWidthChange}
          size="small"
          type="number"
          fullWidth
        />
        <TextField
          label="Height"
          value={height}
          onChange={handleHeightChange}
          size="small"
          type="number"
          fullWidth
        />
      </Box>

      {/* Typography (for text elements only) */}
      {isTextElement && (
        <>
          <Typography
            variant="overline"
            sx={{
              color: COLORS.text.tertiary,
              fontSize: '0.7rem',
              letterSpacing: 1,
              mb: 2,
              display: 'block',
            }}
          >
            Typography
          </Typography>

          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <InputLabel>Font Family</InputLabel>
            <Select 
              value={currentFontId} 
              onChange={handleFontFamilyChange}
              label="Font Family"
            >
              {FONTS.map((font) => (
                <MenuItem key={font.id} value={font.id} sx={{ fontFamily: font.family }}>
                  {font.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
            <TextField
              label="Size"
              value={fontSize}
              onChange={handleFontSizeChange}
              size="small"
              type="number"
              fullWidth
            />
            <FormControl fullWidth size="small">
              <InputLabel>Weight</InputLabel>
              <Select 
                value={fontWeight} 
                onChange={handleFontWeightChange}
                label="Weight"
              >
                <MenuItem value="400">Regular</MenuItem>
                <MenuItem value="500">Medium</MenuItem>
                <MenuItem value="600">Semibold</MenuItem>
                <MenuItem value="700">Bold</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </>
      )}

      {/* Color */}
      <Typography
        variant="overline"
        sx={{
          color: COLORS.text.tertiary,
          fontSize: '0.7rem',
          letterSpacing: 1,
          mb: 2,
          mt: isTextElement ? 3 : 0,
          display: 'block',
        }}
      >
        Fill Color
      </Typography>

      <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
        {['#FFFFFF', '#000000', COLORS.accent.primary, COLORS.coral.primary, COLORS.amber.primary].map(
          (color) => (
            <Box
              key={color}
              onClick={() => handleColorChange(color)}
              sx={{
                width: 32,
                height: 32,
                borderRadius: 1,
                bgcolor: color,
                cursor: 'pointer',
                border: `2px solid ${fillColor === color ? COLORS.accent.primary : (color === '#FFFFFF' ? COLORS.border.primary : 'transparent')}`,
                transition: 'transform 0.15s ease',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
              }}
            />
          )
        )}
        {/* Custom color picker */}
        <Box sx={{ position: 'relative' }}>
          <input
            type="color"
            value={fillColor}
            onChange={(e) => handleColorChange(e.target.value)}
            style={{
              width: 32,
              height: 32,
              borderRadius: 4,
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          />
        </Box>
      </Box>

      {/* Opacity */}
      <Typography
        variant="overline"
        sx={{
          color: COLORS.text.tertiary,
          fontSize: '0.7rem',
          letterSpacing: 1,
          mb: 1,
          mt: 2,
          display: 'block',
        }}
      >
        Opacity
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Slider
          value={opacity}
          onChange={handleOpacityChange}
          min={0}
          max={100}
          sx={{
            color: COLORS.accent.primary,
            flex: 1,
          }}
        />
        <Typography variant="body2" sx={{ color: COLORS.text.secondary, minWidth: 40 }}>
          {opacity}%
        </Typography>
      </Box>

      {/* Rotation */}
      <Typography
        variant="overline"
        sx={{
          color: COLORS.text.tertiary,
          fontSize: '0.7rem',
          letterSpacing: 1,
          mb: 1,
          mt: 3,
          display: 'block',
        }}
      >
        Rotation
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Slider
          value={rotation}
          onChange={handleRotationChange}
          min={-180}
          max={180}
          sx={{
            color: COLORS.accent.primary,
            flex: 1,
          }}
        />
        <Typography variant="body2" sx={{ color: COLORS.text.secondary, minWidth: 40 }}>
          {rotation}°
        </Typography>
      </Box>
    </Box>
  )
}

