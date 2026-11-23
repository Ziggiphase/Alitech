// ─────────────────────────────────────────────────────────────
//  ALITECH SITE SETTINGS
//  Edit the values below. Everything on the site reads from here.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: 'Alitech',

  // WhatsApp number in international format, digits only — no +, spaces or leading 0.
  // Example: 0803 123 4567  →  '2348031234567'
  whatsappNumber: '2348169217773',

  // Shown on the site for people who prefer to call
  phoneDisplay: '0816 921 7773',
  email: 'hello@alitech.ng',
  address: 'Lagos, Nigeria',
  hours: 'Mon–Sat: 9AM – 7PM',

  // Paste the full link to each business page (Facebook, X, Instagram, TikTok, YouTube). Leave '' to hide that icon.
  socials: {
    facebook: '',
    x: '',
    instagram: '',
    tiktok: 'https://www.tiktok.com/@alitech.smart.fix',
    youtube: '',
  },
};

/** Build a WhatsApp chat link with an optional pre-filled message. */
export function whatsappLink(message = '') {
  const base = `https://wa.me/${site.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Format a number as Naira, e.g. 650000 → ₦650,000 */
export const naira = (n) => `₦${Number(n || 0).toLocaleString('en-NG')}`;
