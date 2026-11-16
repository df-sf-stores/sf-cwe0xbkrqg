'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link, useReducedMotion } from '@dripfunnel/storefront-core/theme'
import { cx } from '../cx'
import { ChevronLeft, ChevronRight } from '../Icons'
import styles from '../../styles/hero.module.css'

const autoplayMs = 6000
const swipePx = 40

export type HeroSlide = {
  key: string
  /** The slide's picture, with its alt text: a ThemeImage now, and a core <Image> or <Video> once slides come from the catalogue. */
  image: ReactNode
  title: string
  body: string
  href: string
}

type Labels = { region: string; role: string; previous: string; next: string; pause: string; play: string; goTo: (n: number) => string }

/**
 * The home page's hero: the banner edge to edge with its dots over it, and the slide's words and actions in a strip below.
 * Autoplays with a pause button, stops under reduced motion and while hovered or focused; swipes on touch screens.
 */
export const HeroSlider = ({ slides, labels, actions }: { slides: HeroSlide[]; labels: Labels; actions: ReactNode }) => {
  const [selected, setSelected] = useState(0)
  const [held, setHeld] = useState(false)
  const [stopped, setStopped] = useState(false)
  const reduced = useReducedMotion()
  const swipeFrom = useRef<number | null>(null)
  const count = slides.length
  const autoplay = count > 1 && !reduced && !stopped
  const go = (index: number) => setSelected((index + count) % count)
  useEffect(() => {
    if (!autoplay || held) return
    const id = setTimeout(() => setSelected((i) => (i + 1) % count), autoplayMs)
    return () => clearTimeout(id)
  }, [autoplay, held, selected, count])
  const current = slides[selected]
  return (
    <section
      className={styles.hero}
      aria-roledescription={labels.role}
      aria-label={labels.region}
      onFocus={() => setHeld(true)}
      onBlur={() => setHeld(false)}
      onPointerEnter={(e) => {
        if (e.pointerType === 'mouse') setHeld(true)
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === 'mouse') setHeld(false)
      }}
      onPointerDown={(e) => {
        swipeFrom.current = e.clientX
      }}
      onPointerUp={(e) => {
        if (swipeFrom.current === null) return
        const dx = e.clientX - swipeFrom.current
        swipeFrom.current = null
        if (Math.abs(dx) > swipePx) go(selected + (dx < 0 ? 1 : -1))
      }}
    >
      <div className={styles.frame}>
        <div className={styles.pictures}>
          {slides.map((slide, index) => (
            <div key={slide.key} className={cx(styles.picture, index === selected ? styles.shown : styles.waiting)} aria-hidden={index !== selected}>
              {index === selected ? (
                <Link href={slide.href} className={styles.pictureLink}>
                  {slide.image}
                </Link>
              ) : index === (selected + 1) % count ? (
                // Only the next slide's picture loads ahead; the rest wait for their turn.
                slide.image
              ) : null}
            </div>
          ))}
          {count > 1 ? (
            <>
              <button type="button" className={cx(styles.arrow, styles.previous)} aria-label={labels.previous} onClick={() => go(selected - 1)}>
                <ChevronLeft />
              </button>
              <button type="button" className={cx(styles.arrow, styles.next)} aria-label={labels.next} onClick={() => go(selected + 1)}>
                <ChevronRight />
              </button>
            </>
          ) : null}
          {count > 1 ? (
            <div className={styles.controls}>
              <div className={styles.dots}>
                {slides.map((slide, index) => (
                  <button key={slide.key} type="button" className={cx(styles.dot, index === selected && styles.dotOn)} aria-label={labels.goTo(index + 1)} aria-current={index === selected} onClick={() => go(index)} />
                ))}
              </div>
              {reduced ? null : (
                <button type="button" className={styles.toggle} aria-label={stopped ? labels.play : labels.pause} onClick={() => setStopped(!stopped)}>
                  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d={stopped ? 'M8 5l11 7-11 7z' : 'M8 5v14M16 5v14'} />
                  </svg>
                </button>
              )}
            </div>
          ) : null}
        </div>
        {current ? (
          <div className={styles.copy} aria-live={autoplay && !held ? 'off' : 'polite'}>
            <div key={current.key} className={styles.text}>
              <p className={styles.eyebrow}>{current.title}</p>
              <p className={styles.body}>{current.body}</p>
            </div>
            <div className={styles.actions}>{actions}</div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
