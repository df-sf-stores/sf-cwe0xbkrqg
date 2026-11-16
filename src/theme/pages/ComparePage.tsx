import { useHead, useStorefront } from '@dripfunnel/storefront-core/theme'
import { useBrand } from '../components/brand'
import { CompareTable } from '../components/CompareTable'
import { Layout } from '../components/Layout'
import { useMachines } from '../components/machines'
import { PageHero } from '../components/PageHero'
import s from '../styles/sections.module.css'

/** Every model side by side: picture, price, saving and stock from the catalogue, in a table that scrolls sideways on phones. */
export const ComparePage = () => {
  const { t } = useStorefront()
  const brand = useBrand()
  useHead({ title: t('pages.compare.seoTitle', { store: brand.name }), description: t('pages.compare.lead', { store: brand.name }), canonical: '/compare/' })
  const { models, loading } = useMachines()
  return (
    <Layout>
      <PageHero crumbs={[{ label: t('pages.compare.title'), href: '/compare/' }]} title={t('pages.compare.title')} lead={t('pages.compare.lead', { store: brand.name })} />
      <section className={s.section}>
        <div className={s.container}>
          {loading ? (
            <p className={s.empty} role="status">
              {t('pages.compare.loading')}
            </p>
          ) : models.length === 0 ? (
            <p className={s.empty}>{t('pages.compare.empty')}</p>
          ) : (
            <CompareTable models={models} label={t('pages.compare.title')} />
          )}
        </div>
      </section>
    </Layout>
  )
}
