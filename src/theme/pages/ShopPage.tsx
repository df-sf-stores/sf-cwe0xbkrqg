import { Breadcrumbs, useHead, useListing, useStorefront } from '@dripfunnel/storefront-core/theme'
import { useBrand } from '../components/brand'
import { ShopListing } from '../components/interactive/ShopListing'
import { Layout } from '../components/Layout'
import styles from '../styles/shop.module.css'

/** /shop/: every product, filtered by the address's `?filter=` values (the mega menu's sub-types) and sorted. */
export const ShopPage = () => {
  const { t } = useStorefront()
  const brand = useBrand()
  const listing = useListing({ collection: null })
  useHead({ title: t('pages.shopAll.seoTitle', { store: brand.name }), description: t('pages.shopAll.lead', { store: brand.name }), canonical: '/shop/' })
  return (
    <Layout>
      <section className={styles.page}>
        <Breadcrumbs
          crumbs={[
            { label: t('shop.crumbs.home'), href: '/' },
            { label: t('site.nav.shop'), href: '/shop/' },
          ]}
          t={t}
          className={styles.crumbs}
        />
        <header className={styles.intro}>
          <h1 className={styles.title}>{t('pages.shopAll.title')}</h1>
          <p className={styles.lead}>{t('pages.shopAll.lead', { store: brand.name })}</p>
        </header>
        <ShopListing listing={listing} />
      </section>
    </Layout>
  )
}
