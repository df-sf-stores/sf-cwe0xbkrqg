'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { useMediaQuery } from '@dripfunnel/storefront-core/theme'
import { cx } from '../cx'
import { ChevronDown } from '../Icons'
import styles from '../../styles/layout.module.css'

/** A footer column: always open from 768px, an accordion the shopper opens on a phone; its heading marked in one of the logo's colours. */
export const FooterColumn = ({ title, tone, children }: { title: string; tone: 'blue' | 'green' | 'orange'; children: ReactNode }) => {
  const wide = useMediaQuery('(min-width: 768px)')
  const [open, setOpen] = useState(wide)
  useEffect(() => setOpen(wide), [wide])
  return (
    <details className={styles.column} open={open}>
      <summary
        className={cx(styles.columnTitle, tone === 'blue' ? styles.toneBlue : tone === 'green' ? styles.toneGreen : styles.toneOrange)}
        tabIndex={wide ? -1 : 0}
        onClick={(e) => {
          e.preventDefault()
          if (!wide) setOpen(!open)
        }}
      >
        {title}
        <ChevronDown className={styles.columnIcon} />
      </summary>
      <ul className={styles.columnList}>{children}</ul>
    </details>
  )
}
