import { Link, useCollection, useStorefront } from '@dripfunnel/storefront-core/theme'
import { Layout } from '../components/Layout'
import { ShopListing } from '../components/interactive/ShopListing'
import { Notice } from '../components/Notice'
import { PageHero } from '../components/PageHero'
import { Retry } from '../components/interactive/Retry'
import styles from '../styles/shop.module.css'

export const CollectionPage = () => {
  const { t } = useStorefront()
  const page = useCollection()
  const name = page.collection?.name ?? (page.all ? t('shop.collection.all') : null)
  const lead = page.collection ? page.collection.description : page.all ? t('shop.collection.allLead') : null
  if (page.found === 'missing' || page.found === 'error') {
    return (
      <Layout>
        <section className={styles.page}>
          {page.found === 'missing' ? (
            <Notice main title={t('shop.collection.missing')} lead={t('shop.collection.missingLead')}>
              <Link href="/collections/all/" className={styles.primary}>
                {t('shop.collection.browse')}
              </Link>
            </Notice>
          ) : (
            <Notice main title={t('shop.listing.failed')} lead={t('shop.listing.failedLead')}>
              <Retry label={t('shop.listing.retry')} onRetry={page.retry} />
            </Notice>
          )}
        </section>
      </Layout>
    )
  }
  return (
    <Layout>
      <PageHero crumbs={name ? [{ label: name, href: page.collection?.href ?? '/collections/all/' }] : []} title={name ?? t('shop.collection.loading')} lead={lead} />
      <section className={styles.page}>
        <ShopListing listing={page} />
      </section>
    </Layout>
  )
}
