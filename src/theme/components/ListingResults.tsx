import type { ReactNode } from 'react'
import { Link, useStorefront, type Listing, type ProductCard } from '@dripfunnel/storefront-core/theme'
import { FilterPanel, ListingBar, MoreOnScroll } from './interactive/Filters'
import { Retry } from './interactive/Retry'
import { Notice } from './Notice'
import { GridPlaceholder, ProductGrid } from './ProductCard'
import styles from '../styles/shop.module.css'

type Extra = {
  /** The products to show when the page narrows the listing further on the shopper's side (the shop's In stock only). */
  items?: readonly ProductCard[]
  /** That filter's control, first in the panel, and its chip in the bar. */
  filter?: ReactNode
  chip?: ReactNode
  on?: boolean
  /** Clears it along with the listing's own filters. */
  onClear?: () => void
}

/** A collection's or a search's products: filters, sort, the grid and its states, and more loading on scroll. */
export const ListingResults = ({ listing, list = false, tools, extra = {} }: { listing: Listing; list?: boolean; tools?: ReactNode; extra?: Extra }) => {
  const { t } = useStorefront()
  const items = extra.items ?? listing.items
  const narrowed = listing.selected.length > 0 || extra.on === true
  const clear = () => {
    listing.clear()
    extra.onClear?.()
  }
  return (
    <div className={listing.facets.length || listing.priceBounds || extra.filter ? styles.listingFiltered : styles.listing}>
      <FilterPanel listing={listing} extra={extra.filter} extraOn={extra.on} onClear={extra.onClear} />
      <div className={styles.results}>
        <h2 className={styles.hiddenHeading}>{t('shop.listing.heading')}</h2>
        {listing.status === 'ready' ? (
          <div className={styles.barRow}>
            <ListingBar listing={listing} shown={items.length} chips={extra.chip} onClear={extra.onClear} />
            {tools}
          </div>
        ) : null}
        {listing.status === 'loading' ? <GridPlaceholder label={t('shop.listing.loading')} count={6} /> : null}
        {listing.status === 'error' ? (
          <Notice title={t('shop.listing.failed')} lead={t('shop.listing.failedLead')}>
            <Retry label={t('shop.listing.retry')} onRetry={listing.retry} />
          </Notice>
        ) : null}
        {listing.status === 'ready' && items.length === 0 ? (
          narrowed ? (
            <Notice title={t('shop.listing.empty')} lead={t('shop.listing.emptyLead')}>
              <Retry label={t('shop.listing.clear')} onRetry={clear} />
            </Notice>
          ) : (
            <Notice title={t('shop.collection.empty')} lead={t('shop.collection.emptyLead')}>
              <Link href="/" className={styles.secondary}>
                {t('shop.collection.home')}
              </Link>
            </Notice>
          )
        ) : null}
        {listing.status === 'ready' ? <ProductGrid products={items} list={list} /> : null}
        <MoreOnScroll listing={listing} />
      </div>
    </div>
  )
}
