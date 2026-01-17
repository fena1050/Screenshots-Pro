// Device configurations for App Store and Play Store screenshots

export interface DeviceConfig {
  id: string
  name: string
  platform: 'ios' | 'android'
  width: number
  height: number
  screenWidth: number
  screenHeight: number
  screenX: number
  screenY: number
  cornerRadius: number
  frameImage: string
  displayName: string
}

export const DEVICES: DeviceConfig[] = [
  // iOS Devices
  {
    id: 'iphone-15-pro-max',
    name: 'iPhone 15 Pro Max',
    platform: 'ios',
    width: 1290,
    height: 2796,
    screenWidth: 1179,
    screenHeight: 2556,
    screenX: 55,
    screenY: 120,
    cornerRadius: 55,
    frameImage: '/devices/iphone-15-pro-max.png',
    displayName: 'iPhone 15 Pro Max',
  },
  {
    id: 'iphone-15-pro',
    name: 'iPhone 15 Pro',
    platform: 'ios',
    width: 1179,
    height: 2556,
    screenWidth: 1070,
    screenHeight: 2320,
    screenX: 54,
    screenY: 118,
    cornerRadius: 50,
    frameImage: '/devices/iphone-15-pro.png',
    displayName: 'iPhone 15 Pro',
  },
  {
    id: 'iphone-15',
    name: 'iPhone 15',
    platform: 'ios',
    width: 1179,
    height: 2556,
    screenWidth: 1070,
    screenHeight: 2320,
    screenX: 54,
    screenY: 118,
    cornerRadius: 50,
    frameImage: '/devices/iphone-15.png',
    displayName: 'iPhone 15',
  },
  {
    id: 'iphone-14',
    name: 'iPhone 14',
    platform: 'ios',
    width: 1170,
    height: 2532,
    screenWidth: 1060,
    screenHeight: 2296,
    screenX: 55,
    screenY: 118,
    cornerRadius: 47,
    frameImage: '/devices/iphone-14.png',
    displayName: 'iPhone 14',
  },
  {
    id: 'ipad-pro-12',
    name: 'iPad Pro 12.9"',
    platform: 'ios',
    width: 2048,
    height: 2732,
    screenWidth: 1920,
    screenHeight: 2560,
    screenX: 64,
    screenY: 86,
    cornerRadius: 40,
    frameImage: '/devices/ipad-pro-12.png',
    displayName: 'iPad Pro 12.9"',
  },
  // Android Devices
  {
    id: 'pixel-8-pro',
    name: 'Pixel 8 Pro',
    platform: 'android',
    width: 1344,
    height: 2992,
    screenWidth: 1220,
    screenHeight: 2720,
    screenX: 62,
    screenY: 136,
    cornerRadius: 48,
    frameImage: '/devices/pixel-8-pro.png',
    displayName: 'Google Pixel 8 Pro',
  },
  {
    id: 'pixel-8',
    name: 'Pixel 8',
    platform: 'android',
    width: 1080,
    height: 2400,
    screenWidth: 980,
    screenHeight: 2180,
    screenX: 50,
    screenY: 110,
    cornerRadius: 44,
    frameImage: '/devices/pixel-8.png',
    displayName: 'Google Pixel 8',
  },
  {
    id: 'galaxy-s24-ultra',
    name: 'Galaxy S24 Ultra',
    platform: 'android',
    width: 1440,
    height: 3120,
    screenWidth: 1320,
    screenHeight: 2880,
    screenX: 60,
    screenY: 120,
    cornerRadius: 45,
    frameImage: '/devices/galaxy-s24-ultra.png',
    displayName: 'Samsung Galaxy S24 Ultra',
  },
  {
    id: 'galaxy-s24',
    name: 'Galaxy S24',
    platform: 'android',
    width: 1080,
    height: 2340,
    screenWidth: 980,
    screenHeight: 2120,
    screenX: 50,
    screenY: 110,
    cornerRadius: 42,
    frameImage: '/devices/galaxy-s24.png',
    displayName: 'Samsung Galaxy S24',
  },
]

// App Store screenshot dimensions (required sizes)
export const APP_STORE_SIZES = {
  'iphone-6.7': { width: 1290, height: 2796, name: '6.7" Display' },
  'iphone-6.5': { width: 1284, height: 2778, name: '6.5" Display' },
  'iphone-6.1': { width: 1179, height: 2556, name: '6.1" Display' },
  'iphone-5.5': { width: 1242, height: 2208, name: '5.5" Display' },
  'ipad-12.9': { width: 2048, height: 2732, name: '12.9" iPad Pro' },
  'ipad-11': { width: 1668, height: 2388, name: '11" iPad Pro' },
}

// Play Store screenshot dimensions
export const PLAY_STORE_SIZES = {
  phone: { width: 1080, height: 1920, name: 'Phone' },
  'phone-alt': { width: 1242, height: 2208, name: 'Phone (Alt)' },
  tablet: { width: 1200, height: 1920, name: 'Tablet 7"' },
  'tablet-10': { width: 1600, height: 2560, name: 'Tablet 10"' },
}

export const getDevicesByPlatform = (platform: 'ios' | 'android'): DeviceConfig[] => {
  return DEVICES.filter(device => device.platform === platform)
}

export const getDeviceById = (id: string): DeviceConfig | undefined => {
  return DEVICES.find(device => device.id === id)
}
