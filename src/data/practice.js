/**
 * Practice - CTFs and lab work.
 *
 * Every number in this file comes from the résumé at /resume.pdf and nowhere
 * else: runner-up at the IIT Hyderabad CTF in January 2026, and 10+ national
 * and international events since November 2025. The categories below are the
 * ones the résumé names, in that order - crypto, steganography, blockchain,
 * OSINT, web exploitation - plus the systems side the lab work sits in.
 *
 * What is deliberately absent: platform ranks, solve counts and streaks. Those
 * are only worth printing next to a profile link that proves them, and there
 * isn't one to link yet. `writeups` stays null for the same reason - the
 * section renders that link only once there is a published index behind it.
 */

export const practice = {
  team: {
    name: 'F_S0CI3TY',
    role: 'Co-founder',
    from: 'Nov 2025',
  },

  /** Stated as results, because each one is checkable against an event. */
  standing: [
    { label: 'IIT Hyderabad CTF', value: 'Runner-up', when: 'Jan 2026' },
    { label: 'Events played', value: '10+', when: 'National & international' },
  ],

  note:
    'Ongoing rather than finished: events run through the year and lab machines are worked between them. There are no solve counts or platform badges on this page, because none of them can be verified from outside — only results that belong to a named event.',

  writeups: null,
};

/**
 * Ordered by how much of the time actually goes into each, not by which sounds
 * most impressive. Web exploitation and the systems side carry most of it.
 */
export const categories = [
  {
    id: 'web',
    heading: 'Web exploitation',
    kind: 'CTF · labs',
    note:
      'Injection, broken access control and the authentication logic around them. The category that overlaps most directly with building the same stack the rest of this page is built on - which is most of why it is the one worth being best at.',
    items: ['SQLi', 'XSS', 'SSRF', 'IDOR', 'Auth bypass', 'File upload'],
  },
  {
    id: 'crypto',
    heading: 'Cryptography',
    kind: 'CTF',
    note:
      'Broken primitives and bad parameter choices rather than novel cryptanalysis: reused nonces, small exponents, predictable keys, and padding that reveals more than it hides.',
    items: ['Classical', 'RSA misuse', 'Padding oracles', 'Hash attacks', 'PRNG flaws'],
  },
  {
    id: 'chain',
    heading: 'Blockchain',
    kind: 'CTF',
    note:
      'Attacking contracts rather than writing them - reentrancy, access-control gaps and unchecked arithmetic. The same Solidity the certification work is built in, read from the other side.',
    items: ['Reentrancy', 'Access control', 'Integer overflow', 'Front-running'],
  },
  {
    id: 'stego',
    heading: 'Steganography & forensics',
    kind: 'CTF',
    note:
      'The artefact side: what is hidden in a file that its format does not account for. Packet captures, carved files, and metadata that outlived the thing it described.',
    items: ['LSB', 'File carving', 'PCAP analysis', 'Metadata', 'Spectrograms'],
  },
  {
    id: 'osint',
    heading: 'OSINT',
    kind: 'CTF',
    note:
      'Reconstructing something real from what was published about it by accident. Mostly a discipline of patience and of knowing which archive to search rather than of tooling.',
    items: ['Pivoting', 'Geolocation', 'Archives', 'Metadata trails'],
  },
  {
    id: 'systems',
    heading: 'Systems & network',
    kind: 'labs',
    note:
      'Getting from a foothold to root on a Linux host: SUID binaries, sudo rules, cron paths and service misconfiguration, plus the scanning and service enumeration that finds them first.',
    items: ['Linux privesc', 'SUID', 'sudo rules', 'Recon', 'Service enum', 'Pivoting'],
  },
];

/** Command names, set as a shell history rather than a skills list. */
export const tooling = [
  'nmap',
  'burpsuite',
  'ffuf',
  'sqlmap',
  'wireshark',
  'tcpdump',
  'ghidra',
  'gdb',
  'pwntools',
  'hashcat',
  'john',
  'linpeas',
  'binwalk',
  'netcat',
];

export default practice;
