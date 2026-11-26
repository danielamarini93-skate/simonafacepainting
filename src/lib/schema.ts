import { site } from './site';
import { boroughs, towns, reviews } from '../data/content';

export function businessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'EntertainmentBusiness'],
    '@id': `${site.url}/#business`,
    name: site.name,
    alternateName: site.legalName,
    url: `${site.url}/`,
    telephone: '+44 7459 889053',
    email: site.email,
    image: `${site.url}/og-image.jpg`,
    logo: `${site.url}/favicon-192.png`,
    description: 'Professional face painting, glitter bar and glitter tattoos for children and adults across London: birthday parties, weddings, festivals and corporate events.',
    priceRange: '£160–£320+',
    address: { '@type': 'PostalAddress', addressLocality: 'London', addressRegion: 'Greater London', addressCountry: 'GB' },
    areaServed: [
      { '@type': 'City', name: 'London' },
      ...[...boroughs, ...towns].map((name) => ({ '@type': 'Place', name })),
    ],
    sameAs: [site.instagram, site.facebook, site.googleMaps],
    knowsAbout: ['Face painting', 'Glitter tattoos', 'Glitter bar', 'Halloween face painting', 'Children’s party entertainment'],
  };
}

export function serviceSchema(name: string, description: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name, description, serviceType: name,
    url: `${site.url}${path}`,
    provider: { '@id': `${site.url}/#business` },
    areaServed: { '@type': 'City', name: 'London' },
  };
}

export function faqSchema(items: { q: string; a: string[] }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a.join(' ') } })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: `${site.url}${it.path}` })),
  };
}
export { reviews };
