'use client'

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Alert,
} from '@mui/material'
import { AlertTriangle, CreditCard, Download, Eye, CheckCircle } from 'lucide-react'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { COLORS } from '@/constants/colors'
import { useEditorStore } from '@/store/editorStore'
import { useCanvasStore } from '@/store/canvasStore'
import { type CountryPricing, RAZORPAY_SUPPORTED_CURRENCIES } from '@/constants/pricing'

// Declare Razorpay on window
declare global {
  interface Window {
    Razorpay: any
  }
}

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  pricing: CountryPricing
  countryCode: string
}

export default function PaymentModal({ isOpen, onClose, pricing, countryCode }: PaymentModalProps) {
  const project = useEditorStore((state) => state.project)
  const currentScreenIndex = useEditorStore((state) => state.currentScreenIndex)
  const setPreviewModalOpen = useEditorStore((state) => state.setPreviewModalOpen)
  
  const canvas = useCanvasStore((state) => state.canvas)

  const [hasReviewedPreview, setHasReviewedPreview] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)

  // Load Razorpay script
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.Razorpay) {
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setHasReviewedPreview(false)
      setPaymentSuccess(false)
      setError(null)
      setIsExporting(false)
      setExportProgress(0)
    }
  }, [isOpen])

  const handleOpenPreview = () => {
    onClose()
    setPreviewModalOpen(true)
  }

  const handlePayment = async () => {
    if (!project || !hasReviewedPreview) return

    setIsProcessing(true)
    setError(null)

    try {
      // Check if currency is supported by Razorpay, otherwise fall back to USD
      const isSupported = RAZORPAY_SUPPORTED_CURRENCIES.includes(pricing.currencyCode)
      
      // Use the original currency if supported
      // All pricing is now set in supported currencies, so this should always be true
      const paymentCurrency = isSupported ? pricing.currencyCode : 'USD'
      const paymentAmount = isSupported ? pricing.amount : 100 // $1 fallback

      // Initialize Razorpay with the appropriate currency
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: paymentAmount,
        currency: paymentCurrency,
        name: 'Screenshots Pro',
        description: `Export ${project.screens.length} screen(s) - ${project.name}`,
        handler: async (response: any) => {
          // Payment successful - Razorpay handles verification
          if (response.razorpay_payment_id) {
            setPaymentSuccess(true)
            setIsProcessing(false)
            // Start export automatically
            await handleExport()
          } else {
            setError('Payment verification failed. Please contact support.')
            setIsProcessing(false)
          }
        },
        prefill: {
          name: '',
          email: '',
        },
        theme: {
          color: COLORS.accent.primary,
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false)
          },
        },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.on('payment.failed', (response: any) => {
        setError(`Payment failed: ${response.error.description}`)
        setIsProcessing(false)
      })
      razorpay.open()
    } catch (err) {
      console.error('Payment error:', err)
      setError('Failed to initiate payment. Please try again.')
      setIsProcessing(false)
    }
  }

  const handleExport = async () => {
    if (!project || !canvas) return

    setIsExporting(true)
    setExportProgress(0)

    try {
      const zip = new JSZip()
      const folder = zip.folder(project.name.replace(/[^a-z0-9]/gi, '_'))
      if (!folder) throw new Error('Failed to create folder')

      // Save current canvas state
      const currentCanvasData = JSON.stringify(canvas.toJSON(['name', 'data', 'selectable', 'evented', 'hasControls', 'hasBorders', 'lockMovementX', 'lockMovementY', 'lockRotation', 'lockScalingX', 'lockScalingY']))

      for (let i = 0; i < project.screens.length; i++) {
        setExportProgress(((i + 0.5) / project.screens.length) * 100)

        let screenCanvasData: string | null = null

        if (i === currentScreenIndex) {
          screenCanvasData = currentCanvasData
        } else {
          screenCanvasData = project.screens[i]?.canvasData || null
        }

        if (screenCanvasData) {
          await new Promise<void>((resolve) => {
            canvas.loadFromJSON(JSON.parse(screenCanvasData!), () => {
              canvas.renderAll()
              resolve()
            })
          })

          await new Promise((resolve) => setTimeout(resolve, 100))
        }

        // Export at 2x scale for quality
        const dataURL = canvas.toDataURL({
          format: 'png',
          quality: 1,
          multiplier: 2,
        })

        const response = await fetch(dataURL)
        const blob = await response.blob()

        const fileName = `screen_${String(i + 1).padStart(2, '0')}_2x.png`
        folder.file(fileName, blob)

        setExportProgress(((i + 1) / project.screens.length) * 100)
      }

      // Restore original canvas state
      await new Promise<void>((resolve) => {
        canvas.loadFromJSON(JSON.parse(currentCanvasData), () => {
          canvas.renderAll()
          resolve()
        })
      })

      // Generate and download zip
      const zipBlob = await zip.generateAsync({ type: 'blob' })
      saveAs(zipBlob, `${project.name.replace(/[^a-z0-9]/gi, '_')}_screenshots.zip`)

      setExportProgress(100)
    } catch (err) {
      console.error('Export error:', err)
      setError('Failed to export. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  const handleClose = () => {
    if (!isProcessing && !isExporting) {
      onClose()
    }
  }

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth="sm"
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
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        {paymentSuccess ? (
          <>
            <CheckCircle size={24} color={COLORS.accent.primary} />
            Payment Successful!
          </>
        ) : (
          <>
            <CreditCard size={24} color={COLORS.accent.primary} />
            Complete Your Purchase
          </>
        )}
      </DialogTitle>

      <DialogContent>
        {paymentSuccess ? (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                bgcolor: COLORS.accent.light,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 3,
              }}
            >
              <Download size={40} color={COLORS.accent.primary} />
            </Box>

            {isExporting ? (
              <>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Exporting your screenshots...
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                  <CircularProgress size={24} sx={{ color: COLORS.accent.primary }} />
                  <Typography sx={{ color: COLORS.text.secondary }}>
                    {Math.round(exportProgress)}%
                  </Typography>
                </Box>
              </>
            ) : (
              <>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Download Complete!
                </Typography>
                <Typography variant="body2" sx={{ color: COLORS.text.secondary }}>
                  Your screenshots have been downloaded. Thank you for your purchase!
                </Typography>
              </>
            )}
          </Box>
        ) : (
          <>
            {/* Warning Section */}
            <Alert
              severity="warning"
              icon={<AlertTriangle size={20} />}
              sx={{
                mb: 3,
                bgcolor: 'rgba(255, 193, 7, 0.1)',
                border: '1px solid rgba(255, 193, 7, 0.3)',
                '& .MuiAlert-message': {
                  width: '100%',
                },
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                Before You Pay
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Please ensure you have:
              </Typography>
              <Box component="ul" sx={{ m: 0, pl: 2 }}>
                <li>
                  <Typography variant="body2">Previewed all your screens</Typography>
                </li>
                <li>
                  <Typography variant="body2">Checked content and spelling</Typography>
                </li>
                <li>
                  <Typography variant="body2">Verified device mockups look correct</Typography>
                </li>
              </Box>
            </Alert>

            {/* Preview Button */}
            <Button
              variant="outlined"
              startIcon={<Eye size={18} />}
              onClick={handleOpenPreview}
              fullWidth
              sx={{
                mb: 3,
                py: 1.5,
                borderColor: COLORS.border.primary,
                color: COLORS.text.primary,
                '&:hover': {
                  borderColor: COLORS.accent.primary,
                },
              }}
            >
              Open Preview to Review
            </Button>

            {/* Pricing Section */}
            <Box
              sx={{
                p: 3,
                borderRadius: 2,
                bgcolor: COLORS.background.tertiary,
                border: `1px solid ${COLORS.border.primary}`,
                mb: 3,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Typography sx={{ fontSize: '2rem' }}>{pricing.flag}</Typography>
                <Box>
                  <Typography variant="body2" sx={{ color: COLORS.text.secondary }}>
                    {pricing.countryName}
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: COLORS.accent.primary }}>
                    {pricing.displayAmount}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" sx={{ color: COLORS.text.secondary }}>
                  Project
                </Typography>
                <Typography variant="body2" sx={{ color: COLORS.text.primary }}>
                  {project?.name}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" sx={{ color: COLORS.text.secondary }}>
                  Screens
                </Typography>
                <Typography variant="body2" sx={{ color: COLORS.text.primary }}>
                  {project?.screens.length} screen(s)
                </Typography>
              </Box>
            </Box>

            {/* Confirmation Checkbox */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={hasReviewedPreview}
                  onChange={(e) => setHasReviewedPreview(e.target.checked)}
                  sx={{
                    color: COLORS.text.tertiary,
                    '&.Mui-checked': {
                      color: COLORS.accent.primary,
                    },
                  }}
                />
              }
              label={
                <Typography variant="body2">
                  I have reviewed my preview and confirm my screens are ready for export
                </Typography>
              }
            />

            {/* Error Display */}
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
          </>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        {paymentSuccess ? (
          <Button
            variant="contained"
            onClick={handleClose}
            fullWidth
            disabled={isExporting}
            sx={{
              bgcolor: COLORS.accent.primary,
              color: COLORS.background.primary,
              '&:hover': { bgcolor: COLORS.accent.secondary },
            }}
          >
            {isExporting ? 'Exporting...' : 'Done'}
          </Button>
        ) : (
          <>
            <Button
              onClick={handleClose}
              disabled={isProcessing}
              sx={{ color: COLORS.text.secondary }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handlePayment}
              disabled={!hasReviewedPreview || isProcessing}
              startIcon={isProcessing ? <CircularProgress size={18} color="inherit" /> : <CreditCard size={18} />}
              sx={{
                bgcolor: COLORS.accent.primary,
                color: COLORS.background.primary,
                '&:hover': { bgcolor: COLORS.accent.secondary },
                '&.Mui-disabled': {
                  bgcolor: COLORS.background.elevated,
                  color: COLORS.text.muted,
                },
              }}
            >
              {isProcessing ? 'Processing...' : `Pay ${pricing.displayAmount}`}
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  )
}

