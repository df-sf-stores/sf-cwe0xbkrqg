'use client'

import { useEffect, useRef, useState } from 'react'
import { Image, Link, Price, useStorefront, useWishlist, type ProductCard } from '@dripfunnel/storefront-core/theme'
import { cx } from '../cx'
import { CloseIcon, EyeIcon, HeartIcon } from '../Icons'
import { DemoButton } from './Demo'
import styles from '../../styles/shop.module.css'

/** The card's wishlist heart and Quick view, which shows the picture, price and stock without leaving the list. */
export const CardTools = ({ product, percent }: { product: ProductCard; percent: number | null }) => {
  const { store, locale, t } = useStorefront()
  const wishlist = useWishlist()
  const [open, setOpen] = useState(false)
  const box = useRef<HTMLDivElement>(null)
  const opener = useRef<HTMLButtonElement>(null)
  const on = wishlist.has(product.id)
  useEffect(() => {
    if (open) box.current?.focus()
  }, [open])
  const close = () => {
    setOpen(false)
    opener.current?.focus()
  }
  return (
    <>
      <div className={styles.cardTools}>
        <button type="button" className={cx(styles.cardTool, on && styles.cardToolOn)} aria-pressed={on} aria-label={t('shop.wishlist.heart', { name: product.name })} disabled={wishlist.busy || wishlist.status === 'loading'} onClick={() => void wishlist.toggle(product.id, null)}>
          <HeartIcon className={styles.cardToolIcon} />
        </button>
        <button ref={opener} type="button" className={styles.cardTool} aria-label={t('site.card.quick')} onClick={() => setOpen(true)}>
          <EyeIcon className={styles.cardToolIcon} />
        </button>
      </div>
      {open ? (
        <div className={styles.quickBackdrop} onClick={close}>
          <div
            ref={box}
            className={styles.quick}
            role="dialog"
            aria-modal="true"
            aria-label={product.name}
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === 'Escape') close()
            }}
          >
            <button type="button" className={styles.quickClose} aria-label={t('site.card.close')} onClick={close}>
              <CloseIcon />
            </button>
            <div className={styles.quickPicture}>{product.photo ? <Image image={product.photo} alt={product.photo.alt ?? product.name} ratio={1} sizes="(min-width: 768px) 360px, 90vw" className={styles.cardImage} /> : null}</div>
            <div className={styles.quickInfo}>
              {percent ? <span className={styles.offBadge}>{t('site.card.off', { percent })}</span> : null}
              <h2 className={styles.quickName}>{product.name}</h2>
              {product.price ? <Price money={product.price} compareAt={product.compareAt} includesTax={store.pricesIncludeTax} locale={locale} t={t} className={styles.quickPrice} /> : null}
              <span className={cx(styles.stockBadge, product.stock.inStock ? styles.stockIn : styles.stockOut)}>{product.stock.inStock ? t('site.card.inStock') : t('site.card.outOfStock')}</span>
              <div className={styles.quickActions}>
                <Link href={product.href} className={styles.primary}>
                  {t('site.card.view')}
                </Link>
                <DemoButton className={styles.secondary} product={product.name}>
                  {t('site.demo.title')}
                </DemoButton>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
