export const record = [
  {
    kind: 'work', role: 'Technical Intern', org: 'Noventiq India',
    href: 'https://noventiq.com/', place: 'Bengaluru, India',
    from: 'Oct 2026', to: 'present', current: true,
    detail: 'Guided study of enterprise firewall architecture and policies across Palo Alto, Check Point and Fortinet, alongside Azure security fundamentals on the Microsoft certification path.',
    tags: ['Network security', 'Firewalls', 'Azure'],
  },
  {
    kind: 'work',
    role: 'Research Intern',
    org: 'PESU C-ISFCR',
    href: 'https://www.isfcr.pes.edu/',
    place: 'Bengaluru, India',
    from: 'Jun 2025',
    to: 'Jul 2025',
    current: false,
    detail:
      'Research intern at the university’s information-security and cyber-resilience centre, on the certification platform: Solidity contracts issuing soulbound credentials, Merkle eligibility proofs, and the dApp and web interfaces that issue and verify them.',
    tags: ['Solidity', 'Smart contracts', 'React', 'Node.js'],
  },
];

/**
 * Kept separate from appointments because it is neither a job nor a degree, and
 * filing it under either would misstate it. It is also the single most current
 * thing on this page, which is why it is listed first rather than last.
 *
 * The `detail` deliberately does not recite the results - Practice prints those
 * with the events attached, and stating them twice on one page would read as
 * two achievements instead of one.
 */
export const activities = [
  {
    kind: 'activity',
    role: 'Co-founder',
    org: 'F_S0CI3TY',
    href: 'https://fs0ci3ty.vercel.app/',
    place: 'Bengaluru, India',
    from: 'Nov 2025',
    to: 'present',
    current: true,
    detail:
      'Co-founded a competitive capture-the-flag team and play with it: 15+ national and international events, across web exploitation, cryptography, steganography and forensics, OSINT and blockchain. ',
    tags: ['CTF', 'Web exploitation', 'Cryptography', 'OSINT', 'Blockchain'],
  },
];

export const education = [
  {
    kind: 'education',
    role: 'B.Tech, Computer Science and Engineering',
    org: 'PES University',
    href: 'https://pes.edu/',
    place: 'Bengaluru, India',
    from: '2023',
    to: 'present',
    current: true,
    detail:
      'Programming fundamentals, data structures and algorithms, operating systems, computer networks and software engineering, alongside project work across systems, security and applied machine learning.',
    tags: ['Data Structures', 'Algorithms', 'Networks', 'Operating Systems'],
  },
  {
    kind: 'education',
    role: 'Pre-University Course',
    org: 'TLC PU College (a unit of CFAL)',
    href: 'https://tlc.edu.in/',
    place: 'Mangaluru, India',
    from: '2021',
    to: '2023',
    current: false,
    detail: 'Physics, Chemistry, Mathematics and Statistics.',
    tags: ['Physics', 'Chemistry', 'Mathematics', 'Statistics'],
  },
];

/** Named courses taken outside the degree, as stated on the résumé. */
export const coursework = [
  '100x Devs Cohort 3',
  'Striver A2Z DSA',
  'CWH Complete Python',
];

export const timeline = [...record, ...activities, ...education];

export default timeline;
