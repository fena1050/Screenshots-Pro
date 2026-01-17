'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { Box, Typography, CircularProgress } from '@mui/material'
import { COLORS } from '@/constants/colors'
import { useEditorStore } from '@/store/editorStore'
import { useCanvasStore } from '@/store/canvasStore'

// Declare fabric as global (loaded from CDN)
declare global {
  interface Window {
    fabric: any
  }
}

export default function EditorCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const fabricRef = useRef<any>(null)
  const prevScreenIndexRef = useRef<number>(0)
  const screenDataRef = useRef<Map<number, string>>(new Map())

  const canvasWidth = useEditorStore((state) => state.canvasWidth)
  const canvasHeight = useEditorStore((state) => state.canvasHeight)
  const zoom = useEditorStore((state) => state.zoom)
  const setZoom = useEditorStore((state) => state.setZoom)
  const setSelectedElement = useEditorStore((state) => state.setSelectedElement)
  const project = useEditorStore((state) => state.project)
  const currentScreenIndex = useEditorStore((state) => state.currentScreenIndex)
  const updateScreenCanvas = useEditorStore((state) => state.updateScreenCanvas)

  const [isLoading, setIsLoading] = useState(true)
  const [fabricLoaded, setFabricLoaded] = useState(false)
  
  const setCanvasInStore = useCanvasStore((state) => state.setCanvas)
  const setFabricInStore = useCanvasStore((state) => state.setFabric)
  const deleteSelected = useCanvasStore((state) => state.deleteSelected)
  const saveToHistory = useCanvasStore((state) => state.saveToHistory)
  const undo = useCanvasStore((state) => state.undo)
  const redo = useCanvasStore((state) => state.redo)

  // Load Fabric.js from CDN
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.fabric) {
      const script = document.createElement('script')
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.min.js'
      script.async = true
      script.onload = () => {
        setFabricLoaded(true)
      }
      document.body.appendChild(script)
    } else if (window.fabric) {
      setFabricLoaded(true)
    }
  }, [])

  // Store initial canvas dimensions in refs (to avoid re-initializing on size change)
  const initialWidthRef = useRef(canvasWidth)
  const initialHeightRef = useRef(canvasHeight)

  // Initialize canvas after Fabric.js loads (only once)
  useEffect(() => {
    if (!fabricLoaded || !canvasRef.current || fabricRef.current) return

    const fabric = window.fabric

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: initialWidthRef.current,
      height: initialHeightRef.current,
      backgroundColor: '#1A1A24',
      selection: true,
      preserveObjectStacking: true,
    })

    fabricRef.current = canvas

    // Selection events
    canvas.on('selection:created', (e: any) => {
      const selected = e.selected?.[0]
      if (selected) {
        setSelectedElement(selected.name || null)
      }
    })

    canvas.on('selection:updated', (e: any) => {
      const selected = e.selected?.[0]
      if (selected) {
        setSelectedElement(selected.name || null)
      }
    })

    canvas.on('selection:cleared', () => {
      setSelectedElement(null)
    })
    
    // Prevent scroll jump when editing text
    let scrollLocked = false
    let savedScrollX = 0
    let savedScrollY = 0
    
    const preventScroll = () => {
      if (scrollLocked) {
        window.scrollTo(savedScrollX, savedScrollY)
      }
    }
    
    canvas.on('text:editing:entered', () => {
      // Save current scroll position and lock it
      savedScrollX = window.scrollX
      savedScrollY = window.scrollY
      scrollLocked = true
      
      // Add scroll prevention listener
      window.addEventListener('scroll', preventScroll)
      
      // Find and fix the hidden textarea position
      const textarea = document.querySelector('.canvas-container textarea') as HTMLTextAreaElement
      if (textarea) {
        textarea.style.position = 'fixed'
        textarea.style.left = '50%'
        textarea.style.top = '50%'
        textarea.style.opacity = '0'
        textarea.style.pointerEvents = 'none'
        textarea.style.width = '1px'
        textarea.style.height = '1px'
      }
    })
    
    canvas.on('text:editing:exited', () => {
      scrollLocked = false
      window.removeEventListener('scroll', preventScroll)
      // Save to history after text editing
      setTimeout(() => {
        const { saveToHistory } = useCanvasStore.getState()
        saveToHistory()
      }, 100)
    })
    
    // Save to history after object modifications
    canvas.on('object:modified', () => {
      const { saveToHistory } = useCanvasStore.getState()
      saveToHistory()
    })
    
    canvas.on('object:added', () => {
      const { saveToHistory, isUndoRedoing } = useCanvasStore.getState()
      if (!isUndoRedoing) {
        setTimeout(() => saveToHistory(), 50)
      }
    })
    
    canvas.on('object:removed', () => {
      const { saveToHistory, isUndoRedoing } = useCanvasStore.getState()
      if (!isUndoRedoing) {
        saveToHistory()
      }
    })
    
    // Double-click to select device (when screenshot is on top)
    canvas.on('mouse:dblclick', (e: any) => {
      if (e.target && e.target.name === 'device-screenshot') {
        // Find the device group and select it instead
        const deviceGroup = canvas.getObjects().find((obj: any) => 
          obj.name && obj.name.startsWith('device-group')
        )
        if (deviceGroup) {
          canvas.discardActiveObject()
          canvas.setActiveObject(deviceGroup)
          canvas.renderAll()
        }
      }
    })

    // Store canvas and fabric globally
    setCanvasInStore(canvas)
    setFabricInStore(fabric)
    
    // Add demo content (background and text only)
    addDemoContent(canvas, fabric, initialWidthRef.current, initialHeightRef.current)
    
    // Add initial device matching the project platform
    setTimeout(() => {
      const { addRandomDevice } = useCanvasStore.getState()
      const { project } = useEditorStore.getState()
      addRandomDevice(project?.platform)
    }, 100)
    
    setIsLoading(false)

    return () => {
      if (fabricRef.current) {
        fabricRef.current.dispose()
        fabricRef.current = null
        setCanvasInStore(null)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fabricLoaded, setSelectedElement, setCanvasInStore, setFabricInStore])

  // Update canvas size when changed (without re-initializing)
  useEffect(() => {
    const canvas = fabricRef.current
    if (!canvas) return

    canvas.setWidth(canvasWidth)
    canvas.setHeight(canvasHeight)
    
    // Update background rectangle if exists
    const bgRect = canvas.getObjects().find((obj: any) => obj.name === 'background')
    if (bgRect) {
      bgRect.set({
        width: canvasWidth,
        height: canvasHeight,
      })
    }
    
    canvas.renderAll()
  }, [canvasWidth, canvasHeight])

  // Add demo content to canvas (background and text only - device added via store)
  const addDemoContent = useCallback((canvas: any, fabric: any, width: number, height: number) => {
    // Background gradient
    const gradient = new fabric.Gradient({
      type: 'linear',
      coords: { x1: 0, y1: 0, x2: 0, y2: height },
      colorStops: [
        { offset: 0, color: '#0077B6' },
        { offset: 1, color: '#00B4D8' },
      ],
    })

    const bgRect = new fabric.Rect({
      left: 0,
      top: 0,
      width: width,
      height: height,
      fill: gradient,
      selectable: false,
      evented: false,
      name: 'background',
    })

    // Headline text - positioned at top (using Textbox for text wrapping)
    const headline = new fabric.Textbox('Track Your\nFitness Goals', {
      left: width / 2,
      top: 200,
      width: width - 100, // Set width for text wrapping (with padding)
      fontSize: 96,
      fontFamily: 'Clash Display',
      fontWeight: '700',
      fill: '#FFFFFF',
      textAlign: 'center',
      originX: 'center',
      lineHeight: 1.1,
      name: 'headline',
      selectable: true,
      editable: true,
      splitByGrapheme: false,
      shadow: new fabric.Shadow({
        color: 'rgba(0,0,0,0.3)',
        blur: 20,
        offsetX: 0,
        offsetY: 10,
      }),
    })

    // Subheadline (using Textbox for text wrapping)
    const subheadline = new fabric.Textbox('', {
      left: width / 2,
      top: 460,
      width: width - 100, // Set width for text wrapping
      fontSize: 36,
      fontFamily: 'Satoshi',
      fontWeight: '400',
      fill: 'rgba(255,255,255,0.8)',
      textAlign: 'center',
      originX: 'center',
      name: 'subheadline',
      selectable: true,
      editable: true,
      splitByGrapheme: false,
    })

    // Add all objects
    canvas.add(bgRect)
    canvas.add(headline)
    canvas.add(subheadline)

    canvas.renderAll()
  }, [])

  // Handle zoom with mouse wheel
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault()
        const delta = e.deltaY > 0 ? -0.05 : 0.05
        setZoom(zoom + delta)
      }
    }

    container.addEventListener('wheel', handleWheel, { passive: false })
    return () => container.removeEventListener('wheel', handleWheel)
  }, [zoom, setZoom])
  
  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const canvas = fabricRef.current
      
      // Undo: Ctrl+Z (works even when typing)
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault()
        undo()
        return
      }
      
      // Redo: Ctrl+Shift+Z or Ctrl+Y (works even when typing)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault()
        redo()
        return
      }
      
      // Only if not typing in an input field
      if (document.activeElement?.tagName === 'INPUT' || 
          document.activeElement?.tagName === 'TEXTAREA') {
        return
      }
      
      // Check if user is editing text on the canvas (IText in editing mode)
      if (canvas) {
        const activeObject = canvas.getActiveObject()
        // If editing text on canvas, don't intercept keyboard events
        if (activeObject && activeObject.isEditing) {
          return
        }
      }
      
      // Delete or Backspace to delete selected (only when not editing text)
      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault()
        deleteSelected()
        saveToHistory()
      }
      
      // Press 'D' to select device
      if (e.key === 'd' || e.key === 'D') {
        if (canvas) {
          const deviceGroup = canvas.getObjects().find((obj: any) => 
            obj.name && obj.name.startsWith('device-group')
          )
          if (deviceGroup) {
            canvas.discardActiveObject()
            canvas.setActiveObject(deviceGroup)
            canvas.renderAll()
          }
        }
      }
      
      // Press 'S' to select screenshot
      if (e.key === 's' || e.key === 'S') {
        if (!e.ctrlKey && !e.metaKey) { // Don't interfere with Ctrl+S
          if (canvas) {
            const screenshot = canvas.getObjects().find((obj: any) => 
              obj.name === 'device-screenshot'
            )
            if (screenshot) {
              canvas.discardActiveObject()
              canvas.setActiveObject(screenshot)
              canvas.renderAll()
            }
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [deleteSelected, saveToHistory, undo, redo])

  // Handle screen switching - save current screen and load new screen
  useEffect(() => {
    const canvas = fabricRef.current
    if (!canvas || !fabricLoaded) return
    
    const prevIndex = prevScreenIndexRef.current
    
    // If screen changed
    if (prevIndex !== currentScreenIndex) {
      // Save PREVIOUS screen's canvas data (the one we're leaving)
      const currentData = JSON.stringify(canvas.toJSON(['name', 'data', 'selectable', 'evented', 'hasControls', 'hasBorders']))
      screenDataRef.current.set(prevIndex, currentData)
      
      // Also generate and save thumbnail for the PREVIOUS screen
      const thumbnail = canvas.toDataURL({
        format: 'png',
        quality: 0.3,
        multiplier: 0.1,
      })
      // Pass prevIndex to save to the correct screen
      updateScreenCanvas(currentData, thumbnail, prevIndex)
      
      // Clear the current screenshot and device tracking (each screen is independent)
      useCanvasStore.setState({ 
        currentScreenshotUrl: null, 
        currentDeviceId: null 
      })
      
      // Load the new screen's data if it exists
      const newScreenData = screenDataRef.current.get(currentScreenIndex)
      
      if (newScreenData) {
        // Load existing screen data
        try {
          const parsed = JSON.parse(newScreenData)
          canvas.loadFromJSON(parsed, () => {
            canvas.forEachObject((obj: any) => {
              if (obj.name === 'background') {
                obj.selectable = false
                obj.evented = false
              }
              // Update currentDeviceId if a device exists in loaded screen
              if (obj.name && obj.name.startsWith('device-group')) {
                useCanvasStore.setState({ currentDeviceId: obj.name })
              }
            })
            canvas.renderAll()
          })
        } catch (e) {
          console.error('Failed to load screen data:', e)
        }
      } else {
        // New screen - clear canvas and add default content
        canvas.clear()
        canvas.setBackgroundColor('#1A1A24', () => {})
        
        // Add default content for new screen
        const fabric = window.fabric
        if (fabric) {
          // Background gradient
          const gradient = new fabric.Gradient({
            type: 'linear',
            coords: { x1: 0, y1: 0, x2: 0, y2: canvasHeight },
            colorStops: [
              { offset: 0, color: '#0077B6' },
              { offset: 1, color: '#00B4D8' },
            ],
          })
          
          const bgRect = new fabric.Rect({
            left: 0,
            top: 0,
            width: canvasWidth,
            height: canvasHeight,
            fill: gradient,
            selectable: false,
            evented: false,
            name: 'background',
          })
          
          const headline = new fabric.Textbox(`Screen ${currentScreenIndex + 1}`, {
            left: canvasWidth / 2,
            top: 200,
            width: canvasWidth - 100,
            fontSize: 96,
            fontFamily: 'Clash Display',
            fontWeight: '700',
            fill: '#FFFFFF',
            textAlign: 'center',
            originX: 'center',
            name: 'headline',
            selectable: true,
            editable: true,
          })
          
          canvas.add(bgRect)
          canvas.add(headline)
          
          // Add a device matching the project platform
          setTimeout(() => {
            const { addRandomDevice } = useCanvasStore.getState()
            addRandomDevice(project?.platform)
          }, 100)
        }
        
        canvas.renderAll()
      }
      
      // Update prev index
      prevScreenIndexRef.current = currentScreenIndex
    }
  }, [currentScreenIndex, fabricLoaded, canvasWidth, canvasHeight, updateScreenCanvas])

  // Calculate scale to fit canvas in viewport
  const displayScale = zoom

  return (
    <Box
      ref={containerRef}
      sx={{
        flex: 1,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        overflow: 'auto',
        bgcolor: COLORS.background.primary,
        backgroundImage: `
          linear-gradient(rgba(42, 42, 58, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(42, 42, 58, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px',
        p: 3,
        position: 'relative',
        minHeight: 0, // Critical for flex to allow shrinking
        height: '100%',
      }}
    >
      {/* Loading State */}
      {isLoading && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            zIndex: 10,
          }}
        >
          <CircularProgress sx={{ color: COLORS.accent.primary }} />
          <Typography variant="body2" sx={{ color: COLORS.text.secondary }}>
            Loading canvas...
          </Typography>
        </Box>
      )}

      {/* Canvas wrapper with scroll support */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100%',
          py: 4,
        }}
      >
        <Box
          sx={{
            position: 'relative',
            transform: `scale(${displayScale})`,
            transformOrigin: 'top center',
            transition: 'transform 0.15s ease',
            boxShadow: '0 25px 80px rgba(0,0,0,0.5)',
            borderRadius: 3,
            overflow: 'hidden',
            opacity: isLoading ? 0 : 1,
            flexShrink: 0,
          }}
        >
          <canvas
            ref={canvasRef}
            style={{
              display: 'block',
            }}
          />
        </Box>
      </Box>

      {/* Zoom indicator */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 160,
          right: 300,
          px: 2,
          py: 1,
          borderRadius: 1.5,
          bgcolor: COLORS.background.elevated,
          border: `1px solid ${COLORS.border.primary}`,
          zIndex: 100,
        }}
      >
        <Typography variant="caption" sx={{ color: COLORS.text.secondary }}>
          {Math.round(zoom * 100)}%
        </Typography>
      </Box>

      {/* Screen info */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 160,
          left: 380,
          px: 2,
          py: 1,
          borderRadius: 1.5,
          bgcolor: COLORS.background.elevated,
          border: `1px solid ${COLORS.border.primary}`,
          zIndex: 100,
        }}
      >
        <Typography variant="caption" sx={{ color: COLORS.text.secondary }}>
          Screen {currentScreenIndex + 1} of {project?.screens.length || 1} · {canvasWidth} × {canvasHeight}
        </Typography>
      </Box>
    </Box>
  )
}

