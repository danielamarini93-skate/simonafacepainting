export const reviews = [
  { name: 'Catia Alam', text: "Simona is by far one of the most talented face painters we have come across. Her artwork is exceptional and we couldn't have asked for more! She is such a lovely person and went above and beyond to make my daughter's party a memorable experience. Please book Simona, you won't regret it." },
  { name: 'Nur Atif', text: "Amazing experience with Simona. She painted so well and was so creative at my daughter's 4th birthday party. My kids and her friends were happy. Simona even painted the parents as well. Highly recommend." },
  { name: 'Hodaya Siluk', text: 'Simona was just wonderful with the kids. She made sure every child was painted and was super creative with the requests. I highly recommend her for birthdays and events.' },
  { name: 'Maisha A', text: "Amazing service from Claire (the face painter) throughout! All the kids enjoyed getting their face painted and were really happy with their final look. Simona was very quick and helpful with providing me with a face painter last minute and communicated with me very well! I 100% recommend Simona's face painting service and will be using them again for future events!" },
  { name: 'Andrew Asman', text: 'Fantastic face painting for a 5-year-old’s party, super easy to deal with. Big recommendation.' },
  { name: 'LinkedIn', text: "We fell in love with Simona. We loved her energy. We can't call her a face painter, she's an artist!" },
];

export const clients = [
  { name: 'LinkedIn', file: 'LinkedIn-logo.jpg' },
  { name: 'Pret A Manger', file: 'pret-a-manger-logo.jpg' },
  { name: 'Decathlon', file: 'Decathlon-Logo.jpg' },
  { name: 'The Francis Crick Institute', file: 'crick-institute-logo-2.jpg' },
  { name: 'Brunel Museum', file: 'brunel-logo.jpg' },
  { name: 'Colozoo', file: 'colozoo-logo.jpg' },
  { name: 'Bizzie Bodies', file: 'bizzie_logo-2.jpg' },
];

export const trust = [
  { title: 'DBS checked', text: 'Checked for working with children' },
  { title: 'Fully insured', text: 'Public Liability Insurance' },
  { title: 'Skin-safe products', text: 'Professional FDA & EU-approved paints' },
  { title: 'Eco glitter', text: 'Biodegradable, cosmetic-grade sparkle' },
];

export const pricing = [
  { name: 'Private Parties', price: 160, hours: 2, guests: 'Up to 15–20 guests', text: 'Birthdays, christenings and family celebrations at home or at your venue.', popular: true },
  { name: 'Corporate Events', price: 190, hours: 2, guests: 'Up to 30–35 guests', text: 'Staff parties, family fun days, brand activations and store events.' },
  { name: 'Weddings', price: 320, hours: 3, guests: 'Up to 45–50 guests', text: 'Elegant face art and glitter for guests of all ages, styled to your day.' },
];

export const boroughs = [
  'Southwark', 'Lambeth', 'Lewisham', 'Greenwich', 'Wandsworth', 'Croydon', 'Westminster', 'Kensington & Chelsea',
  'Hammersmith & Fulham', 'Tower Hamlets', 'Hackney', 'Islington', 'Newham', 'Camden', 'Brixton', 'Clapham', 'Battersea',
  'Streatham', 'Tooting', 'Wimbledon', 'Richmond', 'Kingston upon Thames', 'Sutton', 'Bromley', 'Bexley', 'Ilford',
  'Romford', 'Orpington',
];
export const towns = ['Walton-on-Thames', 'Twickenham', 'Harrow', 'Ealing', 'Enfield', 'Dartford', 'Sevenoaks', 'Essex', 'Surrey'];

export interface Faq { id: string; q: string; a: string[]; group: 'Booking' | 'On the day' | 'Safety & products'; }
export const faqs: Faq[] = [
  { id: 'minimum-booking', group: 'Booking', q: 'What is the minimum booking time?', a: ['The minimum booking is two hours during our busy seasons (May–August and October–December). Outside these months, shorter bookings may be available depending on location and schedule.'] },
  { id: 'faces-per-hour', group: 'Booking', q: 'How many faces can you paint per hour?', a: ['Around 10 faces per hour for detailed designs (about 3–4 minutes each). For busier events we offer simplified designs of about 2 minutes each, so up to 15 faces per hour. For large events we can bring multiple artists.'] },
  { id: 'planning', group: 'Booking', q: 'How long should I book for?', a: ['It depends on the number of guests and how detailed the designs are. To avoid queues or disappointment, plan for the maximum number of people who may want to be painted. Tell us your guest numbers on WhatsApp and we’ll recommend the right length.'] },
  { id: 'themes', group: 'Booking', q: 'Can you match my party theme?', a: ['Absolutely! We love creating looks that fit your theme, costume or brand colours. If you’re not sure, we’re happy to share ideas and inspiration.'] },
  { id: 'packages', group: 'Booking', q: 'Do you have packages for different budgets?', a: ['Yes. Every event is different, so we offer packages to suit a range of budgets, including face painting and glitter combos. Get in touch and we’ll help you find the best option.'] },
  { id: 'monetised', group: 'Booking', q: 'Can you work pay-per-face at fairs and festivals?', a: ['Yes, pay-per-face and other monetised setups can be arranged in advance.'] },
  { id: 'areas', group: 'Booking', q: 'Which areas do you cover?', a: ['All of London and the surrounding areas, usually up to about an hour’s travel. A small travel fee may apply outside our usual areas. See our Areas We Cover page.'] },
  { id: 'setup', group: 'On the day', q: 'When do you arrive and how much space do you need?', a: ['We usually arrive about 15 minutes before the start time to set up. Set-up and pack-down are not included in the booked time. If you’d like us to arrive more than an hour early, a small standby fee applies.'] },
  { id: 'equipment', group: 'On the day', q: 'Do I need to provide a table and chairs?', a: ['We can provide tables, chairs, gazebos and tablecloths if needed. For smaller setups near public transport or in central London, we’ll confirm whether you need to provide a table and two chairs.'] },
  { id: 'access', group: 'On the day', q: 'What about parking and venue access?', a: ['Please let us know in advance about any access issues, parking restrictions or special directions for your venue.'] },
  { id: 'lighting', group: 'On the day', q: 'Do you need special lighting?', a: ['Good lighting helps, especially for evening events. We can bring suitable lighting if requested beforehand.'] },
  { id: 'outdoor', group: 'On the day', q: 'Can you work at outdoor events?', a: ['Yes! For outdoor bookings please make sure there is a covered area for us to work under (or ask us to bring a gazebo).'] },
  { id: 'age', group: 'Safety & products', q: 'Is there a minimum age?', a: ['Our insurance does not cover face painting for children under 3. At a parent’s discretion, we can paint a small design on the arm of children aged 2–3. The glitter bar is for ages 7 and up.'] },
  { id: 'products', group: 'Safety & products', q: 'Are your products safe?', a: ['We only use professional, FDA and EU-approved face paints, cosmetic-grade glitters and makeup, and work to the highest hygiene standards. Reactions are extremely rare, but we can’t guarantee that no irritation will occur, so products are applied at the client’s own risk.'] },
  { id: 'eco', group: 'Safety & products', q: 'Do you have eco-friendly options?', a: ['Yes, sustainability matters to us. Ask about our biodegradable eco-glitter and eco-friendly glitter bar options.'] },
  { id: 'skin', group: 'Safety & products', q: 'What if someone has a skin reaction?', a: ['In the unlikely event of itching, redness or swelling, remove the paint straight away with water and a soft cloth. Avoid soap or baby wipes, which can irritate the skin further.'] },
  { id: 'removal', group: 'Safety & products', q: 'How do I remove face paint?', a: ['Face paint comes off easily with warm water and mild soap. Some strong colours may lightly stain the skin; this fades naturally or can be removed gently with baby oil (unless allergic). Paint on clothing should wash out in a normal cycle.'] },
  { id: 'cannot-paint', group: 'Safety & products', q: 'Is there anyone you can’t paint?', a: ['For everyone’s safety we don’t paint anyone with cold sores, conjunctivitis, open wounds or contagious skin or eye infections.'] },
  { id: 'consent', group: 'Safety & products', q: 'Do you need parental consent?', a: ['We assume any child under 16 who queues or asks to be painted has the consent of a parent, guardian or supervising adult, unless told otherwise. We always ask parents before taking or sharing photos of children.'] },
  { id: 'conduct', group: 'Safety & products', q: 'Is there a code of conduct?', a: ['We won’t paint imagery that could be considered offensive or inappropriate, and abusive or threatening behaviour towards our artists won’t be tolerated.'] },
];
export const getFaqs = (ids: string[] = []) => ids.map((id) => faqs.find((f) => f.id === id)!).filter(Boolean);
