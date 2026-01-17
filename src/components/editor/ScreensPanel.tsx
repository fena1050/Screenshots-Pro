'use client'

import { Box, Typography, IconButton, Tooltip } from '@mui/material'
import { Plus, Copy, Trash2 } from 'lucide-react'
import { COLORS } from '@/constants/colors'
import { useEditorStore } from '@/store/editorStore'

export default function ScreensPanel() {
  const project = useEditorStore((state) => state.project)
  const currentScreenIndex = useEditorStore((state) => state.currentScreenIndex)
  const setCurrentScreen = useEditorStore((state) => state.setCurrentScreen)
  const addScreen = useEditorStore((state) => state.addScreen)
  const removeScreen = useEditorStore((state) => state.removeScreen)
  const duplicateScreen = useEditorStore((state) => state.duplicateScreen)

  if (!project) return null

  const canAddMore = project.screens.length < 10
  const canDelete = project.screens.length > 1

  return (
    <Box
      sx={{
        height: 150,
        minHeight: 150,
        borderTop: `2px solid ${COLORS.accent.primary}`,
        bgcolor: COLORS.background.secondary,
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: 2,
          py: 1.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: `1px solid ${COLORS.border.primary}`,
          bgcolor: COLORS.background.tertiary,
        }}
      >
        <Typography variant="body2" sx={{ color: COLORS.text.primary, fontWeight: 600 }}>
          📱 Screens ({project.screens.length}/10)
        </Typography>
        <Tooltip title={canAddMore ? 'Add New Screen' : 'Maximum 10 screens'}>
          <span>
            <IconButton
              size="small"
              onClick={addScreen}
              disabled={!canAddMore}
              sx={{
                color: canAddMore ? COLORS.background.primary : COLORS.text.muted,
                bgcolor: canAddMore ? COLORS.accent.primary : 'transparent',
                '&:hover': {
                  bgcolor: canAddMore ? COLORS.accent.secondary : 'transparent',
                },
              }}
            >
              <Plus size={18} />
            </IconButton>
          </span>
        </Tooltip>
      </Box>

      {/* Screens List */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          px: 2,
          overflowX: 'auto',
          '&::-webkit-scrollbar': {
            height: 6,
          },
          '&::-webkit-scrollbar-thumb': {
            bgcolor: COLORS.border.secondary,
            borderRadius: 3,
          },
        }}
      >
        {project.screens.map((screen, index) => {
          const isActive = index === currentScreenIndex
          return (
            <Box
              key={screen.id}
              sx={{
                position: 'relative',
                flexShrink: 0,
                cursor: 'pointer',
                '&:hover .actions': {
                  opacity: 1,
                },
              }}
              onClick={() => setCurrentScreen(index)}
            >
              {/* Thumbnail */}
              <Box
                sx={{
                  width: 60,
                  height: 90,
                  borderRadius: 1.5,
                  bgcolor: COLORS.background.elevated,
                  border: `2px solid ${isActive ? COLORS.accent.primary : COLORS.border.primary}`,
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  boxShadow: isActive ? `0 0 20px ${COLORS.accent.glow}` : 'none',
                  '&:hover': {
                    borderColor: COLORS.accent.primary,
                  },
                }}
              >
                {screen.thumbnail ? (
                  <Box
                    component="img"
                    src={screen.thumbnail}
                    alt={`Screen ${index + 1}`}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: '80%',
                      height: '80%',
                      borderRadius: 1,
                      background: `linear-gradient(135deg, ${COLORS.accent.light} 0%, ${COLORS.background.tertiary} 100%)`,
                    }}
                  />
                )}
              </Box>

              {/* Screen Number */}
              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  textAlign: 'center',
                  mt: 0.5,
                  color: isActive ? COLORS.accent.primary : COLORS.text.tertiary,
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                {index + 1}
              </Typography>

              {/* Hover Actions */}
              <Box
                className="actions"
                sx={{
                  position: 'absolute',
                  top: -8,
                  right: -8,
                  display: 'flex',
                  gap: 0.5,
                  opacity: 0,
                  transition: 'opacity 0.2s ease',
                }}
              >
                <Tooltip title="Duplicate">
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation()
                      duplicateScreen(index)
                    }}
                    sx={{
                      width: 24,
                      height: 24,
                      bgcolor: COLORS.background.elevated,
                      border: `1px solid ${COLORS.border.primary}`,
                      color: COLORS.text.secondary,
                      '&:hover': {
                        bgcolor: COLORS.accent.light,
                        color: COLORS.accent.primary,
                      },
                    }}
                  >
                    <Copy size={12} />
                  </IconButton>
                </Tooltip>
                {canDelete && (
                  <Tooltip title="Delete">
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation()
                        removeScreen(index)
                      }}
                      sx={{
                        width: 24,
                        height: 24,
                        bgcolor: COLORS.background.elevated,
                        border: `1px solid ${COLORS.border.primary}`,
                        color: COLORS.text.secondary,
                        '&:hover': {
                          bgcolor: COLORS.coral.glow,
                          color: COLORS.coral.primary,
                          borderColor: COLORS.coral.primary,
                        },
                      }}
                    >
                      <Trash2 size={12} />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
            </Box>
          )
        })}

        {/* Add Screen Placeholder */}
        {canAddMore && (
          <Box
            onClick={addScreen}
            sx={{
              width: 60,
              height: 90,
              borderRadius: 1.5,
              border: `2px dashed ${COLORS.border.secondary}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'all 0.2s ease',
              '&:hover': {
                borderColor: COLORS.accent.primary,
                bgcolor: COLORS.accent.light,
              },
            }}
          >
            <Plus size={20} color={COLORS.text.tertiary} />
          </Box>
        )}
      </Box>
    </Box>
  )
}

