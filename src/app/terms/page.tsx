'use client'

import { Box, Container, Typography } from '@mui/material'
import { COLORS } from '@/constants/colors'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function TermsOfService() {
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
          Terms of Service
        </Typography>

        <Typography variant="body2" sx={{ color: COLORS.text.tertiary, mb: 4 }}>
          Last updated: December 28, 2024
        </Typography>

        <Box sx={{ '& h5': { mt: 4, mb: 2, fontWeight: 600 }, '& p': { mb: 2, color: COLORS.text.secondary, lineHeight: 1.8 } }}>
          <Typography variant="h5">1. Acceptance of Terms</Typography>
          <Typography>
            By accessing and using Screenshots Pro ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
          </Typography>

          <Typography variant="h5">2. Description of Service</Typography>
          <Typography>
            Screenshots Pro is a web-based tool that allows users to create professional App Store and Play Store screenshots. The service includes a canvas editor, device mockups, templates, and export functionality.
          </Typography>

          <Typography variant="h5">3. User Responsibilities</Typography>
          <Typography>
            You agree to:
          </Typography>
          <Typography component="ul" sx={{ pl: 3 }}>
            <li>Use the service only for lawful purposes</li>
            <li>Not upload content that infringes on intellectual property rights</li>
            <li>Not use the service to create misleading or fraudulent app store listings</li>
            <li>Ensure you have the rights to use any images you upload</li>
            <li>Review your designs carefully before making payment</li>
          </Typography>

          <Typography variant="h5">4. Intellectual Property</Typography>
          <Typography>
            <strong>Your Content:</strong> You retain all rights to the images and content you create using our service. We do not claim ownership of your designs.
          </Typography>
          <Typography>
            <strong>Our Service:</strong> The Screenshots Pro platform, including its design, features, and code, is owned by us and protected by intellectual property laws.
          </Typography>

          <Typography variant="h5">5. Payments and Pricing</Typography>
          <Typography>
            Our service requires a one-time payment to export your designs. Prices vary by region and are displayed before purchase. All payments are processed securely through Razorpay.
          </Typography>

          <Typography variant="h5">6. Refund Policy</Typography>
          <Typography>
            Due to the digital nature of our service, refunds are generally not available once you have downloaded your exported files. We encourage you to use the Preview feature to review your designs thoroughly before making a purchase. For exceptional circumstances, please contact us.
          </Typography>

          <Typography variant="h5">7. Disclaimer of Warranties</Typography>
          <Typography>
            The service is provided "as is" without warranties of any kind, either express or implied. We do not guarantee that the service will be uninterrupted, error-free, or meet your specific requirements.
          </Typography>

          <Typography variant="h5">8. Limitation of Liability</Typography>
          <Typography>
            To the maximum extent permitted by law, Screenshots Pro shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.
          </Typography>

          <Typography variant="h5">9. Modifications to Service</Typography>
          <Typography>
            We reserve the right to modify, suspend, or discontinue the service at any time without prior notice. We may also update these terms from time to time.
          </Typography>

          <Typography variant="h5">10. Governing Law</Typography>
          <Typography>
            These terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
          </Typography>

          <Typography variant="h5">11. Contact Information</Typography>
          <Typography>
            For any questions regarding these Terms of Service, please contact us at:
          </Typography>
          <Typography>
            Email: fenapadsala07@gmail.com
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}


