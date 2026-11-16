'use client'

import { useRef, useState } from 'react'
import { Form, Link, PhoneField, Select, SubmitButton, TextField, useProducts, useStorefront } from '@dripfunnel/storefront-core/theme'
import { useBrand } from '../brand'
import { ChatIcon } from '../Icons'
import { cx } from '../cx'
import styles from '../../styles/demo.module.css'

const multiline = /\s+/g
const emailLike = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * "Tell us what you need": the contact page's enquiry. Core has no enquiry endpoint yet (its Shop API has no mutation for
 * one), so the checked form becomes a WhatsApp message to the store with every answer in it, which the shopper sends from
 * their own WhatsApp. Once it is ready the form gives way to that step, so it can't be sent twice by a double press.
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
  const [kind, setKind] = useState('')
  const [message, setMessage] = useState('')
  const [tried, setTried] = useState(false)
  const [done, setDone] = useState(false)
  const heading = useRef<HTMLHeadingElement>(null)
  const missing = (value: string) => (tried && value.trim() === '' ? t('pages.contact.form.missing') : null)
  const phoneOk = phone.replace(/\D/g, '').length >= 10
  const emailOk = email.trim() === '' || emailLike.test(email.trim())
  const phoneError = missing(phone) ?? (tried && !phoneOk ? t('pages.contact.form.badPhone') : null)
  const emailError = tried && !emailOk ? t('pages.contact.form.badEmail') : null
  const kinds = [
    { value: '', label: t('pages.contact.form.kinds.choose') },
    { value: t('pages.contact.form.kinds.recommend'), label: t('pages.contact.form.kinds.recommend') },
    { value: t('pages.contact.form.kinds.quote'), label: t('pages.contact.form.kinds.quote') },
    { value: t('pages.contact.form.kinds.demo'), label: t('pages.contact.form.kinds.demo') },
    { value: t('pages.contact.form.kinds.support'), label: t('pages.contact.form.kinds.support') },
    { value: t('pages.contact.form.kinds.dealer'), label: t('pages.contact.form.kinds.dealer') },
  ]
  const options = [{ value: '', label: t('pages.contact.form.notSure') }, ...products.map((p) => ({ value: p.name, label: p.name }))]
  const text = t('pages.contact.form.text', {
    store: brand.name,
    name: name.trim(),
    phone: phone.trim(),
    email: email.trim() || '-',
    company: company.trim() || '-',
    product: product || t('pages.contact.form.notSure'),
    kind: kind || '-',
    message: message.replace(multiline, ' ').trim(),
  })
  return (
    <div className={cx(styles.panel, styles.enquiry)}>
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
              if (done) return
              if (name.trim() && phoneOk && emailOk && message.trim()) {
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
              error={phoneError}
              className={styles.field}
              groupClassName={styles.phone}
            />
            <TextField label={t('pages.contact.form.email')} note={t('pages.contact.form.optional')} type="email" autoComplete="email" value={email} onChange={setEmail} error={emailError} className={styles.field} />
            <TextField label={t('pages.contact.form.company')} note={t('pages.contact.form.optional')} autoComplete="organization" value={company} onChange={setCompany} className={styles.field} />
            <Select label={t('pages.contact.form.product')} value={product} options={options} onChange={setProduct} className={cx(styles.field, styles.select)} />
            <Select label={t('pages.contact.form.kind')} value={kind} options={kinds} onChange={setKind} className={cx(styles.field, styles.select)} />
            <TextField label={t('pages.contact.form.message')} note="*" value={message} onChange={setMessage} error={missing(message)} maxLength={600} className={cx(styles.field, styles.full)} />
            <div className={cx(styles.full, styles.enquiryFoot)}>
              <p className={styles.note}>{t('pages.contact.form.note')}</p>
              <SubmitButton className={styles.submit}>{t('pages.contact.form.submit')}</SubmitButton>
            </div>
          </Form>
        </>
      )}
    </div>
  )
}
