export const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="16" rx="3" ry="3" />
    <line x1="8" y1="3" x2="8" y2="7" />
    <line x1="16" y1="3" x2="16" y2="7" />
    <line x1="3" y1="11" x2="21" y2="11" />
    <circle cx="8" cy="15" r="1.3" fill="currentColor" stroke="none" />
    <circle cx="12" cy="15" r="1.3" fill="currentColor" stroke="none" />
    <circle cx="16" cy="15" r="1.3" fill="currentColor" stroke="none" />
  </svg>
);

export const BellIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6.5 2 6.5H4S6 14 6 9" />
    <path d="M10 19c.3 1.1 1.2 2 2 2s1.7-.9 2-2" />
  </svg>
);

export const PaletteIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3a9 9 0 0 0-9 9 9 9 0 0 0 9 9c.9 0 1.4-.6 1.4-1.2 0-.7-.5-1.1-.5-1.8 0-.9.8-1.5 1.6-1.5h2.2a4.3 4.3 0 0 0 0-8.6h-.7A8.9 8.9 0 0 0 12 3Z" />
    <circle cx="8" cy="10" r="1.1" fill="currentColor" stroke="none" />
    <circle cx="10.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
    <circle cx="13.5" cy="8.5" r="1.1" fill="currentColor" stroke="none" />
    <circle cx="7.5" cy="13.2" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

export const HeadphonesIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 11a8 8 0 0 1 16 0v6a3 3 0 0 1-3 3h-3v-5h5v-4a6 6 0 0 0-12 0v4h5v5H7a3 3 0 0 1-3-3v-6z" />
  </svg>
);

export const EyeOffIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3l18 18M10.5 10.7a3 3 0 0 0 4.3 4.1" />
    <path d="M9.9 4.2A10 10 0 0 1 21 12a11.8 11.8 0 0 1-1 4.2m-3 2.9a10 10 0 0 1-14-7c.5-1.5 1.3-3 2.4-4.2" />
  </svg>
);

export const EyeIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
    <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </g>
  </svg>
);

export const ZapIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

export const CreditCardIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="6" width="18" height="12" rx="3" ry="3" />
    <path d="M3 10h18M7 15h.01M11 15h2" />
  </svg>
);

export const StarIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2 9.2 8.6 2 9.3l5 4.9L5.8 22 12 18.4 18.2 22 17 14.2l5-4.9-7.2-.7L12 2z" />
  </svg>
);

export const WhatsAppIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
    <path
      fill="currentColor"
      d="M12 2a9.93 9.93 0 0 0-8.48 15.34L2 22l4.78-1.49A10 10 0 1 0 12 2Zm5.44 14.35c-.23.64-1.14 1.17-1.77 1.25-.47.06-1.08.09-1.75-.11-.41-.13-.94-.31-1.62-.61-2.84-1.24-4.68-4.17-4.82-4.37-.14-.2-1.16-1.55-1.16-2.96 0-1.41.73-2.09 1.0-2.38.27-.29.59-.36.79-.36.2 0 .4 0 .57.01.18.01.43-.07.68.52.23.55.77 1.9.84 2.04.07.14.12.3.02.49-.1.2-.16.32-.3.49-.14.17-.3.38-.43.51-.14.14-.3.29-.13.57.16.29.71 1.17 1.52 1.9 1.04.93 1.92 1.22 2.2 1.36.27.14.43.12.59-.07.16-.18.68-.79.86-1.06.18-.27.37-.23.62-.14.25.09 1.59.75 1.86.89.27.14.45.21.52.33.07.12.07.68-.16 1.32Z"
    />
  </svg>
);

export const ScissorsIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
    <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="2.8" />
      <circle cx="6" cy="18" r="2.8" />
      <path d="M6 6l12 12" />
      <path d="M6 18l7-7 5-5" />
    </g>
  </svg>
);

export const MailIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
    <path
      d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <path d="m22 8-10 7L2 8" fill="none" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

export const InstagramIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="12" cy="12" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="17.3" cy="6.7" r="1.3" fill="currentColor" />
  </svg>
);

export const ChevronDownIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
    <path
      d="m6 9 6 6 6-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CloseIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
    <path
      d="M18 6 6 18M6 6l12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const PaymentIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
    <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2.8" y="5" width="18.4" height="14" rx="3" />
      <path d="M3.8 9h16.4" />
      <path d="M7.5 14h4" />
    </g>
  </svg>
);

export const ChevronRightIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
    <path
      d="m9 18 6-6-6-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
