import { services } from '../data/services';
export const nav = [
  { href: '/about/', label: 'About' },
  { href: '/services/', label: 'Services', children: services.map((s) => ({ href: `/services/${s.slug}/`, label: s.name })) },
  { href: '/gallery/', label: 'Gallery' },
  { href: '/pricing/', label: 'Pricing' },
  { href: '/areas-we-cover/', label: 'Areas' },
  { href: '/faqs/', label: 'FAQs' },
  { href: '/contact/', label: 'Contact' },
];
