/**
 * No percentages, no star ratings, no self-assigned "expert". The old version
 * of this page claimed Solidity at 20% while the caption underneath called it
 * expert-level - a number that contradicts its own copy is worse than no
 * number. What is honest is what has been used, and what it was used for.
 *
 * Each `note` names the work on this page the group was used on, which is what
 * makes the list checkable. If a tool cannot be traced to something in Work or
 * Practice, it does not belong here - that rule is why there is no "Docker,
 * Kubernetes, AWS, GCP" row.
 *
 * Order matches the disciplines in profile.js: security first, then the systems
 * and application work, then the platform side.
 */

export const stack = [
  {
    id: 'security',
    heading: 'Security',
    note: 'Offensive tooling from CTF categories and lab machines, plus the segmentation work in Bank Networks.',
    items: [
      'Burp Suite',
      'nmap',
      'Wireshark',
      'Ghidra',
      'gdb / pwntools',
      'sqlmap',
      'Linux privesc',
      'Firewall policy',
    ],
  },
  {
    id: 'systems',
    heading: 'Systems & networks',
    note: 'The RAFT cluster behind Mini-RAFT Board, the CoAP-to-MQTT bridge written straight against sockets, and the topology work.',
    items: [
      'C',
      'Socket programming',
      'TCP / UDP',
      'RAFT consensus',
      'WebSocket',
      'CoAP',
      'MQTT',
      'Cisco Packet Tracer',
    ],
  },
  {
    id: 'services',
    heading: 'Services & data',
    note: 'APIs and persistence behind AURA, Compit Pal, the blood bank service and VaidyaDhara.',
    items: [
      'Node.js',
      'Express',
      'Java',
      'Spring Boot',
      'FastAPI',
      'MongoDB',
      'PostgreSQL',
      'Redis',
    ],
  },
  {
    id: 'interfaces',
    heading: 'Interfaces',
    note: 'Front ends for Capture the Calendar, Compit Pal, AURA and this site.',
    items: [
      'React',
      'TypeScript',
      'Next.js',
      'Vite',
      'styled-components',
      'Tailwind',
      'TanStack Query',
      'Framer Motion',
    ],
  },
  {
    id: 'ml',
    heading: 'Applied ML',
    note: 'The terrain classifier and its SVM baseline; the forecasting service in AURA.',
    items: ['Python', 'TensorFlow / Keras', 'scikit-learn', 'NumPy / pandas', 'Jupyter'],
  },
  {
    id: 'chain',
    heading: 'On chain',
    note: 'Contracts and tooling for the certification platform, and the certification layer in AURA.',
    items: ['Solidity', 'Hardhat', 'Ethers.js', 'Merkle proofs'],
  },
  {
    id: 'working',
    heading: 'Working with',
    note: 'Version control, containers and the platform side.',
    items: ['Git', 'GitHub', 'Docker', 'Docker Compose', 'Nginx', 'Linux', 'Vercel'],
  },
];

export default stack;
