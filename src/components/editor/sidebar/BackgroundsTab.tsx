'use client'

import { useState, useRef } from 'react'
import { Box, Typography } from '@mui/material'
import { Check, Pipette } from 'lucide-react'
import { COLORS } from '@/constants/colors'
import { useCanvasStore } from '@/store/canvasStore'

const gradients = [
  { name: 'Ocean', value: 'linear-gradient(135deg, #0077B6 0%, #00B4D8 100%)' },
  { name: 'Sunset', value: 'linear-gradient(135deg, #EC4899 0%, #06B6D4 100%)' },
  { name: 'Forest', value: 'linear-gradient(135deg, #6D28D9 0%, #8B5CF6 100%)' },
  { name: 'Aurora', value: 'linear-gradient(135deg, #8B5CF6 0%, #5B9FFF 50%, #A78BFA 100%)' },
  { name: 'Fire', value: 'linear-gradient(135deg, #EC4899 0%, #06B6D4 50%, #FFCC80 100%)' },
  { name: 'Lavender', value: 'linear-gradient(135deg, #A78BFA 0%, #C4B5FD 100%)' },
  { name: 'Rose', value: 'linear-gradient(135deg, #EC4899 0%, #FCA5A5 100%)' },
  { name: 'Midnight', value: 'linear-gradient(180deg, #0A0A0F 0%, #1A1A24 50%, #2A2A3A 100%)' },
  { name: 'Sky', value: 'linear-gradient(180deg, #87CEEB 0%, #00B4D8 100%)' },
  { name: 'Peach', value: 'linear-gradient(135deg, #FFECD2 0%, #FCB69F 100%)' },
  { name: 'Grape', value: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)' },
  { name: 'Emerald', value: 'linear-gradient(135deg, #059669 0%, #10B981 100%)' },
]

const solidColors = [
  { name: 'White', value: '#FFFFFF' },
  { name: 'Black', value: '#000000' },
  { name: 'Dark', value: '#0A0A0F' },
  { name: 'Slate', value: '#1E293B' },
  { name: 'Zinc', value: '#27272A' },
  { name: 'Coral', value: '#EC4899' },
  { name: 'Teal', value: '#8B5CF6' },
  { name: 'Amber', value: '#06B6D4' },
  { name: 'Blue', value: '#3B82F6' },
  { name: 'Purple', value: '#A78BFA' },
  { name: 'Pink', value: '#EC4899' },
  { name: 'Green', value: '#22C55E' },
]

export default function BackgroundsTab() {
  const setBackground = useCanvasStore((state) => state.setBackground)
  const [selectedBg, setSelectedBg] = useState<string | null>(null)
  const [customColor, setCustomColor] = useState('#3B82F6')
  const colorInputRef = useRef<HTMLInputElement>(null)
  
  const handleSelectGradient = (gradient: { name: string; value: string }) => {
    setBackground(gradient.value)
    setSelectedBg(gradient.value)
  }
  
  const handleSelectSolid = (color: { name: string; value: string }) => {
    setBackground(color.value)
    setSelectedBg(color.value)
  }
  
  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value
    setCustomColor(color)
    setBackground(color)
    setSelectedBg(color)
  }
  
  const openColorPicker = () => {
    colorInputRef.current?.click()
  }
  
  return (
    <Box>
      {/* Gradients */}
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
        Gradients
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 1.5,
          mb: 4,
        }}
      >
        {gradients.map((gradient) => {
          const isSelected = selectedBg === gradient.value
          return (
          <Box
            key={gradient.name}
            onClick={() => handleSelectGradient(gradient)}
            sx={{
              aspectRatio: '1',
              borderRadius: 2,
              background: gradient.value,
              cursor: 'pointer',
              border: `2px solid ${isSelected ? COLORS.accent.primary : 'transparent'}`,
              transition: 'all 0.2s ease',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '&:hover': {
                borderColor: COLORS.accent.primary,
                transform: 'scale(1.05)',
                boxShadow: `0 4px 20px ${COLORS.accent.glow}`,
              },
            }}
            title={gradient.name}
          >
            {isSelected && (
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  bgcolor: 'rgba(255,255,255,0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Check size={14} color={COLORS.background.primary} />
              </Box>
            )}
          </Box>
        )})}
      </Box>

      {/* Solid Colors */}
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
        Solid Colors
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 1,
          mb: 4,
        }}
      >
        {solidColors.map((color) => {
          const isSelected = selectedBg === color.value
          return (
          <Box
            key={color.name}
            onClick={() => handleSelectSolid(color)}
            sx={{
              aspectRatio: '1',
              borderRadius: 1.5,
              bgcolor: color.value,
              cursor: 'pointer',
              border: `2px solid ${isSelected ? COLORS.accent.primary : color.value === '#FFFFFF' ? COLORS.border.primary : 'transparent'}`,
              transition: 'all 0.2s ease',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '&:hover': {
                borderColor: COLORS.accent.primary,
                transform: 'scale(1.1)',
              },
            }}
            title={color.name}
          >
            {isSelected && (
              <Check size={14} color={color.value === '#FFFFFF' || color.value === '#FFCC80' ? COLORS.background.primary : '#FFFFFF'} />
            )}
          </Box>
        )})}
      </Box>

      {/* Custom Color Picker */}
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
        Custom Color
      </Typography>

      <Box
        onClick={openColorPicker}
        sx={{
          p: 2,
          borderRadius: 2,
          border: `1px solid ${COLORS.border.secondary}`,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          '&:hover': {
            borderColor: COLORS.accent.primary,
            bgcolor: COLORS.background.tertiary,
          },
        }}
      >
        {/* Color Preview */}
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 1.5,
            bgcolor: customColor,
            border: `2px solid ${COLORS.border.primary}`,
            flexShrink: 0,
          }}
        />
        
        {/* Color Info */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" sx={{ color: COLORS.text.primary, fontWeight: 500 }}>
            Pick a Color
          </Typography>
          <Typography variant="caption" sx={{ color: COLORS.text.tertiary }}>
            {customColor.toUpperCase()}
          </Typography>
        </Box>
        
        {/* Picker Icon */}
        <Pipette size={20} color={COLORS.text.tertiary} />
        
        {/* Hidden Color Input */}
        <input
          ref={colorInputRef}
          type="color"
          value={customColor}
          onChange={handleCustomColorChange}
          style={{
            position: 'absolute',
            opacity: 0,
            width: 0,
            height: 0,
          }}
        />
      </Box>
    </Box>
  )
}
