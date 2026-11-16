'use client'

import { useEffect, useRef, useState } from 'react'
import { Image, Link, navigate, SearchField, ThemeImage, useCart, useCollections, useListing, useMenu, useLocation, useProducts, useStorefront, useWishlist, type MenuItem } from '@dripfunnel/storefront-core/theme'
import { useBrand } from '../brand'
import { cx } from '../cx'
import { slugOf } from '../slugOf'
import { CartIcon, ChatIcon, ChevronDown, CloseIcon, HeartIcon, MenuIcon, PhoneIcon, UserIcon } from '../Icons'
import styles from '../../styles/layout.module.css'

// The theme rules allow no URL encoding, so the characters that would break the query are dropped instead.
const searchFor = (words: string) => navigate(`/search/?q=${words.replace(/[&+%#]/g, ' ').trim()}`)

/** A sub-type facet, by its name in the catalogue ("Sub-Type", "Sub type"); otherwise the listing's last facet. */
const subTypeOf = <F extends { name: string }>(facets: F[]): F | undefined => facets.find((f) => /sub[\s-]?type/i.test(f.name)) ?? facets.at(-1)

type NavLink = { id: string; label: string; href: string; mega: boolean; children: MenuItem[] }

/** The menu item for the page being shown: the longest href the path starts with, ignoring a locale prefix such as /en/. */
const activeOf = (nav: NavLink[], path: string): string | null => {
  const here = path.replace(/^\/[a-z]{2}(?=\/|$)/, '') || '/'
  let best: NavLink | null = null
  for (const item of nav) {
    const href = item.href.split('?')[0] ?? item.href
    const hit = href === '/' ? here === '/' : here.startsWith(href)
    // On a tie the later item wins: the mega menu's item and Shop All can share /shop/, and Shop All is the page itself.
    if (hit && (!best || href.length >= (best.href.split('?')[0] ?? best.href).length)) best = item
  }
  return best?.id ?? null
}

/** The menu from Storefront › Menu, or the reference site's order while the store has none; one item opens the mega menu. */
const useNav = (): NavLink[] => {
  const { t } = useStorefront()
  const menu = useMenu()
  if (menu.items.length) {
    const megaAt = menu.items.findIndex((i) => i.href.startsWith('/collections/'))
    return [
      { id: 'home', label: t('site.nav.home'), href: '/', mega: false, children: [] },
      ...menu.items.map((i, index) => ({ id: i.id, label: i.label, href: i.href, mega: index === megaAt, children: i.children })),
    ]
  }
  return [
    { id: 'home', label: t('site.nav.home'), href: '/', mega: false, children: [] },
    { id: 'chakki', label: t('site.nav.chakki'), href: '/shop/', mega: true, children: [] },
    { id: 'about', label: t('site.nav.about'), href: '/about/', mega: false, children: [] },
    { id: 'shop', label: t('site.nav.shop'), href: '/shop/', mega: false, children: [] },
    { id: 'faq', label: t('site.nav.faq'), href: '/faq/', mega: false, children: [] },
    { id: 'contact', label: t('site.nav.contact'), href: '/contact/', mega: false, children: [] },
  ]
}

/** What the mega menu shows, all from the catalogue: the first collection and its machines, and the sub-type filters. */
const useMegaData = (ready: boolean) => {
  const { t } = useStorefront()
  const { collections } = useCollections({ first: 20 })
  const first = collections[0]
  const listing = useListing({ collection: first ? slugOf(first) : null }, ready)
  // The same query as the home and compare pages, so core's shared cache answers all three with one request.
  const all = useProducts({ sort: 'name', first: 24 })
  // Until the store has a collection, its atta chakki and flour mills by name, as the home page does.
  const named = all.products.filter((p) => /chakki|flour\s*mill/i.test(p.name))
  const items = first ? listing.items : named.length ? named : all.products
  const subType = subTypeOf(listing.facets)
  return {
    category: first?.name ?? t('site.nav.chakki'),
    categoryHref: first?.href ?? '/shop/',
    categoryImage: first?.image ?? null,
    collections,
    products: items.slice(0, 6),
    subTypes: (subType?.values ?? []).filter((v) => v.count > 0 || !first).map((v) => ({ id: v.id, name: v.name, href: `/shop/?filter=${v.id}` })),
  }
}

const MegaPanel = ({ data }: { data: ReturnType<typeof useMegaData> }) => {
  const { t } = useStorefront()
  return (
    <div id="site-mega" className={styles.mega}>
      <div className={styles.megaInner}>
        <div className={styles.megaColumn}>
          <p className={styles.megaHeading}>{t('site.mega.category')}</p>
          {/* The category's own picture from the catalogue, else the theme's Atta Chakki category banner. */}
          <Link href={data.categoryHref} className={styles.megaCategory}>
            <span className={styles.megaCategoryPicture}>
              {data.categoryImage ? <Image image={data.categoryImage} alt="" ratio={1} sizes="56px" className={styles.cover} /> : <ThemeImage src="category-flour-mill.webp" alt="" ratio={1} sizes="56px" className={styles.cover} />}
            </span>
            {data.category}
          </Link>
          <ul className={styles.megaProducts}>
            {data.products.map((p) => (
              <li key={p.id}>
                <Link href={p.href} className={styles.megaProduct}>
                  <span className={styles.megaThumb}>{p.photo ? <Image image={p.photo} alt="" ratio={1} sizes="48px" className={styles.cover} /> : null}</span>
                  <span className={styles.megaName}>{p.name}</span>
                  {p.stock.inStock ? null : <span className={styles.megaBadge}>{t('site.mega.outOfStock')}</span>}
                </Link>
              </li>
            ))}
          </ul>
          <Link href={data.categoryHref} className={styles.megaAll}>
            {t('site.mega.viewAll')}
          </Link>
        </div>
        <div className={styles.megaColumn}>
          <p className={styles.megaHeading}>{t('site.mega.subType')}</p>
          <ul className={styles.megaLinks}>
            {data.subTypes.map((s) => (
              <li key={s.id}>
                <Link href={s.href} className={styles.megaLink}>
                  {s.name}
                </Link>
              </li>
            ))}
            {data.collections.slice(1).map((c) => (
              <li key={c.id}>
                <Link href={c.href} className={styles.megaLink}>
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className={styles.megaActions}>
            <Link href="/shop/" className={styles.megaButton}>
              {t('site.mega.browse')}
            </Link>
            <Link href="/compare/" className={styles.megaGhost}>
              {t('site.mega.compare')}
            </Link>
          </div>
        </div>
        <div className={styles.megaPromo}>
          <p className={styles.megaPromoTitle}>{t('site.mega.promoTitle')}</p>
          <p className={styles.megaPromoBody}>{t('site.mega.promoBody')}</p>
          <Link href="/contact/" className={styles.megaButton}>
            {t('site.mega.promoAction')}
          </Link>
        </div>
      </div>
    </div>
  )
}

/** The sticky header: logo, the menu with its mega menu, live search and the shopper's tools; a drawer below 1024px. */
export const SiteHeader = () => {
  const { t } = useStorefront()
  const brand = useBrand()
  const nav = useNav()
  const { path } = useLocation()
  const active = activeOf(nav, path)
  const { count } = useCart()
  const { count: wished } = useWishlist()
  const [mega, setMega] = useState(false)
  const [drawer, setDrawer] = useState(false)
  const [wanted, setWanted] = useState(false)
  const data = useMegaData(wanted)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const drawerBox = useRef<HTMLDivElement>(null)
  const menuButton = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (drawer) drawerBox.current?.focus()
  }, [drawer])
  const show = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setWanted(true)
    setMega(true)
  }
  const hide = () => {
    closeTimer.current = setTimeout(() => setMega(false), 160)
  }
  const closeDrawer = () => {
    setDrawer(false)
    menuButton.current?.focus()
  }
  return (
    <>
    <header className={styles.header}>
      <div className={styles.bar}>
        <button
          ref={menuButton}
          type="button"
          className={styles.burger}
          aria-label={t('site.nav.open')}
          aria-expanded={drawer}
          aria-controls="site-drawer"
          onClick={() => {
            setWanted(true)
            setDrawer(true)
          }}
        >
          <MenuIcon />
        </button>
        <Link href="/" className={styles.brand}>
          <ThemeImage src="brand-logo.webp" alt={t('site.brandAlt', { store: brand.name })} ratio={273 / 160} sizes="120px" className={styles.logo} />
        </Link>
        <nav className={styles.nav} aria-label={t('site.nav.label')}>
          <ul className={styles.navList}>
            {nav.map((item) =>
              item.mega ? (
                <li
                  key={item.id}
                  className={styles.navItem}
                  onMouseEnter={show}
                  onMouseLeave={hide}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') setMega(false)
                  }}
                >
                  <span className={styles.navSplit}>
                    <Link href={item.href} className={cx(styles.navLink, active === item.id && styles.navActive)} aria-current={active === item.id ? 'page' : undefined}>
                      {item.label}
                    </Link>
                    <button type="button" className={styles.navCaret} aria-expanded={mega} aria-controls="site-mega" aria-label={t('site.nav.more', { item: item.label })} onClick={() => (mega ? setMega(false) : show())}>
                      <ChevronDown className={cx(styles.caretIcon, mega && styles.caretOpen)} />
                    </button>
                  </span>
                  {mega ? <MegaPanel data={data} /> : null}
                </li>
              ) : item.children.length ? (
                <li key={item.id} className={styles.navItem}>
                  <details className={styles.dropdown}>
                    <summary className={cx(styles.navLink, active === item.id && styles.navActive)}>
                      {item.label}
                      <ChevronDown className={styles.caretIcon} />
                    </summary>
                    <ul className={styles.dropdownList}>
                      <li>
                        <Link href={item.href} className={styles.megaLink}>
                          {t('site.mega.viewAll')}
                        </Link>
                      </li>
                      {item.children.map((c) => (
                        <li key={c.id}>
                          <Link href={c.href} className={styles.megaLink}>
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              ) : (
                <li key={item.id} className={styles.navItem}>
                  <Link href={item.href} className={cx(styles.navLink, active === item.id && styles.navActive)} aria-current={active === item.id ? 'page' : undefined}>
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>
        <SearchField label={t('site.tools.search')} placeholder={t('site.tools.searchPrompt')} button={t('site.tools.search')} value="" onSearch={searchFor} suggest={5} className={styles.search} />
        <div className={styles.tools}>
          <Link href="/account/wishlist/" className={styles.tool}>
            <HeartIcon className={styles.toolIcon} />
            <span className={styles.hidden}>{wished > 0 ? t('site.tools.wishlistCount', { count: wished }) : t('site.tools.wishlist')}</span>
            {wished > 0 ? (
              <span className={styles.count} aria-hidden="true">
                {wished}
              </span>
            ) : null}
          </Link>
          <Link href="/cart/" className={styles.tool}>
            <CartIcon className={styles.toolIcon} />
            <span className={styles.hidden}>{count > 0 ? t('site.tools.cartCount', { count }) : t('site.tools.cart')}</span>
            {count > 0 ? (
              <span className={styles.count} aria-hidden="true">
                {count}
              </span>
            ) : null}
          </Link>
          <Link href="/account/" className={cx(styles.tool, styles.accountTool)}>
            <UserIcon className={styles.toolIcon} />
            <span className={styles.hidden}>{t('site.tools.account')}</span>
          </Link>
        </div>
      </div>
    </header>
      {drawer ? (
        <div className={styles.drawerBackdrop} onClick={closeDrawer}>
          <div
            id="site-drawer"
            ref={drawerBox}
            className={styles.drawer}
            role="dialog"
            aria-modal="true"
            aria-label={t('site.nav.label')}
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === 'Escape') closeDrawer()
            }}
          >
            <div className={styles.drawerHead}>
              <ThemeImage src="brand-logo.webp" alt={t('site.brandAlt', { store: brand.name })} ratio={273 / 160} sizes="96px" className={styles.drawerLogo} />
              <button type="button" className={styles.drawerClose} aria-label={t('site.nav.close')} onClick={closeDrawer}>
                <CloseIcon />
              </button>
            </div>
            <SearchField label={t('site.tools.search')} placeholder={t('site.tools.searchPrompt')} button={t('site.tools.search')} value="" onSearch={searchFor} suggest={4} className={styles.drawerSearch} />
            <ul className={styles.drawerList}>
              {nav.map((item) =>
                item.mega || item.children.length ? (
                  <li key={item.id}>
                    <details className={styles.drawerGroup}>
                      <summary className={styles.drawerLink}>
                        {item.label}
                        <ChevronDown className={styles.caretIcon} />
                      </summary>
                      <ul className={styles.drawerSub}>
                        {(item.mega ? data.products.map((p) => ({ id: p.id, label: p.name, href: p.href })) : item.children).map((c) => (
                          <li key={c.id}>
                            <Link href={c.href} className={styles.drawerSubLink}>
                              {c.label}
                            </Link>
                          </li>
                        ))}
                        {item.mega
                          ? data.subTypes.map((s) => (
                              <li key={s.id}>
                                <Link href={s.href} className={styles.drawerSubLink}>
                                  {s.name}
                                </Link>
                              </li>
                            ))
                          : null}
                        <li>
                          <Link href={item.mega ? data.categoryHref : item.href} className={styles.drawerAll}>
                            {t('site.mega.viewAll')}
                          </Link>
                        </li>
                        {item.mega ? (
                          <li>
                            <Link href="/compare/" className={styles.drawerAll}>
                              {t('site.mega.compare')}
                            </Link>
                          </li>
                        ) : null}
                      </ul>
                    </details>
                  </li>
                ) : (
                  <li key={item.id}>
                    <Link href={item.href} className={styles.drawerLink}>
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
            {brand.hasPhone ? (
              <div className={styles.drawerContact}>
                <Link href={brand.tel} className={styles.drawerCall}>
                  <PhoneIcon className={styles.toolIcon} />
                  {brand.phone}
                </Link>
                <Link href={brand.whatsapp} className={styles.drawerChat}>
                  <ChatIcon className={styles.toolIcon} />
                  {t('site.footer.whatsapp')}
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  )
}
