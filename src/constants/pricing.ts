// Pricing configuration based on country
// All amounts in smallest currency unit (paise for INR, cents for USD, etc.)
// Note: Razorpay has minimum transaction amounts for international currencies
// USD: $1, EUR: €1, GBP: £1, etc. - amounts are set to meet these minimums

export interface CountryPricing {
  countryCode: string
  countryName: string
  flag: string
  currencyCode: string
  currencySymbol: string
  amount: number // In smallest unit (paise/cents)
  displayAmount: string // Formatted for display
}

// Pricing tiers
export const PRICING: Record<string, CountryPricing> = {
  // =============================================
  // INDIA - Primary market
  // =============================================
  IN: {
    countryCode: 'IN',
    countryName: 'India',
    flag: '🇮🇳',
    currencyCode: 'INR',
    currencySymbol: '₹',
    amount: 2900, // ₹29 in paise
    displayAmount: '₹29',
  },

  // =============================================
  // TIER 1 - High income countries (~$1)
  // Razorpay minimum: $1 USD, €1 EUR, £1 GBP
  // =============================================
  
  // North America
  US: {
    countryCode: 'US',
    countryName: 'United States',
    flag: '🇺🇸',
    currencyCode: 'USD',
    currencySymbol: '$',
    amount: 100, // $1.00 (Razorpay min is $1)
    displayAmount: '$1',
  },
  CA: {
    countryCode: 'CA',
    countryName: 'Canada',
    flag: '🇨🇦',
    currencyCode: 'CAD',
    currencySymbol: 'C$',
    amount: 149, // C$1.49
    displayAmount: 'C$1.49',
  },

  // UK & Ireland
  GB: {
    countryCode: 'GB',
    countryName: 'United Kingdom',
    flag: '🇬🇧',
    currencyCode: 'GBP',
    currencySymbol: '£',
    amount: 100, // £1.00 (Razorpay min is £1)
    displayAmount: '£1',
  },
  IE: {
    countryCode: 'IE',
    countryName: 'Ireland',
    flag: '🇮🇪',
    currencyCode: 'EUR',
    currencySymbol: '€',
    amount: 100, // €1.00
    displayAmount: '€1',
  },

  // Western Europe (EUR)
  DE: {
    countryCode: 'DE',
    countryName: 'Germany',
    flag: '🇩🇪',
    currencyCode: 'EUR',
    currencySymbol: '€',
    amount: 100, // €1.00 (Razorpay min is €1)
    displayAmount: '€1',
  },
  FR: {
    countryCode: 'FR',
    countryName: 'France',
    flag: '🇫🇷',
    currencyCode: 'EUR',
    currencySymbol: '€',
    amount: 100,
    displayAmount: '€1',
  },
  NL: {
    countryCode: 'NL',
    countryName: 'Netherlands',
    flag: '🇳🇱',
    currencyCode: 'EUR',
    currencySymbol: '€',
    amount: 100,
    displayAmount: '€1',
  },
  BE: {
    countryCode: 'BE',
    countryName: 'Belgium',
    flag: '🇧🇪',
    currencyCode: 'EUR',
    currencySymbol: '€',
    amount: 100,
    displayAmount: '€1',
  },
  AT: {
    countryCode: 'AT',
    countryName: 'Austria',
    flag: '🇦🇹',
    currencyCode: 'EUR',
    currencySymbol: '€',
    amount: 100,
    displayAmount: '€1',
  },
  IT: {
    countryCode: 'IT',
    countryName: 'Italy',
    flag: '🇮🇹',
    currencyCode: 'EUR',
    currencySymbol: '€',
    amount: 100,
    displayAmount: '€1',
  },
  ES: {
    countryCode: 'ES',
    countryName: 'Spain',
    flag: '🇪🇸',
    currencyCode: 'EUR',
    currencySymbol: '€',
    amount: 100,
    displayAmount: '€1',
  },
  PT: {
    countryCode: 'PT',
    countryName: 'Portugal',
    flag: '🇵🇹',
    currencyCode: 'EUR',
    currencySymbol: '€',
    amount: 100,
    displayAmount: '€1',
  },
  FI: {
    countryCode: 'FI',
    countryName: 'Finland',
    flag: '🇫🇮',
    currencyCode: 'EUR',
    currencySymbol: '€',
    amount: 100,
    displayAmount: '€1',
  },
  GR: {
    countryCode: 'GR',
    countryName: 'Greece',
    flag: '🇬🇷',
    currencyCode: 'EUR',
    currencySymbol: '€',
    amount: 100,
    displayAmount: '€1',
  },
  LU: {
    countryCode: 'LU',
    countryName: 'Luxembourg',
    flag: '🇱🇺',
    currencyCode: 'EUR',
    currencySymbol: '€',
    amount: 100,
    displayAmount: '€1',
  },
  MT: {
    countryCode: 'MT',
    countryName: 'Malta',
    flag: '🇲🇹',
    currencyCode: 'EUR',
    currencySymbol: '€',
    amount: 100,
    displayAmount: '€1',
  },
  CY: {
    countryCode: 'CY',
    countryName: 'Cyprus',
    flag: '🇨🇾',
    currencyCode: 'EUR',
    currencySymbol: '€',
    amount: 100,
    displayAmount: '€1',
  },
  SK: {
    countryCode: 'SK',
    countryName: 'Slovakia',
    flag: '🇸🇰',
    currencyCode: 'EUR',
    currencySymbol: '€',
    amount: 100,
    displayAmount: '€1',
  },
  SI: {
    countryCode: 'SI',
    countryName: 'Slovenia',
    flag: '🇸🇮',
    currencyCode: 'EUR',
    currencySymbol: '€',
    amount: 100,
    displayAmount: '€1',
  },
  EE: {
    countryCode: 'EE',
    countryName: 'Estonia',
    flag: '🇪🇪',
    currencyCode: 'EUR',
    currencySymbol: '€',
    amount: 100,
    displayAmount: '€1',
  },
  LV: {
    countryCode: 'LV',
    countryName: 'Latvia',
    flag: '🇱🇻',
    currencyCode: 'EUR',
    currencySymbol: '€',
    amount: 100,
    displayAmount: '€1',
  },
  LT: {
    countryCode: 'LT',
    countryName: 'Lithuania',
    flag: '🇱🇹',
    currencyCode: 'EUR',
    currencySymbol: '€',
    amount: 100,
    displayAmount: '€1',
  },

  // Nordic (non-EUR)
  SE: {
    countryCode: 'SE',
    countryName: 'Sweden',
    flag: '🇸🇪',
    currencyCode: 'SEK',
    currencySymbol: 'kr',
    amount: 1000, // 10 SEK
    displayAmount: '10 kr',
  },
  NO: {
    countryCode: 'NO',
    countryName: 'Norway',
    flag: '🇳🇴',
    currencyCode: 'NOK',
    currencySymbol: 'kr',
    amount: 1000, // 10 NOK
    displayAmount: '10 kr',
  },
  DK: {
    countryCode: 'DK',
    countryName: 'Denmark',
    flag: '🇩🇰',
    currencyCode: 'DKK',
    currencySymbol: 'kr',
    amount: 700, // 7 DKK
    displayAmount: '7 kr',
  },
  IS: {
    countryCode: 'IS',
    countryName: 'Iceland',
    flag: '🇮🇸',
    currencyCode: 'EUR',
    currencySymbol: '€',
    amount: 100,
    displayAmount: '€1',
  },

  // Switzerland
  CH: {
    countryCode: 'CH',
    countryName: 'Switzerland',
    flag: '🇨🇭',
    currencyCode: 'CHF',
    currencySymbol: 'CHF',
    amount: 100, // 1 CHF
    displayAmount: 'CHF 1',
  },

  // Oceania
  AU: {
    countryCode: 'AU',
    countryName: 'Australia',
    flag: '🇦🇺',
    currencyCode: 'AUD',
    currencySymbol: 'A$',
    amount: 149, // A$1.49
    displayAmount: 'A$1.49',
  },
  NZ: {
    countryCode: 'NZ',
    countryName: 'New Zealand',
    flag: '🇳🇿',
    currencyCode: 'NZD',
    currencySymbol: 'NZ$',
    amount: 169, // NZ$1.69
    displayAmount: 'NZ$1.69',
  },

  // Asia - High income
  JP: {
    countryCode: 'JP',
    countryName: 'Japan',
    flag: '🇯🇵',
    currencyCode: 'JPY',
    currencySymbol: '¥',
    amount: 150, // ¥150
    displayAmount: '¥150',
  },
  SG: {
    countryCode: 'SG',
    countryName: 'Singapore',
    flag: '🇸🇬',
    currencyCode: 'SGD',
    currencySymbol: 'S$',
    amount: 149, // S$1.49
    displayAmount: 'S$1.49',
  },
  HK: {
    countryCode: 'HK',
    countryName: 'Hong Kong',
    flag: '🇭🇰',
    currencyCode: 'HKD',
    currencySymbol: 'HK$',
    amount: 800, // HK$8
    displayAmount: 'HK$8',
  },
  KR: {
    countryCode: 'KR',
    countryName: 'South Korea',
    flag: '🇰🇷',
    currencyCode: 'KRW',
    currencySymbol: '₩',
    amount: 1300, // ₩1,300
    displayAmount: '₩1,300',
  },
  TW: {
    countryCode: 'TW',
    countryName: 'Taiwan',
    flag: '🇹🇼',
    currencyCode: 'USD',
    currencySymbol: '$',
    amount: 100, // $1
    displayAmount: '$1',
  },

  // Middle East
  AE: {
    countryCode: 'AE',
    countryName: 'UAE',
    flag: '🇦🇪',
    currencyCode: 'AED',
    currencySymbol: 'د.إ',
    amount: 400, // 4 AED
    displayAmount: '4 AED',
  },
  SA: {
    countryCode: 'SA',
    countryName: 'Saudi Arabia',
    flag: '🇸🇦',
    currencyCode: 'SAR',
    currencySymbol: 'ر.س',
    amount: 400, // 4 SAR
    displayAmount: '4 SAR',
  },
  QA: {
    countryCode: 'QA',
    countryName: 'Qatar',
    flag: '🇶🇦',
    currencyCode: 'USD',
    currencySymbol: '$',
    amount: 100,
    displayAmount: '$1',
  },
  KW: {
    countryCode: 'KW',
    countryName: 'Kuwait',
    flag: '🇰🇼',
    currencyCode: 'USD',
    currencySymbol: '$',
    amount: 100,
    displayAmount: '$1',
  },
  BH: {
    countryCode: 'BH',
    countryName: 'Bahrain',
    flag: '🇧🇭',
    currencyCode: 'USD',
    currencySymbol: '$',
    amount: 100,
    displayAmount: '$1',
  },
  OM: {
    countryCode: 'OM',
    countryName: 'Oman',
    flag: '🇴🇲',
    currencyCode: 'USD',
    currencySymbol: '$',
    amount: 100,
    displayAmount: '$1',
  },
  IL: {
    countryCode: 'IL',
    countryName: 'Israel',
    flag: '🇮🇱',
    currencyCode: 'ILS',
    currencySymbol: '₪',
    amount: 400, // ₪4
    displayAmount: '₪4',
  },

  // =============================================
  // TIER 2 - Medium income countries (~$0.50-0.75)
  // =============================================

  // Eastern Europe
  PL: {
    countryCode: 'PL',
    countryName: 'Poland',
    flag: '🇵🇱',
    currencyCode: 'PLN',
    currencySymbol: 'zł',
    amount: 400, // 4 zł
    displayAmount: '4 zł',
  },
  CZ: {
    countryCode: 'CZ',
    countryName: 'Czech Republic',
    flag: '🇨🇿',
    currencyCode: 'EUR',
    currencySymbol: '€',
    amount: 100,
    displayAmount: '€1',
  },
  HU: {
    countryCode: 'HU',
    countryName: 'Hungary',
    flag: '🇭🇺',
    currencyCode: 'EUR',
    currencySymbol: '€',
    amount: 100,
    displayAmount: '€1',
  },
  RO: {
    countryCode: 'RO',
    countryName: 'Romania',
    flag: '🇷🇴',
    currencyCode: 'RON',
    currencySymbol: 'lei',
    amount: 500, // 5 RON
    displayAmount: '5 lei',
  },
  BG: {
    countryCode: 'BG',
    countryName: 'Bulgaria',
    flag: '🇧🇬',
    currencyCode: 'EUR',
    currencySymbol: '€',
    amount: 100,
    displayAmount: '€1',
  },
  HR: {
    countryCode: 'HR',
    countryName: 'Croatia',
    flag: '🇭🇷',
    currencyCode: 'EUR',
    currencySymbol: '€',
    amount: 100,
    displayAmount: '€1',
  },
  RS: {
    countryCode: 'RS',
    countryName: 'Serbia',
    flag: '🇷🇸',
    currencyCode: 'EUR',
    currencySymbol: '€',
    amount: 100,
    displayAmount: '€1',
  },
  UA: {
    countryCode: 'UA',
    countryName: 'Ukraine',
    flag: '🇺🇦',
    currencyCode: 'EUR',
    currencySymbol: '€',
    amount: 100,
    displayAmount: '€1',
  },
  TR: {
    countryCode: 'TR',
    countryName: 'Turkey',
    flag: '🇹🇷',
    currencyCode: 'TRY',
    currencySymbol: '₺',
    amount: 3500, // ₺35
    displayAmount: '₺35',
  },
  RU: {
    countryCode: 'RU',
    countryName: 'Russia',
    flag: '🇷🇺',
    currencyCode: 'USD',
    currencySymbol: '$',
    amount: 100, // $1 (RUB not supported well)
    displayAmount: '$1',
  },

  // Latin America
  BR: {
    countryCode: 'BR',
    countryName: 'Brazil',
    flag: '🇧🇷',
    currencyCode: 'BRL',
    currencySymbol: 'R$',
    amount: 500, // R$5
    displayAmount: 'R$5',
  },
  MX: {
    countryCode: 'MX',
    countryName: 'Mexico',
    flag: '🇲🇽',
    currencyCode: 'MXN',
    currencySymbol: 'MX$',
    amount: 1900, // MX$19
    displayAmount: 'MX$19',
  },
  AR: {
    countryCode: 'AR',
    countryName: 'Argentina',
    flag: '🇦🇷',
    currencyCode: 'USD',
    currencySymbol: '$',
    amount: 100, // $1 (ARS volatile)
    displayAmount: '$1',
  },
  CL: {
    countryCode: 'CL',
    countryName: 'Chile',
    flag: '🇨🇱',
    currencyCode: 'USD',
    currencySymbol: '$',
    amount: 100,
    displayAmount: '$1',
  },
  CO: {
    countryCode: 'CO',
    countryName: 'Colombia',
    flag: '🇨🇴',
    currencyCode: 'USD',
    currencySymbol: '$',
    amount: 100,
    displayAmount: '$1',
  },
  PE: {
    countryCode: 'PE',
    countryName: 'Peru',
    flag: '🇵🇪',
    currencyCode: 'USD',
    currencySymbol: '$',
    amount: 100,
    displayAmount: '$1',
  },

  // Africa
  ZA: {
    countryCode: 'ZA',
    countryName: 'South Africa',
    flag: '🇿🇦',
    currencyCode: 'ZAR',
    currencySymbol: 'R',
    amount: 1800, // R18
    displayAmount: 'R18',
  },
  EG: {
    countryCode: 'EG',
    countryName: 'Egypt',
    flag: '🇪🇬',
    currencyCode: 'USD',
    currencySymbol: '$',
    amount: 100,
    displayAmount: '$1',
  },
  MA: {
    countryCode: 'MA',
    countryName: 'Morocco',
    flag: '🇲🇦',
    currencyCode: 'USD',
    currencySymbol: '$',
    amount: 100,
    displayAmount: '$1',
  },

  // =============================================
  // TIER 3 - Lower income countries (~$0.30-0.50)
  // =============================================

  // Southeast Asia
  ID: {
    countryCode: 'ID',
    countryName: 'Indonesia',
    flag: '🇮🇩',
    currencyCode: 'IDR',
    currencySymbol: 'Rp',
    amount: 1500000, // Rp 15,000
    displayAmount: 'Rp 15,000',
  },
  PH: {
    countryCode: 'PH',
    countryName: 'Philippines',
    flag: '🇵🇭',
    currencyCode: 'PHP',
    currencySymbol: '₱',
    amount: 5000, // ₱50
    displayAmount: '₱50',
  },
  VN: {
    countryCode: 'VN',
    countryName: 'Vietnam',
    flag: '🇻🇳',
    currencyCode: 'USD',
    currencySymbol: '$',
    amount: 100, // $1 (VND not well supported)
    displayAmount: '$1',
  },
  TH: {
    countryCode: 'TH',
    countryName: 'Thailand',
    flag: '🇹🇭',
    currencyCode: 'THB',
    currencySymbol: '฿',
    amount: 3500, // ฿35
    displayAmount: '฿35',
  },
  MY: {
    countryCode: 'MY',
    countryName: 'Malaysia',
    flag: '🇲🇾',
    currencyCode: 'MYR',
    currencySymbol: 'RM',
    amount: 449, // RM4.49
    displayAmount: 'RM4.49',
  },
  MM: {
    countryCode: 'MM',
    countryName: 'Myanmar',
    flag: '🇲🇲',
    currencyCode: 'USD',
    currencySymbol: '$',
    amount: 100,
    displayAmount: '$1',
  },
  KH: {
    countryCode: 'KH',
    countryName: 'Cambodia',
    flag: '🇰🇭',
    currencyCode: 'USD',
    currencySymbol: '$',
    amount: 100,
    displayAmount: '$1',
  },

  // =============================================
  // TIER 4 - Lowest pricing (South Asia & Africa)
  // Using INR for unsupported currencies
  // =============================================
  PK: {
    countryCode: 'PK',
    countryName: 'Pakistan',
    flag: '🇵🇰',
    currencyCode: 'INR',
    currencySymbol: '₹',
    amount: 4100, // ₹41
    displayAmount: '₹41',
  },
  BD: {
    countryCode: 'BD',
    countryName: 'Bangladesh',
    flag: '🇧🇩',
    currencyCode: 'INR',
    currencySymbol: '₹',
    amount: 4100, // ₹41
    displayAmount: '₹41',
  },
  NG: {
    countryCode: 'NG',
    countryName: 'Nigeria',
    flag: '🇳🇬',
    currencyCode: 'INR',
    currencySymbol: '₹',
    amount: 4100, // ₹41
    displayAmount: '₹41',
  },
  KE: {
    countryCode: 'KE',
    countryName: 'Kenya',
    flag: '🇰🇪',
    currencyCode: 'INR',
    currencySymbol: '₹',
    amount: 4100, // ₹41
    displayAmount: '₹41',
  },
  LK: {
    countryCode: 'LK',
    countryName: 'Sri Lanka',
    flag: '🇱🇰',
    currencyCode: 'INR',
    currencySymbol: '₹',
    amount: 4100, // ₹41
    displayAmount: '₹41',
  },
  NP: {
    countryCode: 'NP',
    countryName: 'Nepal',
    flag: '🇳🇵',
    currencyCode: 'INR',
    currencySymbol: '₹',
    amount: 4100, // ₹41
    displayAmount: '₹41',
  },
  GH: {
    countryCode: 'GH',
    countryName: 'Ghana',
    flag: '🇬🇭',
    currencyCode: 'INR',
    currencySymbol: '₹',
    amount: 4100,
    displayAmount: '₹41',
  },
  TZ: {
    countryCode: 'TZ',
    countryName: 'Tanzania',
    flag: '🇹🇿',
    currencyCode: 'INR',
    currencySymbol: '₹',
    amount: 4100,
    displayAmount: '₹41',
  },
  UG: {
    countryCode: 'UG',
    countryName: 'Uganda',
    flag: '🇺🇬',
    currencyCode: 'INR',
    currencySymbol: '₹',
    amount: 4100,
    displayAmount: '₹41',
  },
  ZW: {
    countryCode: 'ZW',
    countryName: 'Zimbabwe',
    flag: '🇿🇼',
    currencyCode: 'USD',
    currencySymbol: '$',
    amount: 100,
    displayAmount: '$1',
  },
}

// Default pricing for countries not in the list
// Using USD as it's widely accepted by international cards
export const DEFAULT_PRICING: CountryPricing = {
  countryCode: 'XX',
  countryName: 'International',
  flag: '🌍',
  currencyCode: 'USD',
  currencySymbol: '$',
  amount: 100, // $1 (meets Razorpay minimum)
  displayAmount: '$1',
}

// Get pricing for a country
export const getPricing = (countryCode: string): CountryPricing => {
  return PRICING[countryCode.toUpperCase()] || DEFAULT_PRICING
}

// Razorpay supported currencies
export const RAZORPAY_SUPPORTED_CURRENCIES = [
  'INR', 'USD', 'EUR', 'GBP', 'SGD', 'AED', 'AUD', 'CAD', 'CNY', 'SEK',
  'NZD', 'MXN', 'CHF', 'JPY', 'NOK', 'BRL', 'HKD', 'THB', 'PLN',
  'DKK', 'ILS', 'KRW', 'MYR', 'PHP', 'RON', 'TRY', 'ZAR', 'IDR', 'SAR'
]

// Check if a currency is supported by Razorpay
export const isCurrencySupported = (currencyCode: string): boolean => {
  return RAZORPAY_SUPPORTED_CURRENCIES.includes(currencyCode)
}


