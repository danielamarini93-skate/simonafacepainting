import type { Category } from '../lib/gallery';

export interface Service {
  slug: string;
  name: string;           // short name for cards & nav
  title: string;          // H1
  metaTitle: string;      // <title> (keep ≤ 60 chars incl. brand)
  metaDescription: string;// ≤ 155 chars
  tagline: string;        // card blurb
  intro: string[];
  highlights: { title: string; text: string }[];
  idealFor: string[];
  sections?: { heading: string; text: string[] }[];
  gallery: Category[];
  heroImage: string;
  video?: 'butterfly' | 'kit' | 'reindeer';
  faqIds?: string[];
}

export const services: Service[] = [
  {
    slug: 'face-painting-children-adults',
    heroImage: 'adults-8b7c9753.jpg',
    name: 'Face Painting for Events',
    title: 'Face Painting for Events, Weddings & Adults in London',
    metaTitle: 'Event & Adult Face Painting London | Weddings, Festivals',
    metaDescription:
      'Face painting for London events of every size: weddings, festivals, corporate family days and adult parties. Multiple artists, skin-safe paints, insured.',
    tagline: 'Elegant face art for weddings, festivals and corporate events, for guests of every age.',
    intro: [
      "Big events need a face painter who is fast, reliable and brilliant with every age group. From wedding guests and festival crowds to staff family days, we paint elegant florals, festival looks and children's favourites, so the queue keeps moving and everyone leaves smiling.",
      'For larger events we bring multiple artists, can match designs to your brand colours or theme, and can combine face painting with a glitter bar or glitter tattoos. Planning a child’s birthday? See our children’s face painting page.',
    ],
    highlights: [
      { title: 'Designs for every guest', text: 'Princesses, superheroes and animals for little ones; festival looks, florals and glamorous eye designs for adults.' },
      { title: 'Professional & safe', text: 'Cosmetic-grade, skin-safe paints and glitter, sanitised kit and fresh sponges for every guest.' },
      { title: 'Quick without cutting corners', text: 'Around 10 detailed designs per hour, or up to 15 quick designs for busy events.' },
    ],
    idealFor: ['Birthday parties', 'Weddings', 'Festivals & fairs', 'Corporate family days', 'School events', 'Brand activations'],
    sections: [
      { heading: "Children's face painting", text: ['Tigers, unicorns, Spider-Man, princesses, dragons, fairies and favourite characters. Children can choose from our design boards or ask for something to match their costume or party theme. Suitable from age 3.'] },
      { heading: 'Face painting for adults', text: ['From subtle cheek art and floral eye designs to bold festival looks and Halloween special effects, adult face painting adds a memorable, photo-ready touch to weddings, hen parties, staff parties and festivals.'] },
    ],
    gallery: ['kids', 'adults'],
    video: 'butterfly',
    faqIds: ['faces-per-hour', 'age', 'products', 'removal'],
  },
  {
    slug: 'childrens-face-painting',
    heroImage: 'kids-1bf337db.jpg',
    name: "Children's Face Painting",
    title: "Children's Face Painting in London",
    metaTitle: "Children's Face Painting London | Kids' Party Face Painter",
    metaDescription:
      "Kids' party face painter in London. Unicorns, superheroes, tigers & princesses painted with skin-safe paints. DBS checked, insured. Message us on WhatsApp.",
    tagline: 'Unicorns, superheroes and tigers that make little faces light up.',
    intro: [
      "There's nothing quite like the moment a child sees their transformation in the mirror, from a shy smile to wide-eyed wonder. That's what we bring to every party.",
      'From superheroes, unicorns and princesses to butterflies, fairies and favourite animals, we bring every imagination to life, and happily create designs on the spot to match outfits, costumes and party themes.',
    ],
    highlights: [
      { title: 'Designs for every imagination', text: 'A big menu of favourites plus made-to-order designs for themed parties. Suitable from age 3.' },
      { title: 'Safe, gentle & hygienic', text: 'High-quality, skin-safe products, a clean kit for every event and lots of patience with nervous little ones.' },
      { title: 'Memories (and photos!)', text: 'Face painting brings children together, fills the room with laughter and gives you the best party photos.' },
    ],
    idealFor: ["Children's birthday parties", 'Christenings & family celebrations', 'Nursery & school fairs', 'Soft play & party venues', 'Community events'],
    gallery: ['kids'],
    video: 'butterfly',
    faqIds: ['minimum-booking', 'faces-per-hour', 'age', 'planning'],
  },
  {
    slug: 'glitter-bar-kids-adults',
    heroImage: 'glitter-bar-642f25d3.jpg',
    name: 'Glitter Bar',
    title: 'Glitter Bar Hire in London: Kids (7+) & Adults',
    metaTitle: 'Glitter Bar Hire London | Festival Glitter for Kids & Adults',
    metaDescription:
      'Glitter bar hire in London for weddings, festivals, birthdays and corporate events. Eco-friendly biodegradable glitter applied by professional artists.',
    tagline: 'Instant sparkle and glam: festival glitter for faces, hair and body.',
    intro: [
      'Our glitter bar is always a hit. Guests choose from a range of shimmering looks for the face, hair or body, from a delicate sparkle along the cheekbones to full festival glam.',
      "We use eco-friendly, biodegradable glitter, so the shine is guilt-free, and our friendly artists help every guest feel confident and photo-ready. It creates a buzzing, joyful atmosphere that keeps the sparkle going all day (and night).",
    ],
    highlights: [
      { title: 'Eco-friendly sparkle', text: 'Biodegradable, cosmetic-grade glitter that is kind to skin and to the planet.' },
      { title: 'Looks for every style', text: 'Subtle shimmer, chunky festival glitter, gems and pearls, colour-matched to your theme or brand.' },
      { title: 'Fast & sociable', text: 'Quick to apply, perfect for queues of excited guests and a brilliant photo moment.' },
    ],
    idealFor: ['Weddings & hen parties', 'Festivals', 'Teen & adult birthdays (7+)', 'Corporate events & launches', 'Pride celebrations'],
    gallery: ['glitter-bar'],
    faqIds: ['eco', 'products', 'outdoor'],
  },
  {
    slug: 'glitter-tattoos-children-adults',
    heroImage: 'glitter-tattoos-54f2e9e4.jpg',
    name: 'Glitter Tattoos',
    title: 'Glitter Tattoos for Children & Adults in London',
    metaTitle: 'Glitter Tattoos London | Kids & Adults Party Glitter Tattoos',
    metaDescription:
      'Sparkling glitter tattoos in London for parties and events. Skin-safe glue, cosmetic glitter, long-lasting designs for kids, teens and adults.',
    tagline: 'Long-lasting sparkle in seconds, perfect for busy events.',
    intro: [
      'Glitter tattoos are quick, mess-free and last for days, which makes them perfect for busy events, school fairs and guests who prefer not to have their face painted.',
      'We offer a wide range of designs to suit every theme: princesses and fairies, superheroes, dragons, butterflies, flowers, stars, hearts, flags and sports, plus seasonal stencils for Christmas, Easter and Halloween.',
    ],
    highlights: [
      { title: 'Designs for everyone', text: 'Minis, mids, words and back designs, so there is something for kids, teens and adults alike.' },
      { title: 'Safe, quick & durable', text: 'Skin-safe, hypoallergenic glue and cosmetic-grade glitter; lasts for days.' },
      { title: 'Great for big numbers', text: 'Fast to apply, so ideal alongside face painting to keep queues moving.' },
    ],
    idealFor: ['School fairs & fêtes', 'Festivals', 'Corporate family days', 'Birthday parties', 'Sports clubs & community events'],
    gallery: ['glitter-tattoos'],
    faqIds: ['products', 'skin', 'monetised'],
  },
  {
    slug: 'seasonal-themed-events',
    heroImage: 'seasonal-b09d8866.jpg',
    name: 'Seasonal & Themed Events',
    title: 'Halloween, Pride, Day of the Dead & Themed Face Painting',
    metaTitle: 'Halloween & Themed Face Painting London | Seasonal Events',
    metaDescription:
      'Halloween special effects, Day of the Dead sugar skulls, Pride rainbows and Christmas designs. Themed face painting for London events.',
    tagline: 'Spooky, festive and fabulous looks for Halloween, Pride, Christmas and more.',
    intro: [
      'We love creating designs that celebrate the season and your theme, from spooky Halloween transformations and Day of the Dead sugar skulls to dazzling Pride rainbows and festive Christmas characters.',
      "Whether it's a family celebration, a festival or a corporate event, we adapt our designs to match your theme perfectly: bold, beautiful and unforgettable.",
    ],
    highlights: [
      { title: 'Halloween & special effects', text: 'Scars, wounds, skeletons, spiders and witches, as scary or as sweet as you like.' },
      { title: 'Day of the Dead', text: 'Detailed sugar skull designs with flowers, gems and colour.' },
      { title: 'Pride, Christmas & more', text: 'Rainbow looks, Grinches, reindeer and snowflakes, or a custom theme for your brand or event.' },
    ],
    idealFor: ['Halloween parties', 'Pride events', 'Christmas parties & grottos', 'Themed birthdays', 'Brand & venue events'],
    gallery: ['seasonal'],
    video: 'reindeer',
    faqIds: ['themes', 'minimum-booking'],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug)!;
