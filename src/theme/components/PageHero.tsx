import type { ReactNode } from 'react'
import { Breadcrumbs, useStorefront, type Crumb } from '@dripfunnel/storefront-core/theme'
import { WheatEar } from './Art'
import { cx } from './cx'
import styles from '../styles/sections.module.css'

/**
 * The title band every inner page opens with: the trail from Home, the page's one h1, its lead and anything the page
 * adds below (a product count, a search box), with an optional picture beside it on wide screens. Home is put first
 * here, so pages pass only the crumbs after it.
 */
export const PageHero = ({ crumbs, title, lead, children, aside }: { crumbs: readonly Crumb[]; title: string; lead?: string | null | undefined; children?: ReactNode; aside?: ReactNode }) => {
  const { t } = useStorefront()
  return (
    <section className={styles.pageHero}>
      <WheatEar className={styles.pageHeroWheat} />
      <div className={cx(styles.container, aside ? styles.pageHeroSplit : null)}>
        <div>
          <Breadcrumbs crumbs={crumbs.length ? [{ label: t('shop.crumbs.home'), href: '/' }, ...crumbs] : []} t={t} className={styles.pageHeroCrumbs} />
          <h1 className={styles.pageHeroTitle}>{title}</h1>
          {lead ? <p className={styles.pageHeroLead}>{lead}</p> : null}
          {children}
        </div>
        {aside ? <div className={styles.pageHeroAside}>{aside}</div> : null}
      </div>
    </section>
  )
}
