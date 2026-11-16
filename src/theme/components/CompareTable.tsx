import { Image, Link, Price, useStorefront, type ProductCard as Card } from '@dripfunnel/storefront-core/theme'
import { cx } from './cx'
import { percentOff } from './ProductCard'
import { DemoPill } from './Sections'
import s from '../styles/sections.module.css'
import shop from '../styles/shop.module.css'
import styles from '../styles/pages.module.css'

/**
 * Models side by side: picture, price, saving and stock, all from the catalogue, in a table that scrolls sideways on
 * phones with the row names held in place. Only what the catalogue gives is shown; no specification is made up here.
 */
export const CompareTable = ({ models, label }: { models: readonly Card[]; label: string }) => {
  const { store, locale, t } = useStorefront()
  return (
    <>
      <p className={styles.scrollHint}>{t('pages.compare.scroll')}</p>
      <div className={styles.compareScroll} tabIndex={0} role="region" aria-label={label}>
        <table className={styles.compare}>
          <thead>
            <tr>
              <th scope="col" className={styles.compareCorner}>
                {t('pages.compare.model')}
              </th>
              {models.map((p) => (
                <th key={p.id} scope="col" className={styles.compareHead}>
                  <Link href={p.href} className={styles.compareModel}>
                    <span className={styles.compareThumb}>{p.photo ? <Image image={p.photo} alt="" ratio={1} sizes="160px" className={s.cover} /> : null}</span>
                    <span>{p.name}</span>
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">{t('pages.compare.price')}</th>
              {models.map((p) => {
                const off = percentOff(p.price, p.compareAt)
                return (
                  <td key={p.id}>
                    {p.price ? <Price money={p.price} compareAt={p.compareAt} includesTax={store.pricesIncludeTax} locale={locale} t={t} className={styles.comparePrice} /> : null}
                    {off ? <span className={shop.offText}>{t('site.card.off', { percent: off })}</span> : null}
                  </td>
                )
              })}
            </tr>
            <tr>
              <th scope="row">{t('pages.compare.stock')}</th>
              {models.map((p) => (
                <td key={p.id}>
                  <span className={cx(shop.stockBadge, p.stock.inStock ? shop.stockIn : shop.stockOut)}>{p.stock.inStock ? t('site.card.inStock') : t('site.card.outOfStock')}</span>
                </td>
              ))}
            </tr>
            <tr>
              <th scope="row">
                <span className={s.hidden}>{t('pages.compare.view')}</span>
              </th>
              {models.map((p) => (
                <td key={p.id}>
                  <div className={styles.compareActions}>
                    <Link href={p.href} className={shop.primary}>
                      {t('pages.compare.view')}
                    </Link>
                    <DemoPill tone="outline" product={p.name}>
                      {t('site.demo.title')}
                    </DemoPill>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}
