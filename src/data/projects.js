/**
 * Single source of truth for every project surface: the ledger on the home
 * page, the index at /projects, and the record at /project/:id. Three separate
 * copies of this list is how the old site ended up serving a project that did
 * not exist.
 *
 * ORDER IS A RANKING. Entries are ordered by how well they stand up to someone
 * who opens the source: verifiable public code first, then institutional work
 * whose source is closed, then the rest. A project with no public artefact is
 * not promoted above one that has a repository a reader can actually read.
 *
 * LINK HONESTY: a link appears only where a destination was verified to
 * resolve. `unavailable` renders as plain disabled text with its reason - never
 * as a dead anchor to '#'.
 *
 * CLAIM HONESTY: where a repository's own README claims more than its code
 * does, this file states what the code does. `caveat` carries that, and it
 * renders on the project record. A portfolio that repeats an overclaim is worse
 * than one that never made it, because the reader can check.
 *
 * Verified 2026-08-20 against api.github.com:
 *   public + resolving  - CC_MiniRAFT, Terrain_Classification, AURA,
 *                         Blood_Donation_System, CTC-CaptureTheCalendar,
 *                         compit-pal, VaidyaDhara, Portfolio
 *   live demo resolving - ctcv1.vercel.app (200), sathwikhs.vercel.app (200)
 *   live demo 404       - compit-pal.vercel.app, so it is marked unavailable
 *   404 / private       - Bank_Network, Decentra-Cert, avora, Resonatia
 */

export const projects = [
  {
    id: '1',
    slug: 'mini-raft-board',
    title: 'Mini-RAFT Board',
    domain: 'Systems',
    diagram: 'consensus',
    summary:
      'A collaborative drawing board that survives losing a node, backed by a three-replica RAFT cluster written from scratch rather than pulled in as a dependency.',
    brief: [
      'Strokes from every connected client are ordered through a hand-implemented RAFT cluster: leader election, log replication, and a commit that waits for a majority rather than for the leader alone. A stroke is only drawn once the cluster agrees it happened.',
      'A WebSocket gateway sits in front of the three replicas and a replica that falls behind catches up through a log-sync endpoint, using the follower’s conflict index to find the point where the two logs diverged instead of replaying from zero.',
    ],
    work: [
      'Leader election and log replication implemented directly, not via a library',
      'Commit requires a majority, so a single node cannot acknowledge a write alone',
      'Catch-up sync that resumes from the divergence point, not from the start of the log',
      'Five-service Docker Compose stack: gateway, three replicas, and the front end',
    ],
    problem:
      'Real-time collaboration is easy until a node dies mid-stroke. One authoritative server makes ordering trivial and makes the server a single point of failure; three peers with no consensus protocol makes them disagree about what was drawn. RAFT is the trade in between - writes cost a majority round trip, and in exchange the board keeps a single consistent history across a node loss.',
    stack: ['Node.js', 'Express', 'WebSocket', 'RAFT', 'Docker', 'Nginx'],
    links: [
      { kind: 'source', href: 'https://github.com/hs-sathwikhs/CC_MiniRAFT' },
      { kind: 'live', unavailable: 'Runs as a local cluster - no hosted demo' },
    ],
    context: null,
  },

  {
    id: '2',
    slug: 'decentra-cert',
    title: 'Decentra Cert',
    domain: 'Blockchain',
    diagram: 'merkle',
    summary:
      'A decentralized certification platform using soulbound NFTs, for academic credentials that can be verified without asking the institution.',
    brief: [
      'Certificates are issued as soulbound tokens, so a credential stays bound to the person who earned it and cannot be sold or transferred on. A cohort is batched into a Merkle tree, which puts one root on chain to cover many certificates instead of one transaction each.',
      'Verification starts from a QR code on the certificate. It resolves to the on-chain record rather than to a file, which changes the question an employer has to answer from “does this document look right” to “does this record exist”.',
    ],
    work: [
      'Soulbound issuance - the token cannot be transferred away from its holder',
      'Merkle batching, so one on-chain root covers a whole cohort',
      'QR validation that resolves to the record, not to a stored file',
      'Issuer authentication, so only a recognised institution can mint',
    ],
    problem:
      'A PDF certificate proves very little: it can be edited, and the only real check available to a verifier is contacting the issuer. Putting the proof on chain answers that, but a credential is also not a tradeable asset - so it cannot be an ordinary NFT. Soulbound tokens plus one Merkle root per cohort keeps the credential attached to its holder and keeps the cost of issuing a cohort flat rather than per-certificate.',
    stack: ['Solidity', 'Node.js', 'React', 'Ethers.js'],
    links: [
      { kind: 'source', unavailable: 'Source not public' },
      { kind: 'live', unavailable: 'Not yet deployed' },
    ],
    context: 'Built as a research intern at PESU C-ISFCR.',
  },

  {
    id: '3',
    slug: 'terrain-classification',
    title: 'Terrain Classification',
    domain: 'AI',
    diagram: 'sequence',
    summary:
      'A 1D CNN that tells what a small legged robot is walking on from its own joint and IMU data alone - no camera, 89.5% on held-out test data.',
    brief: [
      'Trained on the BorealTC dataset using proprioceptive signals: what the legs and the IMU report while walking, rather than what a camera sees. The convolution runs along time, so the model learns the texture of a gait on gravel as a pattern in a signal window.',
      'An SVM on the same windows is trained alongside it as a baseline, because a deep model that is not compared against a simple one is an unfalsifiable claim. The CNN reaches 0.8950 test accuracy and clears the baseline; both confusion matrices are in the notebook.',
    ],
    work: [
      '1D CNN over time windows of proprioceptive and IMU channels',
      'Reproduction of a published architecture, then measured against an SVM baseline',
      'Preprocessing, label mapping and splits kept separate from the model itself',
      'Test accuracy 0.8950, with per-class confusion matrices for both models',
    ],
    problem:
      'Vision is the obvious way to identify terrain and the first thing to fail: at night, in dust, or with a camera pointed at the sky after a stumble. The robot’s own body is already an instrumented sensor, so the question is whether gait telemetry carries enough signal to classify ground without vision at all. It does - the cost is that the model is specific to the platform it was trained on, because it is learning that robot’s gait rather than the world.',
    stack: ['Python', 'TensorFlow', 'Keras', 'scikit-learn', 'NumPy', 'Jupyter'],
    links: [
      { kind: 'source', href: 'https://github.com/hs-sathwikhs/Terrain_Classification' },
      { kind: 'live', unavailable: 'Notebook - read it in the repository' },
    ],
    context: 'Dataset is the public BorealTC set; the architecture reproduces published work.',
  },

  {
    id: '4',
    slug: 'blood-donation-system',
    title: 'Blood Donation System',
    domain: 'Web',
    diagram: 'roles',
    summary:
      'A four-role blood bank service in Spring Boot: donor eligibility, camp scheduling, and severity-first allocation across an inventory that expires.',
    brief: [
      'Organiser, donor, hospital and inventory manager each get a different view of the same data, with Spring Security deciding what each role can reach. Donor eligibility enforces the ninety-day interval, and hospital requests are ranked by clinical severity rather than by arrival time.',
      'Allocation is a strategy rather than a branch: first-in-first-out and severity-priority are separate implementations behind one interface, so the policy can be swapped without touching the request pipeline. Inventory carries expiry and low-stock thresholds, which is what makes FIFO a real question and not a preference.',
    ],
    work: [
      'Four roles under Spring Security, each with its own dashboard',
      'Allocation as a swappable strategy - FIFO and severity-priority side by side',
      'Ninety-day donor eligibility and severity ranking enforced in the service layer',
      'Inventory with expiry tracking and low-stock alerts',
      'Layered packages: controller, service, repository, model, dto, security',
    ],
    problem:
      'Blood is perishable inventory with a clinical priority attached, and those two facts pull in opposite directions: expiry says release the oldest unit first, triage says serve the most severe request first. Hard-coding either one makes the other impossible, so allocation is written as an interchangeable policy and the tension becomes a configuration rather than an argument in the code.',
    stack: ['Java', 'Spring Boot', 'Spring Security', 'JPA', 'Thymeleaf', 'H2'],
    links: [
      { kind: 'source', href: 'https://github.com/hs-sathwikhs/Blood_Donation_System' },
      { kind: 'live', unavailable: 'Runs locally - no hosted demo' },
    ],
    context: 'Coursework project built with a team of four.',
  },

  {
    id: '5',
    slug: 'aura',
    title: 'AURA',
    domain: 'Web',
    diagram: 'pillars',
    summary:
      'An early-warning platform for aflatoxin risk in stored crops - satellite and weather inputs, a forecast window of two to three days, and a certificate on chain for produce that clears.',
    brief: [
      'Three pieces behind one interface: a Node and MongoDB API for growers and storage sites, a Python service that turns weather, satellite and storage-condition series into a risk forecast, and a Solidity contract on a testnet that records which lots were certified clean.',
      'The chain is there for a specific reason rather than as a feature: a clearance certificate is worth something only if the buyer can check it was not written after the fact, and that is exactly what a timestamped on-chain record gives that a row in the seller’s own database does not.',
    ],
    work: [
      'Express and MongoDB API with JWT auth across grower and storage roles',
      'Risk service consuming weather, satellite and storage-condition series',
      'Solidity certification contract deployed to a testnet with Hardhat',
      'React PWA front end, so the field-facing side works on a phone offline',
    ],
    problem:
      'Aflatoxin contamination is decided by temperature and humidity in storage days before it is detectable, so a test at the point of sale finds the loss instead of preventing it. Moving the check earlier means predicting from conditions rather than measuring the crop - which trades a certain answer that arrives too late for an uncertain one that arrives in time to move the grain.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Python', 'TensorFlow', 'Solidity'],
    links: [
      { kind: 'source', href: 'https://github.com/hs-sathwikhs/AURA' },
      { kind: 'live', unavailable: 'Not currently hosted' },
    ],
    caveat:
      'The forecasting service currently returns synthetic predictions - the pipeline, contract and interfaces are real, the trained model is not. It is listed here as a system that is wired end to end, not as a validated predictor.',
    context: null,
  },

  {
    id: '6',
    slug: 'capture-the-calendar',
    title: 'Capture the Calendar',
    domain: 'Web',
    diagram: 'realtime',
    summary:
      'A shared team calendar where an edit in one browser appears in every other one without a refresh, and attendance is tracked per participant.',
    brief: [
      'Month, week and day views over a Postgres schema, with Supabase Realtime pushing row changes straight to every open client. TanStack Query holds the cache, so a subscription event reconciles into local state rather than triggering a full refetch of the month.',
      'Each participant on an event carries their own state - registered, then completed - which makes the calendar a record of what actually happened rather than only of what was scheduled.',
    ],
    work: [
      'Realtime propagation of inserts and updates to every connected client',
      'Query cache reconciled from subscription events instead of refetching',
      'Per-participant registered and completed state on each event',
      'Typed end to end - database types generated rather than hand-written',
    ],
    problem:
      'A calendar that polls is either stale or expensive, and the interesting case is two people editing the same event at once. Subscribing to row changes removes the polling, but it moves the problem into cache coherence: the client now has to merge an event that arrived out of band with whatever the user is currently looking at, without dropping their in-progress edit.',
    stack: ['React', 'TypeScript', 'Supabase', 'TanStack Query', 'Tailwind', 'Vite'],
    links: [
      { kind: 'source', href: 'https://github.com/hs-sathwikhs/CTC-CaptureTheCalendar' },
      { kind: 'live', href: 'https://ctcv1.vercel.app' },
    ],
    context: null,
  },

  {
    id: '7',
    slug: 'bank-networks',
    title: 'Bank Networks',
    domain: 'Security',
    diagram: 'branch',
    summary:
      'A bank network built in Cisco Packet Tracer, with inter-branch communication carried through an ASA firewall and authentication at the edge.',
    brief: [
      'Branches sit on separate subnets and reach each other only through a central ASA firewall, so traffic between them is inspected rather than switched directly. Authentication is enforced at the boundary instead of trusting anything inside a branch by default.',
      'The value of building it in Packet Tracer is that the topology is testable: a rule can be changed and the effect on reachability observed immediately, without hardware.',
    ],
    work: [
      'Branch subnets that cannot reach each other except through the firewall',
      'ASA policy as the single place inter-branch traffic is decided',
      'Authentication enforced at the boundary, not assumed inside a branch',
      'Routing and addressing planned so branches can be added without renumbering',
    ],
    problem:
      'A flat bank network means a compromise at one branch reaches the others. Forcing every inter-branch path through a firewall makes that traffic something you can write policy about, at the cost of a chokepoint the addressing plan has to be designed around.',
    stack: ['Computer Networks', 'Cisco Packet Tracer', 'ASA Firewall', 'Segmentation'],
    links: [{ kind: 'source', unavailable: 'Packet Tracer topology - not public' }],
    context: null,
  },

  {
    id: '8',
    slug: 'cross-protocol-bridging',
    title: 'Cross Protocol Bridging',
    domain: 'Systems',
    diagram: 'bridge',
    summary:
      'A socket-level bridge written in C that translates between CoAP and MQTT, so constrained edge devices and cloud subscribers can talk without either side changing.',
    brief: [
      'CoAP is request/response over UDP and suits devices with very little to spend on a connection. MQTT is publish/subscribe over TCP and suits a cloud that wants a durable stream. The bridge terminates both and maps one onto the other.',
      'Written directly against sockets in C rather than on top of a library, which means the translation between the two interaction models - and the buffering it needs - is explicit rather than hidden.',
    ],
    work: [
      'CoAP over UDP on the device side, MQTT over TCP on the broker side',
      'Translation between request/response and publish/subscribe semantics',
      'Topic and resource-path mapping held in one place',
      'Written straight against sockets, so the buffering is visible',
    ],
    problem:
      'The two protocols disagree on more than syntax: one is connectionless and polls, the other is connection-oriented and pushes. A bridge cannot just re-encode packets - it has to decide what a CoAP request means to a subscriber, and how long to hold state for a device that may never respond again.',
    stack: ['C', 'Socket Programming', 'TCP/UDP', 'CoAP', 'MQTT'],
    links: [
      { kind: 'source', unavailable: 'Source not public' },
      { kind: 'live', unavailable: 'Runs locally - no hosted demo' },
    ],
    context: null,
  },

  {
    id: '9',
    slug: 'compit-pal',
    title: 'Compit Pal',
    domain: 'Web',
    diagram: 'streak',
    summary:
      'Accountability by competition: join a room with a code, log progress once a day, and hold a streak against everyone else in it.',
    brief: [
      'Rooms are created public or private and joined by code, across seven challenge categories with either binary “did it” scoring or points. A leaderboard ranks the room, and a streak counts consecutive days rather than total submissions.',
      'Built on Next.js route handlers with Redis as the store, which suits the shape of the data: rooms and streak counters are small, hot, and read far more often than they are written. Sessions are JWTs in HTTP-only cookies rather than tokens in local storage.',
    ],
    work: [
      'Room creation and code-based joining, public or private',
      'Daily submission window with streaks counted on consecutive days',
      'Leaderboards per room across seven challenge categories',
      'Session JWTs kept in HTTP-only cookies, out of reach of page scripts',
    ],
    problem:
      'A streak is only motivating if it can genuinely break, which makes “what counts as a day” the whole design. Timezones, late submissions and retroactive edits all decide whether the number means anything, and every one of them is a place where a tracker quietly turns into a counter that only ever goes up.',
    stack: ['Next.js', 'TypeScript', 'React', 'Redis', 'Tailwind', 'JWT'],
    links: [
      { kind: 'source', href: 'https://github.com/hs-sathwikhs/compit-pal' },
      { kind: 'live', unavailable: 'Deployment offline - being redeployed' },
    ],
    context: null,
  },

  {
    id: '10',
    slug: 'vaidyadhara',
    title: 'VaidyaDhara',
    domain: 'AI',
    diagram: 'assistant',
    summary:
      'A multilingual public-health assistant for questions about communicable disease, with a separate analytics view for the health authority behind it.',
    brief: [
      'A FastAPI service puts a language model behind a health-information flow: questions in several languages, a symptom walkthrough that ends in a referral rather than a diagnosis, and quizzes that exist to make prevention advice stick.',
      'The second half is the part that makes it a system rather than a chatbot - an analytics dashboard over the same data, so the authority running it can see which questions are being asked where, which is the signal an outbreak produces before a case count does.',
    ],
    work: [
      'FastAPI and LangChain service over a hosted language model',
      'Multilingual question handling for low-literacy and rural users',
      'Symptom flow that routes to care and refuses to diagnose',
      'Analytics dashboard over query patterns, grouped by region',
    ],
    problem:
      'A health chatbot has one failure mode that matters: sounding confident about something clinical. The design constraint is therefore refusal - it has to route to a human at exactly the point where the model would be most fluent, which means deliberately capping how useful it is allowed to appear.',
    stack: ['React', 'FastAPI', 'LangChain', 'Python', 'Streamlit', 'Docker'],
    links: [
      { kind: 'source', href: 'https://github.com/hs-sathwikhs/VaidyaDhara' },
      { kind: 'live', unavailable: 'Not currently hosted' },
    ],
    context: 'Built with a team for Smart India Hackathon problem statement SIH25049.',
  },

  {
    id: '11',
    slug: 'portfolio',
    title: 'Portfolio',
    domain: 'Web',
    diagram: 'route',
    summary:
      'This site. A record of work rather than a brochure - two full palettes, hand-drawn system diagrams, and no stock photography.',
    brief: [
      'Built on Vite and React with styled-components for the theme layer. The entire palette flips between a light paper world and a dark trace world from one control in the nav; both are full token sets, not a filter over the other.',
      'Each project carries a diagram drawn by hand in SVG and animated by stroke offset as it enters the viewport, so the illustration is the explanation rather than decoration. Fonts are self-hosted variable files, so first paint costs no third-party request.',
    ],
    work: [
      'Two complete themes, contrast-checked pair by pair against WCAG',
      'Hand-authored SVG diagrams, one per project, that draw themselves on scroll',
      'Self-hosted variable fonts - no CDN request on first paint',
      'One shared data layer, so no route can serve a project that does not exist',
    ],
    problem:
      'The previous version of this site had the failure modes of a template: a purple gradient identity, percentage skill bars that contradicted their own captions, stock photography standing in for the work, and a detail page serving three placeholder projects that were never real. The rebuild keeps every true fact and drops everything that was filler.',
    stack: ['React', 'Vite', 'styled-components', 'Framer Motion', 'JavaScript'],
    links: [
      { kind: 'source', href: 'https://github.com/hs-sathwikhs/Portfolio' },
      { kind: 'live', href: 'https://sathwikhs.vercel.app' },
    ],
    context: null,
  },
];

/**
 * Filter set for /projects. Ordered by weight on this page rather than
 * alphabetically, so the list reads as a claim about focus.
 */
export const domains = ['All', 'Security', 'Systems', 'AI', 'Web', 'Blockchain'];

/**
 * The home ledger shows the head of the ranking, not all of it. Eleven rows,
 * each carrying its own drawing, stops being a ledger you can compare line by
 * line and becomes a scroll - and it would put eleven SVG animations on the
 * first page. The cut is the ranking's top six, which is the whole reason the
 * order above is a ranking rather than a list; the full set with domain filters
 * is at /projects, and the tail of the home section states both numbers so the
 * reader knows something was held back.
 */
export const featured = projects.slice(0, 6);

/** Accepts an id or a slug, so older /project/2 links keep resolving. */
export function findProject(key) {
  if (!key) return null;
  const needle = String(key).toLowerCase();
  return projects.find((p) => p.id === needle || p.slug === needle) ?? null;
}

export default projects;
