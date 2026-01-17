// Type definitions for the editor

export type Platform = 'ios' | 'android'

export interface Project {
  id: string
  name: string
  platform: Platform
  screens: Screen[]
  createdAt: string
  updatedAt: string
}

export interface Screen {
  id: string
  order: number
  canvasData: string // Fabric.js JSON
  thumbnail?: string
}

export interface TextElement {
  id: string
  type: 'text'
  content: string
  fontFamily: string
  fontSize: number
  fontWeight: number
  color: string
  x: number
  y: number
  width: number
  textAlign: 'left' | 'center' | 'right'
  lineHeight: number
  letterSpacing: number
  shadow?: TextShadow
}

export interface TextShadow {
  color: string
  blur: number
  offsetX: number
  offsetY: number
}

export interface ImageElement {
  id: string
  type: 'image'
  src: string
  x: number
  y: number
  width: number
  height: number
  rotation: number
  opacity: number
}

export interface DeviceElement {
  id: string
  type: 'device'
  deviceId: string
  screenshotSrc?: string
  x: number
  y: number
  scale: number
  rotation: number
  shadow: boolean
}

export interface ShapeElement {
  id: string
  type: 'shape'
  shapeType: 'rectangle' | 'circle' | 'rounded-rect'
  x: number
  y: number
  width: number
  height: number
  fill: string
  stroke?: string
  strokeWidth?: number
  cornerRadius?: number
  opacity: number
}

export type CanvasElement = TextElement | ImageElement | DeviceElement | ShapeElement

export interface CanvasBackground {
  type: 'solid' | 'gradient' | 'image'
  value: string | GradientConfig
}

export interface GradientConfig {
  type: 'linear' | 'radial'
  colors: string[]
  angle?: number // for linear
}

export interface EditorState {
  // Project data
  project: Project | null
  currentScreenIndex: number
  
  // Canvas state
  canvasWidth: number
  canvasHeight: number
  zoom: number
  
  // Selection
  selectedElementId: string | null
  
  // History
  history: string[]
  historyIndex: number
  
  // UI state
  activeTool: ToolType
  sidebarTab: SidebarTab
}

export type ToolType = 
  | 'select'
  | 'text'
  | 'device'
  | 'image'
  | 'shape'
  | 'hand'

export type SidebarTab = 
  | 'templates'
  | 'devices'
  | 'text'
  | 'backgrounds'
  | 'elements'
  | 'uploads'

export interface Template {
  id: string
  name: string
  category: TemplateCategory
  platform: Platform
  thumbnail: string
  canvasData: string
  isPremium: boolean
}

export type TemplateCategory = 
  | 'minimal'
  | 'bold'
  | 'gradient'
  | 'lifestyle'
  | 'tech'
  | 'gaming'
  | 'social'
  | 'ecommerce'

export interface ExportOptions {
  format: 'png' | 'jpg'
  quality: number // 0-1 for jpg
  scale: number // 1x, 2x, 3x
  includeBackground: boolean
}


