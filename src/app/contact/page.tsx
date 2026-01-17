'use client'

import { Box, Container, Typography, Button, Paper } from '@mui/material'
import { COLORS } from '@/constants/colors'
import Link from 'next/link'
import { ArrowLeft, Mail, MessageCircle } from 'lucide-react'

export default function ContactUs() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: COLORS.background.primary,
        color: COLORS.text.primary,
        py: 6,
      }}
    >
      <Container maxWidth="md">
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 4, color: COLORS.accent.primary }}>
            <ArrowLeft size={20} />
            <Typography>Back to Home</Typography>
          </Box>
        </Link>

        <Typography variant="h3" sx={{ fontFamily: '"Clash Display", sans-serif', fontWeight: 700, mb: 2 }}>
          Contact Us
        </Typography>

        <Typography sx={{ color: COLORS.text.secondary, mb: 6 }}>
          Have questions, feedback, or need support? We're here to help!
        </Typography>

        <Box sx={{ display: 'grid', gap: 3 }}>
          <Paper
            sx={{
              p: 4,
              bgcolor: COLORS.background.secondary,
              border: `1px solid ${COLORS.border.primary}`,
              borderRadius: 3,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: COLORS.accent.glow,
                }}
              >
                <Mail size={24} color={COLORS.accent.primary} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Email Support
              </Typography>
            </Box>
            <Typography sx={{ color: COLORS.text.secondary, mb: 3 }}>
              For general inquiries, support requests, or refund questions.
            </Typography>
            <Button
              variant="contained"
              href="mailto:fenapadsala07@gmail.com"
              startIcon={<Mail size={18} />}
              sx={{
                bgcolor: COLORS.accent.primary,
                color: COLORS.background.primary,
                '&:hover': { bgcolor: COLORS.accent.secondary },
              }}
            >
              fenapadsala07@gmail.com
            </Button>
          </Paper>

          <Paper
            sx={{
              p: 4,
              bgcolor: COLORS.background.secondary,
              border: `1px solid ${COLORS.border.primary}`,
              borderRadius: 3,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: COLORS.accent.glow,
                }}
              >
                <MessageCircle size={24} color={COLORS.accent.primary} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Response Time
              </Typography>
            </Box>
            <Typography sx={{ color: COLORS.text.secondary }}>
              We typically respond within 24-48 hours. For urgent matters, please include "URGENT" in your email subject line.
            </Typography>
          </Paper>
        </Box>

        <Box sx={{ mt: 6, p: 4, bgcolor: COLORS.background.elevated, borderRadius: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Before Contacting Us
          </Typography>
          <Typography sx={{ color: COLORS.text.secondary, mb: 2 }}>
            Please check if your question is answered in these sections:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Link href="/privacy" style={{ textDecoration: 'none' }}>
              <Typography sx={{ color: COLORS.accent.primary, '&:hover': { textDecoration: 'underline' } }}>
                Privacy Policy
              </Typography>
            </Link>
            <Link href="/terms" style={{ textDecoration: 'none' }}>
              <Typography sx={{ color: COLORS.accent.primary, '&:hover': { textDecoration: 'underline' } }}>
                Terms of Service
              </Typography>
            </Link>
            <Link href="/refund" style={{ textDecoration: 'none' }}>
              <Typography sx={{ color: COLORS.accent.primary, '&:hover': { textDecoration: 'underline' } }}>
                Refund Policy
              </Typography>
            </Link>
          </Box>
        </Box>

        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: COLORS.text.tertiary }}>
            Screenshots Pro - App Store Screenshot Generator iOS and Android
          </Typography>
          <Typography variant="body2" sx={{ color: COLORS.text.tertiary, mt: 1 }}>
            © 2024 Screenshots Pro. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

