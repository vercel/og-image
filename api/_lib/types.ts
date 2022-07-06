export type FileType = 'png' | 'jpeg'

// Copy to web/index
const THEMES: string[] = ['light', 'dark', 'ice', 'graph', 'rainbow']
export type Theme = typeof THEMES[number]

export interface ParsedRequest {
  fileType: FileType
  largeText: string
  smallText: string
  theme: Theme
  md: boolean
  // fontSize: string
  // images: string[]
  // widths: string[]
  // heights: string[]
}
