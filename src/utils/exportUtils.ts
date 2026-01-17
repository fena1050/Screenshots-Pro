import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import type { Project, Screen, ExportOptions } from '@/types/editor'

// Export single screen to image blob
export const exportScreenToBlob = async (
  canvas: HTMLCanvasElement,
  options: ExportOptions
): Promise<Blob> => {
  const { format, quality, scale } = options

  // Create scaled canvas if needed
  if (scale !== 1) {
    const scaledCanvas = document.createElement('canvas')
    scaledCanvas.width = canvas.width * scale
    scaledCanvas.height = canvas.height * scale
    const ctx = scaledCanvas.getContext('2d')
    
    if (ctx) {
      ctx.scale(scale, scale)
      ctx.drawImage(canvas, 0, 0)
    }
    
    return new Promise((resolve) => {
      scaledCanvas.toBlob(
        (blob) => resolve(blob!),
        format === 'png' ? 'image/png' : 'image/jpeg',
        quality
      )
    })
  }

  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => resolve(blob!),
      format === 'png' ? 'image/png' : 'image/jpeg',
      quality
    )
  })
}

// Export all screens to ZIP
export const exportProjectToZip = async (
  project: Project,
  canvases: HTMLCanvasElement[],
  options: ExportOptions,
  onProgress?: (progress: number) => void
): Promise<void> => {
  const zip = new JSZip()
  const folder = zip.folder(sanitizeFileName(project.name))
  
  if (!folder) {
    throw new Error('Failed to create ZIP folder')
  }

  const { format, scale } = options

  for (let i = 0; i < canvases.length; i++) {
    const canvas = canvases[i]
    const blob = await exportScreenToBlob(canvas, options)
    
    const fileName = `screen_${String(i + 1).padStart(2, '0')}_${scale}x.${format}`
    folder.file(fileName, blob)
    
    if (onProgress) {
      onProgress(((i + 1) / canvases.length) * 100)
    }
  }

  const zipBlob = await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 },
  })
  
  saveAs(zipBlob, `${sanitizeFileName(project.name)}_screenshots.zip`)
}

// Export single screen as image
export const exportScreenAsImage = async (
  canvas: HTMLCanvasElement,
  fileName: string,
  options: ExportOptions
): Promise<void> => {
  const blob = await exportScreenToBlob(canvas, options)
  saveAs(blob, `${sanitizeFileName(fileName)}.${options.format}`)
}

// Sanitize file name for safe export
export const sanitizeFileName = (name: string): string => {
  return name
    .replace(/[^a-z0-9\s-_]/gi, '')
    .replace(/\s+/g, '_')
    .toLowerCase()
    .slice(0, 50)
}

// Generate thumbnail from canvas
export const generateThumbnail = async (
  canvas: HTMLCanvasElement,
  maxWidth: number = 200,
  maxHeight: number = 400
): Promise<string> => {
  const scale = Math.min(maxWidth / canvas.width, maxHeight / canvas.height)
  
  const thumbCanvas = document.createElement('canvas')
  thumbCanvas.width = canvas.width * scale
  thumbCanvas.height = canvas.height * scale
  
  const ctx = thumbCanvas.getContext('2d')
  if (ctx) {
    ctx.scale(scale, scale)
    ctx.drawImage(canvas, 0, 0)
  }
  
  return thumbCanvas.toDataURL('image/jpeg', 0.7)
}


