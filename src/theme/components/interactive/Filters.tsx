'use client'

import { useState, type ReactNode } from 'react'
import { Checkbox, PriceRange, Select, useLoadOnScroll, useStorefront, type Listing, type SortKey } from '@dripfunnel/storefront-core/theme'
import styles from '../../styles/shop.module.css'

/**
 * The filter values and the price range, a sidebar on wide screens and a panel the Filters button opens on narrow ones.
 * `extra` goes first (the shop's In stock only), `extraOn` while it is chosen, and cleared with the rest by `onClear`.
 * A value no product carries yet shows greyed and can't be chosen, so a shopper never filters down to nothing;
 * one already chosen stays a checkbox so it can be taken off.
 */
export const FilterPanel = ({ listing, extra, extraOn, onClear }: { listing: Listing; extra?: ReactNode; extraOn?: boolean; onClear?: () => void }) => {
  const { t } = useStorefront()
  const [open, setOpen] = useState(false)
  if (listing.facets.length === 0 && !listing.priceBounds && !extra) return null
  const priced = listing.priceRange.min !== null || listing.priceRange.max !== null
  const chosen = listing.selected.length + Number(priced) + Number(Boolean(extraOn))
  const clear = () => {
    listing.clear()
    onClear?.()
  }
  return (
    <aside className={styles.filters}>
      <button type="button" className={styles.filterToggle} aria-expanded={open} aria-controls="listing-filters" onClick={() => setOpen(!open)}>
        {open ? t('shop.listing.filtersShown') : t('shop.listing.filters')}
        {chosen ? <span className={styles.count}>{chosen}</span> : null}
      </button>
      <div id="listing-filters" className={open ? styles.filterBodyOpen : styles.filterBody}>
        <div className={styles.filterHead}>
          <h2 className={styles.filterTitle}>{t('shop.listing.filters')}</h2>
          {chosen ? (
            <button type="button" className={styles.clear} onClick={clear}>
              {t('shop.listing.clear')}
            </button>
          ) : null}
        </div>
        {extra}
        {listing.facets.map((facet) => (
          <div key={facet.id} role="group" aria-label={facet.name} className={styles.facet}>
            <p className={styles.facetName}>{facet.name}</p>
            {facet.values.map((value) =>
              value.count > 0 || value.selected ? (
                <Checkbox key={value.id} checked={value.selected} onChange={() => listing.toggle(value.id)} className={styles.check}>
                  {value.name} <span className={styles.muted}>{t('shop.listing.valueCount', { count: value.count })}</span>
                </Checkbox>
              ) : (
                <span key={value.id} className={styles.checkEmpty}>
                  {value.name} <span className={styles.muted}>{t('shop.listing.valueCount', { count: value.count })}</span>
                </span>
              ),
            )}
          </div>
        ))}
        {listing.priceBounds ? (
          <div className={styles.facet}>
            <p className={styles.facetName}>{t('shop.listing.price')}</p>
            <PriceRange
              bounds={listing.priceBounds}
              value={listing.priceRange}
              onChange={listing.setPriceRange}
              label={t('shop.listing.price')}
              className={styles.priceRange}
              parts={{ track: styles.priceTrack, rail: styles.priceRail, fill: styles.priceFill, tick: styles.priceTick, thumb: styles.priceThumb, ends: styles.priceEnds, select: styles.priceSelect, to: styles.priceTo }}
            />
          </div>
        ) : null}
      </div>
    </aside>
  )
}

/** How many products show, the sort, and the chosen filters as chips that each remove one. */
export const ListingBar = ({ listing, shown = listing.items.length, chips, onClear }: { listing: Listing; shown?: number; chips?: ReactNode; onClear?: () => void }) => {
  const { t } = useStorefront()
  const labels: Record<SortKey, string> = {
    featured: t('shop.listing.sorts.featured'),
    newest: t('shop.listing.sorts.newest'),
    'price-low': t('shop.listing.sorts.priceLow'),
    'price-high': t('shop.listing.sorts.priceHigh'),
    name: t('shop.listing.sorts.name'),
  }
  return (
    <div className={styles.toolbar}>
      <p className={styles.muted} role="status">
        {t('shop.listing.showing', { count: shown })}
      </p>
      <Select label={t('shop.listing.sort')} value={listing.sort} options={listing.sorts.map((s) => ({ value: s, label: labels[s] }))} onChange={listing.setSort} className={styles.sort} />
      <div className={styles.chips}>
        {chips}
        {listing.selected.map((s) => (
          <button key={s.id} type="button" className={styles.chip} aria-label={t('shop.listing.remove', { name: s.name })} onClick={() => listing.toggle(s.id)}>
            {s.name}
            <svg className={styles.chipIcon} viewBox="0 0 16 16" aria-hidden="true" focusable="false">
              <path d="M4 4l8 8M12 4l-8 8" />
            </svg>
          </button>
        ))}
        {listing.selected.length + (chips ? 1 : 0) > 1 ? (
          <button
            type="button"
            className={styles.clear}
            onClick={() => {
              listing.clear()
              onClear?.()
            }}
          >
            {t('shop.listing.clear')}
          </button>
        ) : null}
      </div>
    </div>
  )
}

/** Infinite scroll: the next page loads as the end of the grid nears the screen, and a page that didn't load offers a retry. */
export const MoreOnScroll = ({ listing }: { listing: Listing }) => {
  const { t } = useStorefront()
  const end = useLoadOnScroll(listing)
  return (
    <div ref={end} className={styles.more}>
      {listing.loadingMore ? (
        <p className={styles.muted} role="status">
          {t('shop.listing.loadingMore')}
        </p>
      ) : null}
      {listing.moreFailed ? (
        <>
          <p className={styles.muted} role="alert">
            {t('shop.listing.moreFailed')}
          </p>
          <button type="button" className={styles.secondary} onClick={listing.fetchMore}>
            {t('shop.listing.retry')}
          </button>
        </>
      ) : null}
    </div>
  )
}
