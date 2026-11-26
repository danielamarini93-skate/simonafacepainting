export const site = {
  name: "Simona's Face Painting",
  legalName: 'Simona Face Painting',
  url: 'https://simonafacepainting.co.uk',
  phoneDisplay: '07459 889053',
  phoneE164: '447459889053',
  phoneHref: 'tel:+447459889053',
  email: 'simonafacepaintinguk@gmail.com',
  instagram: 'https://www.instagram.com/simonasfacepainting/',
  facebook: 'https://www.facebook.com/profile.php?id=100000468148203',
  googleMaps: 'https://www.google.com/maps?cid=5221955485266361915',
  googleRating: '5.0',
  // Set to the number shown on her Google profile (e.g. 21) to display "5.0 on Google (21 reviews)".
  googleReviewCount: undefined as number | undefined,
};

export const DEFAULT_WA_TEXT =
  "Hi Simona! I'd love a quote for my event.\nDate: \nArea / postcode: \nNumber of guests: \nType of event: ";

export function whatsappUrl(text: string = DEFAULT_WA_TEXT): string {
  return `https://wa.me/${site.phoneE164}?text=${encodeURIComponent(text)}`;
}

export const DATE_WA_TEXT = "Hi Simona! Are you free on [date]? It's a [birthday / wedding / corporate event] in [area] for about [number] guests.";
