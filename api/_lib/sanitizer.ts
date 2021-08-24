const entityMap: { [key: string]: string } = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;",
}

export function sanitizeHtml(html: string) {
  if (!html) return ''
  return String(html).replace(/[&<>"'\/]/g, (key) => entityMap[key])
}
