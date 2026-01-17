import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'
import type { Project, Screen, Platform, ToolType, SidebarTab } from '@/types/editor'

interface EditorStore {
  // Project
  project: Project | null
  currentScreenIndex: number
  
  // Canvas
  canvasWidth: number
  canvasHeight: number
  zoom: number
  
  // Selection
  selectedElementId: string | null
  
  // History
  history: string[]
  historyIndex: number
  
  // UI
  activeTool: ToolType
  sidebarTab: SidebarTab
  isExportModalOpen: boolean
  isPreviewModalOpen: boolean
  
  // Actions - Project
  createProject: (name: string, platform: Platform) => void
  setProject: (project: Project) => void
  updateProjectName: (name: string) => void
  
  // Actions - Screens
  addScreen: () => void
  removeScreen: (index: number) => void
  setCurrentScreen: (index: number) => void
  updateScreenCanvas: (canvasData: string, thumbnail?: string, screenIndex?: number) => void
  reorderScreens: (fromIndex: number, toIndex: number) => void
  duplicateScreen: (index: number) => void
  
  // Actions - Canvas
  setZoom: (zoom: number) => void
  setCanvasSize: (width: number, height: number) => void
  
  // Actions - Selection
  setSelectedElement: (id: string | null) => void
  
  // Actions - History
  pushHistory: (state: string) => void
  undo: () => void
  redo: () => void
  clearHistory: () => void
  
  // Actions - UI
  setActiveTool: (tool: ToolType) => void
  setSidebarTab: (tab: SidebarTab) => void
  setExportModalOpen: (open: boolean) => void
  setPreviewModalOpen: (open: boolean) => void
  
  // Reset
  resetEditor: () => void
}

const createEmptyScreen = (order: number): Screen => ({
  id: uuidv4(),
  order,
  canvasData: '',
  thumbnail: undefined,
})

const initialState = {
  project: null,
  currentScreenIndex: 0,
  canvasWidth: 1290,
  canvasHeight: 2796,
  zoom: 0.25,
  selectedElementId: null,
  history: [],
  historyIndex: -1,
  activeTool: 'select' as ToolType,
  sidebarTab: 'templates' as SidebarTab,
  isExportModalOpen: false,
  isPreviewModalOpen: false,
}

export const useEditorStore = create<EditorStore>((set, get) => ({
  ...initialState,

  // Project Actions
  createProject: (name, platform) => {
    const project: Project = {
      id: uuidv4(),
      name,
      platform,
      screens: [createEmptyScreen(0)],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    // Set canvas size based on platform
    const canvasWidth = platform === 'ios' ? 1290 : 1080
    const canvasHeight = platform === 'ios' ? 2796 : 1920
    
    set({ 
      project, 
      currentScreenIndex: 0,
      canvasWidth,
      canvasHeight,
      history: [],
      historyIndex: -1,
    })
  },

  setProject: (project) => set({ project }),

  updateProjectName: (name) => {
    const { project } = get()
    if (project) {
      set({
        project: {
          ...project,
          name,
          updatedAt: new Date().toISOString(),
        },
      })
    }
  },

  // Screen Actions
  addScreen: () => {
    const { project } = get()
    if (project && project.screens.length < 10) {
      const newScreen = createEmptyScreen(project.screens.length)
      set({
        project: {
          ...project,
          screens: [...project.screens, newScreen],
          updatedAt: new Date().toISOString(),
        },
      })
    }
  },

  removeScreen: (index) => {
    const { project, currentScreenIndex } = get()
    if (project && project.screens.length > 1) {
      const newScreens = project.screens.filter((_, i) => i !== index)
      const newIndex = currentScreenIndex >= newScreens.length 
        ? newScreens.length - 1 
        : currentScreenIndex
      
      set({
        project: {
          ...project,
          screens: newScreens.map((s, i) => ({ ...s, order: i })),
          updatedAt: new Date().toISOString(),
        },
        currentScreenIndex: newIndex,
      })
    }
  },

  setCurrentScreen: (index) => {
    const { currentScreenIndex } = get()
    // Only switch if different screen
    if (index !== currentScreenIndex) {
      set({ currentScreenIndex: index })
    }
  },

  updateScreenCanvas: (canvasData, thumbnail, screenIndex?: number) => {
    const { project, currentScreenIndex } = get()
    if (project) {
      const targetIndex = screenIndex !== undefined ? screenIndex : currentScreenIndex
      if (targetIndex < 0 || targetIndex >= project.screens.length) return
      
      const newScreens = [...project.screens]
      newScreens[targetIndex] = {
        ...newScreens[targetIndex],
        canvasData,
        thumbnail: thumbnail || newScreens[targetIndex].thumbnail,
      }
      
      set({
        project: {
          ...project,
          screens: newScreens,
          updatedAt: new Date().toISOString(),
        },
      })
    }
  },

  reorderScreens: (fromIndex, toIndex) => {
    const { project } = get()
    if (project) {
      const newScreens = [...project.screens]
      const [removed] = newScreens.splice(fromIndex, 1)
      newScreens.splice(toIndex, 0, removed)
      
      set({
        project: {
          ...project,
          screens: newScreens.map((s, i) => ({ ...s, order: i })),
          updatedAt: new Date().toISOString(),
        },
        currentScreenIndex: toIndex,
      })
    }
  },

  duplicateScreen: (index) => {
    const { project } = get()
    if (project && project.screens.length < 10) {
      const screenToDuplicate = project.screens[index]
      const newScreen: Screen = {
        ...screenToDuplicate,
        id: uuidv4(),
        order: index + 1,
      }
      
      const newScreens = [
        ...project.screens.slice(0, index + 1),
        newScreen,
        ...project.screens.slice(index + 1),
      ].map((s, i) => ({ ...s, order: i }))
      
      set({
        project: {
          ...project,
          screens: newScreens,
          updatedAt: new Date().toISOString(),
        },
        currentScreenIndex: index + 1,
      })
    }
  },

  // Canvas Actions
  setZoom: (zoom) => set({ zoom: Math.max(0.1, Math.min(2, zoom)) }),
  
  setCanvasSize: (width, height) => set({ canvasWidth: width, canvasHeight: height }),

  // Selection Actions
  setSelectedElement: (id) => set({ selectedElementId: id }),

  // History Actions
  pushHistory: (state) => {
    const { history, historyIndex } = get()
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(state)
    
    // Keep only last 50 states
    if (newHistory.length > 50) {
      newHistory.shift()
    }
    
    set({
      history: newHistory,
      historyIndex: newHistory.length - 1,
    })
  },

  undo: () => {
    const { historyIndex } = get()
    if (historyIndex > 0) {
      set({ historyIndex: historyIndex - 1 })
    }
  },

  redo: () => {
    const { history, historyIndex } = get()
    if (historyIndex < history.length - 1) {
      set({ historyIndex: historyIndex + 1 })
    }
  },

  clearHistory: () => set({ history: [], historyIndex: -1 }),

  // UI Actions
  setActiveTool: (tool) => set({ activeTool: tool }),
  
  setSidebarTab: (tab) => set({ sidebarTab: tab }),
  
  setExportModalOpen: (open) => set({ isExportModalOpen: open }),
  
  setPreviewModalOpen: (open) => set({ isPreviewModalOpen: open }),

  // Reset
  resetEditor: () => set(initialState),
}))

