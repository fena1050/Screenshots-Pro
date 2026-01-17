'use client'

import { Box, Container, Typography } from '@mui/material'
import { COLORS } from '@/constants/colors'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPolicy() {
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
          Privacy Policy
        </Typography>

        <Typography variant="body2" sx={{ color: COLORS.text.tertiary, mb: 4 }}>
          Last updated: December 28, 2024
        </Typography>

        <Box sx={{ '& h5': { mt: 4, mb: 2, fontWeight: 600 }, '& p': { mb: 2, color: COLORS.text.secondary, lineHeight: 1.8 } }}>
          <Typography variant="h5">1. Introduction</Typography>
          <Typography>
            Welcome to Screenshots Pro ("we," "our," or "us"). We are committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, and safeguard your information when you use our App Store Screenshot Generator service.
          </Typography>

          <Typography variant="h5">2. Information We Collect</Typography>
          <Typography>
            <strong>Information you provide:</strong> When you use our service, you may upload images and screenshots. These files are processed entirely in your browser and are never uploaded to our servers.
          </Typography>
          <Typography>
            <strong>Payment Information:</strong> When you make a purchase, payment processing is handled by Razorpay. We do not store your credit card details or banking information. Please refer to Razorpay's privacy policy for information on how they handle your payment data.
          </Typography>
          <Typography>
            <strong>Automatically collected information:</strong> We may collect basic analytics data such as browser type, device type, and general location (country) to improve our services and determine pricing.
          </Typography>

          <Typography variant="h5">3. How We Use Your Information</Typography>
          <Typography>
            We use the information we collect to:
          </Typography>
          <Typography component="ul" sx={{ pl: 3 }}>
            <li>Provide and maintain our screenshot generator service</li>
            <li>Process payments and transactions</li>
            <li>Determine region-based pricing</li>
            <li>Improve and optimize our services</li>
            <li>Respond to your inquiries and support requests</li>
          </Typography>

          <Typography variant="h5">4. Data Storage and Security</Typography>
          <Typography>
            Screenshots Pro is a client-side application. Your images and designs are processed locally in your browser and are not uploaded to or stored on our servers. We implement appropriate security measures to protect any information we do collect.
          </Typography>

          <Typography variant="h5">5. Third-Party Services</Typography>
          <Typography>
            We use the following third-party services:
          </Typography>
          <Typography component="ul" sx={{ pl: 3 }}>
            <li><strong>Razorpay:</strong> For payment processing</li>
            <li><strong>IP Geolocation Services:</strong> For determining your country for pricing purposes</li>
          </Typography>

          <Typography variant="h5">6. Cookies</Typography>
          <Typography>
            We may use cookies and similar tracking technologies to enhance your experience. You can control cookie settings through your browser preferences.
          </Typography>

          <Typography variant="h5">7. Your Rights</Typography>
          <Typography>
            You have the right to:
          </Typography>
          <Typography component="ul" sx={{ pl: 3 }}>
            <li>Access information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt-out of marketing communications</li>
          </Typography>

          <Typography variant="h5">8. Children's Privacy</Typography>
          <Typography>
            Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
          </Typography>

          <Typography variant="h5">9. Changes to This Policy</Typography>
          <Typography>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
          </Typography>

          <Typography variant="h5">10. Contact Us</Typography>
          <Typography>
            If you have any questions about this Privacy Policy, please contact us at:
          </Typography>
          <Typography>
            Email: fenapadsala07@gmail.com
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}


