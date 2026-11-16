'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useStorefront } from '@dripfunnel/storefront-core/theme'
import { ChevronLeft, ChevronRight, CloseIcon } from '../Icons'
import styles from '../../styles/sections.module.css'

/** A ThemeImage with its alt text, written where its file name is known, and the words under it. */
type Photo = { key: string; caption: string; image: ReactNode }

/** Captioned photos in a row; each opens full size in a dialog with arrows, Escape and the arrow keys. */
export const Lightbox = ({ photos, columns = 3 }: { photos: Photo[]; columns?: 3 | 4 }) => {
  const { t } = useStorefront()
  const [open, setOpen] = useState<number | null>(null)
  const box = useRef<HTMLDivElement>(null)
  const opener = useRef<HTMLButtonElement | null>(null)
  useEffect(() => {
    if (open !== null) box.current?.focus()
  }, [open])
  const close = () => {
    setOpen(null)
    opener.current?.focus()
  }
  const step = (by: number) => setOpen((i) => (i === null ? i : (i + by + photos.length) % photos.length))
  const shown = open === null ? null : photos[open]
  return (
    <>
      <ul className={columns === 4 ? styles.gallery4 : styles.gallery}>
        {photos.map((p, index) => (
          <li key={p.key}>
            <figure className={styles.galleryItem}>
              <button
                type="button"
                className={styles.galleryButton}
                aria-label={t('site.lightbox.open', { caption: p.caption })}
                onClick={(e) => {
                  opener.current = e.currentTarget
                  setOpen(index)
                }}
              >
                <span className={styles.galleryFrame}>{p.image}</span>
              </button>
              <figcaption className={styles.galleryCaption}>{p.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
      {shown ? (
        <div className={styles.lightbox} onClick={close}>
          <div
            ref={box}
            className={styles.lightboxBox}
            role="dialog"
            aria-modal="true"
            aria-label={shown.caption}
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === 'Escape') close()
              if (e.key === 'ArrowRight') step(1)
              if (e.key === 'ArrowLeft') step(-1)
            }}
          >
            <div className={styles.lightboxFrame}>{shown.image}</div>
            <p className={styles.lightboxCaption}>{shown.caption}</p>
            <button type="button" className={styles.lightboxClose} aria-label={t('site.lightbox.close')} onClick={close}>
              <CloseIcon />
            </button>
            {photos.length > 1 ? (
              <>
                <button type="button" className={styles.lightboxPrev} aria-label={t('site.slider.previous')} onClick={() => step(-1)}>
                  <ChevronLeft />
                </button>
                <button type="button" className={styles.lightboxNext} aria-label={t('site.slider.next')} onClick={() => step(1)}>
                  <ChevronRight />
                </button>
              </>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  )
}
