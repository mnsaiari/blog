export function formatArabicDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function generateSlug(title: string): string {
  // For Arabic titles, use a timestamp-based slug
  const timestamp = Date.now()
  const cleanTitle = title
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\u0600-\u06FF-]/g, '')
    .slice(0, 50)

  if (cleanTitle) {
    return `${cleanTitle}-${timestamp}`
  }
  return `post-${timestamp}`
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim()
}

export function getExcerpt(content: string, maxLength = 120): string {
  const text = stripHtml(content)
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}
