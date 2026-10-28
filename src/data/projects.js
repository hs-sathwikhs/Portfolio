// Shared project records. IDs and slugs remain stable for existing links.

export const projects = [
  {
    "id": "12",
    "slug": "aethel",
    "title": "Aethel",
    "domain": "Security",
    "diagram": "provenance",
    "shortContext": "My focus: Hub & provenance · four-person team",
    "summary": "Verified adapter sharing with a hardened Hub, append-only provenance, and independently checkable Merkle checkpoints.",
    "brief": [
      "Aethel keeps model adapters tied to their content hashes and pinned base-model references. Hub publication validates incoming artifacts before making them available for sharing.",
      "The provenance layer records an append-only Merkle history. Exported proofs can be checked against independently configured EVM checkpoints, with IPFS mirrors for artifact distribution."
    ],
    "work": [
      "Configurable bearer-protected writes, bounded uploads and content-hash checks",
      "Validated Hub publication and a nonce-based Content Security Policy",
      "Append-only Merkle log with leaf-position and tree-size-bound proofs",
      "Checkpoint verification against a configured chain, contract and log identity"
    ],
    "problem": "Sharing an adapter creates two separate questions: did these bytes change, and were they included in the recorded history? Hash checks answer integrity; independently checked checkpoints answer inclusion. Neither establishes model quality or honest training.",
    "stack": [
      "Python",
      "FastAPI",
      "SHA-256",
      "Merkle proofs",
      "IPFS",
      "EVM"
    ],
    "links": [
      {
        "kind": "source",
        "href": "https://github.com/Kartik-MRK/Aethel"
      },
      {
        "kind": "evidence",
        "href": "https://github.com/Kartik-MRK/Aethel/tree/main/docs/evidence"
      }
    ],
    "context": "Four-person capstone team. My contribution covers most Hub functionality and nearly all provenance functionality; integrations were shared. Teammates handled CLI, version control and ML work.",
    "caveat": "Designed for a single-team adapter workflow. Content integrity and recorded inclusion are not guarantees about model behaviour. Checkpoint trust depends on the verifier’s chain and contract configuration."
  },

  {
    "id": "1",
    "slug": "mini-raft-board",
    "title": "MiniRAFT",
    "domain": "Systems",
    "diagram": "consensus",
    "shortContext": "Distributed-systems project · in-memory cluster",
    "summary": "A collaborative board backed by a three-node Raft cluster: majority commits, leader replacement, and follower recovery.",
    "brief": [
      "Drawing operations pass through a WebSocket gateway to a leader and two followers. A current-term majority must accept an operation before it appears as committed.",
      "Per-follower progress, paginated catch-up and operation-ID deduplication help reconnecting nodes and clients recover without replaying a write twice."
    ],
    "work": [
      "Leader election and current-term majority commits",
      "Committed-prefix protection and follower catch-up",
      "Operation-ID deduplication across retries",
      "Docker Compose deployment with a gateway and three replicas"
    ],
    "problem": "A responsive board needs an agreed order of operations even when one replica disappears. Requiring a majority preserves a consistent committed history; losing quorum stops new commits.",
    "stack": [
      "Node.js",
      "WebSocket",
      "Raft",
      "Docker"
    ],
    "links": [
      {
        "kind": "source",
        "href": "https://github.com/hs-sathwikhs/CC_MiniRAFT"
      },
      {
        "kind": "live",
        "unavailable": "Local cluster · no hosted demo"
      }
    ],
    "context": "Distributed-systems learning project.",
    "caveat": "Terms, votes and logs live in memory. A restarted node can recover from surviving peers; a full cluster shutdown loses its history. There is no durable log, membership reconfiguration or authenticated service identity."
  },

  {
    "id": "2",
    "slug": "decentra-cert",
    "title": "DecentraCert",
    "domain": "Blockchain",
    "diagram": "merkle",
    "shortContext": "Research internship · PESU C-ISFCR",
    "summary": "Wallet-bound event certificates with Merkle eligibility, one claim per eligible wallet, and public on-chain verification.",
    "brief": [
      "The contract fixes an eligibility root and metadata URI at deployment. An eligible wallet supplies its Merkle proof to claim its certificate once; transfers and approvals are blocked.",
      "The public verifier checks the token owner and metadata consistency. Organizer uploads keep pinning credentials on the server and require an upload key."
    ],
    "work": [
      "Fixed Merkle eligibility and metadata at deployment",
      "One claim per eligible wallet",
      "Transfer and approval rejection for issued certificates",
      "Public ownership and metadata verification"
    ],
    "problem": "A participation certificate should remain attached to its eligible wallet and be independently checkable. Merkle proofs compact the eligibility list, while each successful claim still requires its own mint transaction.",
    "stack": [
      "Solidity",
      "Node.js",
      "React",
      "Ethers.js",
      "IPFS"
    ],
    "links": [
      {
        "kind": "source",
        "href": "https://github.com/decentracert/decentracert"
      },
      {
        "kind": "live",
        "href": "https://decentracert.onrender.com/"
      }
    ],
    "context": "Research internship at PESU C-ISFCR, June–July 2025.",
    "caveat": "This test-network project verifies records and wallet ownership, not an issuer’s real-world identity. It has no independent contract audit, revocation or wallet recovery."
  },

  {
    id: '13', slug: 'sanket', title: 'Sanket', domain: 'Web', diagram: 'offline',
    shortContext: 'NABARD hackathon project',
    summary: 'An offline-capable cash-flow app for rural enterprises, with acknowledged sync and an officer review workspace.',
    brief: [
      'Built for a NABARD hackathon, Sanket connects an enterprise transaction view with an officer workspace for forecasts, bilingual reasons, visits and cash-flow reports.',
      'Entries are queued locally with stable UUIDs. A batch is marked synced only after the API acknowledges every entry; duplicate retries do not create duplicate transactions, and conflicting reuse of an ID is rejected.',
    ],
    work: [
      'Dexie outbox with stable transaction IDs, pending states and retry handling',
      'Atomic batch sync with UUID deduplication and conflict detection',
      'District, sector and risk filters in the officer workspace',
      'Bilingual explanations and printable SAAKH cash-flow reports',
    ],
    problem: 'Intermittent connectivity should not lose a financial entry or count a retry twice. Sanket separates local capture from acknowledged server persistence, then keeps officer visits and actions across forecast recalculation.',
    stack: ['React', 'TypeScript', 'FastAPI', 'SQLite', 'Dexie', 'PWA'],
    links: [
      { kind: 'source', href: 'https://github.com/Rakesh-R-K/Sanket' },
      { kind: 'live', unavailable: 'Local hackathon demo' },
    ],
    context: 'NABARD hackathon project.',
    caveat: 'An unauthenticated local demo with generated financial and rainfall records. Forecast ranges have no measured coverage; SAAKH is a cash-flow record, not a credit score or a validated lending decision.',
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
    "id": "7",
    "slug": "bank-networks",
    "title": "Bank Networks",
    "domain": "Security",
    "diagram": "branch",
    "summary": "Packet Tracer coursework exploring bank branches, VLAN segmentation, static routing and ASA firewalls around ATM networks.",
    "brief": [
      "The documented topology connects three branches through a central router, with branch and ATM networks separated through VLANs and local firewall arrangements.",
      "The design brief records routing, ACL and connectivity issues, including the limits of the initial centralized firewall approach."
    ],
    "work": [
      "Three-branch addressing and routing design",
      "VLAN segmentation in Cisco Packet Tracer",
      "ASA 5505 arrangements at ATM networks",
      "Documented ACL, routing and firewall connectivity trade-offs"
    ],
    "problem": "Branch connectivity and segmentation must work together. An initial central firewall design introduced connectivity problems, leading the design toward branch-level arrangements.",
    "stack": [
      "Cisco Packet Tracer",
      "VLANs",
      "Static routing",
      "Cisco ASA"
    ],
    "links": [
      {
        "kind": "source",
        "unavailable": "Coursework topology · source private"
      }
    ],
    "context": "Computer Networks coursework, 2025.",
    "caveat": "A simulated coursework design, not a deployed banking network. The topology and SSL VPN behaviour have not been independently revalidated."
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
      'A cybersecurity portfolio with professional and personal presentations, PAPER/TRACE themes, and interactive visual studies.',
    brief: [
      'Built on Vite and React with styled-components for the theme layer. The entire palette flips between a light paper world and a dark trace world from one control in the nav; both are full token sets, not a filter over the other.',
      'Each project carries an SVG system diagram with a brief drawing transition as it enters the viewport, so the illustration is the explanation rather than decoration. Fonts are self-hosted variable files, so first paint costs no third-party request.',
    ],
    work: [
      'Two complete themes, contrast-checked pair by pair against WCAG',
      'Project system diagrams with reduced-motion alternatives',
      'Self-hosted variable fonts - no CDN request on first paint',
      'One shared data layer, so no route can serve a project that does not exist',
    ],
    problem:
      'The portfolio needs to make security work easy to assess while leaving room for the person behind it. Two presentations share the same project records, while their composition and visual emphasis change.',
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

export const featured = projects.filter((project) => ['12', '1', '2', '13'].includes(project.id));

/** Accepts an id or a slug, so older /project/2 links keep resolving. */
export function findProject(key) {
  if (!key) return null;
  const needle = String(key).toLowerCase();
  return projects.find((p) => p.id === needle || p.slug === needle) ?? null;
}

export default projects;
