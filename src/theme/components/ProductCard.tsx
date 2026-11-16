import { Image, Link, Price, useStorefront, type Money, type ProductCard as Card } from '@dripfunnel/storefront-core/theme'
import { CardTools } from './interactive/CardTools'
import { cx } from './cx'
import { ArrowRight } from './Icons'
import styles from '../styles/shop.module.css'

/** How much below its compare-at price a product sells, in whole percent; null without a real saving. */
export const percentOff = (price: Money | null, compareAt: Money | null): number | null => {
  if (!price || !compareAt || price.currency !== compareAt.currency) return null
  const now = Number(price.amount)
  const was = Number(compareAt.amount)
  if (!(was > now) || was <= 0) return null
  const off = Math.round((1 - now / was) * 100)
  return off > 0 ? off : null
}

export const ProductCard = ({ product }: { product: Card }) => {
  const { store, locale, t } = useStorefront()
  const off = percentOff(product.price, product.compareAt)
  const inStock = product.stock.inStock
  return (
    <article className={styles.card}>
      <div className={styles.cardPicture}>
        <Link href={product.href} className={styles.cardPictureLink}>
          {product.photo ? <Image image={product.photo} alt={product.photo.alt ?? product.name} ratio={1} sizes="(min-width: 1280px) 300px, (min-width: 768px) 33vw, 66vw" className={styles.cardImage} /> : <span className={styles.noPicture}>{t('site.card.noPicture')}</span>}
        </Link>
        <div className={styles.cardBadges}>
          {off ? <span className={styles.offBadge}>{t('site.card.off', { percent: off })}</span> : null}
          {product.badges[0] ? <span className={styles.badge}>{product.badges[0].label}</span> : null}
        </div>
        <CardTools product={product} percent={off} />
      </div>
      <div className={styles.cardBody}>
        <span className={cx(styles.stockBadge, inStock ? styles.stockIn : styles.stockOut)}>{inStock ? t('site.card.inStock') : t('site.card.outOfStock')}</span>
        <h3 className={styles.cardName}>
          <Link href={product.href} className={styles.cardNameLink}>
            {product.name}
          </Link>
        </h3>
        {product.price ? (
          <p className={styles.cardPrice}>
            {product.from ? <span className={styles.from}>{t('shop.card.from')}</span> : null}
            <Price money={product.price} compareAt={product.compareAt} includesTax={store.pricesIncludeTax} locale={locale} t={t} className={styles.price} />
          </p>
        ) : null}
        {inStock ? (
          <Link href={product.href} className={styles.cardAction}>
            {t('site.card.view')}
            <ArrowRight className={styles.cardActionIcon} />
          </Link>
        ) : (
          <span className={cx(styles.cardAction, styles.cardActionOff)} aria-disabled="true">
            {t('site.card.outOfStock')}
          </span>
        )}
      </div>
    </article>
  )
}

export const ProductGrid = ({ products, wide = false, list = false }: { products: readonly Card[]; wide?: boolean; list?: boolean }) => (
  <ul className={list ? styles.gridList : wide ? styles.gridWide : styles.grid}>
    {products.map((p) => (
      <li key={p.id} className={styles.cell}>
        <ProductCard product={p} />
      </li>
    ))}
  </ul>
)

/** The grid's shape while its products load, so nothing moves when they arrive. */
export const GridPlaceholder = ({ label, count }: { label: string; count: number }) => (
  <ul className={styles.grid} aria-busy="true" aria-label={label}>
    {[...Array(count).keys()].map((i) => (
      <li key={i} className={styles.cell}>
        <div className={styles.skeletonPicture} />
        <div className={styles.skeletonLine} />
        <div className={styles.skeletonLineShort} />
      </li>
    ))}
  </ul>
)
