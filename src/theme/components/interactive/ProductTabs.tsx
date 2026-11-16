'use client'

import { useRef, useState, type ReactNode } from 'react'
import { Link, RichText, useStorefront, type Product } from '@dripfunnel/storefront-core/theme'
import { useBrand } from '../brand'
import { cx } from '../cx'
import { CheckCircle, ChatIcon, HomeIcon, LockIcon, TruckIcon } from '../Icons'
import { descriptionFeatures } from '../productText'
import { DemoButton } from './Demo'
import styles from '../../styles/product.module.css'

type TabId = 'overview' | 'specs' | 'delivery' | 'questions'
const order: TabId[] = ['overview', 'specs', 'delivery', 'questions']

/**
 * Overview, Specifications, Delivery & Support and Questions, switched in place (WAI-ARIA tabs, the arrow keys moving
 * between them). Everything shown is the product's own data, or the shop's standing promises from content.
 */
export const ProductTabs = ({ product, versionId }: { product: Product; versionId: string | null }) => {
  const { t } = useStorefront()
  const brand = useBrand()
  const [tab, setTab] = useState<TabId>('overview')
  const buttons = useRef<Partial<Record<TabId, HTMLButtonElement | null>>>({})
  const specs = product.specs.filter((s) => s.versionId === null || s.versionId === versionId)
  const features = descriptionFeatures(product.description)
  const askHref = brand.hasPhone ? brand.chat(t('shop.product.askText', { store: brand.name, name: product.name })) : '/contact/'
  const labels: Record<TabId, string> = {
    overview: t('shop.product.tabs.overview'),
    specs: t('shop.product.tabs.specs'),
    delivery: t('shop.product.tabs.delivery'),
    questions: t('shop.product.tabs.questions'),
  }
  const move = (by: number) => {
    const next = order[(order.indexOf(tab) + by + order.length) % order.length] ?? 'overview'
    setTab(next)
    buttons.current[next]?.focus()
  }
  const tech = (
    <aside className={styles.techCard}>
      <span className={styles.techIcon} aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5M9 13h6M9 17h6" />
        </svg>
      </span>
      <h3 className={styles.techTitle}>{t('shop.product.techTitle')}</h3>
      <p className={styles.techBody}>{t('shop.product.techBody')}</p>
      <Link href={brand.hasPhone ? brand.chat(t('shop.product.techText', { store: brand.name, name: product.name })) : '/contact/'} className={styles.techAction}>
        {t('shop.product.techAction')}
      </Link>
    </aside>
  )
  const panels: Record<TabId, ReactNode> = {
    overview: (
      <div className={styles.panelSplit}>
        <div>
          {product.description ? <RichText html={product.description} className={styles.description} /> : <p className={styles.body}>{t('shop.product.noDescription')}</p>}
          {product.highlights.length ? (
            <ul className={styles.highlights}>
              {product.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          ) : null}
        </div>
        {tech}
      </div>
    ),
    specs: (
      <div className={styles.panelSplit}>
        <div className={styles.panelStack}>
          {specs.length ? (
            <section aria-labelledby="specs-rows">
              <h3 id="specs-rows" className={styles.panelHeading}>
                {t('shop.product.specRows')}
              </h3>
              <dl className={styles.specs}>
                {specs.map((s) => (
                  <div key={`${s.name}-${s.versionId ?? ''}`} className={styles.spec}>
                    <dt>{s.name}</dt>
                    <dd>{s.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ) : null}
          {features.length ? (
            <section aria-labelledby="specs-features">
              <h3 id="specs-features" className={styles.panelHeading}>
                {t('shop.product.features')}
              </h3>
              <ol className={styles.features}>
                {features.map((f) => (
                  <li key={f.title} className={styles.feature}>
                    <CheckCircle className={styles.featureIcon} />
                    <span>
                      <span className={styles.featureTitle}>{f.title}</span>
                      {f.detail ? <span className={styles.featureDetail}>{f.detail}</span> : null}
                    </span>
                  </li>
                ))}
              </ol>
            </section>
          ) : null}
          {specs.length || features.length ? null : <p className={styles.body}>{t('shop.product.noSpecs')}</p>}
        </div>
        {tech}
      </div>
    ),
    delivery: (
      <div className={styles.supportGrid}>
        <article className={styles.supportCard}>
          <TruckIcon className={styles.supportIcon} />
          <h3 className={styles.supportTitle}>{t('shop.product.deliveryTitle')}</h3>
          <p className={styles.supportBody}>{t('shop.product.deliveryBody')}</p>
        </article>
        <article className={styles.supportCard}>
          <HomeIcon className={styles.supportIcon} />
          <h3 className={styles.supportTitle}>{t('shop.product.demoTitle')}</h3>
          <p className={styles.supportBody}>{t('shop.product.demoBody')}</p>
        </article>
        <article className={styles.supportCard}>
          <LockIcon className={styles.supportIcon} />
          <h3 className={styles.supportTitle}>{t('shop.product.paymentTitle')}</h3>
          <p className={styles.supportBody}>{t('shop.product.paymentBody')}</p>
        </article>
        <article className={styles.supportCard}>
          <CheckCircle className={styles.supportIcon} />
          <h3 className={styles.supportTitle}>{t('shop.product.trackingTitle')}</h3>
          <p className={styles.supportBody}>{t('shop.product.trackingBody')}</p>
          <Link href="/account/orders/" className={styles.supportLink}>
            {t('shop.product.trackingAction')}
          </Link>
        </article>
        {product.returns || product.warranty ? (
          <article className={styles.supportCard}>
            <CheckCircle className={styles.supportIcon} />
            <h3 className={styles.supportTitle}>{product.warranty ? t('shop.product.warranty') : t('shop.product.returnsTitle')}</h3>
            {product.warranty ? <p className={styles.supportBody}>{product.warranty}</p> : null}
            {product.returns ? <p className={styles.supportBody}>{product.returns}</p> : null}
          </article>
        ) : null}
        <article className={cx(styles.supportCard, styles.supportHelp)}>
          <ChatIcon className={styles.supportIcon} />
          <h3 className={styles.supportTitle}>{t('shop.product.helpTitle')}</h3>
          <p className={styles.supportBody}>{t('shop.product.helpBody')}</p>
          <Link href={askHref} className={styles.supportLink}>
            {t('shop.product.askProduct')}
          </Link>
        </article>
      </div>
    ),
    questions: (
      <div className={styles.panelStack}>
        {product.faqs.length ? (
          <dl className={styles.faqs}>
            {product.faqs.map((f) => (
              <div key={f.question} className={styles.faq}>
                <dt>{f.question}</dt>
                <dd>{f.answer}</dd>
              </div>
            ))}
          </dl>
        ) : null}
        <div className={styles.questionCard}>
          <div>
            <h3 className={styles.techTitle}>{t('shop.product.questionTitle')}</h3>
            <p className={styles.techBody}>{t('shop.product.questionBody')}</p>
          </div>
          <div className={styles.questionActions}>
            <Link href={askHref} className={styles.primaryAction}>
              <ChatIcon className={styles.actionIcon} />
              {t('shop.product.askProduct')}
            </Link>
            <Link href="/faq/" className={styles.secondaryAction}>
              {t('shop.product.readFaq')}
            </Link>
            <DemoButton className={styles.secondaryAction} product={product.name}>
              {t('shop.product.demoAction')}
            </DemoButton>
          </div>
        </div>
      </div>
    ),
  }
  return (
    <div className={styles.tabsBox}>
      <div className={styles.tabList} role="tablist" aria-label={t('shop.product.tabs.label')}>
        {order.map((id) => (
          <button
            key={id}
            ref={(el) => {
              buttons.current[id] = el
            }}
            type="button"
            role="tab"
            id={`product-tab-${id}`}
            aria-selected={tab === id}
            aria-controls={`product-panel-${id}`}
            tabIndex={tab === id ? 0 : -1}
            className={tab === id ? styles.tabOn : styles.tab}
            onClick={() => setTab(id)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight') move(1)
              if (e.key === 'ArrowLeft') move(-1)
            }}
          >
            {labels[id]}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`product-panel-${tab}`} aria-labelledby={`product-tab-${tab}`} tabIndex={0} className={styles.panel}>
        {panels[tab]}
      </div>
    </div>
  )
}
