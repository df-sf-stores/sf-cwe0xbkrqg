import { useEffect, useRef } from 'react'
import { Breadcrumbs, LegalNotices, Link, Price, ProductStory, SizeChart, useProduct, useProducts, useStorefront } from '@dripfunnel/storefront-core/theme'
import { BuyButtons } from '../components/interactive/BuyButtons'
import { DemoButton } from '../components/interactive/Demo'
import { Gallery } from '../components/interactive/Gallery'
import { Options } from '../components/interactive/Options'
import { ProductTabs } from '../components/interactive/ProductTabs'
import { Retry } from '../components/interactive/Retry'
import { WishlistHeart } from '../components/interactive/WishlistHeart'
import { Layout } from '../components/Layout'
import { Notice } from '../components/Notice'
import { percentOff, ProductGrid } from '../components/ProductCard'
import { useBrand } from '../components/brand'
import { cx } from '../components/cx'
import { descriptionSummary } from '../components/productText'
import { LinkArrow, pill } from '../components/Sections'
import { CartIcon, ChatIcon, CheckIcon, HomeIcon, TruckIcon } from '../components/Icons'
import shop from '../styles/shop.module.css'
import story from '../styles/aplus.module.css'
import styles from '../styles/product.module.css'

export const ProductPage = () => {
  const { store, locale, t } = useStorefront()
  const page = useProduct()
  const brand = useBrand()
  // The same catalogue query the header and listing pages ask, so related products cost no request of their own.
  const catalogue = useProducts({ sort: 'name', first: 24 })
  // A slow shop can time that query out; asking once more fills the related products without ever looping.
  const retried = useRef(false)
  const { status: catalogueStatus, retry: retryCatalogue } = catalogue
  useEffect(() => {
    if (catalogueStatus !== 'error' || retried.current) return
    retried.current = true
    retryCatalogue()
  }, [catalogueStatus, retryCatalogue])
  const product = page.product
  if (page.status === 'missing' || page.status === 'error' || !product) {
    return (
      <Layout>
        <section className={shop.page}>
          {page.status === 'missing' ? (
            <Notice main title={t('shop.product.missing')} lead={t('shop.product.missingLead')}>
              <Link href="/collections/all/" className={shop.primary}>
                {t('shop.collection.browse')}
              </Link>
            </Notice>
          ) : page.status === 'error' ? (
            <Notice main title={t('shop.product.failed')} lead={t('shop.listing.failedLead')}>
              <Retry label={t('shop.listing.retry')} onRetry={page.retry} />
            </Notice>
          ) : (
            <div className={styles.product} aria-busy="true">
              <div className={styles.noPicture} />
              <div className={styles.info}>
                <h1 className={styles.loadingTitle}>{t('shop.product.loading')}</h1>
              </div>
            </div>
          )}
        </section>
      </Layout>
    )
  }
  const firstMissing = page.missing[0]
  const off = percentOff(page.price, page.compareAt)
  // Sold out only once every option is chosen; until then the buttons wait for the choice.
  const soldOut = !firstMissing && page.stock !== null && !page.stock.inStock
  const summary = descriptionSummary(product.description)
  const ask = (text: string) => (brand.hasPhone ? brand.chat(text) : '/contact/')
  const related = (product.related.length ? product.related : catalogue.products.filter((p) => p.id !== product.id)).slice(0, 4)
  return (
    <Layout>
      <div className={styles.top}>
        <div className={styles.container}>
          <Breadcrumbs
            crumbs={[
              { label: t('shop.crumbs.home'), href: '/' },
              { label: t('shop.product.shop'), href: '/shop/' },
              { label: product.name, href: product.href },
            ]}
            t={t}
            className={shop.crumbs}
          />
          <div className={styles.product}>
            <Gallery photos={page.photos} video={product.video} name={product.name} />
            <div className={styles.info}>
              {product.badges[0] ? <span className={styles.badge}>{product.badges[0].label}</span> : null}
              <h1 className={styles.title}>{product.name}</h1>
              {summary ? <p className={styles.summary}>{summary}</p> : null}
              <div className={styles.priceRow}>
                {page.price ? (
                  <div className={styles.priceStack}>
                    <p className={styles.price}>
                      {page.from ? <span className={styles.from}>{t('shop.card.from')}</span> : null}
                      <Price money={page.price} compareAt={page.compareAt} includesTax={store.pricesIncludeTax} locale={locale} t={t} className={styles.priceTag} />
                    </p>
                    {off ? <span className={styles.offText}>{t('site.card.off', { percent: off })}</span> : null}
                  </div>
                ) : null}
                <p className={cx(styles.stock, firstMissing ? null : page.stock?.inStock ? styles.stockIn : styles.stockOut)} role="status">
                  {firstMissing ? t('shop.product.choose', { option: firstMissing.name }) : page.stock?.inStock ? t('shop.product.inStock') : t('site.card.outOfStock')}
                </p>
              </div>
              <Options page={page} />
              <SizeChart chart={product.sizeChart} className={styles.sizeLink} />
              {soldOut ? (
                <div className={styles.soldOut}>
                  <p className={styles.soldOutNote}>
                    <svg viewBox="0 0 24 24" className={styles.soldOutIcon} aria-hidden="true" focusable="false">
                      <path d="M21 8l-9-5-9 5v8l9 5 9-5zM3 8l9 5 9-5M12 13v8" />
                    </svg>
                    {t('shop.product.notOrderable')}
                  </p>
                  <div className={styles.soldOutActions}>
                    <Link href={ask(t('shop.product.askAvailabilityText', { store: brand.name, name: product.name }))} className={styles.primaryAction}>
                      <ChatIcon className={styles.actionIcon} />
                      {t('shop.product.askAvailability')}
                    </Link>
                    <button type="button" className={styles.disabledAction} disabled>
                      <CartIcon className={styles.actionIcon} />
                      {t('site.card.outOfStock')}
                    </button>
                  </div>
                </div>
              ) : (
                <BuyButtons page={page} heart={false} />
              )}
              <div className={styles.moreActions}>
                <WishlistHeart productId={product.id} name={product.name} versionId={page.version?.id ?? null} label={t('shop.product.wishlistAdd')} savedLabel={t('shop.product.wishlistSaved')} />
                <Link href={ask(t('shop.product.askText', { store: brand.name, name: product.name }))} className={styles.moreAction}>
                  <ChatIcon className={styles.actionIcon} />
                  {t('shop.product.askProduct')}
                </Link>
                <DemoButton className={styles.moreAction} product={product.name}>
                  <HomeIcon className={styles.actionIcon} />
                  {t('shop.product.demoAction')}
                </DemoButton>
              </div>
              <div className={styles.assurePanel}>
                <div className={styles.assureRow}>
                  <HomeIcon className={styles.assureIcon} />
                  <div>
                    <h2 className={styles.assureTitle}>{t('shop.product.demoTitle')}</h2>
                    <p className={styles.assureBody}>{t('shop.product.demoBody')}</p>
                    <div className={styles.assureActions}>
                      <DemoButton className={styles.smallPrimary} product={product.name}>
                        {t('shop.product.demoAction')}
                      </DemoButton>
                      {brand.hasPhone ? (
                        <Link href={brand.whatsapp} className={styles.smallSoft}>
                          <ChatIcon className={styles.actionIcon} />
                          {t('shop.product.whatsappUs')}
                        </Link>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className={styles.assureRow}>
                  <TruckIcon className={cx(styles.assureIcon, styles.assureIconWarm)} />
                  <div>
                    <h2 className={styles.assureTitle}>{t('shop.product.shippingTitle')}</h2>
                    <p className={styles.assureBody}>{t('shop.product.shippingBody')}</p>
                  </div>
                </div>
              </div>
              <ul className={styles.assureList}>
                {[t('shop.product.assure.secure'), t('shop.product.assure.shipping'), t('shop.product.assure.support'), t('shop.product.assure.after')].map((line) => (
                  <li key={line}>
                    <CheckIcon className={styles.assureTick} />
                    {line}
                  </li>
                ))}
              </ul>
              <LegalNotices notices={product.legal} t={t} className={styles.legal} />
            </div>
          </div>
        </div>
      </div>
      <section className={styles.details} aria-label={t('shop.product.tabs.label')}>
        <div className={styles.container}>
          <ProductTabs product={product} versionId={page.version?.id ?? null} />
          {page.price && page.compareAt && off ? (
            <section className={styles.offer} aria-labelledby="offer-title">
              <h2 id="offer-title" className={styles.offerTitle}>
                <CheckIcon className={styles.offerIcon} />
                {t('shop.product.offerTitle')}
              </h2>
              <dl className={styles.offerGrid}>
                <div className={styles.offerCell}>
                  <dt>{t('shop.product.offerMrp')}</dt>
                  <dd className={styles.offerMrp}>
                    <Price money={page.compareAt} includesTax={store.pricesIncludeTax} locale={locale} t={t} className={styles.offerPrice} />
                  </dd>
                </div>
                <div className={styles.offerCell}>
                  <dt>{t('shop.product.offerPrice')}</dt>
                  <dd>
                    <Price money={page.price} includesTax={store.pricesIncludeTax} locale={locale} t={t} className={styles.offerPrice} />
                  </dd>
                </div>
                <div className={styles.offerCell}>
                  <dt>{t('shop.product.offerSave')}</dt>
                  <dd className={styles.offerSave}>{t('site.card.off', { percent: off })}</dd>
                </div>
              </dl>
              <p className={styles.offerNote}>{t('shop.product.offerNote')}</p>
            </section>
          ) : null}
          <ProductStory product={product} versionId={page.version?.id ?? null} className={story.aplus} classes={story} />
        </div>
      </section>
      {related.length ? (
        <section className={styles.related} aria-labelledby="related-title">
          <div className={styles.container}>
            <div className={styles.relatedHead}>
              <h2 id="related-title" className={styles.relatedTitle}>
                {t('shop.product.relatedTitle')}
              </h2>
              <Link href="/shop/" className={pill('outline')}>
                {t('shop.product.viewAll')}
                <LinkArrow />
              </Link>
            </div>
            <ProductGrid products={related} wide />
          </div>
        </section>
      ) : null}
    </Layout>
  )
}
