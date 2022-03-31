export type FileType = "png" | "jpeg";
export type Theme = "light" | "dark";

export interface ParsedRequest {
  fileType: FileType;
  theme: Theme;
  fontSize: string;
  mainImage: string;
  mainImageWidth: string;
  mainImageHeight: string;
  footerImage: string;
  footerImageWidth: string;
  footerImageHeight: string;
  kicker: string;
  title: string;
  subtitle: string;
}
