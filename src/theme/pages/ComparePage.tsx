import { Image, Link, Price, useCollections, useHead, useListing, useProducts, useStorefront } from '@dripfunnel/storefront-core/theme'
import { useBrand } from '../components/brand'
import { cx } from '../components/cx'
import { Layout } from '../components/Layout'
import { percentOff } from '../components/ProductCard'
import { DemoPill, SectionHead } from '../components/Sections'
import { slugOf } from '../components/slugOf'
import s from '../styles/sections.module.css'
import shop from '../styles/shop.module.css'
import styles from '../styles/pages.module.css'

/** Every model side by side: picture, price, saving and stock from the catalogue, in a table that scrolls sideways on phones. */
export const ComparePage = () => {
  const { store, locale, t } = useStorefront()
  const brand = useBrand()
  useHead({ title: t('pages.compare.seoTitle', { store: brand.name }), description: t('pages.compare.lead', { store: brand.name }), canonical: '/compare/' })
  const { collections } = useCollections({ first: 20 })
  const first = collections[0]
  const listing = useListing({ collection: first ? slugOf(first) : null }, first !== undefined)
  const all = useProducts({ sort: 'name', first: 24 })
  const source = first ? listing.items : all.products.filter((p) => /chakki|flour\s*mill/i.test(p.name))
  const models = source.length ? source : all.products
  const loading = (first ? listing.status : all.status) === 'loading'
  return (
    <Layout>
      <section className={s.section}>
        <div className={s.container}>
          <SectionHead as="h1" title={t('pages.compare.title')} lead={t('pages.compare.lead', { store: brand.name })} />
          {loading ? (
            <p className={s.empty} role="status">
              {t('pages.compare.loading')}
            </p>
          ) : models.length === 0 ? (
            <p className={s.empty}>{t('pages.compare.empty')}</p>
          ) : (
            <>
              <p className={styles.scrollHint}>{t('pages.compare.scroll')}</p>
              <div className={styles.compareScroll} tabIndex={0} role="region" aria-label={t('pages.compare.title')}>
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
                            {off ? <span className={shop.offBadge}>{t('site.card.off', { percent: off })}</span> : null}
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
          )}
        </div>
      </section>
    </Layout>
  )
}
