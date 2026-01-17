'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Box } from '@mui/material'
import { COLORS } from '@/constants/colors'
import { useEditorStore } from '@/store/editorStore'
import EditorHeader from '@/components/editor/EditorHeader'
import EditorSidebar from '@/components/editor/EditorSidebar'
import EditorCanvas from '@/components/editor/EditorCanvas'
import EditorToolbar from '@/components/editor/EditorToolbar'
import PropertyPanel from '@/components/editor/PropertyPanel'
import ScreensPanel from '@/components/editor/ScreensPanel'
import ExportModal from '@/components/editor/ExportModal'
import PreviewModal from '@/components/editor/PreviewModal'

export default function EditorPage() {
  const router = useRouter()
  const project = useEditorStore((state) => state.project)

  useEffect(() => {
    // Redirect to home if no project is created
    if (!project) {
      router.push('/')
    }
  }, [project, router])

  if (!project) {
    return null
  }

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: COLORS.background.primary,
        overflow: 'hidden',
      }}
    >
      {/* Top Header */}
      <EditorHeader />

      {/* Main Editor Area */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          overflow: 'hidden',
        }}
      >
        {/* Left Sidebar - Tools & Elements */}
        <EditorSidebar />

        {/* Center - Canvas Area */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Toolbar */}
          <EditorToolbar />

          {/* Canvas */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              position: 'relative',
              bgcolor: COLORS.background.secondary,
              overflow: 'hidden',
              minHeight: 0, // Important for flex children to shrink
            }}
          >
            <EditorCanvas />
          </Box>

          {/* Bottom - Screen Thumbnails - Always visible */}
          <Box sx={{ flexShrink: 0 }}>
            <ScreensPanel />
          </Box>
        </Box>

        {/* Right Sidebar - Properties */}
        <PropertyPanel />
      </Box>

      {/* Modals */}
      <ExportModal />
      <PreviewModal />
    </Box>
  )
}

