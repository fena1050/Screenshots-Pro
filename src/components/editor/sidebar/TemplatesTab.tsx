'use client'

import { useState } from 'react'
import { Box, Typography, Chip } from '@mui/material'
import { Check } from 'lucide-react'
import { COLORS } from '@/constants/colors'
import { useCanvasStore } from '@/store/canvasStore'

const categories = ['All', 'Minimal', 'Bold', 'Gradient', 'Tech', 'Lifestyle']

const templates = [
  {
    id: '1',
    name: 'Clean Minimal',
    category: 'Minimal',
    preview: 'linear-gradient(180deg, #1A1A24 0%, #0A0A0F 100%)',
    deviceColor: '#2C2C2E',
  },
  {
    id: '2',
    name: 'Ocean Gradient',
    category: 'Gradient',
    preview: 'linear-gradient(135deg, #0077B6 0%, #00B4D8 100%)',
    deviceColor: '#1C1C1E',
  },
  {
    id: '3',
    name: 'Sunset Vibes',
    category: 'Gradient',
    preview: 'linear-gradient(135deg, #EC4899 0%, #06B6D4 100%)',
    deviceColor: '#F5F5F7',
  },
  {
    id: '4',
    name: 'Forest Fresh',
    category: 'Gradient',
    preview: 'linear-gradient(135deg, #6D28D9 0%, #8B5CF6 100%)',
    deviceColor: '#1C1C1E',
  },
  {
    id: '5',
    name: 'Bold Black',
    category: 'Bold',
    preview: '#000000',
    deviceColor: '#F5F5F7',
  },
  {
    id: '6',
    name: 'Pure White',
    category: 'Minimal',
    preview: '#FFFFFF',
    deviceColor: '#1C1C1E',
  },
  {
    id: '7',
    name: 'Tech Purple',
    category: 'Tech',
    preview: 'linear-gradient(135deg, #A78BFA 0%, #7C3AED 100%)',
    deviceColor: '#1C1C1E',
  },
  {
    id: '8',
    name: 'Aurora',
    category: 'Gradient',
    preview: 'linear-gradient(135deg, #8B5CF6 0%, #5B9FFF 50%, #A78BFA 100%)',
    deviceColor: '#F5F5F7',
  },
]

export default function TemplatesTab() {
  const setBackground = useCanvasStore((state) => state.setBackground)
  const addDevice = useCanvasStore((state) => state.addDevice)
  const currentDeviceId = useCanvasStore((state) => state.currentDeviceId)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState('All')
  
  const handleApplyTemplate = (template: typeof templates[0]) => {
    // Apply background
    setBackground(template.preview)
    
    // Add a random device if none exists, using the template's suggested device color
    if (!currentDeviceId) {
      // Use the template's device color hint
      const frameColor = template.deviceColor === '#F5F5F7' ? 'white' as const : 'black' as const
      addDevice('iphone-15-pro-max', frameColor)
    }
    
    setSelectedTemplate(template.id)
  }
  
  const filteredTemplates = activeCategory === 'All' 
    ? templates 
    : templates.filter(t => t.category === activeCategory)
  
  return (
    <Box>
      {/* Category Filter */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
        {categories.map((category) => (
          <Chip
            key={category}
            label={category}
            size="small"
            clickable
            onClick={() => setActiveCategory(category)}
            sx={{
              bgcolor: activeCategory === category ? COLORS.accent.light : COLORS.background.tertiary,
              color: activeCategory === category ? COLORS.accent.primary : COLORS.text.secondary,
              border: `1px solid ${activeCategory === category ? COLORS.accent.primary : COLORS.border.primary}`,
              '&:hover': {
                bgcolor: COLORS.accent.light,
                color: COLORS.accent.primary,
              },
            }}
          />
        ))}
      </Box>

      {/* Template Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 2,
        }}
      >
        {filteredTemplates.map((template) => {
          const isSelected = selectedTemplate === template.id
          return (
          <Box
            key={template.id}
            onClick={() => handleApplyTemplate(template)}
            sx={{
              cursor: 'pointer',
              borderRadius: 2,
              overflow: 'hidden',
              border: `2px solid ${isSelected ? COLORS.accent.primary : COLORS.border.primary}`,
              transition: 'all 0.2s ease',
              position: 'relative',
              '&:hover': {
                borderColor: COLORS.accent.primary,
                transform: 'scale(1.02)',
                boxShadow: `0 4px 20px ${COLORS.accent.glow}`,
              },
            }}
          >
            {/* Preview - Realistic App Store Screenshot Look */}
            <Box
              sx={{
                height: 180,
                background: template.preview,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                pt: 1.5,
                overflow: 'hidden',
              }}
            >
              {/* Headline Text */}
              <Box
                sx={{
                  fontSize: '0.6rem',
                  fontWeight: 700,
                  color: template.preview === '#FFFFFF' ? '#000' : '#FFF',
                  textAlign: 'center',
                  mb: 1,
                  textShadow: template.preview === '#FFFFFF' ? 'none' : '0 1px 3px rgba(0,0,0,0.3)',
                  lineHeight: 1.2,
                }}
              >
                Your App<br />Title Here
              </Box>
              
              {/* Large Device Mockup - Shows actual device frame color */}
              <Box
                sx={{
                  width: 70,
                  height: 130,
                  bgcolor: template.deviceColor,
                  borderRadius: '14px',
                  border: `2px solid ${template.deviceColor === '#F5F5F7' ? '#D1D1D6' : '#3A3A3C'}`,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  p: '3px',
                }}
              >
                {/* Screen - Dark grey for black frame for visibility */}
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    bgcolor: template.deviceColor === '#F5F5F7' ? '#1C1C1E' : '#2C2C2E',
                    borderRadius: '12px',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    overflow: 'hidden',
                  }}
                >
                  {/* Dynamic Island */}
                  <Box
                    sx={{
                      width: 24,
                      height: 7,
                      bgcolor: '#000',
                      borderRadius: 4,
                      mt: 0.5,
                      zIndex: 1,
                    }}
                  />
                  {/* App content preview */}
                  <Box sx={{ 
                    width: '90%', 
                    flex: 1,
                    m: 0.5,
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
                    borderRadius: 1,
                  }} />
                </Box>
              </Box>
            </Box>
            {/* Info */}
            <Box sx={{ p: 1.5, bgcolor: COLORS.background.tertiary }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  color: COLORS.text.primary,
                  fontSize: '0.8rem',
                }}
              >
                {template.name}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: COLORS.text.tertiary }}
              >
                {template.category}
              </Typography>
            </Box>
            
            {/* Selected checkmark */}
            {isSelected && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  bgcolor: COLORS.accent.primary,
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
    </Box>
  )
}

