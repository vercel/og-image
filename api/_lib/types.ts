export type FileType = 'png' | 'jpeg'
export type Template = 'site' | 'docs' | 'learn' | 'blog'

export interface ParsedRequest {
  template: Template | string
  templateImage: string
  fileType: FileType
  fontSize: string
  image: string
  width: string
  height: string
  titleText: string
  breadcrumbsText: string
}
