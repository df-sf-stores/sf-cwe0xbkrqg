import { Image, Link, ThemeImage, useCollections, useHead, useStorefront } from '@dripfunnel/storefront-core/theme'
import { useBrand } from '../components/brand'
import { cx } from '../components/cx'
import { ArrowRight } from '../components/Icons'
import { Layout } from '../components/Layout'
import { Checklist, pill, SectionHead, SmartFeatures, Steps, UpClose, WhyFamilies } from '../components/Sections'
import s from '../styles/sections.module.css'
import styles from '../styles/pages.module.css'

/** The four claims About and Manufacturing share under their story. */
export const useBuiltClaims = () => {
  const { t } = useStorefront()
  return [t('pages.about.story.c1'), t('pages.about.story.c2'), t('pages.about.story.c3'), t('pages.about.story.c4')]
}

export const AboutPage = () => {
  const { t } = useStorefront()
  const brand = useBrand()
  const claims = useBuiltClaims()
  const { collections, status } = useCollections({ first: 20 })
  useHead({ title: t('pages.about.seoTitle', { store: brand.name }), description: t('pages.about.seoDescription', { store: brand.name }), canonical: '/about/' })
  // Each collection from the catalogue; with none yet, one card for every machine.
  const range = collections.length ? collections.map((c) => ({ id: c.id, name: c.name, lead: c.description, href: c.href, image: c.image })) : [{ id: 'all', name: t('pages.about.range.all'), lead: t('pages.about.range.allLead', { store: brand.name }), href: '/shop/', image: null }]
  return (
    <Layout>
      <section className={styles.hero}>
        <div className={cx(s.container, styles.heroGrid)}>
          <div className={styles.heroCopy}>
            <h1 className={styles.heroTitle}>{t('pages.about.title')}</h1>
            <p className={s.lead}>{t('pages.about.lead', { store: brand.name })}</p>
            <p className={styles.isoLine}>
              <ThemeImage src="iso-certified.webp" alt={t('site.footer.isoAlt')} ratio={160 / 164} sizes="48px" className={styles.isoBadge} />
              {t('site.footer.iso')}
            </p>
            <div className={s.actions}>
              <Link href="/shop/" className={pill()}>{t('pages.about.view')}</Link>
              <Link href="/contact/" className={pill('outline')}>
                {t('pages.about.talk')}
              </Link>
            </div>
            <p className={styles.promoted}>{t('pages.about.promoted')}</p>
          </div>
          <figure className={styles.heroPicture}>
            <ThemeImage src="about-factory.jpg" alt={t('pages.about.imageAlt', { store: brand.name })} ratio={4 / 3} sizes="(min-width: 1024px) 45vw, 100vw" className={s.cover} />
          </figure>
        </div>
      </section>

      <section className={cx(s.section, s.reveal)}>
        <div className={cx(s.container, styles.story)}>
          <h2 className={cx(s.title, styles.storyTitle)}>{t('pages.about.story.title')}</h2>
          <div className={styles.storyBody}>
            <p>{t('pages.about.story.p1', { store: brand.name })}</p>
            <p>{t('pages.about.story.p2', { store: brand.name })}</p>
            <p>{t('pages.about.story.p3', { store: brand.name })}</p>
            <p>{t('pages.about.story.p4', { store: brand.name })}</p>
            <Checklist items={claims} />
          </div>
        </div>
      </section>

      <UpClose tinted />

      <section className={cx(s.section, s.reveal)}>
        <div className={s.container}>
          <SectionHead title={t('pages.about.range.title', { store: brand.name })} lead={t('pages.about.range.lead')} />
          <ul className={styles.range} aria-busy={status === 'loading'}>
            {range.map((c) => (
              <li key={c.id}>
                <Link href={c.href} className={styles.rangeCard}>
                  <span className={styles.rangePicture}>
                    {c.image ? <Image image={c.image} alt="" ratio={1} sizes="(min-width: 768px) 33vw, 100vw" className={s.cover} /> : <ThemeImage src="category-flour-mill.webp" alt={t('pages.about.range.imageAlt', { store: brand.name })} ratio={1} sizes="(min-width: 768px) 33vw, 100vw" className={s.cover} />}
                  </span>
                  <span className={styles.rangeText}>
                    <span className={styles.rangeName}>{c.name}</span>
                    {c.lead ? <span className={styles.rangeLead}>{c.lead}</span> : null}
                    <span className={styles.rangeMore}>
                      {t('pages.about.range.shop')}
                      <ArrowRight className={styles.rangeIcon} />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SmartFeatures />

      <section className={cx(s.section, s.tinted, s.reveal)}>
        <div className={s.container}>
          <SectionHead title={t('pages.about.process.title')} lead={t('pages.about.process.lead')} />
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

      <WhyFamilies />
    </Layout>
  )
}
