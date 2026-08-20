/**
 * Dates are written exactly as they can be substantiated, from the résumé at
 * /resume.pdf. An entry that has not finished reads "present", never a
 * projected end - except education, where the programme's scheduled end is a
 * fact about the programme rather than a prediction.
 *
 * Corrected 2026-08-20: the ISFCR internship previously read "Jun 2025 -
 * present" here. The résumé states June 2025 - July 2025. An internship that
 * has ended must not be presented as current.
 */

export const record = [
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
      'Research intern at the university’s information-security and cyber-resilience centre, on the certification platform: Solidity contracts issuing soulbound credentials, batch issuance over Merkle proofs, and the dApp and web interfaces that issue and verify them.',
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
    href: null,
    place: 'Bengaluru, India',
    from: 'Nov 2025',
    to: 'present',
    current: true,
    detail:
      'Co-founded a competitive capture-the-flag team and play with it: 10+ national and international events, across web exploitation, cryptography, steganography and forensics, OSINT and blockchain. The results, and what the practice actually consists of, are in Practice above.',
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
    to: '2027',
    current: true,
    detail:
      'Programming fundamentals, data structures and algorithms, operating systems, computer networks and software engineering, alongside project work across systems, security and applied machine learning.',
    tags: ['Data Structures', 'Algorithms', 'Networks', 'Operating Systems'],
  },
  {
    kind: 'education',
    role: 'Pre-University Course',
    org: 'TLC PU College (a unit of CFAL)',
    href: 'https://tlc.edu.in/pu-college/',
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
