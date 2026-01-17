import { create } from 'zustand'

// Device base configurations - without color
interface DeviceBase {
  width: number
  height: number
  name: string
  notchStyle: 'dynamic-island' | 'notch' | 'pill' | 'punch-hole' | 'none'
  cornerRadius: number
  platform: 'ios' | 'android'
  bezelWidth: number // How thick the frame is
}

const DEVICE_BASES: Record<string, DeviceBase> = {
  // iOS Devices
  'iphone-15-pro-max': { 
    width: 430, height: 932, name: 'iPhone 15 Pro Max',
    notchStyle: 'dynamic-island', cornerRadius: 55, platform: 'ios', bezelWidth: 3
  },
  'iphone-15-pro': { 
    width: 393, height: 852, name: 'iPhone 15 Pro',
    notchStyle: 'dynamic-island', cornerRadius: 53, platform: 'ios', bezelWidth: 3
  },
  'iphone-15-plus': { 
    width: 430, height: 932, name: 'iPhone 15 Plus',
    notchStyle: 'dynamic-island', cornerRadius: 55, platform: 'ios', bezelWidth: 4
  },
  'iphone-15': { 
    width: 393, height: 852, name: 'iPhone 15',
    notchStyle: 'dynamic-island', cornerRadius: 53, platform: 'ios', bezelWidth: 4
  },
  'iphone-14-pro-max': { 
    width: 430, height: 932, name: 'iPhone 14 Pro Max',
    notchStyle: 'dynamic-island', cornerRadius: 55, platform: 'ios', bezelWidth: 3
  },
  'iphone-14-pro': { 
    width: 393, height: 852, name: 'iPhone 14 Pro',
    notchStyle: 'dynamic-island', cornerRadius: 53, platform: 'ios', bezelWidth: 3
  },
  'iphone-14': { 
    width: 390, height: 844, name: 'iPhone 14',
    notchStyle: 'notch', cornerRadius: 47, platform: 'ios', bezelWidth: 4
  },
  'iphone-13': { 
    width: 390, height: 844, name: 'iPhone 13',
    notchStyle: 'notch', cornerRadius: 47, platform: 'ios', bezelWidth: 4
  },
  'iphone-se': { 
    width: 375, height: 667, name: 'iPhone SE',
    notchStyle: 'none', cornerRadius: 30, platform: 'ios', bezelWidth: 5
  },
  'ipad-pro-12': { 
    width: 1024, height: 1366, name: 'iPad Pro 12.9"',
    notchStyle: 'none', cornerRadius: 20, platform: 'ios', bezelWidth: 6
  },
  'ipad-pro-11': { 
    width: 834, height: 1194, name: 'iPad Pro 11"',
    notchStyle: 'none', cornerRadius: 20, platform: 'ios', bezelWidth: 6
  },
  
  // Android Devices
  'pixel-8-pro': { 
    width: 412, height: 892, name: 'Google Pixel 8 Pro',
    notchStyle: 'punch-hole', cornerRadius: 42, platform: 'android', bezelWidth: 3
  },
  'pixel-8': { 
    width: 393, height: 851, name: 'Google Pixel 8',
    notchStyle: 'punch-hole', cornerRadius: 40, platform: 'android', bezelWidth: 3
  },
  'pixel-7-pro': { 
    width: 412, height: 892, name: 'Google Pixel 7 Pro',
    notchStyle: 'punch-hole', cornerRadius: 40, platform: 'android', bezelWidth: 3
  },
  'pixel-7': { 
    width: 393, height: 851, name: 'Google Pixel 7',
    notchStyle: 'punch-hole', cornerRadius: 38, platform: 'android', bezelWidth: 3
  },
  'galaxy-s24-ultra': { 
    width: 440, height: 984, name: 'Samsung Galaxy S24 Ultra',
    notchStyle: 'punch-hole', cornerRadius: 30, platform: 'android', bezelWidth: 2
  },
  'galaxy-s24-plus': { 
    width: 412, height: 919, name: 'Samsung Galaxy S24+',
    notchStyle: 'punch-hole', cornerRadius: 35, platform: 'android', bezelWidth: 3
  },
  'galaxy-s24': { 
    width: 393, height: 873, name: 'Samsung Galaxy S24',
    notchStyle: 'punch-hole', cornerRadius: 38, platform: 'android', bezelWidth: 3
  },
  'galaxy-z-fold5': { 
    width: 426, height: 945, name: 'Samsung Galaxy Z Fold 5',
    notchStyle: 'punch-hole', cornerRadius: 25, platform: 'android', bezelWidth: 3
  },
  'oneplus-12': { 
    width: 412, height: 919, name: 'OnePlus 12',
    notchStyle: 'punch-hole', cornerRadius: 42, platform: 'android', bezelWidth: 3
  },
}

// Color variants
type FrameColor = 'black' | 'white'

const FRAME_COLORS: Record<FrameColor, { frame: string; border: string; screen: string }> = {
  black: { frame: '#1C1C1E', border: '#3A3A3C', screen: '#2C2C2E' }, // Dark grey screen for visibility
  white: { frame: '#F5F5F7', border: '#D1D1D6', screen: '#1C1C1E' },
}

// Combined device config
interface DeviceConfig extends DeviceBase {
  frameColor: string
  borderColor: string
  screenColor: string
}

const getDeviceConfig = (deviceId: string, color: FrameColor = 'black'): DeviceConfig => {
  const base = DEVICE_BASES[deviceId] || DEVICE_BASES['iphone-15-pro']
  const colors = FRAME_COLORS[color]
  return {
    ...base,
    frameColor: colors.frame,
    borderColor: colors.border,
    screenColor: colors.screen,
  }
}

// Export for use in components
export { DEVICE_BASES, FRAME_COLORS, getDeviceConfig }
export type { FrameColor }

// Standard display size for all devices - MUCH BIGGER to fill canvas properly
const DEVICE_DISPLAY_WIDTH = 750
const DEVICE_DISPLAY_HEIGHT = 1550

// Store for canvas instance to be accessed globally
interface CanvasStore {
  canvas: any | null
  fabric: any | null
  currentDeviceId: string | null
  currentFrameColor: FrameColor
  currentScreenshotUrl: string | null  // Track current screenshot
  
  // History for undo/redo
  history: string[]
  historyIndex: number
  isUndoRedoing: boolean
  
  setCanvas: (canvas: any) => void
  setFabric: (fabric: any) => void
  
  // Canvas actions
  addText: (text: string, options?: any) => void
  addDevice: (deviceId: string, color?: FrameColor) => void
  changeDeviceColor: (color: FrameColor) => void
  addRandomDevice: (platform?: 'ios' | 'android') => void
  setBackground: (background: string) => void
  addShape: (shapeType: string, color?: string) => void
  addBadge: (badgeType: string, color: string) => void
  addEmoji: (emoji: string) => void
  addImage: (imageUrl: string) => void
  addScreenshotToDevice: (imageUrl: string) => void
  removeScreenshotFromDevice: () => void
  deleteSelected: () => void
  clearCanvas: () => void
  getSelectedObject: () => any
  
  // History actions
  saveToHistory: () => void
  undo: () => void
  redo: () => void
  canUndo: () => boolean
  canRedo: () => boolean
}

export const useCanvasStore = create<CanvasStore>((set, get) => ({
  canvas: null,
  fabric: null,
  currentDeviceId: null,
  currentFrameColor: 'black',
  currentScreenshotUrl: null,
  
  // History
  history: [],
  historyIndex: -1,
  isUndoRedoing: false,
  
  setCanvas: (canvas) => {
    set({ canvas })
    // Save initial state to history after canvas is ready
    setTimeout(() => {
      const { saveToHistory } = get()
      saveToHistory()
    }, 1000)
  },
  setFabric: (fabric) => set({ fabric }),
  
  // Save current canvas state to history
  saveToHistory: () => {
    const { canvas, historyIndex, history, isUndoRedoing } = get()
    if (!canvas || isUndoRedoing) return
    
    try {
      const json = JSON.stringify(canvas.toJSON(['name', 'data', 'selectable', 'evented', 'hasControls', 'hasBorders', 'lockMovementX', 'lockMovementY', 'lockScalingX', 'lockScalingY', 'lockRotation']))
      
      // Don't save if same as last state
      if (history.length > 0 && history[historyIndex] === json) {
        return
      }
      
      // Remove any future states if we're not at the end
      const newHistory = history.slice(0, historyIndex + 1)
      newHistory.push(json)
      
      // Limit history size to 30 states
      if (newHistory.length > 30) {
        newHistory.shift()
        set({ 
          history: newHistory, 
          historyIndex: newHistory.length - 1 
        })
      } else {
        set({ 
          history: newHistory, 
          historyIndex: newHistory.length - 1 
        })
      }
      
      console.log('History saved, index:', newHistory.length - 1, 'total:', newHistory.length)
    } catch (e) {
      console.error('Failed to save history:', e)
    }
  },
  
  // Undo
  undo: () => {
    const { canvas, historyIndex, history } = get()
    console.log('Undo called, index:', historyIndex, 'history length:', history.length)
    
    if (!canvas || historyIndex <= 0) {
      console.log('Cannot undo - no history or at start')
      return
    }
    
    set({ isUndoRedoing: true })
    
    const newIndex = historyIndex - 1
    const prevState = history[newIndex]
    
    try {
      const parsed = JSON.parse(prevState)
      canvas.loadFromJSON(parsed, () => {
        canvas.renderAll()
        // Make sure background stays non-selectable
        canvas.forEachObject((obj: any) => {
          if (obj.name === 'background') {
            obj.selectable = false
            obj.evented = false
          }
        })
        canvas.renderAll()
        set({ historyIndex: newIndex, isUndoRedoing: false })
        console.log('Undo complete, new index:', newIndex)
      })
    } catch (e) {
      console.error('Undo failed:', e)
      set({ isUndoRedoing: false })
    }
  },
  
  // Redo
  redo: () => {
    const { canvas, historyIndex, history } = get()
    console.log('Redo called, index:', historyIndex, 'history length:', history.length)
    
    if (!canvas || historyIndex >= history.length - 1) {
      console.log('Cannot redo - at end of history')
      return
    }
    
    set({ isUndoRedoing: true })
    
    const newIndex = historyIndex + 1
    const nextState = history[newIndex]
    
    try {
      const parsed = JSON.parse(nextState)
      canvas.loadFromJSON(parsed, () => {
        canvas.renderAll()
        // Make sure background stays non-selectable
        canvas.forEachObject((obj: any) => {
          if (obj.name === 'background') {
            obj.selectable = false
            obj.evented = false
          }
        })
        canvas.renderAll()
        set({ historyIndex: newIndex, isUndoRedoing: false })
        console.log('Redo complete, new index:', newIndex)
      })
    } catch (e) {
      console.error('Redo failed:', e)
      set({ isUndoRedoing: false })
    }
  },
  
  canUndo: () => {
    const { historyIndex } = get()
    return historyIndex > 0
  },
  
  canRedo: () => {
    const { historyIndex, history } = get()
    return historyIndex < history.length - 1
  },
  
  getSelectedObject: () => {
    const { canvas } = get()
    if (!canvas) return null
    return canvas.getActiveObject()
  },
  
  addText: (text, options = {}) => {
    const { canvas, fabric } = get()
    if (!canvas || !fabric) return
    
    // Use Textbox for automatic text wrapping
    const textObj = new fabric.Textbox(text, {
      left: canvas.width / 2,
      top: 300,
      width: Math.min(canvas.width - 100, 800), // Set width for text wrapping
      fontSize: options.fontSize || 72,
      fontFamily: options.fontFamily || 'Clash Display',
      fontWeight: options.fontWeight || '700',
      fill: options.fill || '#FFFFFF',
      textAlign: 'center',
      originX: 'center',
      originY: 'center',
      selectable: true,
      editable: true,
      splitByGrapheme: false,
      shadow: new fabric.Shadow({
        color: 'rgba(0,0,0,0.3)',
        blur: 10,
        offsetX: 0,
        offsetY: 5,
      }),
    })
    
    canvas.add(textObj)
    canvas.setActiveObject(textObj)
    canvas.renderAll()
  },
  
  addDevice: (deviceId, color) => {
    const { canvas, fabric, currentFrameColor } = get()
    if (!canvas || !fabric) return
    
    const frameColor = color || currentFrameColor
    
    // Find existing device position (for replacement)
    const objects = canvas.getObjects()
    let existingDevicePosition = { x: (canvas.width - DEVICE_DISPLAY_WIDTH) / 2, y: 700 }
    let existingScale = { x: 1, y: 1 }
    
    // Remove existing device and screenshot
    objects.forEach((obj: any) => {
      if (obj.name && obj.name.startsWith('device-group')) {
        existingDevicePosition = { x: obj.left, y: obj.top }
        existingScale = { x: obj.scaleX || 1, y: obj.scaleY || 1 }
        canvas.remove(obj)
      }
      if (obj.name === 'device-screenshot') {
        canvas.remove(obj)
      }
    })
    
    const device = getDeviceConfig(deviceId, frameColor)
    
    // Scale device to standard display size
    const scaleX = DEVICE_DISPLAY_WIDTH / device.width
    const scaleY = DEVICE_DISPLAY_HEIGHT / device.height
    const scale = Math.min(scaleX, scaleY)
    
    const scaledWidth = device.width * scale
    const scaledHeight = device.height * scale
    const scaledCornerRadius = device.cornerRadius * scale
    const scaledBezel = device.bezelWidth * scale
    
    // Screen dimensions
    const screenPadding = (8 + device.bezelWidth) * scale
    const screenTopPadding = device.notchStyle === 'notch' ? 35 * scale : 
                             device.notchStyle === 'none' && device.platform === 'ios' ? 25 * scale : 
                             12 * scale
    const screenBottomPadding = device.notchStyle === 'none' && device.name.includes('iPhone SE') ? 50 * scale : 12 * scale
    
    // Create device frame (outer body)
    const deviceFrame = new fabric.Rect({
      width: scaledWidth,
      height: scaledHeight,
      rx: scaledCornerRadius,
      ry: scaledCornerRadius,
      fill: device.frameColor,
      stroke: device.borderColor,
      strokeWidth: scaledBezel,
    })
    
    // Screen inside device (will be made transparent when screenshot is added)
    const deviceScreen = new fabric.Rect({
      left: screenPadding,
      top: screenTopPadding,
      width: scaledWidth - screenPadding * 2,
      height: scaledHeight - screenTopPadding - screenBottomPadding,
      rx: Math.max(scaledCornerRadius - screenPadding, 15),
      ry: Math.max(scaledCornerRadius - screenPadding, 15),
      fill: device.screenColor,
    })
    
    const groupItems = [deviceFrame, deviceScreen]
    
    // Add notch/dynamic island/punch-hole
    if (device.notchStyle === 'dynamic-island') {
      const islandWidth = 95 * scale
      const islandHeight = 30 * scale
      const island = new fabric.Rect({
        left: (scaledWidth - islandWidth) / 2,
        top: screenTopPadding + 8 * scale,
        width: islandWidth,
        height: islandHeight,
        rx: islandHeight / 2,
        ry: islandHeight / 2,
        fill: '#000000',
      })
      groupItems.push(island)
    } else if (device.notchStyle === 'notch') {
      const notchWidth = 160 * scale
      const notchHeight = 30 * scale
      const notch = new fabric.Rect({
        left: (scaledWidth - notchWidth) / 2,
        top: screenTopPadding,
        width: notchWidth,
        height: notchHeight,
        fill: device.frameColor,
      })
      const notchRound = new fabric.Rect({
        left: (scaledWidth - notchWidth) / 2,
        top: screenTopPadding + notchHeight - 15 * scale,
        width: notchWidth,
        height: 20 * scale,
        rx: 15 * scale,
        ry: 15 * scale,
        fill: device.frameColor,
      })
      groupItems.push(notch, notchRound)
    } else if (device.notchStyle === 'punch-hole') {
      const holeSize = 12 * scale
      const punchHole = new fabric.Circle({
        left: (scaledWidth - holeSize) / 2,
        top: screenTopPadding + 12 * scale,
        radius: holeSize / 2,
        fill: '#000000',
      })
      groupItems.push(punchHole)
    } else if (device.notchStyle === 'none' && device.name.includes('iPhone SE')) {
      const buttonSize = 45 * scale
      const homeButton = new fabric.Circle({
        left: (scaledWidth - buttonSize) / 2,
        top: scaledHeight - screenBottomPadding + 5 * scale,
        radius: buttonSize / 2,
        fill: device.screenColor,
        stroke: device.borderColor,
        strokeWidth: 2,
      })
      groupItems.push(homeButton)
    }
    
    // Group all device parts
    const group = new fabric.Group(groupItems, {
      left: existingDevicePosition.x,
      top: existingDevicePosition.y,
      scaleX: existingScale.x,
      scaleY: existingScale.y,
      name: `device-group-${deviceId}`,
      selectable: true,
      evented: true,
      hasControls: true,
      hasBorders: true,
      lockRotation: true,
      shadow: new fabric.Shadow({
        color: 'rgba(0,0,0,0.4)',
        blur: 50,
        offsetX: 0,
        offsetY: 25,
      }),
      // Store screen info for screenshot placement
      screenInfo: {
        padding: screenPadding,
        topPadding: screenTopPadding,
        bottomPadding: screenBottomPadding,
        cornerRadius: Math.max(scaledCornerRadius - screenPadding, 15),
      },
    })
    
    canvas.add(group)
    
    // Send device behind text but above background
    const bgIndex = canvas.getObjects().findIndex((obj: any) => obj.name === 'background')
    if (bgIndex !== -1) {
      canvas.moveTo(group, bgIndex + 1)
    }
    
    canvas.setActiveObject(group)
    canvas.renderAll()
    
    set({ currentDeviceId: deviceId, currentFrameColor: frameColor })
    
    // Re-apply screenshot if one exists
    const { currentScreenshotUrl } = get()
    if (currentScreenshotUrl) {
      // Small delay to ensure device is fully rendered, then apply screenshot
      setTimeout(() => {
        const { canvas } = get()
        if (!canvas) return
        
        // Find the new device group and make screen transparent FIRST
        const newDeviceGroup = canvas.getObjects().find((obj: any) => obj.name && obj.name.startsWith('device-group'))
        if (newDeviceGroup) {
          const groupObjects = newDeviceGroup.getObjects ? newDeviceGroup.getObjects() : []
          if (groupObjects.length > 1) {
            groupObjects[1].set('fill', 'transparent')
            newDeviceGroup.dirty = true
          }
        }
        
        // Then add the screenshot
        get().addScreenshotToDevice(currentScreenshotUrl)
      }, 150)
    }
  },
  
  changeDeviceColor: (color) => {
    const { currentDeviceId } = get()
    if (currentDeviceId) {
      get().addDevice(currentDeviceId, color)
    }
  },
  
  addRandomDevice: (platform?: 'ios' | 'android') => {
    // Filter devices by platform if specified, exclude iPads
    const deviceIds = Object.keys(DEVICE_BASES).filter(id => {
      const device = DEVICE_BASES[id]
      if (id.includes('ipad')) return false // Exclude iPads
      if (platform) {
        return device.platform === platform
      }
      return true
    })
    
    // Default devices per platform for consistency
    const defaultDevices = {
      ios: 'iphone-15-pro',
      android: 'pixel-8-pro'
    }
    
    // Use default device for platform, or random if no platform specified
    const deviceId = platform ? defaultDevices[platform] : deviceIds[Math.floor(Math.random() * deviceIds.length)]
    get().addDevice(deviceId, 'black')
  },
  
  setBackground: (background) => {
    const { canvas, fabric } = get()
    if (!canvas || !fabric) return
    
    // Find and remove existing background
    const objects = canvas.getObjects()
    const bgObject = objects.find((obj: any) => obj.name === 'background')
    if (bgObject) {
      canvas.remove(bgObject)
    }
    
    let bgRect
    
    // Check if it's a gradient or solid color
    if (background.startsWith('linear-gradient')) {
      // Parse gradient colors
      const colors = background.match(/#[a-fA-F0-9]{6}/g) || ['#0077B6', '#00B4D8']
      
      const gradient = new fabric.Gradient({
        type: 'linear',
        coords: { x1: 0, y1: 0, x2: 0, y2: canvas.height },
        colorStops: colors.map((color: string, index: number) => ({
          offset: index / (colors.length - 1),
          color,
        })),
      })
      
      bgRect = new fabric.Rect({
        left: 0,
        top: 0,
        width: canvas.width,
        height: canvas.height,
        fill: gradient,
        selectable: false,
        evented: false,
        name: 'background',
      })
    } else {
      bgRect = new fabric.Rect({
        left: 0,
        top: 0,
        width: canvas.width,
        height: canvas.height,
        fill: background,
        selectable: false,
        evented: false,
        name: 'background',
      })
    }
    
    canvas.add(bgRect)
    canvas.sendToBack(bgRect)
    canvas.renderAll()
  },
  
  addShape: (shapeType, color) => {
    const { canvas, fabric } = get()
    if (!canvas || !fabric) return
    
    let shape
    const centerX = canvas.width / 2
    const centerY = 400
    
    switch (shapeType) {
      case 'rectangle':
        shape = new fabric.Rect({
          left: centerX - 100,
          top: centerY - 75,
          width: 200,
          height: 150,
          fill: color || '#8B5CF6',
          rx: 15,
          ry: 15,
        })
        break
      case 'circle':
        shape = new fabric.Circle({
          left: centerX - 75,
          top: centerY - 75,
          radius: 75,
          fill: color || '#EC4899',
        })
        break
      case 'star':
        const points: { x: number; y: number }[] = []
        const outerRadius = 80
        const innerRadius = 40
        for (let i = 0; i < 10; i++) {
          const radius = i % 2 === 0 ? outerRadius : innerRadius
          const angle = (Math.PI / 5) * i - Math.PI / 2
          points.push({
            x: centerX + radius * Math.cos(angle),
            y: centerY + radius * Math.sin(angle),
          })
        }
        shape = new fabric.Polygon(points, {
          fill: color || '#06B6D4',
        })
        break
      case 'heart':
        // Heart shape using path
        shape = new fabric.Path('M 0 -30 C -25 -60, -50 -30, -50 0 C -50 30, -25 50, 0 70 C 25 50, 50 30, 50 0 C 50 -30, 25 -60, 0 -30 Z', {
          left: centerX - 50,
          top: centerY - 50,
          fill: color || '#EC4899',
          scaleX: 1.5,
          scaleY: 1.5,
        })
        break
      case 'triangle':
        shape = new fabric.Triangle({
          left: centerX - 75,
          top: centerY - 65,
          width: 150,
          height: 130,
          fill: color || '#A78BFA',
        })
        break
      default:
        shape = new fabric.Rect({
          left: centerX - 100,
          top: centerY - 75,
          width: 200,
          height: 150,
          fill: color || '#8B5CF6',
          rx: 15,
          ry: 15,
        })
    }
    
    canvas.add(shape)
    canvas.setActiveObject(shape)
    canvas.renderAll()
  },
  
  addBadge: (badgeType, color) => {
    const { canvas, fabric } = get()
    if (!canvas || !fabric) return
    
    const centerX = canvas.width / 2
    const centerY = 350
    const text = badgeType.toUpperCase()
    const padding = 20
    const fontSize = 24
    
    // Calculate text width (approximate)
    const textWidth = text.length * fontSize * 0.6
    const badgeWidth = textWidth + padding * 2
    const badgeHeight = fontSize + padding * 1.5
    
    // Create badge background (rounded rectangle)
    const badgeBg = new fabric.Rect({
      left: 0,
      top: 0,
      width: badgeWidth,
      height: badgeHeight,
      rx: badgeHeight / 2,
      ry: badgeHeight / 2,
      fill: color,
      originX: 'center',
      originY: 'center',
    })
    
    // Create badge text
    const badgeText = new fabric.Text(text, {
      left: 0,
      top: 0,
      fontSize: fontSize,
      fontFamily: 'Arial',
      fontWeight: 'bold',
      fill: '#FFFFFF',
      originX: 'center',
      originY: 'center',
    })
    
    // Group them together
    const badge = new fabric.Group([badgeBg, badgeText], {
      left: centerX,
      top: centerY,
      originX: 'center',
      originY: 'center',
      selectable: true,
      hasControls: true,
      hasBorders: true,
    })
    
    canvas.add(badge)
    canvas.setActiveObject(badge)
    canvas.renderAll()
  },
  
  addEmoji: (emoji) => {
    const { canvas, fabric } = get()
    if (!canvas || !fabric) return
    
    const centerX = canvas.width / 2
    const centerY = 350
    
    const emojiText = new fabric.Text(emoji, {
      left: centerX,
      top: centerY,
      fontSize: 80,
      originX: 'center',
      originY: 'center',
      selectable: true,
    })
    
    canvas.add(emojiText)
    canvas.setActiveObject(emojiText)
    canvas.renderAll()
  },
  
  addImage: (imageUrl) => {
    const { canvas, fabric } = get()
    if (!canvas || !fabric) return
    
    // Check if there's a device on the canvas
    const deviceGroup = canvas.getObjects().find((obj: any) => 
      obj.name && obj.name.startsWith('device-group')
    )
    
    // If device exists, automatically place image inside it
    if (deviceGroup) {
      get().addScreenshotToDevice(imageUrl)
      return
    }
    
    // Otherwise, add image normally to canvas
    const imgElement = new Image()
    imgElement.crossOrigin = 'anonymous'
    imgElement.onload = () => {
      const img = new fabric.Image(imgElement, {
        left: canvas.width / 2,
        top: 500,
        originX: 'center',
        originY: 'center',
        selectable: true,
        hasControls: true,
        hasBorders: true,
      })
      
      // Scale image to fit within canvas
      const maxWidth = canvas.width * 0.6
      const maxHeight = 700
      const scale = Math.min(maxWidth / img.width!, maxHeight / img.height!, 1)
      
      img.scale(scale)
      
      canvas.add(img)
      canvas.setActiveObject(img)
      canvas.renderAll()
    }
    imgElement.src = imageUrl
  },
  
  removeScreenshotFromDevice: () => {
    const { canvas } = get()
    if (!canvas) return
    
    // Remove screenshot and notch overlay
    const toRemove = canvas.getObjects().filter((obj: any) => 
      obj.name === 'device-screenshot' || obj.name === 'notch-overlay'
    )
    toRemove.forEach((obj: any) => canvas.remove(obj))
    
    if (toRemove.length > 0) {
      canvas.renderAll()
    }
    
    // Clear stored screenshot URL
    set({ currentScreenshotUrl: null })
  },
  
  addScreenshotToDevice: (imageUrl) => {
    const { canvas, fabric, currentDeviceId, currentFrameColor } = get()
    if (!canvas || !fabric) return
    
    // Store the screenshot URL
    set({ currentScreenshotUrl: imageUrl })
    
    // Find the device group
    const deviceGroup = canvas.getObjects().find((obj: any) => obj.name && obj.name.startsWith('device-group'))
    
    if (!deviceGroup) {
      // No device, just add as regular image
      get().addImage(imageUrl)
      return
    }
    
    // Remove any existing screenshot and notch overlay
    canvas.getObjects().forEach((obj: any) => {
      if (obj.name === 'device-screenshot' || obj.name === 'notch-overlay') {
        canvas.remove(obj)
      }
    })
    
    // Get device properties
    const deviceAngle = deviceGroup.angle || 0
    const groupScaleX = deviceGroup.scaleX || 1
    const groupScaleY = deviceGroup.scaleY || 1
    
    // Get the ACTUAL center point of the device (important when rotated)
    const center = deviceGroup.getCenterPoint()
    const deviceCenterX = center.x
    const deviceCenterY = center.y
    
    // Get the device's BASE dimensions (unscaled group dimensions)
    const baseWidth = deviceGroup.width || 400
    const baseHeight = deviceGroup.height || 800
    
    // Get screen info - these are already scaled values stored during device creation
    const screenInfo = deviceGroup.screenInfo || {}
    // DON'T double scale - screenInfo already has scaled values for base scale
    // But we need to account for any additional scaling from user
    const screenPadding = (screenInfo.padding || 20) * groupScaleX
    const screenTopPadding = (screenInfo.topPadding || 40) * groupScaleY
    const screenBottomPadding = (screenInfo.bottomPadding || 20) * groupScaleY
    const cornerRadius = (screenInfo.cornerRadius || 15) * Math.min(groupScaleX, groupScaleY)
    
    // Actual device dimensions after all scaling
    const deviceWidth = baseWidth * groupScaleX
    const deviceHeight = baseHeight * groupScaleY
    
    // Screen dimensions
    const screenWidth = deviceWidth - (screenPadding * 2)
    const screenHeight = deviceHeight - screenTopPadding - screenBottomPadding
    
    // Screen center offset from device center (in device's local coordinates, before rotation)
    // Device center is at (0, 0) in local coords
    // Screen top edge is at: -baseHeight/2 * groupScaleY + screenTopPadding
    // Screen bottom edge is at: baseHeight/2 * groupScaleY - screenBottomPadding
    // Screen center Y: average of top and bottom
    const screenTopY = -(deviceHeight / 2) + screenTopPadding
    const screenBottomY = (deviceHeight / 2) - screenBottomPadding
    const screenCenterOffsetY = (screenTopY + screenBottomY) / 2
    const screenCenterOffsetX = 0 // Horizontally centered
    
    // Get device config for notch style
    const deviceId = currentDeviceId || 'iphone-15-pro'
    const device = getDeviceConfig(deviceId, currentFrameColor)
    
    // Load the image
    const imgElement = new Image()
    imgElement.crossOrigin = 'anonymous'
    imgElement.onload = () => {
      const img = new fabric.Image(imgElement)
      const imgWidth = img.width || 1
      const imgHeight = img.height || 1
      
      // Scale to COVER the screen
      const imgScale = Math.max(screenWidth / imgWidth, screenHeight / imgHeight)
      
      // Convert angle to radians
      const angleRad = (deviceAngle * Math.PI) / 180
      const cosA = Math.cos(angleRad)
      const sinA = Math.sin(angleRad)
      
      // Rotate screen center offset by device angle to get world position
      const rotatedOffsetX = screenCenterOffsetX * cosA - screenCenterOffsetY * sinA
      const rotatedOffsetY = screenCenterOffsetX * sinA + screenCenterOffsetY * cosA
      
      const screenCenterX = deviceCenterX + rotatedOffsetX
      const screenCenterY = deviceCenterY + rotatedOffsetY
      
      // Create screenshot - NOT selectable, moves with device
      img.set({
        left: screenCenterX,
        top: screenCenterY,
        originX: 'center',
        originY: 'center',
        scaleX: imgScale,
        scaleY: imgScale,
        angle: deviceAngle,
        selectable: false,
        evented: false,
        name: 'device-screenshot',
      })
      
      // Clip to screen area
      img.clipPath = new fabric.Rect({
        left: screenCenterX,
        top: screenCenterY,
        width: screenWidth,
        height: screenHeight,
        rx: cornerRadius,
        ry: cornerRadius,
        originX: 'center',
        originY: 'center',
        angle: deviceAngle,
        absolutePositioned: true,
      })
      
      canvas.add(img)
      canvas.bringToFront(img)
      
      // Add notch overlay on top
      const baseScale = Math.min(DEVICE_DISPLAY_WIDTH / device.width, DEVICE_DISPLAY_HEIGHT / device.height)
      const notchScale = baseScale * groupScaleX
      
      // Notch position: top of screen area
      const notchOffsetY = -(deviceHeight / 2) + screenTopPadding
      
      if (device.notchStyle === 'dynamic-island') {
        const islandWidth = 95 * notchScale
        const islandHeight = 30 * notchScale
        const islandOffsetY = notchOffsetY + 8 * groupScaleY + islandHeight / 2
        
        const rotatedIslandX = -islandOffsetY * sinA
        const rotatedIslandY = islandOffsetY * cosA
        
        const island = new fabric.Rect({
          left: deviceCenterX + rotatedIslandX,
          top: deviceCenterY + rotatedIslandY,
          width: islandWidth,
          height: islandHeight,
          rx: islandHeight / 2,
          ry: islandHeight / 2,
          fill: '#000000',
          originX: 'center',
          originY: 'center',
          angle: deviceAngle,
          selectable: false,
          evented: false,
          name: 'notch-overlay',
        })
        canvas.add(island)
        canvas.bringToFront(island)
      } else if (device.notchStyle === 'notch') {
        const notchWidth = 160 * notchScale
        const notchHeight = 35 * notchScale
        const notchCenterOffsetY = notchOffsetY + notchHeight / 2
        
        const rotatedNotchX = -notchCenterOffsetY * sinA
        const rotatedNotchY = notchCenterOffsetY * cosA
        
        const notch = new fabric.Rect({
          left: deviceCenterX + rotatedNotchX,
          top: deviceCenterY + rotatedNotchY,
          width: notchWidth,
          height: notchHeight,
          rx: 8,
          ry: 8,
          fill: device.frameColor,
          originX: 'center',
          originY: 'center',
          angle: deviceAngle,
          selectable: false,
          evented: false,
          name: 'notch-overlay',
        })
        canvas.add(notch)
        canvas.bringToFront(notch)
      } else if (device.notchStyle === 'punch-hole') {
        const holeSize = 14 * notchScale
        const holeOffsetY = notchOffsetY + 15 * groupScaleY
        
        const rotatedHoleX = -holeOffsetY * sinA
        const rotatedHoleY = holeOffsetY * cosA
        
        const punchHole = new fabric.Circle({
          left: deviceCenterX + rotatedHoleX,
          top: deviceCenterY + rotatedHoleY,
          radius: holeSize / 2,
          fill: '#000000',
          originX: 'center',
          originY: 'center',
          angle: deviceAngle,
          selectable: false,
          evented: false,
          name: 'notch-overlay',
        })
        canvas.add(punchHole)
        canvas.bringToFront(punchHole)
      }
      
      // Remove old event listeners
      deviceGroup.off('moving')
      deviceGroup.off('scaling')
      deviceGroup.off('rotating')
      
      // Reapply screenshot when device moves/scales/rotates
      const reapplyScreenshot = () => {
        const url = get().currentScreenshotUrl
        if (url) {
          requestAnimationFrame(() => {
            get().addScreenshotToDevice(url)
          })
        }
      }
      
      deviceGroup.on('moving', reapplyScreenshot)
      deviceGroup.on('scaling', reapplyScreenshot)
      deviceGroup.on('rotating', reapplyScreenshot)
      
      canvas.renderAll()
    }
    imgElement.src = imageUrl
  },
  
  deleteSelected: () => {
    const { canvas } = get()
    if (!canvas) return
    
    const activeObject = canvas.getActiveObject()
    if (activeObject) {
      // Don't delete background, device, screenshot, or notch overlay
      const protectedNames = ['background', 'device-screenshot', 'notch-overlay']
      if (protectedNames.includes(activeObject.name)) return
      if (activeObject.name && activeObject.name.startsWith('device-group')) return
      
      // Handle group selection (multiple objects)
      if (activeObject.type === 'activeSelection') {
        activeObject.forEachObject((obj: any) => {
          const isProtected = protectedNames.includes(obj.name) || 
                             (obj.name && obj.name.startsWith('device-group'))
          if (!isProtected) {
            canvas.remove(obj)
          }
        })
        canvas.discardActiveObject()
      } else {
        canvas.remove(activeObject)
      }
      
      canvas.renderAll()
    }
  },
  
  clearCanvas: () => {
    const { canvas } = get()
    if (!canvas) return
    
    const objects = canvas.getObjects()
    const toRemove: any[] = []
    
    objects.forEach((obj: any) => {
      if (obj.name !== 'background') {
        toRemove.push(obj)
      }
    })
    
    toRemove.forEach((obj) => canvas.remove(obj))
    canvas.discardActiveObject()
    canvas.renderAll()
    
    set({ currentDeviceId: null })
  },
}))

