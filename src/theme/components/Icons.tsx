import type { ReactNode } from 'react'

/** Line icons in one weight (lucide's 24px grid), drawn with currentColor; each is decoration beside words that say the same. */
const Icon = ({ className, children }: { className?: string | undefined; children: ReactNode }) => (
  <svg className={className} viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    {children}
  </svg>
)

type P = { className?: string | undefined }

export const PhoneIcon = ({ className }: P) => (
  <Icon className={className}>
    <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.4 1.8.7 2.7a2 2 0 01-.5 2.1L8 9.8a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.9.3 1.8.6 2.7.7a2 2 0 011.7 2z" />
  </Icon>
)

export const ChatIcon = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
    <path
      fill="currentColor"
      d="M12 2.2a9.7 9.7 0 00-8.4 14.6L2.2 21.8l5.1-1.3A9.7 9.7 0 1012 2.2zm0 17.7a8 8 0 01-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1112 19.9zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 01-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 00-.7.3 2.8 2.8 0 00-.9 2.1 4.9 4.9 0 001 2.6 11.2 11.2 0 004.3 3.8c1.6.7 2.2.7 3 .6a2.6 2.6 0 001.7-1.2 2.1 2.1 0 00.1-1.2c0-.1-.2-.2-.5-.3z"
    />
  </svg>
)

export const MailIcon = ({ className }: P) => (
  <Icon className={className}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M22 7l-10 6L2 7" />
  </Icon>
)

export const PinIcon = ({ className }: P) => (
  <Icon className={className}>
    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0116 0z" />
    <circle cx="12" cy="10" r="3" />
  </Icon>
)

export const GlobeIcon = ({ className }: P) => (
  <Icon className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
  </Icon>
)

export const SearchIcon = ({ className }: P) => (
  <Icon className={className}>
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.3-4.3" />
  </Icon>
)

export const HeartIcon = ({ className }: P) => (
  <Icon className={className}>
    <path d="M19 14c1.5-1.4 3-3.2 3-5.5A5.5 5.5 0 0016.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 002 8.5c0 2.3 1.5 4.1 3 5.5l7 7z" />
  </Icon>
)

export const CartIcon = ({ className }: P) => (
  <Icon className={className}>
    <circle cx="8" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="M2.1 2.1h2l2.7 12.4a2 2 0 002 1.6h9.7a2 2 0 002-1.6l1.6-8.3H5.1" />
  </Icon>
)

export const UserIcon = ({ className }: P) => (
  <Icon className={className}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21a8 8 0 0116 0" />
  </Icon>
)

export const HomeIcon = ({ className }: P) => (
  <Icon className={className}>
    <path d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1z" />
  </Icon>
)

export const StoreIcon = ({ className }: P) => (
  <Icon className={className}>
    <path d="M3 9l1.5-5h15L21 9M3 9v11h18V9M3 9a3 3 0 006 0 3 3 0 006 0 3 3 0 006 0M9 20v-5h6v5" />
  </Icon>
)

export const MenuIcon = ({ className }: P) => (
  <Icon className={className}>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </Icon>
)

export const CloseIcon = ({ className }: P) => (
  <Icon className={className}>
    <path d="M18 6L6 18M6 6l12 12" />
  </Icon>
)

export const ChevronDown = ({ className }: P) => (
  <Icon className={className}>
    <path d="M6 9l6 6 6-6" />
  </Icon>
)

export const ChevronLeft = ({ className }: P) => (
  <Icon className={className}>
    <path d="M15 18l-6-6 6-6" />
  </Icon>
)

export const ChevronRight = ({ className }: P) => (
  <Icon className={className}>
    <path d="M9 18l6-6-6-6" />
  </Icon>
)

export const MinusIcon = ({ className }: P) => (
  <Icon className={className}>
    <path d="M6 12h12" />
  </Icon>
)

export const PlusIcon = ({ className }: P) => (
  <Icon className={className}>
    <path d="M6 12h12M12 6v12" />
  </Icon>
)

export const ArrowRight = ({ className }: P) => (
  <Icon className={className}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Icon>
)

export const CheckIcon = ({ className }: P) => (
  <Icon className={className}>
    <path d="M20 6L9 17l-5-5" />
  </Icon>
)

export const CheckCircle = ({ className }: P) => (
  <Icon className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="M8 12l3 3 5-6" />
  </Icon>
)

export const TruckIcon = ({ className }: P) => (
  <Icon className={className}>
    <path d="M14 18V6a1 1 0 00-1-1H3a1 1 0 00-1 1v11a1 1 0 001 1h2M15 18H9M14 8h4l4 4v5a1 1 0 01-1 1h-2" />
    <circle cx="7" cy="18" r="2" />
    <circle cx="17" cy="18" r="2" />
  </Icon>
)

export const ShieldIcon = ({ className }: P) => (
  <Icon className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </Icon>
)

export const LockIcon = ({ className }: P) => (
  <Icon className={className}>
    <rect x="4" y="11" width="16" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 018 0v4" />
  </Icon>
)

export const ZapIcon = ({ className }: P) => (
  <Icon className={className}>
    <path d="M13 2L3 14h9l-1 8 10-12h-9z" />
  </Icon>
)

export const CpuIcon = ({ className }: P) => (
  <Icon className={className}>
    <rect x="5" y="5" width="14" height="14" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
  </Icon>
)

export const ThermometerIcon = ({ className }: P) => (
  <Icon className={className}>
    <path d="M14 14.8V4a2 2 0 00-4 0v10.8a4 4 0 104 0z" />
  </Icon>
)

export const CylinderIcon = ({ className }: P) => (
  <Icon className={className}>
    <ellipse cx="12" cy="5" rx="8" ry="3" />
    <path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
  </Icon>
)

export const RefreshIcon = ({ className }: P) => (
  <Icon className={className}>
    <path d="M21 12a9 9 0 01-15.5 6.2L3 16M3 12A9 9 0 0118.5 5.8L21 8M21 3v5h-5M3 21v-5h5" />
  </Icon>
)

export const HeadsetIcon = ({ className }: P) => (
  <Icon className={className}>
    <path d="M3 14h3a2 2 0 012 2v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a9 9 0 0118 0v7a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3" />
  </Icon>
)

export const AwardIcon = ({ className }: P) => (
  <Icon className={className}>
    <circle cx="12" cy="8" r="6" />
    <path d="M15.5 12.9L17 22l-5-3-5 3 1.5-9.1" />
  </Icon>
)

export const EyeIcon = ({ className }: P) => (
  <Icon className={className}>
    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
    <circle cx="12" cy="12" r="3" />
  </Icon>
)

export const GridIcon = ({ className }: P) => (
  <Icon className={className}>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </Icon>
)

export const ListIcon = ({ className }: P) => (
  <Icon className={className}>
    <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
  </Icon>
)

export const WheatIcon = ({ className }: P) => (
  <Icon className={className}>
    <path d="M2 22L16 8M3.5 12.5L5 11l1.5 1.5a3.5 3.5 0 010 5L5 19l-1.5-1.5a3.5 3.5 0 010-5zM7.5 8.5L9 7l1.5 1.5a3.5 3.5 0 010 5L9 15l-1.5-1.5a3.5 3.5 0 010-5zM11.5 4.5L13 3l1.5 1.5a3.5 3.5 0 010 5L13 11l-1.5-1.5a3.5 3.5 0 010-5zM20 2h2v2a4 4 0 01-4 4h-2V6a4 4 0 014-4z" />
  </Icon>
)
