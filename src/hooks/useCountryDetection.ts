'use client'

import { useState, useEffect } from 'react'
import { getPricing, type CountryPricing, DEFAULT_PRICING } from '@/constants/pricing'

interface CountryData {
  countryCode: string
  countryName: string
  city: string
  region: string
}

interface UseCountryDetectionReturn {
  country: CountryData | null
  pricing: CountryPricing
  isLoading: boolean
  error: string | null
}

export function useCountryDetection(): UseCountryDetectionReturn {
  const [country, setCountry] = useState<CountryData | null>(null)
  const [pricing, setPricing] = useState<CountryPricing>(DEFAULT_PRICING)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const detectCountry = async () => {
      try {
        // Try ipapi.co first (free, 1000 requests/day)
        const response = await fetch('https://ipapi.co/json/', {
          headers: {
            'Accept': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error('Failed to detect country')
        }

        const data = await response.json()

        if (data.error) {
          throw new Error(data.reason || 'IP detection failed')
        }

        const countryData: CountryData = {
          countryCode: data.country_code || 'US',
          countryName: data.country_name || 'United States',
          city: data.city || '',
          region: data.region || '',
        }

        setCountry(countryData)
        setPricing(getPricing(countryData.countryCode))
        setError(null)
      } catch (err) {
        console.error('Country detection error:', err)
        
        // Try fallback API (ip-api.com)
        try {
          const fallbackResponse = await fetch('http://ip-api.com/json/?fields=countryCode,country,city,regionName')
          const fallbackData = await fallbackResponse.json()
          
          if (fallbackData.countryCode) {
            const countryData: CountryData = {
              countryCode: fallbackData.countryCode,
              countryName: fallbackData.country || 'Unknown',
              city: fallbackData.city || '',
              region: fallbackData.regionName || '',
            }
            
            setCountry(countryData)
            setPricing(getPricing(countryData.countryCode))
            setError(null)
            setIsLoading(false)
            return
          }
        } catch {
          // Fallback also failed
        }
        
        // Default to India if all detection fails
        setCountry({
          countryCode: 'IN',
          countryName: 'India',
          city: '',
          region: '',
        })
        setPricing(getPricing('IN'))
        setError('Could not detect country, defaulting to India')
      } finally {
        setIsLoading(false)
      }
    }

    detectCountry()
  }, [])

  return { country, pricing, isLoading, error }
}

// Store for global country state (to avoid multiple API calls)
let cachedCountry: CountryData | null = null
let cachedPricing: CountryPricing = DEFAULT_PRICING

export function setCachedCountry(country: CountryData, pricing: CountryPricing) {
  cachedCountry = country
  cachedPricing = pricing
}

export function getCachedCountry() {
  return { country: cachedCountry, pricing: cachedPricing }
}


