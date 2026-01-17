// Font configurations for the editor

export interface FontConfig {
  id: string
  name: string
  family: string
  category: 'sans-serif' | 'serif' | 'display' | 'monospace' | 'handwriting'
  weights: number[]
  googleFontUrl?: string
}

export const FONTS: FontConfig[] = [
  // Display Fonts - For headlines
  {
    id: 'clash-display',
    name: 'Clash Display',
    family: 'Clash Display',
    category: 'display',
    weights: [400, 500, 600, 700],
    googleFontUrl: 'https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap',
  },
  {
    id: 'cabinet-grotesk',
    name: 'Cabinet Grotesk',
    family: 'Cabinet Grotesk',
    category: 'display',
    weights: [400, 500, 700, 800],
    googleFontUrl: 'https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,500,700,800&display=swap',
  },
  {
    id: 'general-sans',
    name: 'General Sans',
    family: 'General Sans',
    category: 'sans-serif',
    weights: [400, 500, 600, 700],
    googleFontUrl: 'https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap',
  },
  // Sans-Serif Fonts
  {
    id: 'satoshi',
    name: 'Satoshi',
    family: 'Satoshi',
    category: 'sans-serif',
    weights: [400, 500, 700, 900],
    googleFontUrl: 'https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap',
  },
  {
    id: 'plus-jakarta',
    name: 'Plus Jakarta Sans',
    family: 'Plus Jakarta Sans',
    category: 'sans-serif',
    weights: [400, 500, 600, 700, 800],
    googleFontUrl: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap',
  },
  {
    id: 'dm-sans',
    name: 'DM Sans',
    family: 'DM Sans',
    category: 'sans-serif',
    weights: [400, 500, 700],
    googleFontUrl: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap',
  },
  {
    id: 'manrope',
    name: 'Manrope',
    family: 'Manrope',
    category: 'sans-serif',
    weights: [400, 500, 600, 700, 800],
    googleFontUrl: 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap',
  },
  {
    id: 'outfit',
    name: 'Outfit',
    family: 'Outfit',
    category: 'sans-serif',
    weights: [400, 500, 600, 700],
    googleFontUrl: 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap',
  },
  // Serif Fonts
  {
    id: 'playfair',
    name: 'Playfair Display',
    family: 'Playfair Display',
    category: 'serif',
    weights: [400, 500, 600, 700],
    googleFontUrl: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap',
  },
  {
    id: 'fraunces',
    name: 'Fraunces',
    family: 'Fraunces',
    category: 'serif',
    weights: [400, 500, 600, 700],
    googleFontUrl: 'https://fonts.googleapis.com/css2?family=Fraunces:wght@400;500;600;700&display=swap',
  },
  // Monospace
  {
    id: 'jetbrains-mono',
    name: 'JetBrains Mono',
    family: 'JetBrains Mono',
    category: 'monospace',
    weights: [400, 500, 700],
    googleFontUrl: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap',
  },
  {
    id: 'fira-code',
    name: 'Fira Code',
    family: 'Fira Code',
    category: 'monospace',
    weights: [400, 500, 700],
    googleFontUrl: 'https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;700&display=swap',
  },
]

export const getFontsByCategory = (category: FontConfig['category']): FontConfig[] => {
  return FONTS.filter(font => font.category === category)
}

export const getFontById = (id: string): FontConfig | undefined => {
  return FONTS.find(font => font.id === id)
}

export const getAllFontUrls = (): string[] => {
  return FONTS
    .filter(font => font.googleFontUrl)
    .map(font => font.googleFontUrl as string)
}

// Default font settings for new text elements
export const DEFAULT_TEXT_STYLES = {
  headline: {
    fontFamily: 'Clash Display',
    fontSize: 72,
    fontWeight: 700,
    lineHeight: 1.1,
    letterSpacing: -1,
  },
  subheadline: {
    fontFamily: 'Satoshi',
    fontSize: 36,
    fontWeight: 500,
    lineHeight: 1.3,
    letterSpacing: 0,
  },
  body: {
    fontFamily: 'Satoshi',
    fontSize: 24,
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: 0,
  },
  caption: {
    fontFamily: 'Satoshi',
    fontSize: 18,
    fontWeight: 400,
    lineHeight: 1.4,
    letterSpacing: 0.5,
  },
}
