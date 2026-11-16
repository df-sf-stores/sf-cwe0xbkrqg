import { useCollections, useListing, useProducts } from '@dripfunnel/storefront-core/theme'
import { slugOf } from './slugOf'

/**
 * The store's machines, all from the catalogue: the first collection's products when the store has collections
 * (Storefront › Collections), else its atta chakki and flour mills by name, else every product.
 * The queries are the same ones the header asks, so core's shared cache answers them all with one request each.
 */
export const useMachines = () => {
  const catalogue = useProducts({ sort: 'name', first: 24 })
  const { collections, status: collectionsStatus } = useCollections({ first: 20 })
  const first = collections[0]
  const listing = useListing({ collection: first ? slugOf(first) : null }, first !== undefined)
  const named = first ? listing.items : catalogue.products.filter((p) => /chakki|flour\s*mill/i.test(p.name))
  return {
    collections,
    collectionsStatus,
    first,
    collectionHref: first?.href ?? '/shop/',
    models: named.length ? named : first ? listing.items : catalogue.products,
    named,
    loading: (first ? listing.status : catalogue.status) === 'loading',
  }
}
