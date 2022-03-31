export type FileType = "png" | "jpeg";
export type Theme = "light" | "dark";

export interface ParsedRequest {
  fileType: FileType;
  theme: Theme;
  md: boolean;
  fontSize: string;
  mainImage: string;
  mainImageWidth: string;
  mainImageHeight: string;
  kicker: string;
  title: string;
  subtitle: string;
}
