'use client'

import { Box, Typography, Button } from '@mui/material'
import { Type, AlignLeft, AlignCenter, AlignRight } from 'lucide-react'
import { COLORS } from '@/constants/colors'
import { useCanvasStore } from '@/store/canvasStore'

const textPresets = [
  {
    id: 'headline',
    name: 'Headline',
    preview: 'Your App Title',
    fontSize: '24px',
    fontWeight: 700,
    fontFamily: 'Clash Display',
  },
  {
    id: 'subheadline',
    name: 'Subheadline',
    preview: 'Describe your feature',
    fontSize: '16px',
    fontWeight: 500,
    fontFamily: 'Satoshi',
  },
  {
    id: 'body',
    name: 'Body Text',
    preview: 'Add detailed description here',
    fontSize: '14px',
    fontWeight: 400,
    fontFamily: 'Satoshi',
  },
  {
    id: 'caption',
    name: 'Caption',
    preview: 'Small caption text',
    fontSize: '12px',
    fontWeight: 400,
    fontFamily: 'Satoshi',
  },
]

const fontOptions = [
  { name: 'Clash Display', family: 'Clash Display' },
  { name: 'Satoshi', family: 'Satoshi' },
  { name: 'Cabinet Grotesk', family: 'Cabinet Grotesk' },
  { name: 'JetBrains Mono', family: 'JetBrains Mono' },
]

export default function TextTab() {
  const addText = useCanvasStore((state) => state.addText)
  
  const handleAddText = () => {
    addText('Your Text Here', {
      fontSize: 72,
      fontFamily: 'Clash Display',
      fontWeight: '700',
    })
  }
  
  const handleAddPreset = (preset: typeof textPresets[0]) => {
    addText(preset.preview, {
      fontSize: parseInt(preset.fontSize),
      fontFamily: preset.fontFamily,
      fontWeight: preset.fontWeight.toString(),
    })
  }
  
  return (
    <Box>
      {/* Add Text Button */}
      <Button
        variant="contained"
        fullWidth
        startIcon={<Type size={18} />}
        onClick={handleAddText}
        sx={{
          mb: 3,
          py: 1.5,
          bgcolor: COLORS.accent.primary,
          color: COLORS.background.primary,
          '&:hover': {
            bgcolor: COLORS.accent.secondary,
          },
        }}
      >
        Add Text
      </Button>

      {/* Text Presets */}
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
        Text Presets
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 4 }}>
        {textPresets.map((preset) => (
          <Box
            key={preset.id}
            onClick={() => handleAddPreset(preset)}
            sx={{
              p: 2,
              borderRadius: 2,
              border: `1px solid ${COLORS.border.primary}`,
              bgcolor: COLORS.background.tertiary,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              '&:hover': {
                borderColor: COLORS.accent.primary,
                bgcolor: COLORS.background.elevated,
                transform: 'scale(1.02)',
              },
              '&:active': {
                transform: 'scale(0.98)',
              },
            }}
          >
            <Typography
              sx={{
                fontSize: preset.fontSize,
                fontWeight: preset.fontWeight,
                fontFamily: preset.fontFamily,
                color: COLORS.text.primary,
                mb: 0.5,
              }}
            >
              {preset.preview}
            </Typography>
            <Typography variant="caption" sx={{ color: COLORS.text.tertiary }}>
              {preset.name} · {preset.fontFamily}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Font Families */}
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
        Font Families
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {fontOptions.map((font) => (
          <Box
            key={font.name}
            sx={{
              p: 1.5,
              borderRadius: 1.5,
              border: `1px solid ${COLORS.border.primary}`,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              '&:hover': {
                borderColor: COLORS.accent.primary,
                bgcolor: COLORS.background.tertiary,
              },
            }}
          >
            <Typography
              sx={{
                fontFamily: font.family,
                fontWeight: 500,
                color: COLORS.text.primary,
              }}
            >
              {font.name}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Text Alignment */}
      <Typography
        variant="overline"
        sx={{
          color: COLORS.text.tertiary,
          fontSize: '0.7rem',
          letterSpacing: 1,
          mb: 1.5,
          mt: 4,
          display: 'block',
        }}
      >
        Alignment
      </Typography>

      <Box sx={{ display: 'flex', gap: 1 }}>
        {[
          { icon: AlignLeft, label: 'Left' },
          { icon: AlignCenter, label: 'Center' },
          { icon: AlignRight, label: 'Right' },
        ].map((align) => (
          <Box
            key={align.label}
            sx={{
              flex: 1,
              p: 1.5,
              borderRadius: 1.5,
              border: `1px solid ${COLORS.border.primary}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: COLORS.text.secondary,
              transition: 'all 0.2s ease',
              '&:hover': {
                borderColor: COLORS.accent.primary,
                color: COLORS.accent.primary,
                bgcolor: COLORS.accent.light,
              },
            }}
          >
            <align.icon size={18} />
          </Box>
        ))}
      </Box>
    </Box>
  )
}

