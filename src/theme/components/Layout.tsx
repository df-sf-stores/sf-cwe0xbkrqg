import type { ReactNode } from 'react'
import { ConsentBanner, Link, PoweredBy, PreviewBanner, ThemeImage, useStorefront } from '@dripfunnel/storefront-core/theme'
import { QrCode } from './Art'
import { useBrand } from './brand'
import { cx } from './cx'
import { CtaBand } from './Sections'
import { FooterColumn } from './interactive/FooterColumn'
import { CartIcon, ChatIcon, HomeIcon, LockIcon, MailIcon, PhoneIcon, PinIcon, SearchIcon, StoreIcon, TruckIcon, UserIcon } from './Icons'
import { DemoButton, DemoProvider } from './interactive/Demo'
import { SiteHeader } from './interactive/SiteHeader'
import styles from '../styles/layout.module.css'

/** Every page's frame: the announcement bar, header, the page, the demo call to action, footer and the shopper's shortcuts. */
export const Layout = ({ children, cta = true }: { children: ReactNode; cta?: boolean }) => {
  const { t, mode, poweredBy } = useStorefront()
  const brand = useBrand()
  const usps = [
    { key: 'demo', icon: <HomeIcon className={styles.uspIcon} />, label: t('site.bar.demo') },
    { key: 'shipping', icon: <TruckIcon className={styles.uspIcon} />, label: t('site.bar.shipping') },
    { key: 'secure', icon: <LockIcon className={styles.uspIcon} />, label: t('site.bar.secure') },
  ]
  return (
    <div className={styles.shell}>
      <DemoProvider>
        {mode === 'live' ? null : <PreviewBanner t={t} className={styles.preview} />}
        <Link href="#content" className={styles.skip}>
          {t('site.skip')}
        </Link>
        <div className={styles.announce}>
          <div className={styles.announceInner}>
            <div className={styles.marquee} aria-label={t('site.bar.label')} role="group">
              <ul className={styles.uspTrack}>
                {usps.map((u) => (
                  <li key={u.key} className={styles.usp}>
                    {u.icon}
                    {u.label}
                  </li>
                ))}
              </ul>
              <ul className={styles.uspEcho} aria-hidden="true">
                {usps.map((u) => (
                  <li key={u.key} className={styles.usp}>
                    {u.icon}
                    {u.label}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.announceLinks}>
              {brand.hasPhone ? (
                <Link href={brand.tel} className={styles.announceLink}>
                  <PhoneIcon className={styles.uspIcon} />
                  <span className={styles.phoneText}>{brand.phone}</span>
                  <span className={styles.hidden}>{t('site.bar.call', { phone: brand.phone })}</span>
                </Link>
              ) : null}
              <Link href="/compare/" className={styles.announceLink}>
                {t('site.bar.compare')}
              </Link>
            </div>
          </div>
        </div>
        <SiteHeader />
        <main id="content" className={styles.main} tabIndex={-1}>
          {children}
        </main>
        {cta ? <CtaBand /> : null}
        <footer className={styles.footer}>
          <div className={styles.footerInner}>
            <div className={styles.footerBrand}>
              <Link href="/" className={styles.footerLogoLink}>
                <ThemeImage src="brand-logo.webp" alt={t('site.brandAlt', { store: brand.name })} ratio={273 / 160} sizes="140px" className={styles.footerLogo} />
              </Link>
              <p className={styles.iso}>
                <ThemeImage src="iso-certified.webp" alt={t('site.footer.isoAlt')} ratio={160 / 164} sizes="48px" className={styles.isoBadge} />
                <span>{t('site.footer.iso')}</span>
              </p>
              <p className={styles.footerTagline}>{t('site.footer.tagline')}</p>
              <p className={styles.footerNote}>{t('site.footer.about', { store: brand.name })}</p>
            </div>
            <div className={styles.footerColumns}>
              <FooterColumn title={t('site.footer.shop')} tone="blue">
                <li>
                  <Link href="/" className={styles.footerLink}>
                    {t('site.footer.home')}
                  </Link>
                </li>
                <li>
                  <Link href="/shop/" className={styles.footerLink}>
                    {t('site.footer.chakki')}
                  </Link>
                </li>
                <li>
                  <Link href="/compare/" className={styles.footerLink}>
                    {t('site.footer.compare')}
                  </Link>
                </li>
              </FooterColumn>
              <FooterColumn title={t('site.footer.company')} tone="green">
                <li>
                  <Link href="/about/" className={styles.footerLink}>
                    {t('site.footer.about2')}
                  </Link>
                </li>
                <li>
                  <Link href="/manufacturing/" className={styles.footerLink}>
                    {t('site.footer.manufacturing')}
                  </Link>
                </li>
                <li>
                  <Link href="/blog/" className={styles.footerLink}>
                    {t('site.footer.insights')}
                  </Link>
                </li>
                <li>
                  <Link href="/faq/" className={styles.footerLink}>
                    {t('site.footer.faq')}
                  </Link>
                </li>
                <li>
                  <Link href="/contact/" className={styles.footerLink}>
                    {t('site.footer.contactLink')}
                  </Link>
                </li>
              </FooterColumn>
              <FooterColumn title={t('site.footer.customer')} tone="orange">
                <li>
                  <Link href="/account/" className={styles.footerLink}>
                    {t('site.footer.account')}
                  </Link>
                </li>
                <li>
                  <Link href="/account/orders/" className={styles.footerLink}>
                    {t('site.footer.orders')}
                  </Link>
                </li>
                <li>
                  <Link href="/account/wishlist/" className={styles.footerLink}>
                    {t('site.footer.wishlist')}
                  </Link>
                </li>
                <li>
                  <Link href="/cart/" className={styles.footerLink}>
                    {t('site.footer.cart')}
                  </Link>
                </li>
                <li>
                  <Link href="/contact/" className={styles.footerLink}>
                    {t('site.footer.support')}
                  </Link>
                </li>
              </FooterColumn>
            </div>
          </div>
          <div className={styles.contactCard}>
            <h2 className={cx(styles.columnHeading, styles.toneOrange)}>{t('site.footer.contact')}</h2>
            <ul className={styles.contactList}>
              {brand.hasPhone ? (
                <>
                  <li>
                    <Link href={brand.tel} className={styles.contactItem}>
                      <PhoneIcon className={styles.contactIcon} />
                      <span>
                        <span className={styles.contactLabel}>{t('site.footer.phone')}</span>
                        {brand.phone}
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link href={brand.whatsapp} className={styles.contactItem}>
                      <ChatIcon className={styles.contactIcon} />
                      <span>
                        <span className={styles.contactLabel}>{t('site.footer.whatsapp')}</span>
                        {brand.phone}
                      </span>
                    </Link>
                  </li>
                </>
              ) : null}
              <li className={styles.contactItem}>
                <MailIcon className={styles.contactIcon} />
                <span>
                  <span className={styles.contactLabel}>{t('site.footer.email')}</span>
                  <span className={styles.contactLine}>{brand.email}</span>
                  <span className={styles.contactLine}>{brand.secondEmail}</span>
                </span>
              </li>
              {brand.address ? (
                <li>
                  <Link href={brand.maps} className={styles.contactItem}>
                    <PinIcon className={styles.contactIcon} />
                    <span>
                      <span className={styles.contactLabel}>{t('site.footer.address')}</span>
                      {brand.address}
                    </span>
                  </Link>
                </li>
              ) : null}
            </ul>
            <div className={styles.qrRow}>
              <Link href={brand.website} className={styles.qr}>
                <QrCode className={styles.qrCode} />
                <span className={styles.hidden}>{t('site.footer.qr')}</span>
              </Link>
              <DemoButton className={styles.footerDemo}>{t('site.footer.demo')}</DemoButton>
            </div>
          </div>
          <p className={styles.promoted}>{t('site.footer.promoted')}</p>
          {/* The bottom bar is the footer's last child, so it shares the footer's background with no seam. */}
          <div className={styles.baseInner}>
            <p className={styles.copyright}>{t('site.footer.rights', { store: brand.name, city: brand.city, region: brand.region })}</p>
            {/* Powered by and DripFunnel's logo: core's sealed line when the platform asks for it (a required part then), else the theme's own words. */}
            <div className={styles.baseEnd}>
              {poweredBy ? <PoweredBy brand={poweredBy} t={t} className={styles.powered} /> : <span className={styles.poweredLabel}>{t('site.footer.poweredBy')}</span>}
              <Link href={t('site.links.dripfunnel')} className={styles.brandLink}>
                <ThemeImage src="dripfunnel-logo-white.png" alt={t('site.footer.dripfunnelLink')} ratio={2077 / 369} sizes="(min-width: 1024px) 112px, 104px" className={styles.brandLogo} />
              </Link>
            </div>
          </div>
        </footer>
        <nav className={styles.tabBar} aria-label={t('site.tabs.label')}>
          <Link href="/" className={styles.tab}>
            <HomeIcon className={styles.tabIcon} />
            {t('site.tools.home')}
          </Link>
          <Link href="/shop/" className={styles.tab}>
            <StoreIcon className={styles.tabIcon} />
            {t('site.tools.shop')}
          </Link>
          <Link href="/search/" className={styles.tab}>
            <SearchIcon className={styles.tabIcon} />
            {t('site.tools.search')}
          </Link>
          <Link href="/cart/" className={styles.tab}>
            <CartIcon className={styles.tabIcon} />
            {t('site.tools.cart')}
          </Link>
          <Link href="/account/" className={styles.tab}>
            <UserIcon className={styles.tabIcon} />
            {t('site.tools.account')}
          </Link>
        </nav>
        {brand.hasPhone ? (
          <Link href={brand.whatsapp} className={styles.whatsapp}>
            <ChatIcon className={styles.whatsappIcon} />
            <span className={styles.whatsappLabel}>{t('site.chat', { store: brand.name })}</span>
          </Link>
        ) : null}
        <ConsentBanner t={t} className={styles.consent} />
      </DemoProvider>
    </div>
  )
}
