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
};

export const DEFAULT_WA_TEXT =
  "Hi Simona! I'd love a quote for my event.\nDate: \nArea / postcode: \nNumber of guests: \nType of event: ";

export function whatsappUrl(text: string = DEFAULT_WA_TEXT): string {
  return `https://wa.me/${site.phoneE164}?text=${encodeURIComponent(text)}`;
}
