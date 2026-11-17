import type { ReactNode } from 'react'
import { Link, ThemeImage, useHead, useStorefront } from '@dripfunnel/storefront-core/theme'
import { useBrand } from '../components/brand'
import { cx } from '../components/cx'
import { ArrowRight, ChatIcon, GlobeIcon, MailIcon, PhoneIcon, PinIcon } from '../components/Icons'
import { Enquiry } from '../components/interactive/Enquiry'
import { Layout } from '../components/Layout'
import { PageHero } from '../components/PageHero'
import { WhatsAppPill } from '../components/Sections'
import s from '../styles/sections.module.css'
import styles from '../styles/pages.module.css'

const Card = ({ icon, label, value, action, href }: { icon: ReactNode; label: string; value: string; action?: string; href?: string }) => {
  const body = (
    <>
      <span className={styles.reachIcon}>{icon}</span>
      <span className={styles.reachText}>
        <span className={styles.reachLabel}>{label}</span>
        <span className={styles.reachValue}>{value}</span>
        {action ? (
          <span className={styles.reachAction}>
            {action}
            <ArrowRight className={styles.rangeIcon} />
          </span>
        ) : null}
      </span>
    </>
  )
  return (
    <li>
      {href ? (
        <Link href={href} className={styles.reachCard}>
          {body}
        </Link>
      ) : (
        <div className={styles.reachCard}>{body}</div>
      )}
    </li>
  )
}

export const ContactPage = () => {
  const { t } = useStorefront()
  const brand = useBrand()
  useHead({ title: t('pages.contact.seoTitle', { store: brand.name }), description: t('pages.contact.seoDescription', { store: brand.name }), canonical: '/contact/' })
  return (
    <Layout>
      <PageHero
        crumbs={[{ label: t('pages.contact.title'), href: '/contact/' }]}
        title={t('pages.contact.heading')}
        lead={t('pages.contact.lead', { store: brand.name })}
        aside={<ThemeImage src="brand-logo-full.png" alt={t('pages.contact.logoAlt', { store: brand.name })} ratio={397 / 232} sizes="180px" className={styles.contactLogo} />}
      />
      <section className={styles.contactSection}>
        <div className={cx(s.container, styles.contactGrid)}>
          <div className={styles.contactSide}>
            <h2 className={styles.contactTitle}>{t('pages.contact.reach.title')}</h2>
            <p className={styles.contactLead}>{t('pages.contact.reach.lead', { store: brand.name })}</p>
            <ul className={styles.reach}>
              {brand.hasPhone ? (
                <>
                  <Card icon={<PhoneIcon />} label={t('pages.contact.reach.phone')} value={brand.phone} action={t('pages.contact.reach.call')} href={brand.tel} />
                  <Card icon={<ChatIcon />} label={t('pages.contact.reach.whatsapp')} value={brand.phone} action={t('pages.contact.reach.chat')} href={brand.whatsapp} />
                </>
              ) : null}
              <Card icon={<MailIcon />} label={t('pages.contact.reach.email')} value={brand.secondEmail} />
              <Card icon={<GlobeIcon />} label={t('pages.contact.reach.website')} value={brand.websiteLabel} action={t('pages.contact.reach.visit')} href={brand.website} />
              {brand.address ? <Card icon={<PinIcon />} label={t('pages.contact.reach.address')} value={brand.address} action={t('pages.contact.reach.maps')} href={brand.maps} /> : null}
            </ul>
            <div className={styles.prefer}>
              <h2 className={styles.preferTitle}>{t('pages.contact.prefer.title')}</h2>
              <p className={styles.preferLead}>{t('pages.contact.prefer.lead')}</p>
              <WhatsAppPill>{t('pages.contact.prefer.action')}</WhatsAppPill>
            </div>
          </div>
          <Enquiry />
        </div>
      </section>
    </Layout>
  )
}
