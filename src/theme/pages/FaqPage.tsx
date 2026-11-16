import { Link, useHead, useStorefront } from '@dripfunnel/storefront-core/theme'
import { WheatEar } from '../components/Art'
import { useBrand } from '../components/brand'
import { cx } from '../components/cx'
import { FaqTabs } from '../components/interactive/FaqTabs'
import { Layout } from '../components/Layout'
import { pill, WhatsAppPill } from '../components/Sections'
import s from '../styles/sections.module.css'
import styles from '../styles/pages.module.css'

export const FaqPage = () => {
  const { t } = useStorefront()
  const brand = useBrand()
  const store = brand.name
  useHead({ title: t('faq.seoTitle', { store }), description: t('faq.seoDescription'), canonical: '/faq/' })
  const groups = [
    {
      id: 'buying',
      name: t('faq.tabs.buying'),
      items: [
        { question: t('faq.buying.q1'), answer: t('faq.buying.a1') },
        { question: t('faq.buying.q2'), answer: t('faq.buying.a2') },
        { question: t('faq.buying.q3'), answer: t('faq.buying.a3') },
      ],
    },
    {
      id: 'products',
      name: t('faq.tabs.products'),
      items: [
        { question: t('faq.products.q1'), answer: t('faq.products.a1', { store }) },
        { question: t('faq.products.q2'), answer: t('faq.products.a2', { store }) },
        { question: t('faq.products.q3'), answer: t('faq.products.a3', { store }) },
      ],
    },
    {
      id: 'orders',
      name: t('faq.tabs.orders'),
      items: [
        { question: t('faq.orders.q1'), answer: t('faq.orders.a1') },
        { question: t('faq.orders.q2'), answer: t('faq.orders.a2') },
        { question: t('faq.orders.q3'), answer: t('faq.orders.a3') },
      ],
    },
    {
      id: 'support',
      name: t('faq.tabs.support'),
      items: [
        { question: t('faq.support.q1'), answer: t('faq.support.a1', { store }) },
        { question: t('faq.support.q2'), answer: t('faq.support.a2') },
      ],
    },
  ]
  return (
    <Layout>
      <section className={cx(styles.hero, styles.heroCompact)}>
        <div className={cx(s.container, styles.contactHead)}>
          <WheatEar className={styles.faqWheat} />
          <h1 className={styles.heroTitle}>{t('faq.title')}</h1>
          <p className={s.lead}>{t('faq.lead')}</p>
        </div>
      </section>
      <section className={s.section}>
        <div className={cx(s.container, styles.faqWrap)}>
          <FaqTabs groups={groups} allLabel={t('faq.tabs.all')} />
          <aside className={styles.faqMore}>
            <h2 className={styles.preferTitle}>{t('faq.more.title')}</h2>
            <p className={styles.preferLead}>{t('faq.more.lead')}</p>
            <div className={s.actions}>
              <Link href="/contact/" className={pill()}>{t('faq.more.expert')}</Link>
              <WhatsAppPill tone="light">{t('faq.more.whatsapp')}</WhatsAppPill>
            </div>
          </aside>
        </div>
      </section>
    </Layout>
  )
}
