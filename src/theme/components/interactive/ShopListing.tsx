'use client'

import { useMemo, useState } from 'react'
import { Checkbox, useStorefront, type Listing } from '@dripfunnel/storefront-core/theme'
import { cx } from '../cx'
import { GridIcon, ListIcon } from '../Icons'
import { ListingResults } from '../ListingResults'
import styles from '../../styles/shop.module.css'

/**
 * A listing with the grid or list toggle beside its sort and, where `stock` is set, an In stock only filter.
 * That filter reads each product's stock from the products already loaded, so choosing it asks the shop for nothing.
 */
export const ShopListing = ({ listing, stock = false }: { listing: Listing; stock?: boolean }) => {
  const { t } = useStorefront()
  const [list, setList] = useState(false)
  const [inStockOnly, setInStockOnly] = useState(false)
  const items = useMemo(() => (inStockOnly ? listing.items.filter((p) => p.stock.inStock) : listing.items), [inStockOnly, listing.items])
  const tools = (
    <div className={styles.viewToggle} role="group" aria-label={t('shop.view.label')}>
      <button type="button" className={cx(styles.viewButton, !list && styles.viewOn)} aria-pressed={!list} aria-label={t('shop.view.grid')} onClick={() => setList(false)}>
        <GridIcon />
      </button>
      <button type="button" className={cx(styles.viewButton, list && styles.viewOn)} aria-pressed={list} aria-label={t('shop.view.list')} onClick={() => setList(true)}>
        <ListIcon />
      </button>
    </div>
  )
  if (!stock) return <ListingResults listing={listing} list={list} tools={tools} />
  return (
    <ListingResults
      listing={listing}
      list={list}
      tools={tools}
      extra={{
        items,
        on: inStockOnly,
        onClear: () => setInStockOnly(false),
        filter: (
          <div role="group" aria-label={t('shop.listing.availability')} className={styles.facet}>
            <p className={styles.facetName}>{t('shop.listing.availability')}</p>
            <Checkbox checked={inStockOnly} onChange={setInStockOnly} className={styles.check}>
              {t('shop.listing.inStockOnly')}
            </Checkbox>
          </div>
        ),
        chip: inStockOnly ? (
          <button type="button" className={styles.chip} aria-label={t('shop.listing.remove', { name: t('shop.listing.inStockOnly') })} onClick={() => setInStockOnly(false)}>
            {t('shop.listing.inStockOnly')}
            <svg className={styles.chipIcon} viewBox="0 0 16 16" aria-hidden="true" focusable="false">
              <path d="M4 4l8 8M12 4l-8 8" />
            </svg>
          </button>
        ) : null,
      }}
    />
  )
}
