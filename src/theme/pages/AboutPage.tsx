import { Image, Link, Price, ThemeImage, useHead, useStorefront } from '@dripfunnel/storefront-core/theme'
import { useBrand } from '../components/brand'
import { cx } from '../components/cx'
import { ArrowRight, ChatIcon, CheckCircle } from '../components/Icons'
import { Layout } from '../components/Layout'
import { useMachines } from '../components/machines'
import { LinkArrow, pill, SectionHead, SmartFeatures, Steps, UpClose, WhyFamilies } from '../components/Sections'
import s from '../styles/sections.module.css'
import shop from '../styles/shop.module.css'
import styles from '../styles/pages.module.css'

/** The four claims About and Manufacturing share under their story. */
export const useBuiltClaims = () => {
  const { t } = useStorefront()
  return [t('pages.about.story.c1'), t('pages.about.story.c2'), t('pages.about.story.c3'), t('pages.about.story.c4')]
}

export const AboutPage = () => {
  const { store, locale, t } = useStorefront()
  const brand = useBrand()
  const claims = useBuiltClaims()
  // The same catalogue queries the header asks, so the range below costs no request of its own.
  const { collections, models, loading } = useMachines()
  useHead({ title: t('pages.about.seoTitle', { store: brand.name }), description: t('pages.about.seoDescription', { store: brand.name }), canonical: '/about/' })
  return (
    <Layout>
      <section className={styles.aboutHero}>
        <div className={cx(s.container, styles.aboutHeroGrid)}>
          <div className={styles.aboutHeroCopy}>
            <h1 className={styles.aboutHeroTitle}>{t('pages.about.title')}</h1>
            <p className={styles.aboutLead}>{t('pages.about.lead', { store: brand.name })}</p>
            <p className={styles.isoLine}>
              <ThemeImage src="iso-certified.webp" alt={t('site.footer.isoAlt')} ratio={160 / 164} sizes="48px" className={styles.isoBadge} />
              {t('site.footer.iso')}
            </p>
            <div className={s.actions}>
              <Link href="/shop/" className={pill()}>
                {t('pages.about.viewAll')}
                <LinkArrow />
              </Link>
              <Link href="/contact/" className={pill('outline')}>
                {t('pages.about.talk')}
              </Link>
            </div>
            <p className={styles.aboutPromoted}>{t('pages.about.promoted')}</p>
          </div>
          {/* The four flour mills beside the title, each the theme's own photo of that model. */}
          <ul className={styles.millGrid}>
            <li className={styles.millTile}>
              <ThemeImage src="flour-mill-1-5hp-2in1-01.webp" alt={t('pages.about.mills.m1', { store: brand.name })} ratio={1} sizes="(min-width: 1024px) 22vw, 45vw" className={styles.millImage} />
            </li>
            <li className={styles.millTile}>
              <ThemeImage src="flour-mill-2hp-2in1-01.webp" alt={t('pages.about.mills.m2', { store: brand.name })} ratio={1} sizes="(min-width: 1024px) 22vw, 45vw" className={styles.millImage} />
            </li>
            <li className={styles.millTile}>
              <ThemeImage src="flour-mill-2hp-regular-01.webp" alt={t('pages.about.mills.m3', { store: brand.name })} ratio={1} sizes="(min-width: 1024px) 22vw, 45vw" className={styles.millImage} />
            </li>
            <li className={styles.millTile}>
              <ThemeImage src="flour-mill-standard-01.webp" alt={t('pages.about.mills.m4', { store: brand.name })} ratio={1} sizes="(min-width: 1024px) 22vw, 45vw" className={styles.millImage} />
            </li>
          </ul>
        </div>
      </section>

      <section className={cx(s.section, s.reveal)}>
        <div className={cx(s.container, styles.aboutStory)}>
          <div className={styles.aboutStoryText}>
            <h2 className={s.title}>{t('pages.about.story.title')}</h2>
            <p>{t('pages.about.story.p1', { store: brand.name })}</p>
            <p>{t('pages.about.story.p2', { store: brand.name })}</p>
            <p>{t('pages.about.story.p3', { store: brand.name })}</p>
            <p>{t('pages.about.story.p4', { store: brand.name })}</p>
          </div>
          <div className={styles.aboutStoryAside}>
            <figure className={styles.aboutBanner}>
              <ThemeImage src="about-factory.jpg" alt={t('pages.about.imageAlt', { store: brand.name })} ratio={1024 / 690} sizes="(min-width: 1024px) 40vw, 100vw" className={s.cover} />
            </figure>
            <ul className={styles.claimGrid}>
              {claims.map((c) => (
                <li key={c} className={styles.claim}>
                  <CheckCircle className={styles.claimIcon} />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <UpClose tinted align="start" />

      <section className={cx(s.section, s.reveal)}>
        <div className={s.container}>
          <SectionHead
            align="start"
            title={t('pages.about.range.title', { store: brand.name })}
            lead={t('pages.about.range.lead')}
            action={
              <Link href="/shop/" className={pill('outline')}>
                {t('pages.about.viewAll')}
                <LinkArrow />
              </Link>
            }
          />
          <div className={styles.rangeSplit}>
            <Link href={collections[0]?.href ?? '/shop/'} className={styles.rangePromo}>
              <span className={styles.rangePromoPicture}>
                {collections[0]?.image ? <Image image={collections[0].image} alt="" ratio={1} sizes="(min-width: 1024px) 40vw, 100vw" className={s.cover} /> : <ThemeImage src="category-flour-mill.webp" alt={t('pages.about.range.imageAlt', { store: brand.name })} ratio={1} sizes="(min-width: 1024px) 40vw, 100vw" className={s.cover} />}
              </span>
              <span className={styles.rangePromoText}>
                <span className={styles.rangeName}>{collections[0]?.name ?? t('pages.about.range.all')}</span>
                <span className={styles.rangeMore}>
                  {t('pages.about.range.view')}
                  <ArrowRight className={styles.rangeIcon} />
                </span>
              </span>
            </Link>
            <div className={styles.rangeList}>
              <h3 className={styles.rangeListTitle}>{t('pages.about.range.models')}</h3>
              {loading ? (
                <p className={s.empty} role="status">
                  {t('shop.listing.loading')}
                </p>
              ) : (
                <ul className={styles.rangeModels}>
                  {models.slice(0, 6).map((p) => (
                    <li key={p.id}>
                      <Link href={p.href} className={styles.rangeModel}>
                        <span className={styles.rangeThumb}>{p.photo ? <Image image={p.photo} alt="" ratio={1} sizes="72px" className={styles.rangeThumbImage} /> : null}</span>
                        <span className={styles.rangeModelText}>
                          <span className={styles.rangeModelName}>{p.name}</span>
                          {p.price ? <Price money={p.price} compareAt={p.compareAt} includesTax={store.pricesIncludeTax} locale={locale} t={t} className={styles.rangePrice} /> : null}
                        </span>
                        <span className={cx(shop.stockBadge, p.stock.inStock ? shop.stockIn : shop.stockOut)}>{p.stock.inStock ? t('site.card.inStock') : t('site.card.outOfStock')}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              <Link href="/shop/" className={styles.rangeAll}>
                {t('pages.about.viewAll')}
                <LinkArrow />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SmartFeatures compact />

      <section className={cx(s.section, s.tintOrange, s.reveal)}>
        <div className={s.container}>
          <SectionHead
            align="start"
            title={t('pages.about.process.title')}
            lead={t('pages.about.process.lead')}
            action={
              <Link href="/manufacturing/" className={pill('outline')}>
                {t('pages.about.process.action')}
                <LinkArrow />
              </Link>
            }
          />
          <Steps
            columns={4}
            steps={[
              { title: t('pages.about.process.s1.title'), body: t('pages.about.process.s1.body') },
              { title: t('pages.about.process.s2.title'), body: t('pages.about.process.s2.body') },
              { title: t('pages.about.process.s3.title'), body: t('pages.about.process.s3.body') },
              { title: t('pages.about.process.s4.title'), body: t('pages.about.process.s4.body') },
            ]}
          />
        </div>
      </section>

      <WhyFamilies grid />

      <section className={cx(s.section, styles.aboutCtaSection)}>
        <div className={s.container}>
          <div className={styles.aboutCta}>
            <div className={styles.aboutCtaCopy}>
              <h2 className={s.title}>{t('pages.about.cta.title')}</h2>
              <p className={s.lead}>{t('pages.about.cta.body', { store: brand.name })}</p>
              <div className={s.actions}>
                <Link href="/shop/" className={pill()}>
                  {t('pages.about.viewAll')}
                  <LinkArrow />
                </Link>
                <Link href="/contact/" className={pill('outline')}>
                  {t('pages.about.talk')}
                </Link>
                {brand.hasPhone ? (
                  <Link href={brand.whatsapp} className={pill('blue')}>
                    <ChatIcon className={s.buttonIcon} />
                    {t('pages.about.cta.whatsapp')}
                  </Link>
                ) : null}
              </div>
            </div>
            <ul className={styles.aboutCtaPictures} aria-hidden="true">
              <li className={styles.millTile}>
                <ThemeImage src="flour-mill-2hp-2in1-01.webp" alt="" ratio={1} sizes="200px" className={styles.millImage} />
              </li>
              <li className={styles.millTile}>
                <ThemeImage src="flour-mill-1-5hp-2in1-01.webp" alt="" ratio={1} sizes="200px" className={styles.millImage} />
              </li>
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  )
}
