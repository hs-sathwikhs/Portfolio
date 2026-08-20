/**
 * Every fact here is carried over from the résumé at /resume.pdf or verified
 * against a public source. Nothing is estimated. If a number cannot be
 * substantiated it is absent rather than approximated.
 *
 * Positioning, 2026-08-20: this used to read "Blockchain, Full stack,
 * Networks", which described one project rather than the person. The record now
 * covers distributed systems, applied ML, backend and web work, and a year of
 * competitive security - so the framing is a software engineer with a security
 * edge, and blockchain is one discipline in that list rather than the headline.
 */

export const profile = {
  name: 'Sathwik HS',
  mark: 'SHS',

  /**
   * Order is the claim. Security first because it is the current focus and the
   * only discipline here with a competitive result attached; the rest follow by
   * weight of work on this page.
   */
  disciplines: ['Security', 'Systems', 'Full stack', 'AI'],

  /** Two words for the nav and the hero, where four will not fit. */
  shortFocus: 'Security & systems',

  city: 'Bengaluru, India',
  // Bengaluru, actual coordinates - set in mono because it is a measurement.
  coordinates: '12.9716° N, 77.5946° E',

  standfirst: [
    'I’m a CSE undergrad at PES University who builds systems and then spends the weekend trying to break things like them.',
    'Most of my time now goes to security — I co-founded a CTF team, we came second at IIT Hyderabad’s CTF, and the labs in between are where the reading actually sticks.',
    'The rest is ordinary engineering and I like it that way: consensus in a distributed cluster, a Spring backend, a model that classifies terrain from a robot’s own gait, contracts that issue credentials nobody can forge.',
    'What connects them is a preference for knowing why something holds rather than that it happened to work.',
  ],

  portrait: {
    webp: '/images/portrait.webp',
    jpg: '/images/portrait.jpg',
    alt: 'Sathwik HS',
  },

  resume: '/resume.pdf',

  email: 'hs.sathwikhs@gmail.com',
  phone: '+91 99644 66062',
  phoneHref: '+919964466062',

  social: [
    { label: 'GitHub', handle: 'hs-sathwikhs', href: 'https://github.com/hs-sathwikhs' },
    { label: 'LinkedIn', handle: 'hs-sathwikhs', href: 'https://linkedin.com/in/hs-sathwikhs' },
    { label: 'X', handle: 'sathwikhss', href: 'https://twitter.com/sathwikhss' },
    { label: 'Instagram', handle: 's._athwik', href: 'https://instagram.com/s._athwik' },
  ],
};

export default profile;
