'use client'

import { useEffect, useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { MUI_PALETTE } from '@/constants/colors'

const darkTheme = createTheme({
  palette: MUI_PALETTE,
  typography: {
    fontFamily: '"Satoshi", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Clash Display", sans-serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"Clash Display", sans-serif',
      fontWeight: 600,
    },
    h3: {
      fontFamily: '"Clash Display", sans-serif',
      fontWeight: 600,
    },
    h4: {
      fontFamily: '"Satoshi", sans-serif',
      fontWeight: 600,
    },
    h5: {
      fontFamily: '"Satoshi", sans-serif',
      fontWeight: 500,
    },
    h6: {
      fontFamily: '"Satoshi", sans-serif',
      fontWeight: 500,
    },
    button: {
      fontFamily: '"Satoshi", sans-serif',
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '10px 20px',
          fontSize: '0.95rem',
        },
        contained: {
          boxShadow: '0 4px 20px rgba(0, 212, 170, 0.25)',
          '&:hover': {
            boxShadow: '0 6px 30px rgba(0, 212, 170, 0.35)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#22222E',
          border: '1px solid #2A2A3A',
          fontSize: '0.85rem',
          padding: '8px 12px',
        },
      },
    },
  },
})

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent hydration mismatch by rendering a simple version first
  if (!mounted) {
    return (
      <div style={{ visibility: 'hidden' }}>
        {children}
      </div>
    )
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="noise-overlay" />
      {children}
    </ThemeProvider>
  )
}
