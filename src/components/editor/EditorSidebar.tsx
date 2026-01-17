'use client'

import { Box, Typography, IconButton, Tooltip } from '@mui/material'
import {
  LayoutTemplate,
  Smartphone,
  Type,
  Image,
  Palette,
  Shapes,
  Upload,
} from 'lucide-react'
import { COLORS } from '@/constants/colors'
import { useEditorStore } from '@/store/editorStore'
import type { SidebarTab } from '@/types/editor'
import TemplatesTab from './sidebar/TemplatesTab'
import DevicesTab from './sidebar/DevicesTab'
import TextTab from './sidebar/TextTab'
import BackgroundsTab from './sidebar/BackgroundsTab'
import ElementsTab from './sidebar/ElementsTab'
import UploadsTab from './sidebar/UploadsTab'

const tabs: { id: SidebarTab; icon: typeof LayoutTemplate; label: string }[] = [
  { id: 'templates', icon: LayoutTemplate, label: 'Templates' },
  { id: 'devices', icon: Smartphone, label: 'Devices' },
  { id: 'text', icon: Type, label: 'Text' },
  { id: 'backgrounds', icon: Palette, label: 'Backgrounds' },
  { id: 'elements', icon: Shapes, label: 'Elements' },
  { id: 'uploads', icon: Upload, label: 'Uploads' },
]

export default function EditorSidebar() {
  const sidebarTab = useEditorStore((state) => state.sidebarTab)
  const setSidebarTab = useEditorStore((state) => state.setSidebarTab)

  const renderTabContent = () => {
    switch (sidebarTab) {
      case 'templates':
        return <TemplatesTab />
      case 'devices':
        return <DevicesTab />
      case 'text':
        return <TextTab />
      case 'backgrounds':
        return <BackgroundsTab />
      case 'elements':
        return <ElementsTab />
      case 'uploads':
        return <UploadsTab />
      default:
        return <TemplatesTab />
    }
  }

  return (
    <Box
      sx={{
        width: 360,
        display: 'flex',
        borderRight: `1px solid ${COLORS.border.primary}`,
        bgcolor: COLORS.background.secondary,
      }}
    >
      {/* Tab Icons */}
      <Box
        sx={{
          width: 64,
          py: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0.5,
          borderRight: `1px solid ${COLORS.border.primary}`,
          bgcolor: COLORS.background.primary,
        }}
      >
        {tabs.map((tab) => {
          const isActive = sidebarTab === tab.id
          return (
            <Tooltip key={tab.id} title={tab.label} placement="right">
              <IconButton
                onClick={() => setSidebarTab(tab.id)}
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  color: isActive ? COLORS.accent.primary : COLORS.text.tertiary,
                  bgcolor: isActive ? COLORS.accent.light : 'transparent',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: isActive ? COLORS.accent.light : COLORS.background.tertiary,
                    color: isActive ? COLORS.accent.primary : COLORS.text.secondary,
                  },
                }}
              >
                <tab.icon size={22} />
              </IconButton>
            </Tooltip>
          )
        })}
      </Box>

      {/* Tab Content */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Tab Header */}
        <Box
          sx={{
            px: 3,
            py: 2,
            borderBottom: `1px solid ${COLORS.border.primary}`,
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              color: COLORS.text.primary,
            }}
          >
            {tabs.find((t) => t.id === sidebarTab)?.label}
          </Typography>
        </Box>

        {/* Tab Content Area */}
        <Box
          sx={{
            flex: 1,
            overflow: 'auto',
            p: 2,
          }}
        >
          {renderTabContent()}
        </Box>
      </Box>
    </Box>
  )
}


