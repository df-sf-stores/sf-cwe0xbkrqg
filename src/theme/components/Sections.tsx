import type { ReactNode } from 'react'
import { Link, ThemeImage, useStorefront } from '@dripfunnel/storefront-core/theme'
import { WheatEar } from './Art'
import { useBrand } from './brand'
import { cx } from './cx'
import { ArrowRight, ChatIcon, CheckCircle, CpuIcon, CylinderIcon, HeadsetIcon, RefreshIcon, ShieldIcon, ThermometerIcon, WheatIcon, ZapIcon } from './Icons'
import { DemoButton } from './interactive/Demo'
import { Lightbox } from './interactive/Lightbox'
import styles from '../styles/sections.module.css'

/** A section's heading, its lead and an optional action, centred or to one side, with the wheat ears as its accent. */
export const SectionHead = ({ title, lead, action, wheat = false, align = 'center', as = 'h2' }: { title: string; lead?: string | undefined; action?: ReactNode; wheat?: boolean; align?: 'center' | 'start'; as?: 'h1' | 'h2' }) => {
  return (
    <div className={cx(styles.head, align === 'start' && styles.headStart)}>
      <div className={styles.headText}>
        <div className={styles.headTitleRow}>
          {wheat ? <WheatEar className={styles.wheatLeft} /> : null}
          {as === 'h1' ? <h1 className={styles.title}>{title}</h1> : <h2 className={styles.title}>{title}</h2>}
          {wheat ? <WheatEar className={styles.wheatRight} /> : null}
        </div>
        {lead ? <p className={styles.lead}>{lead}</p> : null}
      </div>
      {action ? <div className={styles.headAction}>{action}</div> : null}
    </div>
  )
}

/** The pill buttons every section uses, for core's <Link> or a button: brand colour, outlined, light for dark bands, WhatsApp green. */
export const pill = (tone: 'primary' | 'blue' | 'outline' | 'light' | 'whatsapp' | 'soft' = 'primary') => cx(styles.button, styles[tone])

/** A text link with an arrow: put <LinkArrow /> after the words inside core's <Link className={textLink}>. */
export const textLink = styles.textLink

export const LinkArrow = () => <ArrowRight className={styles.textLinkIcon} />

export const DemoPill = ({ children, tone = 'primary', product }: { children: ReactNode; tone?: 'primary' | 'outline' | 'light'; product?: string }) => (
  <DemoButton className={cx(styles.button, styles[tone])} product={product}>
    {children}
  </DemoButton>
)

export const WhatsAppPill = ({ children, tone = 'soft' }: { children: ReactNode; tone?: 'whatsapp' | 'light' | 'outline' | 'soft' }) => {
  const brand = useBrand()
  if (!brand.hasPhone) return null
  return (
    <Link href={brand.whatsapp} className={cx(styles.button, styles[tone])}>
      <ChatIcon className={styles.buttonIcon} />
      {children}
    </Link>
  )
}

/** A list of short claims, each with a tick. */
export const Checklist = ({ items }: { items: string[] }) => (
  <ul className={styles.checklist}>
    {items.map((item) => (
      <li key={item} className={styles.check}>
        <CheckCircle className={styles.checkIcon} />
        {item}
      </li>
    ))}
  </ul>
)

/** Numbered steps: a row on wide screens, a vertical timeline on phones. */
export const Steps = ({ steps, columns }: { steps: { title: string; body: string }[]; columns: 3 | 4 | 5 }) => (
  <ol className={cx(styles.steps, columns === 3 ? styles.steps3 : columns === 4 ? styles.steps4 : styles.steps5)}>
    {steps.map((s, index) => (
      <li key={s.title} className={styles.step}>
        <span className={styles.stepNumber} aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3 className={styles.stepTitle}>{s.title}</h3>
        <p className={styles.stepBody}>{s.body}</p>
      </li>
    ))}
  </ol>
)

/** "Ready for fresh atta at home?": the light band above every page's footer, with the logo's three colours along its foot. */
export const CtaBand = () => {
  const { t } = useStorefront()
  const brand = useBrand()
  return (
    <section className={styles.cta}>
      <WheatEar className={styles.ctaWheat} />
      <div className={styles.ctaInner}>
        <div>
          <h2 className={styles.ctaTitle}>{t('site.cta.title')}</h2>
          <p className={styles.ctaBody}>{t('site.cta.body', { store: brand.name })}</p>
        </div>
        <div className={styles.actions}>
          <DemoPill>{t('site.cta.demo')}</DemoPill>
          <WhatsAppPill>{t('site.cta.whatsapp')}</WhatsAppPill>
        </div>
      </div>
    </section>
  )
}

/** "Smart Features in Every … Atta Chakki": six icon cards; `compact`, a heading to one side and three short cards a row (About). */
export const SmartFeatures = ({ compact = false }: { compact?: boolean }) => {
  const { t } = useStorefront()
  const brand = useBrand()
  const features = [
    { key: 'sensor', icon: <CpuIcon className={styles.featureIcon} />, label: t('home.smart.sensor') },
    { key: 'overload', icon: <ShieldIcon className={styles.featureIcon} />, label: t('home.smart.overload') },
    { key: 'lowTemp', icon: <ThermometerIcon className={styles.featureIcon} />, label: t('home.smart.lowTemp') },
    { key: 'chamber', icon: <CylinderIcon className={styles.featureIcon} />, label: t('home.smart.chamber') },
    { key: 'motor', icon: <ZapIcon className={styles.featureIcon} />, label: t('home.smart.motor') },
    { key: 'auto', icon: <RefreshIcon className={styles.featureIcon} />, label: t('home.smart.auto') },
  ]
  return (
    <section className={cx(styles.section, styles.reveal)}>
      <div className={styles.container}>
        <SectionHead align={compact ? 'start' : 'center'} title={t('home.smart.title', { store: brand.name })} lead={t('home.smart.lead', { store: brand.name })} />
        <ul className={compact ? styles.featuresCompact : styles.features}>
          {features.map((f) => (
            <li key={f.key} className={styles.feature}>
              <span className={styles.featureBadge}>{f.icon}</span>
              <h3 className={styles.featureTitle}>{f.label}</h3>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/** "See the Machine Up Close": three real photos that open larger; the heading centred, or to one side with `align`. */
export const UpClose = ({ tinted = false, align = 'center' }: { tinted?: boolean; align?: 'center' | 'start' }) => {
  const { t } = useStorefront()
  return (
    <section className={cx(styles.section, tinted && styles.tinted, styles.reveal)}>
      <div className={styles.container}>
        <SectionHead align={align} title={t('home.upClose.title')} lead={t('home.upClose.lead')} />
        <Lightbox
          photos={[
            { key: 'chamber', caption: t('home.upClose.chamber'), image: <ThemeImage src="live-3.webp" alt={t('home.upClose.chamber')} ratio={760 / 1013} sizes="(min-width: 768px) 33vw, 100vw" /> },
            { key: 'door', caption: t('home.upClose.door'), image: <ThemeImage src="live-2.webp" alt={t('home.upClose.door')} ratio={760 / 1013} sizes="(min-width: 768px) 33vw, 100vw" /> },
            { key: 'hopper', caption: t('home.upClose.hopper'), image: <ThemeImage src="live-1.webp" alt={t('home.upClose.hopper')} ratio={760 / 1013} sizes="(min-width: 768px) 33vw, 100vw" /> },
          ]}
        />
      </div>
    </section>
  )
}

/**
 * "Why Families Choose …": the standard model's photo beside six numbered reasons, or with `grid` the six reasons alone in
 * a ruled three-column grid, each with its icon (About).
 */
export const WhyFamilies = ({ grid = false }: { grid?: boolean }) => {
  const { t } = useStorefront()
  const brand = useBrand()
  const reasons = [
    { key: 'r1', title: t('home.families.r1.title'), body: t('home.families.r1.body') },
    { key: 'r2', title: t('home.families.r2.title'), body: t('home.families.r2.body') },
    { key: 'r3', title: t('home.families.r3.title'), body: t('home.families.r3.body') },
    { key: 'r4', title: t('home.families.r4.title'), body: t('home.families.r4.body') },
    { key: 'r5', title: t('home.families.r5.title'), body: t('home.families.r5.body') },
    { key: 'r6', title: t('home.families.r6.title'), body: t('home.families.r6.body', { store: brand.name }) },
  ]
  if (grid) {
    const icons = [<WheatIcon key="r1" className={styles.reasonIcon} />, <ZapIcon key="r2" className={styles.reasonIcon} />, <ShieldIcon key="r3" className={styles.reasonIcon} />, <RefreshIcon key="r4" className={styles.reasonIcon} />, <ThermometerIcon key="r5" className={styles.reasonIcon} />, <HeadsetIcon key="r6" className={styles.reasonIcon} />]
    return (
      <section className={cx(styles.section, styles.reveal)}>
        <div className={styles.container}>
          <SectionHead align="start" title={t('home.families.title', { store: brand.name })} lead={t('home.families.lead')} />
          <ul className={styles.reasonGrid}>
            {reasons.map((r, index) => (
              <li key={r.key} className={styles.reasonCell}>
                <span className={styles.reasonBadge}>{icons[index]}</span>
                <h3 className={styles.reasonTitle}>{r.title}</h3>
                <p className={styles.reasonBody}>{r.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    )
  }
  return (
    <section className={cx(styles.section, styles.tinted, styles.reveal)}>
      <div className={cx(styles.container, styles.split)}>
        <figure className={styles.familiesPicture}>
          <ThemeImage src="flour-mill-standard-02.webp" alt={t('home.families.imageAlt', { store: brand.name })} ratio={500 / 615} sizes="(min-width: 1024px) 40vw, 100vw" className={styles.cover} />
          <figcaption className={styles.pictureTag}>{t('home.families.eyebrow')}</figcaption>
        </figure>
        <div>
          <SectionHead align="start" title={t('home.families.title', { store: brand.name })} lead={t('home.families.lead')} />
          <ol className={styles.reasons}>
            {reasons.map((r, index) => (
              <li key={r.key} className={styles.reason}>
                <span className={styles.reasonNumber} aria-hidden="true">
                  {String(index + 1)}
                </span>
                <div>
                  <h3 className={styles.reasonTitle}>{r.title}</h3>
                  <p className={styles.reasonBody}>{r.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
