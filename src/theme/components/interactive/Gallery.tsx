'use client'

import { useEffect, useRef, useState } from 'react'
import { Image, useStorefront, Video, type Photo, type VideoFile } from '@dripfunnel/storefront-core/theme'
import { cx } from '../cx'
import { ChevronLeft, ChevronRight, CloseIcon } from '../Icons'
import styles from '../../styles/product.module.css'

/**
 * The product's photos: the chosen one large (zooming in on hover, opening full size on click) with its place in the set
 * and arrows, the rest as thumbnails, and the product's video last. The full-size view takes Escape and the arrow keys.
 */
export const Gallery = ({ photos, video, name }: { photos: readonly Photo[]; video: VideoFile | null; name: string }) => {
  const { t } = useStorefront()
  const [shown, setShown] = useState(0)
  const [open, setOpen] = useState(false)
  const box = useRef<HTMLDivElement>(null)
  const opener = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (open) box.current?.focus()
  }, [open])
  // A new set of photos (another version chosen) starts again at its first.
  const count = photos.length
  const first = photos[0]
  const firstUrl = first?.url
  useEffect(() => setShown(0), [count, firstUrl])
  // Core's <Video> needs a poster (storefront ARCHITECTURE §2.1), so a product with no photo shows no video either.
  if (!first) return <div className={styles.noPicture} />
  const slides = count + (video ? 1 : 0)
  const playing = video !== null && shown === count
  const photo = photos[Math.min(shown, count - 1)] ?? first
  const go = (by: number) => setShown((i) => (i + by + slides) % slides)
  const step = (by: number) => setShown((i) => (Math.min(i, count - 1) + by + count) % count)
  const close = () => {
    setOpen(false)
    opener.current?.focus()
  }
  // The full-size view sits beside the gallery, not in it: the sticky gallery is a stacking context the header would cover.
  return (
    <>
      <div className={styles.gallery} role="group" aria-label={t('shop.product.gallery.label')}>
        <div className={styles.stage}>
          {playing && video ? (
            <Video video={video} poster={first} label={name} ratio={1} className={styles.media} />
          ) : (
            <button ref={opener} type="button" className={styles.zoom} aria-label={t('shop.product.gallery.enlarge')} onClick={() => setOpen(true)}>
              <Image image={photo} alt={photo.alt ?? name} ratio={1} sizes="(min-width: 900px) 50vw, 100vw" className={styles.media} />
            </button>
          )}
          {slides > 1 ? (
            <>
              <button type="button" className={cx(styles.stageArrow, styles.stagePrev)} aria-label={t('shop.product.gallery.previous')} onClick={() => go(-1)}>
                <ChevronLeft />
              </button>
              <button type="button" className={cx(styles.stageArrow, styles.stageNext)} aria-label={t('shop.product.gallery.next')} onClick={() => go(1)}>
                <ChevronRight />
              </button>
              <span className={styles.counter}>
                <span aria-hidden="true">{String(shown + 1)}</span>
                <span aria-hidden="true">{t('shop.product.gallery.of')}</span>
                <span aria-hidden="true">{String(slides)}</span>
              </span>
            </>
          ) : null}
          {playing ? null : (
            <>
              <button type="button" className={styles.expand} aria-label={t('shop.product.gallery.enlarge')} onClick={() => setOpen(true)}>
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </button>
              <span className={styles.zoomHint} aria-hidden="true">
                {t('shop.product.gallery.hint')}
              </span>
            </>
          )}
        </div>
        {slides > 1 ? (
          <div className={styles.thumbs}>
            {photos.map((p, i) => (
              <button key={p.url} type="button" className={i === shown ? styles.thumbOn : styles.thumb} aria-label={p.alt ?? t('shop.product.gallery.show', { name })} aria-pressed={i === shown} onClick={() => setShown(i)}>
                <Image image={p} alt="" ratio={1} sizes="80px" className={styles.thumbImage} />
              </button>
            ))}
            {video ? (
              <button type="button" className={playing ? styles.thumbOn : styles.thumb} aria-label={t('shop.product.video')} aria-pressed={playing} onClick={() => setShown(count)}>
                <svg className={styles.play} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M9 7l8 5-8 5z" />
                </svg>
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
      {open ? (
        <div className={styles.viewerBackdrop} onClick={close}>
          <div
            ref={box}
            className={styles.viewer}
            role="dialog"
            aria-modal="true"
            aria-label={name}
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === 'Escape') close()
              if (e.key === 'ArrowLeft') step(-1)
              if (e.key === 'ArrowRight') step(1)
            }}
          >
            <Image image={photo} alt={photo.alt ?? name} ratio={1} sizes="90vw" className={styles.viewerImage} />
            <button type="button" className={styles.viewerClose} aria-label={t('shop.product.gallery.close')} onClick={close}>
              <CloseIcon />
            </button>
            {count > 1 ? (
              <>
                <button type="button" className={cx(styles.stageArrow, styles.stagePrev)} aria-label={t('shop.product.gallery.previous')} onClick={() => step(-1)}>
                  <ChevronLeft />
                </button>
                <button type="button" className={cx(styles.stageArrow, styles.stageNext)} aria-label={t('shop.product.gallery.next')} onClick={() => step(1)}>
                  <ChevronRight />
                </button>
                <span className={styles.counter}>
                  <span aria-hidden="true">{String(Math.min(shown, count - 1) + 1)}</span>
                  <span aria-hidden="true">{t('shop.product.gallery.of')}</span>
                  <span aria-hidden="true">{String(count)}</span>
                </span>
              </>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  )
}
