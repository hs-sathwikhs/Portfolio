export const practice = {
  team: {
    name: 'F_S0CI3TY',
    role: 'Co-founder',
    from: 'Nov 2025',
  },

  /** Stated as results, because each one is checkable against an event. */
  standing: [
    { label: 'Enigma CTF · IIT Hyderabad', value: 'Runner-up', when: 'Jan 2026' },
    { label: 'Events played', value: '15+', when: 'National & international' },
  ],

  note: 'CTFs, lab machines and the security questions that carry over into project work.',

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
