'use client'

import { useState } from 'react'
import { Box, Typography, ToggleButtonGroup, ToggleButton, Tooltip } from '@mui/material'
import { Smartphone, Tablet, Check } from 'lucide-react'
import { COLORS } from '@/constants/colors'
import { useEditorStore } from '@/store/editorStore'
import { useCanvasStore, DEVICE_BASES, type FrameColor } from '@/store/canvasStore'

type Platform = 'ios' | 'android'
type Filter = Platform | 'all'

// Get devices by platform
const getDevicesByPlatform = (platform: Filter) => {
  return Object.entries(DEVICE_BASES).filter(([_, device]) => {
    if (platform === 'all') return true
    return device.platform === platform
  }).map(([id, device]) => ({ id, ...device }))
}

export default function DevicesTab() {
  const project = useEditorStore((state) => state.project)
  const addDevice = useCanvasStore((state) => state.addDevice)
  const changeDeviceColor = useCanvasStore((state) => state.changeDeviceColor)
  const currentFrameColor = useCanvasStore((state) => state.currentFrameColor)
  const [filter, setFilter] = useState<Filter>(project?.platform || 'all')
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null)

  const handleFilterChange = (_: React.MouseEvent<HTMLElement>, newFilter: Filter | null) => {
    if (newFilter !== null) {
      setFilter(newFilter)
    }
  }

  const handleColorChange = (color: FrameColor) => {
    changeDeviceColor(color)
  }

  const devices = getDevicesByPlatform(filter)
  
  // Group devices by category
  const iosPhones = devices.filter(d => d.platform === 'ios' && !d.name.includes('iPad'))
  const iosPads = devices.filter(d => d.platform === 'ios' && d.name.includes('iPad'))
  const androidPhones = devices.filter(d => d.platform === 'android')

  const DeviceCard = ({ device }: { device: typeof devices[0] }) => {
    const isSelected = selectedDevice === device.id
    
    // Different visual styles for different device types
    const getDevicePreviewStyle = () => {
      const base = {
        width: 36,
        height: device.name.includes('iPad') ? 50 : 65,
        borderRadius: device.cornerRadius > 45 ? '10px' : device.cornerRadius > 35 ? '8px' : '6px',
        position: 'relative' as const,
        overflow: 'hidden',
      }
      
      return base
    }
    
    const getNotchPreview = () => {
      if (device.notchStyle === 'dynamic-island') {
        return (
          <Box sx={{
            position: 'absolute',
            top: 3,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 16,
            height: 5,
            borderRadius: 3,
            bgcolor: '#000',
          }} />
        )
      }
      if (device.notchStyle === 'notch') {
        return (
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 20,
            height: 6,
            borderRadius: '0 0 6px 6px',
            bgcolor: '#000',
          }} />
        )
      }
      if (device.notchStyle === 'punch-hole') {
        return (
          <Box sx={{
            position: 'absolute',
            top: 4,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 4,
            height: 4,
            borderRadius: '50%',
            bgcolor: '#000',
          }} />
        )
      }
      if (device.notchStyle === 'none' && device.name.includes('iPhone SE')) {
        return (
          <Box sx={{
            position: 'absolute',
            bottom: 3,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 10,
            height: 10,
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.3)',
          }} />
        )
      }
      return null
    }

    return (
      <Box
        onClick={() => {
          addDevice(device.id, currentFrameColor)
          setSelectedDevice(device.id)
        }}
        sx={{
          p: 1.5,
          borderRadius: 2,
          border: `1px solid ${isSelected ? COLORS.accent.primary : COLORS.border.primary}`,
          bgcolor: isSelected ? COLORS.accent.light : COLORS.background.tertiary,
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          position: 'relative',
          '&:hover': {
            borderColor: COLORS.accent.primary,
            bgcolor: isSelected ? COLORS.accent.light : COLORS.background.elevated,
          },
        }}
      >
        {/* Device Preview - Shows actual device shape */}
        <Box
          sx={{
            ...getDevicePreviewStyle(),
            bgcolor: currentFrameColor === 'black' ? '#1C1C1E' : '#F5F5F7',
            border: `2px solid ${currentFrameColor === 'black' ? '#3A3A3C' : '#D1D1D6'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {/* Screen - Dark grey for black frame for visibility */}
          <Box sx={{
            width: '85%',
            height: '90%',
            bgcolor: currentFrameColor === 'black' ? '#2C2C2E' : '#1C1C1E',
            borderRadius: device.cornerRadius > 45 ? '8px' : device.cornerRadius > 35 ? '6px' : '4px',
            position: 'relative',
          }}>
            {getNotchPreview()}
          </Box>
        </Box>

        {/* Device Info */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="body2"
            sx={{ 
              fontWeight: 600, 
              color: COLORS.text.primary, 
              fontSize: '0.8rem',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {device.name}
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: COLORS.text.tertiary, display: 'block', fontSize: '0.7rem' }}
          >
            {device.width} × {device.height}
          </Typography>
        </Box>
        
        {/* Selected checkmark */}
        {isSelected && (
          <Box
            sx={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              bgcolor: COLORS.accent.primary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Check size={12} color={COLORS.background.primary} />
          </Box>
        )}
      </Box>
    )
  }

  const DeviceSection = ({ title, devices }: { title: string; devices: typeof iosPhones }) => {
    if (devices.length === 0) return null
    
    return (
      <Box sx={{ mb: 2 }}>
        <Typography 
          variant="caption" 
          sx={{ 
            color: COLORS.text.tertiary, 
            fontWeight: 600, 
            textTransform: 'uppercase',
            letterSpacing: 1,
            mb: 1,
            display: 'block',
          }}
        >
          {title}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {devices.map((device) => (
            <DeviceCard key={device.id} device={device} />
          ))}
        </Box>
      </Box>
    )
  }

  return (
    <Box>
      {/* Color Selection */}
      <Box sx={{ mb: 3 }}>
        <Typography 
          variant="caption" 
          sx={{ 
            color: COLORS.text.secondary, 
            fontWeight: 600,
            mb: 1.5,
            display: 'block',
          }}
        >
          Frame Color
        </Typography>
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Tooltip title="Black Frame" arrow>
            <Box
              onClick={() => handleColorChange('black')}
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                bgcolor: '#1C1C1E',
                border: `3px solid ${currentFrameColor === 'black' ? COLORS.accent.primary : '#3A3A3C'}`,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '&:hover': {
                  borderColor: COLORS.accent.primary,
                  transform: 'scale(1.05)',
                },
              }}
            >
              {currentFrameColor === 'black' && <Check size={18} color={COLORS.accent.primary} />}
            </Box>
          </Tooltip>
          <Tooltip title="White Frame" arrow>
            <Box
              onClick={() => handleColorChange('white')}
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                bgcolor: '#F5F5F7',
                border: `3px solid ${currentFrameColor === 'white' ? COLORS.accent.primary : '#D1D1D6'}`,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '&:hover': {
                  borderColor: COLORS.accent.primary,
                  transform: 'scale(1.05)',
                },
              }}
            >
              {currentFrameColor === 'white' && <Check size={18} color={COLORS.accent.primary} />}
            </Box>
          </Tooltip>
        </Box>
      </Box>

      {/* Platform Filter */}
      <ToggleButtonGroup
        value={filter}
        exclusive
        onChange={handleFilterChange}
        size="small"
        fullWidth
        sx={{
          mb: 3,
          '& .MuiToggleButton-root': {
            py: 1,
            border: `1px solid ${COLORS.border.primary}`,
            color: COLORS.text.secondary,
            fontSize: '0.75rem',
            '&.Mui-selected': {
              bgcolor: COLORS.accent.light,
              color: COLORS.accent.primary,
              borderColor: COLORS.accent.primary,
            },
          },
        }}
      >
        <ToggleButton value="all">All</ToggleButton>
        <ToggleButton value="ios">
          <Smartphone size={14} style={{ marginRight: 4 }} /> iOS
        </ToggleButton>
        <ToggleButton value="android">
          <Tablet size={14} style={{ marginRight: 4 }} /> Android
        </ToggleButton>
      </ToggleButtonGroup>

      {/* Devices List by Category */}
      {filter === 'all' || filter === 'ios' ? (
        <>
          <DeviceSection title="iPhone" devices={iosPhones} />
          <DeviceSection title="iPad" devices={iosPads} />
        </>
      ) : null}
      
      {filter === 'all' || filter === 'android' ? (
        <DeviceSection title="Android" devices={androidPhones} />
      ) : null}
    </Box>
  )
}
