'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Box, 
  Button, 
  Container, 
  Typography, 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material'
import { 
  Smartphone, 
  Tablet, 
  Sparkles, 
  Download, 
  Layers, 
  Palette,
  ArrowRight,
  Mail,
  Shield,
  FileText,
  ExternalLink,
} from 'lucide-react'
import { COLORS } from '@/constants/colors'
import { useEditorStore } from '@/store/editorStore'
import type { Platform } from '@/types/editor'

const features = [
  {
    icon: Smartphone,
    title: 'Device Frames',
    description: 'Latest iPhone & Android device mockups with pixel-perfect accuracy',
  },
  {
    icon: Layers,
    title: 'Layer Editor',
    description: 'Intuitive drag-and-drop canvas with unlimited layers',
  },
  {
    icon: Palette,
    title: 'Beautiful Backgrounds',
    description: 'Stunning gradients and patterns to make your screenshots pop',
  },
  {
    icon: Download,
    title: 'Export as ZIP',
    description: 'Download all your screenshots in one click, ready to upload',
  },
]

const mockupScreens = [
  { color: '#FF6B6B', text: 'Track your fitness goals', angle: -8 },
  { color: '#00D4AA', text: 'Seamless payments', angle: 0 },
  { color: '#FFB347', text: 'Smart notifications', angle: 8 },
]

// Get weekly random number (changes every Sunday, always ends in 0)
const getWeeklyDownloads = () => {
  const now = new Date()
  // Get the Sunday of the current week
  const sunday = new Date(now)
  sunday.setDate(now.getDate() - now.getDay())
  sunday.setHours(0, 0, 0, 0)
  
  // Use the Sunday date as a seed for consistent random per week
  const seed = sunday.getFullYear() * 10000 + (sunday.getMonth() + 1) * 100 + sunday.getDate()
  
  // Simple seeded random: generates same number for same week
  const random = Math.sin(seed) * 10000
  const normalized = random - Math.floor(random) // 0 to 1
  
  // Range: 200 to 600, step of 50 (so: 200, 250, 300, 350, 400, 450, 500, 550, 600)
  const steps = [200, 250, 300, 350, 400, 450, 500, 550, 600]
  const index = Math.floor(normalized * steps.length)
  
  return steps[index]
}

export default function HomePage() {
  const router = useRouter()
  const createProject = useEditorStore((state) => state.createProject)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [projectName, setProjectName] = useState('')
  const [platform, setPlatform] = useState<Platform>('ios')
  const [weeklyDownloads, setWeeklyDownloads] = useState<number | null>(null) // null until client hydration
  
  // Set weekly downloads on client side only (after hydration)
  useEffect(() => {
    setWeeklyDownloads(getWeeklyDownloads())
  }, [])

  const handleCreateProject = () => {
    if (!projectName.trim()) return
    createProject(projectName.trim(), platform)
    router.push('/editor')
  }

  const handlePlatformChange = (
    _: React.MouseEvent<HTMLElement>,
    newPlatform: Platform | null,
  ) => {
    if (newPlatform) {
      setPlatform(newPlatform)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: COLORS.background.primary,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Effects */}
      <Box className="bg-mesh" sx={{ position: 'absolute', inset: 0, zIndex: 0 }} />
      <Box className="grid-pattern" sx={{ position: 'absolute', inset: 0, zIndex: 0 }} />

      {/* Header */}
      <Box
        component="header"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          py: 2,
        }}
        className="glass"
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  background: `linear-gradient(135deg, ${COLORS.accent.primary}, ${COLORS.accent.tertiary})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Sparkles size={22} color={COLORS.background.primary} />
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: '"Clash Display", sans-serif',
                  fontWeight: 700,
                  color: COLORS.text.primary,
                }}
              >
                Screenshots Pro
              </Typography>
            </Box>
            <Button
              variant="contained"
              onClick={() => setIsDialogOpen(true)}
              sx={{
                bgcolor: COLORS.accent.primary,
                color: COLORS.background.primary,
                '&:hover': {
                  bgcolor: COLORS.accent.secondary,
                },
              }}
            >
              Start Creating
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ pt: 20, pb: 12, position: 'relative', zIndex: 10 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
            alignItems: 'center',
            gap: 8,
          }}
        >
          {/* Left Content */}
          <Box sx={{ flex: 1, textAlign: { xs: 'center', lg: 'left' } }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Typography
                variant="overline"
                sx={{
                  color: COLORS.accent.primary,
                  fontWeight: 600,
                  letterSpacing: 3,
                  mb: 2,
                  display: 'block',
                }}
              >
                FREE APP STORE SCREENSHOT GENERATOR
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                  fontWeight: 700,
                  lineHeight: 1.1,
                  mb: 3,
                  fontFamily: '"Clash Display", sans-serif',
                }}
              >
                Create Stunning{' '}
                <Box
                  component="span"
                  className="text-gradient"
                >
                  App Screenshots
                </Box>
                {' '}in Minutes
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: COLORS.text.secondary,
                  fontWeight: 400,
                  lineHeight: 1.7,
                  mb: 5,
                  maxWidth: 520,
                  mx: { xs: 'auto', lg: 0 },
                }}
              >
                Design professional App Store and Play Store screenshots with our 
                intuitive editor. No design skills required. Export all screens as a ZIP.
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'center', lg: 'flex-start' } }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => setIsDialogOpen(true)}
                  endIcon={<ArrowRight size={20} />}
                  sx={{
                    bgcolor: COLORS.accent.primary,
                    color: COLORS.background.primary,
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    '&:hover': {
                      bgcolor: COLORS.accent.secondary,
                    },
                  }}
                >
                  Start Free
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  href="#features"
                  sx={{
                    borderColor: COLORS.border.secondary,
                    color: COLORS.text.primary,
                    px: 4,
                    py: 1.5,
                    '&:hover': {
                      borderColor: COLORS.accent.primary,
                      bgcolor: 'transparent',
                    },
                  }}
                >
                  Learn More
                </Button>
              </Box>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {/* Trust Badge - Only show after client hydration */}
              {weeklyDownloads !== null && (
                <Box 
                  sx={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: 1.5,
                    mt: 5,
                    mb: 3,
                    px: 2.5,
                    py: 1,
                    borderRadius: 3,
                    bgcolor: 'rgba(0, 212, 170, 0.1)',
                    border: '1px solid rgba(0, 212, 170, 0.2)',
                  }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: '#00D4AA',
                      animation: 'pulse 2s infinite',
                      '@keyframes pulse': {
                        '0%, 100%': { opacity: 1 },
                        '50%': { opacity: 0.5 },
                      },
                    }}
                  />
                  <Typography variant="body2" sx={{ color: COLORS.text.secondary, fontWeight: 500 }}>
                    <Box component="span" sx={{ color: '#00D4AA', fontWeight: 700 }}>{weeklyDownloads}+</Box> screenshots downloaded this week
                  </Typography>
                </Box>
              )}

              <Box sx={{ display: 'flex', gap: 4, justifyContent: { xs: 'center', lg: 'flex-start' } }}>
                {[
                  { value: '1,200+', label: 'Downloads' },
                  { value: '500+', label: 'Happy Users' },
                  { value: '10+', label: 'Device Frames' },
                ].map((stat) => (
                  <Box key={stat.label} sx={{ textAlign: 'center' }}>
                    <Typography
                      variant="h4"
                      sx={{
                        fontFamily: '"Clash Display", sans-serif',
                        fontWeight: 700,
                        color: COLORS.accent.primary,
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" sx={{ color: COLORS.text.tertiary }}>
                      {stat.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </motion.div>
          </Box>

          {/* Right - Mockup Preview */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              perspective: '1000px',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: { xs: 300, sm: 400, md: 480 },
                  height: { xs: 400, sm: 500, md: 600 },
                }}
              >
                {mockupScreens.map((screen, index) => (
                  <Box
                    key={index}
                    className={index === 1 ? 'animate-float' : index === 0 ? 'animate-float-delayed' : ''}
                    sx={{
                      position: 'absolute',
                      width: { xs: 140, sm: 180, md: 200 },
                      height: { xs: 280, sm: 360, md: 400 },
                      left: index === 0 ? 0 : index === 1 ? '50%' : 'auto',
                      right: index === 2 ? 0 : 'auto',
                      top: index === 1 ? 0 : index === 0 ? '20%' : '15%',
                      transform: `${index === 1 ? 'translateX(-50%)' : ''} rotate(${screen.angle}deg)`,
                      zIndex: index === 1 ? 3 : index === 0 ? 1 : 2,
                      borderRadius: 4,
                      overflow: 'hidden',
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                      background: `linear-gradient(180deg, ${screen.color} 0%, ${COLORS.background.tertiary} 100%)`,
                      border: `4px solid ${COLORS.background.elevated}`,
                    }}
                  >
                    {/* Phone Frame Top */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 8,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 60,
                        height: 20,
                        bgcolor: COLORS.background.primary,
                        borderRadius: 10,
                      }}
                    />
                    {/* Content */}
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 40,
                        left: 16,
                        right: 16,
                      }}
                    >
                      <Typography
                        sx={{
                          color: COLORS.text.primary,
                          fontWeight: 700,
                          fontSize: { xs: '0.9rem', sm: '1.1rem' },
                          fontFamily: '"Clash Display", sans-serif',
                        }}
                      >
                        {screen.text}
                      </Typography>
                    </Box>
                  </Box>
                ))}

                {/* Glow Effect */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 300,
                    height: 300,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${COLORS.accent.glow} 0%, transparent 70%)`,
                    filter: 'blur(40px)',
                    zIndex: 0,
                  }}
                />
              </Box>
            </motion.div>
          </Box>
        </Box>
      </Container>

      {/* Features Section */}
      <Box
        id="features"
        sx={{
          py: 12,
          position: 'relative',
          zIndex: 10,
          borderTop: `1px solid ${COLORS.border.primary}`,
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="h2"
              sx={{
                textAlign: 'center',
                mb: 2,
                fontFamily: '"Clash Display", sans-serif',
                fontSize: { xs: '2rem', md: '2.5rem' },
              }}
            >
              Everything You Need
            </Typography>
            <Typography
              variant="body1"
              sx={{
                textAlign: 'center',
                color: COLORS.text.secondary,
                mb: 8,
                maxWidth: 500,
                mx: 'auto',
              }}
            >
              Powerful features to create professional app screenshots that convert
            </Typography>
          </motion.div>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' },
              gap: 3,
            }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Box
                  className="glass-card card-hover glow-border"
                  sx={{
                    p: 4,
                    borderRadius: 3,
                    height: '100%',
                  }}
                >
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 2,
                      bgcolor: COLORS.accent.light,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                    }}
                  >
                    <feature.icon size={28} color={COLORS.accent.primary} />
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{ mb: 1.5, fontWeight: 600 }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: COLORS.text.secondary, lineHeight: 1.7 }}
                  >
                    {feature.description}
                  </Typography>
                </Box>
              </motion.div>
            ))}
          </Box>
        </Container>
      </Box>

      {/* More Free Tools Section */}
      <Box
        sx={{
          py: 10,
          position: 'relative',
          zIndex: 10,
          borderTop: `1px solid ${COLORS.border.primary}`,
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="h2"
              sx={{
                textAlign: 'center',
                mb: 2,
                fontFamily: '"Clash Display", sans-serif',
                fontSize: { xs: '1.75rem', md: '2.25rem' },
              }}
            >
              More Free Tools
            </Typography>
            <Typography
              variant="body1"
              sx={{
                textAlign: 'center',
                color: COLORS.text.secondary,
                mb: 6,
                maxWidth: 500,
                mx: 'auto',
              }}
            >
              Check out our other free tools for app developers
            </Typography>
          </motion.div>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 3,
              maxWidth: 900,
              mx: 'auto',
            }}
          >
            {/* Privacy Policy Generator Pro */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Box
                component="a"
                href="https://app-policy-generator.web.app/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'block',
                  textDecoration: 'none',
                  p: 4,
                  borderRadius: 3,
                  background: `linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, ${COLORS.background.secondary} 100%)`,
                  border: `1px solid ${COLORS.border.primary}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: '#A855F7',
                    transform: 'translateY(-4px)',
                    boxShadow: '0 20px 40px rgba(168, 85, 247, 0.15)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #A855F7 0%, #EC4899 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Shield size={28} color="#fff" />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, color: COLORS.text.primary }}
                      >
                        Privacy Policy Generator Pro
                      </Typography>
                      <ExternalLink size={16} color={COLORS.text.tertiary} />
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{ color: COLORS.text.secondary, lineHeight: 1.7, mb: 2 }}
                    >
                      Generate professional privacy policies and terms of service for your mobile apps. Compliant with Google Play, App Store, and GDPR.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {['Free', 'No Sign Up', 'Instant Download'].map((tag) => (
                        <Box
                          key={tag}
                          sx={{
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 1,
                            bgcolor: 'rgba(168, 85, 247, 0.15)',
                            fontSize: '0.75rem',
                            color: '#A855F7',
                            fontWeight: 500,
                          }}
                        >
                          {tag}
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </motion.div>

            {/* App Privacy Policy Creator */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Box
                component="a"
                href="https://app-privacy-policy-creator.firebaseapp.com/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'block',
                  textDecoration: 'none',
                  p: 4,
                  borderRadius: 3,
                  background: `linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, ${COLORS.background.secondary} 100%)`,
                  border: `1px solid ${COLORS.border.primary}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: '#EC4899',
                    transform: 'translateY(-4px)',
                    boxShadow: '0 20px 40px rgba(236, 72, 153, 0.15)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #EC4899 0%, #F97316 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <FileText size={28} color="#fff" />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, color: COLORS.text.primary }}
                      >
                        App Privacy Policy Creator
                      </Typography>
                      <ExternalLink size={16} color={COLORS.text.tertiary} />
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{ color: COLORS.text.secondary, lineHeight: 1.7, mb: 2 }}
                    >
                      Create customized Privacy Policy and Terms of Use documents for your mobile apps in minutes. Professional, compliant, and free.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {['Free & Open Source', 'Custom Templates', 'Multiple Formats'].map((tag) => (
                        <Box
                          key={tag}
                          sx={{
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 1,
                            bgcolor: 'rgba(236, 72, 153, 0.15)',
                            fontSize: '0.75rem',
                            color: '#EC4899',
                            fontWeight: 500,
                          }}
                        >
                          {tag}
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </motion.div>
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: 12,
          position: 'relative',
          zIndex: 10,
        }}
      >
        <Container maxWidth="sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Box
              sx={{
                textAlign: 'center',
                p: 6,
                borderRadius: 4,
                background: `linear-gradient(135deg, ${COLORS.background.tertiary} 0%, ${COLORS.background.secondary} 100%)`,
                border: `1px solid ${COLORS.border.primary}`,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: 200,
                  height: 200,
                  background: `radial-gradient(circle, ${COLORS.accent.glow} 0%, transparent 70%)`,
                  filter: 'blur(40px)',
                }}
              />
              <Typography
                variant="h3"
                sx={{
                  mb: 2,
                  fontFamily: '"Clash Display", sans-serif',
                  position: 'relative',
                }}
              >
                Ready to Create?
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: COLORS.text.secondary,
                  mb: 4,
                  position: 'relative',
                }}
              >
                Start designing your app screenshots now. It&apos;s completely free.
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={() => setIsDialogOpen(true)}
                endIcon={<Sparkles size={20} />}
                sx={{
                  bgcolor: COLORS.accent.primary,
                  color: COLORS.background.primary,
                  px: 5,
                  py: 1.5,
                  fontSize: '1.1rem',
                  position: 'relative',
                  '&:hover': {
                    bgcolor: COLORS.accent.secondary,
                  },
                }}
              >
                Create Screenshots
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Hire Me Section */}
      <Box
        sx={{
          py: 8,
          position: 'relative',
          zIndex: 10,
        }}
      >
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Box
              sx={{
                p: { xs: 3, md: 5 },
                borderRadius: 4,
                background: `linear-gradient(135deg, ${COLORS.accent.glow} 0%, rgba(0, 180, 216, 0.1) 100%)`,
                backdropFilter: 'blur(20px)',
                border: `1px solid ${COLORS.border.primary}`,
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: { xs: 'flex-start', md: 'center' },
                justifyContent: 'space-between',
                gap: 4,
              }}
            >
              {/* Left Content */}
              <Box sx={{ flex: 1 }}>
                {/* Icons */}
                <Box sx={{ display: 'flex', gap: 1.5, mb: 3 }}>
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: 2,
                      background: `linear-gradient(135deg, ${COLORS.accent.primary} 0%, ${COLORS.accent.tertiary} 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      color: COLORS.background.primary,
                      fontWeight: 700,
                    }}
                  >
                    {'</>'}
                  </Box>
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: 2,
                      bgcolor: COLORS.background.tertiary,
                      border: `1px solid ${COLORS.border.secondary}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Smartphone size={24} color={COLORS.accent.primary} />
                  </Box>
                </Box>

                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: '"Clash Display", sans-serif',
                    fontWeight: 700,
                    mb: 2,
                    fontSize: { xs: '1.5rem', md: '2rem' },
                  }}
                >
                  Need a Custom App or Website?
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: COLORS.text.secondary,
                    lineHeight: 1.8,
                    maxWidth: 500,
                  }}
                >
                  I build beautiful, high-performance{' '}
                  <Box component="span" sx={{ color: COLORS.accent.primary, fontWeight: 500 }}>
                    mobile apps
                  </Box>
                  {' '}and{' '}
                  <Box component="span" sx={{ color: COLORS.accent.tertiary, fontWeight: 500 }}>
                    websites
                  </Box>
                  {' '}for businesses and startups.
                  <br />
                  From idea to launch — let&apos;s bring your vision to life.
                </Typography>
              </Box>

              {/* Right Content */}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'flex-start', md: 'flex-end' }, gap: 2 }}>
                {/* Tech Stack */}
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                  {['React Native', 'Next.js', 'Node.js'].map((tech) => (
                    <Box
                      key={tech}
                      sx={{
                        px: 2,
                        py: 0.75,
                        borderRadius: 2,
                        bgcolor: COLORS.background.tertiary,
                        border: `1px solid ${COLORS.border.primary}`,
                        fontSize: '0.85rem',
                        color: COLORS.text.secondary,
                      }}
                    >
                      {tech}
                    </Box>
                  ))}
                </Box>

                {/* CTA Button */}
                <Button
                  variant="contained"
                  size="large"
                  href="mailto:fenapadsala07@gmail.com"
                  startIcon={<Mail size={20} />}
                  endIcon={<ArrowRight size={20} />}
                  sx={{
                    bgcolor: COLORS.accent.primary,
                    color: COLORS.background.primary,
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 600,
                    '&:hover': {
                      bgcolor: COLORS.accent.secondary,
                    },
                  }}
                >
                  Let&apos;s Talk
                </Button>

                <Typography
                  variant="body2"
                  sx={{
                    color: COLORS.text.tertiary,
                    fontSize: '0.85rem',
                  }}
                >
                  fenapadsala07@gmail.com
                </Typography>
              </Box>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 6,
          borderTop: `1px solid ${COLORS.border.primary}`,
          position: 'relative',
          zIndex: 10,
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '2fr 1fr 1fr' },
              gap: 4,
              mb: 4,
            }}
          >
            {/* Brand */}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: 2,
                    background: `linear-gradient(135deg, ${COLORS.accent.primary}, ${COLORS.accent.tertiary})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Sparkles size={18} color={COLORS.background.primary} />
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: '"Clash Display", sans-serif',
                    fontWeight: 700,
                    color: COLORS.text.primary,
                    fontSize: '1rem',
                  }}
                >
                  Screenshots Pro
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: COLORS.text.tertiary, maxWidth: 300 }}>
                Create stunning app store screenshots in minutes. Free, easy, and professional.
              </Typography>
            </Box>

            {/* Legal Links */}
            <Box>
              <Typography variant="body2" sx={{ color: COLORS.text.secondary, fontWeight: 600, mb: 2 }}>
                Legal
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <a href="/privacy/" style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" sx={{ color: COLORS.text.tertiary, '&:hover': { color: COLORS.accent.primary } }}>
                    Privacy Policy
                  </Typography>
                </a>
                <a href="/terms/" style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" sx={{ color: COLORS.text.tertiary, '&:hover': { color: COLORS.accent.primary } }}>
                    Terms of Service
                  </Typography>
                </a>
                <a href="/refund/" style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" sx={{ color: COLORS.text.tertiary, '&:hover': { color: COLORS.accent.primary } }}>
                    Refund Policy
                  </Typography>
                </a>
                <a href="/contact/" style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" sx={{ color: COLORS.text.tertiary, '&:hover': { color: COLORS.accent.primary } }}>
                    Contact
                  </Typography>
                </a>
              </Box>
            </Box>

            {/* More Tools */}
            <Box>
              <Typography variant="body2" sx={{ color: COLORS.text.secondary, fontWeight: 600, mb: 2 }}>
                More Free Tools
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <a 
                  href="https://app-policy-generator.web.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Typography variant="body2" sx={{ color: COLORS.text.tertiary, '&:hover': { color: '#A855F7' } }}>
                      Privacy Policy Generator
                    </Typography>
                    <ExternalLink size={12} color={COLORS.text.muted} />
                  </Box>
                </a>
                <a 
                  href="https://app-privacy-policy-creator.firebaseapp.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Typography variant="body2" sx={{ color: COLORS.text.tertiary, '&:hover': { color: '#EC4899' } }}>
                      App Policy Creator
                    </Typography>
                    <ExternalLink size={12} color={COLORS.text.muted} />
                  </Box>
                </a>
              </Box>
            </Box>
          </Box>

          {/* Bottom Bar */}
          <Box
            sx={{
              pt: 4,
              borderTop: `1px solid ${COLORS.border.primary}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            <Typography variant="body2" sx={{ color: COLORS.text.tertiary }}>
              © 2025 Screenshots Pro. All rights reserved.
            </Typography>
            <Typography variant="body2" sx={{ color: COLORS.text.tertiary }}>
              Made with ❤️ for indie developers
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Create Project Dialog */}
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: COLORS.background.secondary,
            border: `1px solid ${COLORS.border.primary}`,
            borderRadius: 3,
          },
        }}
      >
        <DialogTitle
          sx={{
            fontFamily: '"Clash Display", sans-serif',
            fontWeight: 600,
            pb: 1,
          }}
        >
          Create New Project
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="Project Name"
            placeholder="My Awesome App"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            sx={{ mt: 2, mb: 3 }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && projectName.trim()) {
                handleCreateProject()
              }
            }}
          />
          <Typography variant="body2" sx={{ color: COLORS.text.secondary, mb: 1.5 }}>
            Select Platform
          </Typography>
          <ToggleButtonGroup
            value={platform}
            exclusive
            onChange={handlePlatformChange}
            fullWidth
            sx={{
              '& .MuiToggleButton-root': {
                py: 2,
                border: `1px solid ${COLORS.border.primary}`,
                '&.Mui-selected': {
                  bgcolor: COLORS.accent.light,
                  borderColor: COLORS.accent.primary,
                  '&:hover': {
                    bgcolor: COLORS.accent.light,
                  },
                },
              },
            }}
          >
            <ToggleButton value="ios">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Smartphone size={20} />
                iOS (App Store)
              </Box>
            </ToggleButton>
            <ToggleButton value="android">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Tablet size={20} />
                Android (Play Store)
              </Box>
            </ToggleButton>
          </ToggleButtonGroup>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            onClick={() => setIsDialogOpen(false)}
            sx={{ color: COLORS.text.secondary }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleCreateProject}
            disabled={!projectName.trim()}
            sx={{
              bgcolor: COLORS.accent.primary,
              color: COLORS.background.primary,
              '&:hover': {
                bgcolor: COLORS.accent.secondary,
              },
              '&:disabled': {
                bgcolor: COLORS.background.elevated,
                color: COLORS.text.tertiary,
              },
            }}
          >
            Create Project
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
