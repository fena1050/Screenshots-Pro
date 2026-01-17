import { openDB, DBSchema, IDBPDatabase } from 'idb'
import type { Project } from '@/types/editor'

interface ScreenshortDB extends DBSchema {
  projects: {
    key: string
    value: Project
    indexes: { 'by-updated': string }
  }
}

const DB_NAME = 'screenshort-db'
const DB_VERSION = 1

let dbPromise: Promise<IDBPDatabase<ScreenshortDB>> | null = null

const getDB = () => {
  if (!dbPromise) {
    dbPromise = openDB<ScreenshortDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        const store = db.createObjectStore('projects', { keyPath: 'id' })
        store.createIndex('by-updated', 'updatedAt')
      },
    })
  }
  return dbPromise
}

// Save project to IndexedDB
export const saveProject = async (project: Project): Promise<void> => {
  const db = await getDB()
  await db.put('projects', project)
}

// Load project from IndexedDB
export const loadProject = async (id: string): Promise<Project | undefined> => {
  const db = await getDB()
  return db.get('projects', id)
}

// Get all projects
export const getAllProjects = async (): Promise<Project[]> => {
  const db = await getDB()
  return db.getAllFromIndex('projects', 'by-updated')
}

// Delete project
export const deleteProject = async (id: string): Promise<void> => {
  const db = await getDB()
  await db.delete('projects', id)
}

// Export project as JSON file
export const exportProjectAsJSON = (project: Project): void => {
  const dataStr = JSON.stringify(project, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(dataBlob)
  
  const link = document.createElement('a')
  link.href = url
  link.download = `${project.name.replace(/[^a-z0-9]/gi, '_')}_project.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

// Import project from JSON file
export const importProjectFromJSON = (file: File): Promise<Project> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = (e) => {
      try {
        const project = JSON.parse(e.target?.result as string) as Project
        // Validate project structure
        if (!project.id || !project.name || !project.screens) {
          throw new Error('Invalid project file')
        }
        resolve(project)
      } catch (error) {
        reject(new Error('Failed to parse project file'))
      }
    }
    
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsText(file)
  })
}


