'use client'

import { Box, Typography } from '@mui/material'
import {
  Square,
  Circle,
  Star,
  Heart,
  Triangle,
  Hexagon,
  Badge,
  Sparkles,
  Zap,
  CheckCircle,
  Award,
  Crown,
} from 'lucide-react'
import { COLORS } from '@/constants/colors'
import { useCanvasStore } from '@/store/canvasStore'

const shapes = [
  { icon: Square, name: 'Rectangle', type: 'rectangle', color: '#8B5CF6' },
  { icon: Circle, name: 'Circle', type: 'circle', color: '#EC4899' },
  { icon: Star, name: 'Star', type: 'star', color: '#06B6D4' },
  { icon: Heart, name: 'Heart', type: 'heart', color: '#EC4899' },
  { icon: Triangle, name: 'Triangle', type: 'triangle', color: '#A78BFA' },
  { icon: Hexagon, name: 'Hexagon', type: 'rectangle', color: '#3B82F6' },
]

const badges = [
  { icon: Badge, name: 'NEW', color: COLORS.accent.primary },
  { icon: Sparkles, name: 'HOT', color: '#06B6D4' },
  { icon: Zap, name: 'FAST', color: '#EC4899' },
  { icon: CheckCircle, name: 'FREE', color: '#22C55E' },
  { icon: Award, name: 'BEST', color: '#A78BFA' },
  { icon: Crown, name: 'PRO', color: '#06B6D4' },
]

const appIcons = [
  { emoji: '📱', name: 'Mobile' },
  { emoji: '💰', name: 'Money' },
  { emoji: '🔒', name: 'Security' },
  { emoji: '📊', name: 'Analytics' },
  { emoji: '🎯', name: 'Target' },
  { emoji: '🚀', name: 'Rocket' },
  { emoji: '⭐', name: 'Star' },
  { emoji: '💡', name: 'Idea' },
  { emoji: '🎨', name: 'Design' },
  { emoji: '📈', name: 'Growth' },
  { emoji: '🔔', name: 'Notification' },
  { emoji: '💬', name: 'Chat' },
  { emoji: '❤️', name: 'Heart' },
  { emoji: '✅', name: 'Check' },
  { emoji: '🔥', name: 'Fire' },
  { emoji: '💎', name: 'Diamond' },
]

export default function ElementsTab() {
  const addShape = useCanvasStore((state) => state.addShape)
  const addBadge = useCanvasStore((state) => state.addBadge)
  const addEmoji = useCanvasStore((state) => state.addEmoji)
  
  return (
    <Box>
      {/* Shapes */}
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
        Shapes
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 1.5,
          mb: 4,
        }}
      >
        {shapes.map((shape) => (
          <Box
            key={shape.name}
            onClick={() => addShape(shape.type, shape.color)}
            sx={{
              aspectRatio: '1',
              borderRadius: 2,
              border: `1px solid ${COLORS.border.primary}`,
              bgcolor: COLORS.background.tertiary,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 0.5,
              cursor: 'pointer',
              color: shape.color,
              transition: 'all 0.2s ease',
              '&:hover': {
                borderColor: shape.color,
                bgcolor: `${shape.color}15`,
                transform: 'scale(1.05)',
              },
              '&:active': {
                transform: 'scale(0.95)',
              },
            }}
          >
            <shape.icon size={24} />
            <Typography sx={{ fontSize: '0.6rem', color: COLORS.text.tertiary }}>
              {shape.name}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Badges */}
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
        Badges & Labels
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 1.5,
          mb: 4,
        }}
      >
        {badges.map((badge) => (
          <Box
            key={badge.name}
            onClick={() => addBadge(badge.name, badge.color)}
            sx={{
              aspectRatio: '1',
              borderRadius: 2,
              border: `1px solid ${COLORS.border.primary}`,
              bgcolor: COLORS.background.tertiary,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 0.5,
              cursor: 'pointer',
              color: badge.color,
              transition: 'all 0.2s ease',
              '&:hover': {
                borderColor: badge.color,
                bgcolor: `${badge.color}15`,
                transform: 'scale(1.05)',
              },
              '&:active': {
                transform: 'scale(0.95)',
              },
            }}
          >
            <badge.icon size={20} />
            <Typography sx={{ fontSize: '0.6rem', fontWeight: 600, color: badge.color }}>
              {badge.name}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* App Icons / Emojis */}
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
        Emojis & Icons
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 1,
        }}
      >
        {appIcons.map((icon) => (
          <Box
            key={icon.name}
            onClick={() => addEmoji(icon.emoji)}
            sx={{
              aspectRatio: '1',
              borderRadius: 1.5,
              border: `1px solid ${COLORS.border.primary}`,
              bgcolor: COLORS.background.tertiary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '1.5rem',
              transition: 'all 0.2s ease',
              '&:hover': {
                borderColor: COLORS.accent.primary,
                bgcolor: COLORS.background.elevated,
                transform: 'scale(1.1)',
              },
              '&:active': {
                transform: 'scale(0.9)',
              },
            }}
            title={icon.name}
          >
            {icon.emoji}
          </Box>
        ))}
      </Box>
    </Box>
  )
}
