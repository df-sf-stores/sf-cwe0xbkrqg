'use client'

import { useState } from 'react'
import { useStorefront, type Listing } from '@dripfunnel/storefront-core/theme'
import { cx } from '../cx'
import { GridIcon, ListIcon } from '../Icons'
import { ListingResults } from '../ListingResults'
import styles from '../../styles/shop.module.css'

/** A listing with the grid or list toggle beside its sort. */
export const ShopListing = ({ listing }: { listing: Listing }) => {
  const { t } = useStorefront()
  const [list, setList] = useState(false)
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
  return <ListingResults listing={listing} list={list} tools={tools} />
}
