import { useStorefront } from '@dripfunnel/storefront-core/theme'

/** Spaces end a link, and & # % + ? would break its query, so a message keeps only what a chat link can carry. */
const chatText = (text: string) => text.replace(/[&#%+?]/g, ' ').trim().replace(/\s+/g, '%20')

/**
 * The store's name and contact details from Site settings, shaped for the theme's words and links: the shop name with
 * a capital, the phone for display and dialling, the address in one line, and the WhatsApp link with or without a message.
 */
export const useBrand = () => {
  const { store, t } = useStorefront()
  const name = store.name.charAt(0).toUpperCase() + store.name.slice(1)
  const site = store.name.toLowerCase()
  const digits = (store.contactPhone ?? '').replace(/\D/g, '')
  const indian = digits.length === 12 && digits.startsWith('91')
  const phone = indian ? t('site.phone', { code: digits.slice(0, 2), first: digits.slice(2, 7), second: digits.slice(7) }) : (store.contactPhone ?? '')
  const a = store.address
  const address = [a?.street?.replace(/[,\s]+$/, ''), a?.city, [a?.region, a?.postal].filter(Boolean).join(' ')].filter(Boolean).join(', ')
  const email = store.contactEmail ?? t('site.links.fallbackEmail', { site })
  return {
    name,
    site,
    phone,
    hasPhone: digits.length >= 6,
    tel: t('site.links.tel', { phone: digits }),
    whatsapp: t('site.links.whatsapp', { phone: digits, store: name }),
    chat: (text: string) => t('site.links.whatsappText', { phone: digits, text: chatText(text) }),
    address,
    maps: t('site.links.maps', { address: address.replace(/\s+/g, '+') }),
    city: a?.city ?? '',
    region: a?.region ?? '',
    email,
    secondEmail: t('site.links.secondEmail'),
    website: t('site.links.website', { site }),
    websiteLabel: t('site.links.websiteLabel', { site }),
  }
}

export type Brand = ReturnType<typeof useBrand>
