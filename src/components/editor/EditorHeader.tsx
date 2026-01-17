'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Box,
  Typography,
  Button,
  IconButton,
  Tooltip,
  TextField,
  CircularProgress,
} from '@mui/material'
import {
  Sparkles,
  ArrowLeft,
  Undo2,
  Redo2,
  Download,
  Eye,
  Edit2,
  Check,
  X,
} from 'lucide-react'
import { COLORS } from '@/constants/colors'
import { useEditorStore } from '@/store/editorStore'
import { useCanvasStore } from '@/store/canvasStore'
import { useCountryDetection } from '@/hooks/useCountryDetection'
import PaymentModal from './PaymentModal'

export default function EditorHeader() {
  const router = useRouter()
  const project = useEditorStore((state) => state.project)
  const updateProjectName = useEditorStore((state) => state.updateProjectName)
  const setPreviewModalOpen = useEditorStore((state) => state.setPreviewModalOpen)
  
  // Country detection for pricing
  const { country, pricing, isLoading: isCountryLoading } = useCountryDetection()
  
  // Payment modal state
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  
  // Canvas-based undo/redo
  const canvasUndo = useCanvasStore((state) => state.undo)
  const canvasRedo = useCanvasStore((state) => state.redo)
  const historyIndex = useCanvasStore((state) => state.historyIndex)
  const historyLength = useCanvasStore((state) => state.history.length)
  
  const canUndo = historyIndex > 0
  const canRedo = historyIndex < historyLength - 1

  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState(project?.name || '')

  const handleSaveName = () => {
    if (editName.trim()) {
      updateProjectName(editName.trim())
    } else {
      setEditName(project?.name || '')
    }
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditName(project?.name || '')
    setIsEditing(false)
  }

  return (
    <Box
      component="header"
      sx={{
        height: 60,
        px: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        bgcolor: COLORS.background.secondary,
        borderBottom: `1px solid ${COLORS.border.primary}`,
      }}
    >
      {/* Left Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Tooltip title="Back to Home">
          <IconButton
            onClick={() => router.push('/')}
            sx={{ color: COLORS.text.secondary }}
          >
            <ArrowLeft size={20} />
          </IconButton>
        </Tooltip>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: 1.5,
              background: `linear-gradient(135deg, ${COLORS.accent.primary}, ${COLORS.accent.tertiary})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Sparkles size={18} color={COLORS.background.primary} />
          </Box>

          {isEditing ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TextField
                size="small"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveName()
                  if (e.key === 'Escape') handleCancelEdit()
                }}
                autoFocus
                sx={{
                  width: 200,
                  '& .MuiOutlinedInput-root': {
                    height: 36,
                    fontSize: '0.9rem',
                  },
                }}
              />
              <IconButton size="small" onClick={handleSaveName} sx={{ color: COLORS.accent.primary }}>
                <Check size={16} />
              </IconButton>
              <IconButton size="small" onClick={handleCancelEdit} sx={{ color: COLORS.text.tertiary }}>
                <X size={16} />
              </IconButton>
            </Box>
          ) : (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                cursor: 'pointer',
                '&:hover .edit-icon': { opacity: 1 },
              }}
              onClick={() => {
                setIsEditing(true)
                setEditName(project?.name || '')
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  color: COLORS.text.primary,
                }}
              >
                {project?.name}
              </Typography>
              <Edit2
                className="edit-icon"
                size={14}
                style={{ opacity: 0, transition: 'opacity 0.2s', color: COLORS.text.tertiary }}
              />
            </Box>
          )}

          <Box
            sx={{
              px: 1.5,
              py: 0.5,
              borderRadius: 1,
              bgcolor: project?.platform === 'ios' ? COLORS.accent.light : COLORS.amber.glow,
              color: project?.platform === 'ios' ? COLORS.accent.primary : COLORS.amber.primary,
              fontSize: '0.75rem',
              fontWeight: 600,
              textTransform: 'uppercase',
            }}
          >
            {project?.platform === 'ios' ? 'iOS' : 'Android'}
          </Box>
        </Box>
      </Box>

      {/* Center Section - History Controls */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Tooltip title={`Undo (Ctrl+Z) - ${historyIndex}/${historyLength}`}>
          <span>
            <IconButton
              onClick={canvasUndo}
              disabled={!canUndo}
              sx={{
                color: canUndo ? COLORS.text.secondary : COLORS.text.muted,
              }}
            >
              <Undo2 size={18} />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title={`Redo (Ctrl+Y) - ${historyIndex}/${historyLength}`}>
          <span>
            <IconButton
              onClick={canvasRedo}
              disabled={!canRedo}
              sx={{
                color: canRedo ? COLORS.text.secondary : COLORS.text.muted,
              }}
            >
              <Redo2 size={18} />
            </IconButton>
          </span>
        </Tooltip>
      </Box>

      {/* Right Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<Eye size={18} />}
          onClick={() => setPreviewModalOpen(true)}
          sx={{
            borderColor: COLORS.border.primary,
            color: COLORS.text.primary,
            '&:hover': {
              borderColor: COLORS.accent.primary,
              bgcolor: 'transparent',
            },
          }}
        >
          Preview
        </Button>
        
        {/* Country Flag */}
        <Tooltip title={isCountryLoading ? 'Detecting location...' : `${pricing.countryName} - ${pricing.displayAmount}`}>
          <Box
            sx={{
              px: 1.5,
              py: 0.75,
              borderRadius: 1.5,
              bgcolor: COLORS.background.tertiary,
              border: `1px solid ${COLORS.border.primary}`,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              cursor: 'default',
            }}
          >
            {isCountryLoading ? (
              <CircularProgress size={16} sx={{ color: COLORS.text.tertiary }} />
            ) : (
              <>
                <Typography sx={{ fontSize: '1.25rem', lineHeight: 1 }}>
                  {pricing.flag}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: COLORS.text.secondary,
                    fontWeight: 500,
                  }}
                >
                  {country?.countryCode || 'XX'}
                </Typography>
              </>
            )}
          </Box>
        </Tooltip>

        <Button
          variant="contained"
          startIcon={<Download size={18} />}
          onClick={() => setIsPaymentModalOpen(true)}
          disabled={isCountryLoading}
          sx={{
            bgcolor: COLORS.accent.primary,
            color: COLORS.background.primary,
            '&:hover': {
              bgcolor: COLORS.accent.secondary,
            },
            minWidth: 150,
          }}
        >
          {isCountryLoading ? (
            'Loading...'
          ) : (
            `Export - ${pricing.displayAmount}`
          )}
        </Button>
      </Box>
      
      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        pricing={pricing}
        countryCode={country?.countryCode || 'IN'}
      />
    </Box>
  )
}

