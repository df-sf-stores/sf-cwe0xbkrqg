/**
 * Plain words from a product's description (the merchant's own text, as core's RichText would show it), for the short
 * summary under the title and the Specifications tab's key features while the catalogue has no specs of its own.
 */

const entities = new Map<string, string>([
  ['amp', '&'],
  ['lt', '<'],
  ['gt', '>'],
  ['quot', '"'],
  ['apos', "'"],
  ['nbsp', ' '],
  ['#39', "'"],
])

/** The description's lines, tags taken out and its entities read. */
export const descriptionLines = (html: string | null): string[] =>
  (html ?? '')
    .replace(/<\s*(br|\/p|\/li|\/h[1-6]|\/div)\s*\/?>/gi, '\n')
    .replace(/<[^>]*>/g, '')
    .replace(/&(#?\w+);/g, (whole, name: string) => entities.get(name) ?? whole)
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

/** The description as one paragraph, for a summary the page clamps to a few lines. */
export const descriptionSummary = (html: string | null): string => descriptionLines(html).join(' ')

export type Feature = { title: string; detail: string | null }

const numbered = /^\d+[.)]\s+(.+)$/

/**
 * The numbered points in the description ("1. Fully Automatic Operation"), each with the plain line under it when there
 * is one ("Approx. 8–10 kg per hour."); empty when the description has no numbered list.
 */
export const descriptionFeatures = (html: string | null): Feature[] => {
  const features: Feature[] = []
  for (const line of descriptionLines(html)) {
    const point = numbered.exec(line)
    if (point?.[1]) features.push({ title: point[1], detail: null })
    else if (/^-{3,}/.test(line)) break
    else {
      const last = features.at(-1)
      if (last && last.detail === null) last.detail = line
    }
  }
  return features
}
