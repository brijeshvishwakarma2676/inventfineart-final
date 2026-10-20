import { SITE_URL, site } from './site';
import { imageSrc } from '../components/Img';

// LocalBusiness with the office address and the factory as a second location.
export const organization = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/#business`,
  name: site.name,
  slogan: site.tagline,
  url: SITE_URL,
  description: site.pitch,
  email: site.email,
  telephone: site.phones.map((p) => p.tel),
  foundingDate: String(site.foundedYear),
  image: SITE_URL + imageSrc('gallery/sculptures/15', 1600),
  address: { '@type': 'PostalAddress', ...site.office.postal, addressRegion: 'Maharashtra', addressCountry: 'IN' },
  geo: { '@type': 'GeoCoordinates', latitude: site.office.geo.lat, longitude: site.office.geo.lng },
};
