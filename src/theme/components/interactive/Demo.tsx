'use client'

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { Form, Link, PhoneField, Select, SubmitButton, TextField, useProducts, useStorefront } from '@dripfunnel/storefront-core/theme'
import { useBrand } from '../brand'
import { ChatIcon, CloseIcon } from '../Icons'
import { cx } from '../cx'
import styles from '../../styles/demo.module.css'

type Opener = (product?: string) => void

const DemoContext = createContext<Opener>(() => undefined)

const notSure = '' as const

/**
 * "Book a Free Demo" on every page: one dialog for the whole site, which any DemoButton opens. Core has no enquiry
 * endpoint, so a filled booking goes to the store's WhatsApp with every answer written into the message.
 */
export const DemoProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false)
  const [product, setProduct] = useState<string>(notSure)
  const opener = useRef<HTMLButtonElement | null>(null)
  const openWith: Opener = (name) => {
    setProduct(name ?? notSure)
    setOpen(true)
  }
  const close = () => {
    setOpen(false)
    opener.current?.focus()
  }
  return (
    <DemoContext.Provider value={openWith}>
      <OpenerRef.Provider value={opener}>{children}</OpenerRef.Provider>
      {open ? <DemoDialog product={product} onClose={close} /> : null}
    </DemoContext.Provider>
  )
}

const OpenerRef = createContext<{ current: HTMLButtonElement | null }>({ current: null })

/** A button that opens the demo booking, with the product already chosen when it sits on one. */
export const DemoButton = ({ children, className, product }: { children: ReactNode; className?: string | undefined; product?: string | undefined }) => {
  const open = useContext(DemoContext)
  const holder = useContext(OpenerRef)
  const self = useRef<HTMLButtonElement>(null)
  return (
    <button
      ref={self}
      type="button"
      className={className}
      onClick={() => {
        holder.current = self.current
        open(product)
      }}
    >
      {children}
    </button>
  )
}

const DemoDialog = ({ product, onClose }: { product: string; onClose: () => void }) => {
  const { store, locale, t } = useStorefront()
  const brand = useBrand()
  const { products } = useProducts({ sort: 'name', first: 24 })
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [area, setArea] = useState('')
  const [choice, setChoice] = useState(product)
  const [tried, setTried] = useState(false)
  const [done, setDone] = useState(false)
  const box = useRef<HTMLDivElement>(null)
  useEffect(() => {
    box.current?.focus()
  }, [done])
  const missing = (value: string) => (tried && value.trim() === '' ? t('site.demo.missing') : null)
  const options = [{ value: notSure as string, label: t('site.demo.notSure') }, ...products.map((p) => ({ value: p.name, label: p.name }))]
  const message = t('site.demo.message', { store: brand.name, name: name.trim(), phone: phone.trim(), area: area.trim(), product: choice || t('site.demo.notSure') })
  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        ref={box}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="demo-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === 'Escape') onClose()
        }}
      >
        <button type="button" className={styles.close} aria-label={t('site.demo.close')} onClick={onClose}>
          <CloseIcon />
        </button>
        <h2 id="demo-title" className={styles.title}>
          {done ? t('site.demo.doneTitle') : t('site.demo.title')}
        </h2>
        {done ? (
          <div className={styles.done}>
            <p className={styles.lead}>{t('site.demo.doneBody')}</p>
            <Link href={brand.chat(message)} className={styles.whatsapp}>
              <ChatIcon className={styles.icon} />
              {t('site.demo.send')}
            </Link>
            <button type="button" className={styles.secondary} onClick={() => setDone(false)}>
              {t('site.demo.edit')}
            </button>
          </div>
        ) : (
          <>
            <p className={styles.lead}>{t('site.demo.lead')}</p>
            <Form
              label={t('site.demo.title')}
              className={styles.form}
              onSubmit={() => {
                setTried(true)
                if (name.trim() && phone.trim() && area.trim()) setDone(true)
              }}
            >
              <TextField label={t('site.demo.name')} note={t('site.demo.required')} autoComplete="name" value={name} onChange={setName} error={missing(name)} className={styles.field} />
              <PhoneField
                label={t('site.demo.phone')}
                note={t('site.demo.required')}
                codeLabel={t('site.demo.codeLabel')}
                country={store.address?.country ?? 'IN'}
                locale={locale}
                autoComplete="tel"
                value={phone}
                onChange={setPhone}
                error={missing(phone)}
                className={styles.field}
                groupClassName={styles.phone}
              />
              <TextField label={t('site.demo.area')} note={t('site.demo.required')} autoComplete="address-level2" value={area} onChange={setArea} error={missing(area)} className={styles.field} />
              <Select label={t('site.demo.product')} value={choice} options={options} onChange={setChoice} className={cx(styles.field, styles.select)} />
              <SubmitButton className={styles.submit}>{t('site.demo.submit')}</SubmitButton>
            </Form>
            {brand.hasPhone ? (
              <Link href={brand.whatsapp} className={styles.fallback}>
                <ChatIcon className={styles.icon} />
                {t('site.chat', { store: brand.name })}
              </Link>
            ) : null}
          </>
        )}
      </div>
    </div>
  )
}
