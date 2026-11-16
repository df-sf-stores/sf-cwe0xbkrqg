import { Link, ThemeImage, useHead, useStorefront } from '@dripfunnel/storefront-core/theme'
import { WheatEar } from '../components/Art'
import { useBrand } from '../components/brand'
import { cx } from '../components/cx'
import { Lightbox } from '../components/interactive/Lightbox'
import { Layout } from '../components/Layout'
import { Checklist, DemoPill, pill, SectionHead, Steps, UpClose } from '../components/Sections'
import { useBuiltClaims } from './AboutPage'
import s from '../styles/sections.module.css'
import styles from '../styles/pages.module.css'

export const ManufacturingPage = () => {
  const { t } = useStorefront()
  const brand = useBrand()
  const claims = useBuiltClaims()
  useHead({ title: t('pages.manufacturing.seoTitle', { store: brand.name }), description: t('pages.manufacturing.seoDescription', { store: brand.name }), canonical: '/manufacturing/' })
  return (
    <Layout>
      <section className={styles.hero}>
        <div className={cx(s.container, styles.heroGrid)}>
          <div className={styles.heroCopy}>
            <h1 className={styles.heroTitle}>{t('pages.manufacturing.title')}</h1>
            <p className={s.lead}>{t('pages.manufacturing.lead', { store: brand.name })}</p>
            <div className={s.actions}>
              <DemoPill>{t('pages.manufacturing.demo')}</DemoPill>
              <Link href="/shop/" className={pill('outline')}>
                {t('pages.manufacturing.view')}
              </Link>
            </div>
          </div>
          <figure className={cx(styles.heroPicture, styles.heroPictureSquare)}>
            <ThemeImage src="flour-mill-2hp-2in1-01.webp" alt={t('pages.manufacturing.models.a2', { store: brand.name })} ratio={1} sizes="(min-width: 1024px) 40vw, 100vw" className={s.cover} />
            <WheatEar className={styles.heroWheat} />
          </figure>
        </div>
      </section>

      <section className={cx(s.section, s.reveal)}>
        <div className={s.container}>
          <SectionHead title={t('pages.manufacturing.stages.title')} />
          <Steps
            columns={5}
            steps={[
              { title: t('pages.manufacturing.stages.s1.title'), body: t('pages.manufacturing.stages.s1.body') },
              { title: t('pages.manufacturing.stages.s2.title'), body: t('pages.manufacturing.stages.s2.body') },
              { title: t('pages.manufacturing.stages.s3.title'), body: t('pages.manufacturing.stages.s3.body') },
              { title: t('pages.manufacturing.stages.s4.title'), body: t('pages.manufacturing.stages.s4.body') },
              { title: t('pages.manufacturing.stages.s5.title'), body: t('pages.manufacturing.stages.s5.body') },
            ]}
          />
        </div>
      </section>

      <section className={cx(s.section, s.tinted, s.reveal)}>
        <div className={cx(s.container, styles.story)}>
          <h2 className={cx(s.title, styles.storyTitle)}>{t('pages.manufacturing.lasting')}</h2>
          <div className={styles.storyBody}>
            <p>{t('pages.about.story.p2', { store: brand.name })}</p>
            <Checklist items={claims} />
          </div>
        </div>
      </section>

      <UpClose />

      <section className={cx(s.section, s.tinted, s.reveal)}>
        <div className={s.container}>
          <SectionHead title={t('pages.manufacturing.models.title')} lead={t('pages.manufacturing.models.lead', { store: brand.name })} />
          <Lightbox
            columns={4}
            photos={[
              { key: 'a1', caption: t('pages.manufacturing.models.a1', { store: brand.name }), image: <ThemeImage src="flour-mill-1-5hp-2in1-01.webp" alt={t('pages.manufacturing.models.a1', { store: brand.name })} ratio={1} sizes="(min-width: 768px) 25vw, 50vw" /> },
              { key: 'a2', caption: t('pages.manufacturing.models.a2', { store: brand.name }), image: <ThemeImage src="flour-mill-2hp-2in1-01.webp" alt={t('pages.manufacturing.models.a2', { store: brand.name })} ratio={1} sizes="(min-width: 768px) 25vw, 50vw" /> },
              { key: 'a3', caption: t('pages.manufacturing.models.a3', { store: brand.name }), image: <ThemeImage src="flour-mill-2hp-regular-01.webp" alt={t('pages.manufacturing.models.a3', { store: brand.name })} ratio={1} sizes="(min-width: 768px) 25vw, 50vw" /> },
              { key: 'a4', caption: t('pages.manufacturing.models.a4', { store: brand.name }), image: <ThemeImage src="flour-mill-standard-01.webp" alt={t('pages.manufacturing.models.a4', { store: brand.name })} ratio={1} sizes="(min-width: 768px) 25vw, 50vw" /> },
              { key: 'a5', caption: t('pages.manufacturing.models.a5', { store: brand.name }), image: <ThemeImage src="flour-mill-standard-02.webp" alt={t('pages.manufacturing.models.a5', { store: brand.name })} ratio={1} sizes="(min-width: 768px) 25vw, 50vw" /> },
              { key: 'a6', caption: t('pages.manufacturing.models.a6', { store: brand.name }), image: <ThemeImage src="atta-chakki-1-5hp-2in1-design-01.webp" alt={t('pages.manufacturing.models.a6', { store: brand.name })} ratio={1} sizes="(min-width: 768px) 25vw, 50vw" /> },
              { key: 'a7', caption: t('pages.manufacturing.models.a7', { store: brand.name }), image: <ThemeImage src="atta-chakki-1-5hp-2in1-design-02.webp" alt={t('pages.manufacturing.models.a7', { store: brand.name })} ratio={1} sizes="(min-width: 768px) 25vw, 50vw" /> },
              { key: 'a8', caption: t('pages.manufacturing.models.a8', { store: brand.name }), image: <ThemeImage src="atta-chakki-1-5hp-2in1-design-03.webp" alt={t('pages.manufacturing.models.a8', { store: brand.name })} ratio={1} sizes="(min-width: 768px) 25vw, 50vw" /> },
            ]}
          />
        </div>
      </section>
    </Layout>
  )
}
