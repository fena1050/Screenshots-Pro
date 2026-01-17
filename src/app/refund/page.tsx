'use client'

import { Box, Container, Typography } from '@mui/material'
import { COLORS } from '@/constants/colors'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function RefundPolicy() {
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

        <Typography variant="h3" sx={{ fontFamily: '"Clash Display", sans-serif', fontWeight: 700, mb: 4 }}>
          Refund & Cancellation Policy
        </Typography>

        <Typography variant="body2" sx={{ color: COLORS.text.tertiary, mb: 4 }}>
          Last updated: December 28, 2024
        </Typography>

        <Box sx={{ '& h5': { mt: 4, mb: 2, fontWeight: 600 }, '& p': { mb: 2, color: COLORS.text.secondary, lineHeight: 1.8 } }}>
          <Typography variant="h5">1. Digital Product Policy</Typography>
          <Typography>
            Screenshots Pro provides a digital service for creating App Store and Play Store screenshots. Due to the instant delivery nature of digital products, our refund policy differs from physical goods.
          </Typography>

          <Typography variant="h5">2. Preview Before Purchase</Typography>
          <Typography>
            We strongly encourage all users to use our <strong>Preview</strong> feature before making any payment. The preview allows you to see exactly how your screenshots will look, including all screens and designs. This helps ensure you are satisfied with your work before purchasing.
          </Typography>

          <Typography variant="h5">3. Refund Eligibility</Typography>
          <Typography>
            <strong>Refunds are NOT available for:</strong>
          </Typography>
          <Typography component="ul" sx={{ pl: 3 }}>
            <li>Design mistakes or errors made by the user</li>
            <li>Change of mind after purchase</li>
            <li>Successfully downloaded export files</li>
            <li>Failure to preview designs before payment</li>
          </Typography>
          
          <Typography sx={{ mt: 2 }}>
            <strong>Refunds MAY be considered for:</strong>
          </Typography>
          <Typography component="ul" sx={{ pl: 3 }}>
            <li>Technical issues preventing download (with proof)</li>
            <li>Duplicate/accidental payments</li>
            <li>Payment errors resulting in incorrect charges</li>
          </Typography>

          <Typography variant="h5">4. Cancellation Policy</Typography>
          <Typography>
            Since our service provides instant digital delivery upon payment, cancellations are not possible after the payment is processed and the download begins.
          </Typography>

          <Typography variant="h5">5. How to Request a Refund</Typography>
          <Typography>
            If you believe you are eligible for a refund based on the criteria above, please contact us within 7 days of your purchase with:
          </Typography>
          <Typography component="ul" sx={{ pl: 3 }}>
            <li>Your payment ID / transaction reference</li>
            <li>Email address used for payment</li>
            <li>Detailed description of the issue</li>
            <li>Screenshots or proof of the problem (if applicable)</li>
          </Typography>

          <Typography variant="h5">6. Refund Processing</Typography>
          <Typography>
            If your refund request is approved:
          </Typography>
          <Typography component="ul" sx={{ pl: 3 }}>
            <li>Refunds will be processed within 5-7 business days</li>
            <li>The refund will be credited to the original payment method</li>
            <li>Bank processing times may vary</li>
          </Typography>

          <Typography variant="h5">7. Pricing Disputes</Typography>
          <Typography>
            Our prices are displayed clearly before purchase based on your detected location. If you believe you were charged incorrectly due to location detection errors, please contact us with proof of your actual location.
          </Typography>

          <Typography variant="h5">8. Contact Us</Typography>
          <Typography>
            For refund requests or questions about this policy, please contact us at:
          </Typography>
          <Typography>
            Email: fenapadsala07@gmail.com
          </Typography>
          <Typography sx={{ mt: 2 }}>
            We aim to respond to all refund inquiries within 24-48 hours.
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}


