// Central color system for the entire application
// All color values should be sourced from this file

export const COLORS = {
  // Background colors
  background: {
    primary: '#0A0A0F',
    secondary: '#12121A',
    tertiary: '#1A1A24',
    elevated: '#22222E',
    overlay: 'rgba(10, 10, 15, 0.8)',
  },

  // Accent colors - Teal/Mint theme
  accent: {
    primary: '#00D4AA',
    secondary: '#00B894',
    tertiary: '#00A383',
    glow: 'rgba(0, 212, 170, 0.15)',
    light: 'rgba(0, 212, 170, 0.1)',
  },

  // Secondary accent - Coral
  coral: {
    primary: '#FF6B6B',
    secondary: '#FF8E8E',
    glow: 'rgba(255, 107, 107, 0.15)',
  },

  // Tertiary accent - Amber
  amber: {
    primary: '#FFB347',
    secondary: '#FFCC80',
    glow: 'rgba(255, 179, 71, 0.15)',
  },

  // Text colors
  text: {
    primary: '#FFFFFF',
    secondary: '#A0A0B0',
    tertiary: '#6B6B7B',
    muted: '#45455A',
    inverse: '#0A0A0F',
  },

  // Border colors
  border: {
    primary: '#2A2A3A',
    secondary: '#3A3A4A',
    accent: 'rgba(0, 212, 170, 0.3)',
    subtle: 'rgba(255, 255, 255, 0.05)',
  },

  // Status colors
  status: {
    success: '#00D4AA',
    warning: '#FFB347',
    error: '#FF6B6B',
    info: '#5B9FFF',
  },

  // Gradient presets for canvas backgrounds
  gradients: {
    ocean: ['#0077B6', '#00B4D8', '#90E0EF'],
    sunset: ['#FF6B6B', '#FF8E8E', '#FFB347'],
    forest: ['#00A383', '#00D4AA', '#7DCEA0'],
    midnight: ['#0A0A0F', '#1A1A24', '#2A2A3A'],
    aurora: ['#00D4AA', '#5B9FFF', '#A78BFA'],
    fire: ['#FF6B6B', '#FFB347', '#FFCC80'],
    lavender: ['#A78BFA', '#C4B5FD', '#E9D5FF'],
    rose: ['#FF6B6B', '#FCA5A5', '#FEE2E2'],
  },

  // Solid background presets
  solids: {
    white: '#FFFFFF',
    black: '#000000',
    slate: '#1E293B',
    zinc: '#27272A',
    stone: '#292524',
    neutral: '#262626',
  },
} as const

// MUI Theme palette mapping
export const MUI_PALETTE = {
  mode: 'dark' as const,
  primary: {
    main: COLORS.accent.primary,
    light: COLORS.accent.secondary,
    dark: COLORS.accent.tertiary,
  },
  secondary: {
    main: COLORS.coral.primary,
    light: COLORS.coral.secondary,
  },
  background: {
    default: COLORS.background.primary,
    paper: COLORS.background.secondary,
  },
  text: {
    primary: COLORS.text.primary,
    secondary: COLORS.text.secondary,
  },
  divider: COLORS.border.primary,
  error: {
    main: COLORS.status.error,
  },
  warning: {
    main: COLORS.status.warning,
  },
  success: {
    main: COLORS.status.success,
  },
  info: {
    main: COLORS.status.info,
  },
}
