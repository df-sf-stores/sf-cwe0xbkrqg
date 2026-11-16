'use client'

import { useRef, useState } from 'react'
import { Form, Link, PhoneField, Select, SubmitButton, TextField, useProducts, useStorefront } from '@dripfunnel/storefront-core/theme'
import { useBrand } from '../brand'
import { ChatIcon } from '../Icons'
import { cx } from '../cx'
import styles from '../../styles/demo.module.css'

const multiline = /\s+/g

/**
 * "Tell us what you need": the contact page's enquiry. Core has no enquiry endpoint yet, so the finished form becomes a
 * WhatsApp message to the store with every answer in it; the shopper sends it from their own WhatsApp.
 */
export const Enquiry = () => {
  const { store, locale, t } = useStorefront()
  const brand = useBrand()
  const { products } = useProducts({ sort: 'name', first: 24 })
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [product, setProduct] = useState('')
  const [message, setMessage] = useState('')
  const [tried, setTried] = useState(false)
  const [done, setDone] = useState(false)
  const heading = useRef<HTMLHeadingElement>(null)
  const missing = (value: string) => (tried && value.trim() === '' ? t('pages.contact.form.missing') : null)
  const options = [{ value: '', label: t('pages.contact.form.notSure') }, ...products.map((p) => ({ value: p.name, label: p.name }))]
  const text = t('pages.contact.form.text', {
    store: brand.name,
    name: name.trim(),
    phone: phone.trim(),
    email: email.trim() || '-',
    company: company.trim() || '-',
    product: product || t('pages.contact.form.notSure'),
    message: message.replace(multiline, ' ').trim(),
  })
  return (
    <div className={styles.panel}>
      <h2 ref={heading} tabIndex={-1} className={styles.title}>
        {done ? t('pages.contact.form.doneTitle') : t('pages.contact.form.title')}
      </h2>
      {done ? (
        <div className={styles.done}>
          <p className={styles.lead}>{t('pages.contact.form.doneBody')}</p>
          <Link href={brand.chat(text)} className={styles.whatsapp}>
            <ChatIcon className={styles.icon} />
            {t('pages.contact.form.send')}
          </Link>
          <button
            type="button"
            className={styles.secondary}
            onClick={() => {
              setDone(false)
              heading.current?.focus()
            }}
          >
            {t('pages.contact.form.edit')}
          </button>
        </div>
      ) : (
        <>
          <p className={styles.lead}>{t('pages.contact.form.lead')}</p>
          <Form
            label={t('pages.contact.form.title')}
            className={cx(styles.form, styles.formWide)}
            onSubmit={() => {
              setTried(true)
              if (name.trim() && phone.trim() && message.trim()) {
                setDone(true)
                heading.current?.focus()
              }
            }}
          >
            <TextField label={t('pages.contact.form.name')} note="*" autoComplete="name" value={name} onChange={setName} error={missing(name)} className={styles.field} />
            <PhoneField
              label={t('pages.contact.form.phone')}
              note="*"
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
            <TextField label={t('pages.contact.form.email')} note={t('pages.contact.form.optional')} type="email" autoComplete="email" value={email} onChange={setEmail} className={styles.field} />
            <TextField label={t('pages.contact.form.company')} note={t('pages.contact.form.optional')} autoComplete="organization" value={company} onChange={setCompany} className={styles.field} />
            <Select label={t('pages.contact.form.product')} value={product} options={options} onChange={setProduct} className={cx(styles.field, styles.select, styles.full)} />
            <TextField label={t('pages.contact.form.message')} note="*" value={message} onChange={setMessage} error={missing(message)} maxLength={600} className={cx(styles.field, styles.full)} />
            <p className={cx(styles.note, styles.full)}>{t('pages.contact.form.note')}</p>
            <SubmitButton className={cx(styles.submit, styles.full)}>{t('pages.contact.form.submit')}</SubmitButton>
          </Form>
        </>
      )}
    </div>
  )
}
