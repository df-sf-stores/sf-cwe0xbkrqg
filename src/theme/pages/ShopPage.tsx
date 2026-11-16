import { Image, Link, useCollections, useHead, useListing, useProducts, useStorefront } from '@dripfunnel/storefront-core/theme'
import { useBrand } from '../components/brand'
import { ShopListing } from '../components/interactive/ShopListing'
import { Layout } from '../components/Layout'
import { PageHero } from '../components/PageHero'
import { LinkArrow, pill } from '../components/Sections'
import shop from '../styles/shop.module.css'

/**
 * /shop/: every product, its filters (the catalogue's own, from the address's `?filter=` values, plus In stock only),
 * the sort and the grid. The pictures beside the title and the category tabs come from the catalogue too.
 */
export const ShopPage = () => {
  const { t } = useStorefront()
  const brand = useBrand()
  const listing = useListing({ collection: null })
  // The same queries the header and home page ask, so core's shared cache answers them with no request of their own.
  const { products } = useProducts({ sort: 'name', first: 24 })
  const { collections } = useCollections({ first: 20 })
  useHead({ title: t('pages.shopAll.seoTitle', { store: brand.name }), description: t('pages.shopAll.lead', { store: brand.name }), canonical: '/shop/' })
  const pictured = products.filter((p) => p.photo).slice(0, 3)
  return (
    <Layout>
      <PageHero
        crumbs={[{ label: t('pages.shopAll.crumb'), href: '/shop/' }]}
        title={t('pages.shopAll.title')}
        lead={t('pages.shopAll.lead', { store: brand.name })}
        aside={
          pictured.length ? (
            <ul className={shop.heroTiles}>
              {pictured.map((p) => (
                <li key={p.id} className={shop.heroTile}>
                  <Link href={p.href} className={shop.heroTileLink}>
                    {p.photo ? <Image image={p.photo} alt={p.photo.alt ?? p.name} ratio={1} sizes="180px" className={shop.cardImage} /> : null}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null
        }
      >
        <div className={shop.heroActions}>
          <Link href="#shop-products" className={pill()}>
            {t('pages.shopAll.browse')}
            <LinkArrow />
          </Link>
        </div>
      </PageHero>
      {collections.length ? (
        <nav className={shop.tabs} aria-label={t('pages.shopAll.categories')}>
          <ul className={shop.tabsInner}>
            <li>
              <Link href="/shop/" className={shop.tabOn} aria-current="page">
                {t('pages.shopAll.all')}
              </Link>
            </li>
            {collections.map((c) => (
              <li key={c.id}>
                <Link href={c.href} className={shop.tab}>
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
      <section id="shop-products" className={shop.page}>
        <ShopListing listing={listing} stock />
      </section>
    </Layout>
  )
}
