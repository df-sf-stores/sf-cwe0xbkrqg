import { Link, Price, ThemeImage, useCollections, useHead, useListing, useProducts, useStorefront, type ProductCard as Card } from '@dripfunnel/storefront-core/theme'
import { slugOf } from '../components/slugOf'
import { WheatEar } from '../components/Art'
import { useBrand } from '../components/brand'
import { cx } from '../components/cx'
import { AwardIcon, CheckIcon, HeadsetIcon, HomeIcon, ShieldIcon, TruckIcon, ZapIcon } from '../components/Icons'
import { HeroSlider } from '../components/interactive/HeroSlider'
import hero from '../styles/hero.module.css'
import { Layout } from '../components/Layout'
import { percentOff, ProductCard } from '../components/ProductCard'
import { DemoPill, LinkArrow, pill, SectionHead, SmartFeatures, Steps, textLink, UpClose, WhatsAppPill, WhyFamilies } from '../components/Sections'
import { GridPlaceholder } from '../components/ProductCard'
import s from '../styles/sections.module.css'
import styles from '../styles/home.module.css'

/** The flagship: the 1.5 HP model by its name in the catalogue, else the first machine. */
const flagshipOf = (products: Card[]) => products.find((p) => /1[.,]?5\s*hp/i.test(p.name)) ?? products[0]

export const HomePage = () => {
  const { store, locale, t } = useStorefront()
  const brand = useBrand()
  const catalogue = useProducts({ sort: 'name', first: 24 })
  useHead({ title: t('home.seoTitle', { store: brand.name }), description: t('home.seoDescription', { store: brand.name }), canonical: '/' })
  // The store's first collection when it has one (Storefront › Collections); until then, its atta chakki and flour mills by name.
  const { collections } = useCollections({ first: 20 })
  const first = collections[0]
  const listing = useListing({ collection: first ? slugOf(first) : null }, first !== undefined)
  const machines = first ? listing.items : catalogue.products
  const featured = first ? machines : machines.filter((p) => /chakki|flour\s*mill/i.test(p.name))
  const shown = featured.length ? featured : machines
  const collectionHref = first?.href ?? '/shop/'
  const flagship = flagshipOf(shown)
  const flagshipOff = flagship ? percentOff(flagship.price, flagship.compareAt) : null
  const why = [
    { key: 'iso', icon: <ThemeImage src="iso-certified.webp" alt={t('site.footer.isoAlt')} ratio={160 / 164} sizes="40px" className={styles.whyIso} />, title: t('home.why.iso.title'), body: t('home.why.iso.body') },
    { key: 'demo', icon: <HomeIcon className={styles.whyIcon} />, title: t('home.why.demo.title'), body: t('home.why.demo.body') },
    { key: 'shipping', icon: <TruckIcon className={styles.whyIcon} />, title: t('home.why.shipping.title'), body: t('home.why.shipping.body') },
    { key: 'motor', icon: <ZapIcon className={styles.whyIcon} />, title: t('home.why.motor.title'), body: t('home.why.motor.body') },
    { key: 'safe', icon: <ShieldIcon className={styles.whyIcon} />, title: t('home.why.safe.title'), body: t('home.why.safe.body') },
    { key: 'support', icon: <HeadsetIcon className={styles.whyIcon} />, title: t('home.why.support.title'), body: t('home.why.support.body', { store: brand.name }) },
  ]
  const designed = [
    { key: 'wheat', image: <ThemeImage src="atta-chakki-1-5hp-2in1-design-01.webp" alt="" ratio={668 / 917} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className={s.cover} />, title: t('home.designed.wheat.title'), body: t('home.designed.wheat.body'), range: true },
    { key: 'multi', image: <ThemeImage src="live-3.webp" alt="" ratio={760 / 1013} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className={s.cover} />, title: t('home.designed.multi.title'), body: t('home.designed.multi.body'), range: false },
    { key: 'texture', image: <ThemeImage src="flour-mill-standard-02.webp" alt="" ratio={500 / 615} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className={s.cover} />, title: t('home.designed.texture.title'), body: t('home.designed.texture.body'), range: false },
    { key: 'hygiene', image: <ThemeImage src="atta-chakki-1-5hp-2in1-design-03.webp" alt="" ratio={668 / 926} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className={s.cover} />, title: t('home.designed.hygiene.title'), body: t('home.designed.hygiene.body'), range: false },
  ]
  const actions = (
    <>
      <DemoPill>{t('home.hero.demo')}</DemoPill>
      <Link href={collectionHref} className={pill('outline')}>
        {t('home.hero.view')}
      </Link>
    </>
  )
  return (
    <Layout>
      <h1 className={s.hidden}>
        {t('home.title')} {t('home.lead', { store: brand.name })}
      </h1>
      <HeroSlider
        slides={[
          { key: 's1', image: <ThemeImage src="1.webp" alt={t('home.hero.s1.alt', { store: brand.name })} ratio={2048 / 768} sizes="(min-width: 1024px) 1440px, 100vw" className={hero.image} />, title: t('home.hero.s1.title'), body: t('home.hero.s1.body', { store: brand.name }), href: '/shop/' },
          { key: 's2', image: <ThemeImage src="2.webp" alt={t('home.hero.s2.alt', { store: brand.name })} ratio={2048 / 768} sizes="(min-width: 1024px) 1440px, 100vw" className={hero.image} />, title: t('home.hero.s2.title'), body: t('home.hero.s2.body'), href: '/shop/' },
          { key: 's3', image: <ThemeImage src="6.webp" alt={t('home.hero.s3.alt', { store: brand.name })} ratio={2048 / 768} sizes="(min-width: 1024px) 1440px, 100vw" className={hero.image} />, title: t('home.hero.s3.title'), body: t('home.hero.s3.body'), href: '/shop/' },
          { key: 's4', image: <ThemeImage src="7.webp" alt={t('home.hero.s4.alt', { store: brand.name })} ratio={2048 / 768} sizes="(min-width: 1024px) 1440px, 100vw" className={hero.image} />, title: t('home.hero.s4.title'), body: t('home.hero.s4.body', { store: brand.name }), href: '/shop/' },
          { key: 's5', image: <ThemeImage src="5.webp" alt={t('home.hero.s5.alt', { store: brand.name })} ratio={2048 / 768} sizes="(min-width: 1024px) 1440px, 100vw" className={hero.image} />, title: t('home.hero.s5.title'), body: t('home.hero.s5.body', { store: brand.name }), href: '/shop/' },
        ]}
        labels={{ region: t('home.hero.region'), role: t('home.hero.role'), previous: t('home.hero.previous'), next: t('home.hero.next'), pause: t('home.hero.pause'), play: t('home.hero.play'), goTo: (n) => t('home.hero.goTo', { n }) }}
        actions={actions}
      />

      <section className={cx(s.section, s.reveal)}>
        <div className={s.container}>
          <SectionHead title={t('home.why.title', { store: brand.name })} wheat />
          <ul className={styles.why}>
            {why.map((w) => (
              <li key={w.key} className={styles.whyCard}>
                <span className={styles.whyBadge}>{w.icon}</span>
                <h3 className={styles.whyTitle}>{w.title}</h3>
                <p className={styles.whyBody}>{w.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={cx(s.section, s.tinted, s.reveal)}>
        <div className={s.container}>
          <SectionHead align="start" title={t('home.featured.title')} lead={t('home.featured.lead', { store: brand.name })} action={<Link href="/shop/" className={pill()}>{t('home.featured.action')}</Link>} />
          {(first ? listing.status : catalogue.status) === 'loading' ? (
            <GridPlaceholder label={t('shop.listing.loading')} count={4} />
          ) : shown.length ? (
            <ul className={s.rail} aria-label={t('home.featured.title')}>
              {shown.slice(0, 8).map((p) => (
                <li key={p.id} className={s.railItem}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          ) : (
            <p className={s.empty}>{t('home.featured.empty')}</p>
          )}
        </div>
      </section>

      <section className={cx(s.section, s.reveal)}>
        <div className={cx(s.container, styles.flagship)}>
          <div className={styles.flagshipGallery}>
            <figure className={styles.flagshipMain}>
              <ThemeImage src="atta-chakki-1-5hp-2in1-design-02.webp" alt={t('home.flagship.design2', { store: brand.name })} ratio={668 / 960} sizes="(min-width: 1024px) 34vw, 90vw" className={s.cover} />
              <figcaption className={styles.flagshipBadge}>{t('home.flagship.badge', { store: brand.name })}</figcaption>
            </figure>
            <ul className={styles.flagshipThumbs} aria-label={t('home.flagship.gallery')}>
              <li>
                <ThemeImage src="atta-chakki-1-5hp-2in1-design-01.webp" alt={t('home.flagship.design1', { store: brand.name })} ratio={668 / 917} sizes="120px" className={s.cover} />
              </li>
              <li>
                <ThemeImage src="atta-chakki-1-5hp-2in1-design-02.webp" alt={t('home.flagship.design2', { store: brand.name })} ratio={668 / 960} sizes="120px" className={s.cover} />
              </li>
              <li>
                <ThemeImage src="atta-chakki-1-5hp-2in1-design-03.webp" alt={t('home.flagship.design3', { store: brand.name })} ratio={668 / 926} sizes="120px" className={s.cover} />
              </li>
            </ul>
          </div>
          <div className={styles.flagshipCopy}>
            <span className={s.eyebrow}>{t('home.flagship.badge', { store: brand.name })}</span>
            <h2 className={s.title}>{t('home.flagship.title', { store: brand.name })}</h2>
            <p className={s.lead}>{t('home.flagship.lead')}</p>
            <ul className={styles.specList}>
              {[t('home.flagship.f1'), t('home.flagship.f2'), t('home.flagship.f3'), t('home.flagship.f4'), t('home.flagship.f5'), t('home.flagship.f6'), t('home.flagship.f7'), t('home.flagship.f8'), t('home.flagship.f9')].map((f) => (
                <li key={f} className={styles.spec}>
                  <CheckIcon className={styles.specIcon} />
                  {f}
                </li>
              ))}
            </ul>
            {flagship?.price ? (
              <div className={styles.priceBlock}>
                <Price money={flagship.price} compareAt={flagship.compareAt} includesTax={store.pricesIncludeTax} locale={locale} t={t} className={styles.flagshipPrice} />
                {flagshipOff ? <span className={styles.offChip}>{t('site.card.off', { percent: flagshipOff })}</span> : null}
                <span className={flagship.stock.inStock ? styles.inStock : styles.outStock}>{flagship.stock.inStock ? t('site.card.inStock') : t('site.card.outOfStock')}</span>
              </div>
            ) : null}
            <ul className={s.chips}>
              <li className={s.chip}>
                <HomeIcon className={s.chipIcon} />
                {t('home.flagship.chipDemo')}
              </li>
              <li className={s.chip}>
                <TruckIcon className={s.chipIcon} />
                {t('home.flagship.chipShipping')}
              </li>
            </ul>
            <div className={s.actions}>
              <Link href={flagship?.href ?? '/shop/'} className={pill()}>{t('home.flagship.view')}</Link>
              <DemoPill tone="outline" product={flagship?.name}>
                {t('home.flagship.demo')}
              </DemoPill>
            </div>
          </div>
        </div>
      </section>

      <section className={cx(s.section, s.tinted, s.reveal)}>
        <div className={cx(s.container, styles.demo)}>
          <div className={styles.demoCopy}>
            <SectionHead align="start" title={t('home.homeDemo.title', { store: brand.name })} lead={t('home.homeDemo.lead')} />
            <Steps
              columns={3}
              steps={[
                { title: t('home.homeDemo.s1.title'), body: t('home.homeDemo.s1.body') },
                { title: t('home.homeDemo.s2.title'), body: t('home.homeDemo.s2.body') },
                { title: t('home.homeDemo.s3.title'), body: t('home.homeDemo.s3.body') },
              ]}
            />
            <div className={s.actions}>
              <DemoPill>{t('home.homeDemo.demo')}</DemoPill>
              <WhatsAppPill>{t('home.homeDemo.whatsapp')}</WhatsAppPill>
            </div>
          </div>
          <figure className={styles.demoPicture}>
            <ThemeImage src="live-2.webp" alt={t('home.homeDemo.imageAlt', { store: brand.name })} ratio={760 / 1013} sizes="(min-width: 1024px) 40vw, 100vw" className={s.cover} />
          </figure>
        </div>
        <div className={cx(s.container, styles.demoCards)}>
          <article className={styles.demoCard}>
            <span className={styles.demoCardIcon}>
              <AwardIcon />
            </span>
            <div>
              <h3 className={styles.demoCardTitle}>{t('home.homeDemo.tryTitle')}</h3>
              <p className={styles.demoCardBody}>{t('home.homeDemo.tryBody')}</p>
            </div>
          </article>
          <article className={cx(styles.demoCard, styles.demoCardPicture)}>
            <ThemeImage src="atta-chakki-1-5hp-2in1-design-02.webp" alt={t('home.homeDemo.shipAlt', { store: brand.name })} ratio={668 / 960} sizes="160px" className={styles.demoCardImage} />
            <div>
              <h3 className={styles.demoCardTitle}>{t('home.homeDemo.shipTitle')}</h3>
              <p className={styles.demoCardBody}>{t('home.homeDemo.shipBody')}</p>
            </div>
          </article>
        </div>
      </section>

      <SmartFeatures />

      <section className={cx(s.section, s.tinted, s.reveal)}>
        <div className={s.container}>
          <SectionHead align="start" title={t('home.designed.title')} lead={t('home.designed.lead', { store: brand.name })} action={<Link href={collectionHref} className={pill()}>{t('home.designed.action')}</Link>} />
          <ul className={styles.designed}>
            {designed.map((d) => (
              <li key={d.key}>
                <Link href={collectionHref} className={styles.designedCard}>
                  <span className={styles.designedPicture}>
                    {d.image}
                  </span>
                  <span className={styles.designedText}>
                    <span className={styles.designedTitle}>{d.title}</span>
                    <span className={styles.designedBody}>{d.body}</span>
                    {d.range && featured.length ? (
                      <span className={styles.inRange}>
                        <span className={styles.inRangeLabel}>{t('home.designed.inRange')}</span>
                        {featured.slice(0, 4).map((p) => (
                          <span key={p.id} className={styles.inRangeItem}>
                            {p.name}
                          </span>
                        ))}
                      </span>
                    ) : null}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <UpClose />

      <WhyFamilies />

      <section className={cx(s.section, s.reveal)}>
        <div className={s.container}>
          <SectionHead align="start" title={t('home.built.title')} lead={t('home.built.lead', { store: brand.name })} action={<Link href="/manufacturing/" className={textLink}>
{t('home.built.action')}
<LinkArrow />
</Link>} />
          <Steps
            columns={5}
            steps={[
              { title: t('home.built.s1.title'), body: t('home.built.s1.body') },
              { title: t('home.built.s2.title'), body: t('home.built.s2.body') },
              { title: t('home.built.s3.title'), body: t('home.built.s3.body') },
              { title: t('home.built.s4.title'), body: t('home.built.s4.body') },
              { title: t('home.built.s5.title'), body: t('home.built.s5.body') },
            ]}
          />
          <ul className={styles.builtPictures}>
            <li>
              <ThemeImage src="flour-mill-1-5hp-2in1-01.webp" alt={t('home.built.alt1', { store: brand.name })} ratio={1} sizes="(min-width: 768px) 33vw, 100vw" className={s.cover} />
            </li>
            <li>
              <ThemeImage src="flour-mill-2hp-2in1-01.webp" alt={t('home.built.alt2', { store: brand.name })} ratio={1} sizes="(min-width: 768px) 33vw, 100vw" className={s.cover} />
            </li>
            <li>
              <ThemeImage src="flour-mill-standard-02.webp" alt={t('home.built.alt3', { store: brand.name })} ratio={500 / 615} sizes="(min-width: 768px) 33vw, 100vw" className={s.cover} />
            </li>
          </ul>
          <WheatEar className={styles.builtWheat} />
        </div>
      </section>
    </Layout>
  )
}

