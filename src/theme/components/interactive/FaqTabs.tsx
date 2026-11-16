'use client'

import { useState } from 'react'
import { useStorefront } from '@dripfunnel/storefront-core/theme'
import { cx } from '../cx'
import { ChevronDown } from '../Icons'
import styles from '../../styles/pages.module.css'

export type FaqGroup = { id: string; name: string; items: { question: string; answer: string }[] }

/** Category tabs with their counts over one accordion; "All questions" shows every group in order. */
export const FaqTabs = ({ groups, allLabel }: { groups: FaqGroup[]; allLabel: string }) => {
  const { t } = useStorefront()
  const [chosen, setChosen] = useState<string>('all')
  const total = groups.reduce((n, g) => n + g.items.length, 0)
  const tabs = [{ id: 'all', name: allLabel, count: total }, ...groups.map((g) => ({ id: g.id, name: g.name, count: g.items.length }))]
  const shown = chosen === 'all' ? groups : groups.filter((g) => g.id === chosen)
  return (
    <div className={styles.faq}>
      <div className={styles.faqTabs} role="tablist" aria-label={t('faq.tabs.label')}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`faq-tab-${tab.id}`}
            aria-selected={chosen === tab.id}
            aria-controls="faq-panel"
            className={cx(styles.faqTab, chosen === tab.id && styles.faqTabOn)}
            onClick={() => setChosen(tab.id)}
          >
            {t('faq.tabs.count', { name: tab.name, count: tab.count })}
          </button>
        ))}
      </div>
      <div id="faq-panel" role="tabpanel" aria-labelledby={`faq-tab-${chosen}`} className={styles.faqPanel}>
        {shown.map((group) => (
          <section key={group.id} className={styles.faqGroup}>
            {chosen === 'all' ? <h2 className={styles.faqGroupTitle}>{group.name}</h2> : null}
            {group.items.map((item) => (
              <details key={item.question} className={styles.faqItem}>
                <summary className={styles.faqQuestion}>
                  {item.question}
                  <ChevronDown className={styles.faqChevron} />
                </summary>
                <p className={styles.faqAnswer}>{item.answer}</p>
              </details>
            ))}
          </section>
        ))}
      </div>
    </div>
  )
}
