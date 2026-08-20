import { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * The signature element.
 *
 * Every project carries a drawing of the system it actually is, authored by
 * hand rather than photographed. Each one draws itself once as it enters the
 * viewport - the stroke arriving in the order you would draw it on paper - and
 * then holds still. Colour comes from the theme's diagram tokens, so both the
 * paper and trace worlds get a legible version of the same drawing.
 *
 * Everything animated here is `pathLength` and `opacity`. Nothing reflows.
 */

const Frame = styled(motion.svg)`
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;

  text {
    font-family: ${(p) => p.theme.font.mono};
    font-size: 10px;
    letter-spacing: 0.02em;
    fill: var(--dg-stroke);
  }

  .dim {
    fill: var(--dg-dim);
    font-size: 9.5px;
    letter-spacing: 0.07em;
  }

  .live {
    fill: var(--dg-live);
  }
`;

const DrawCtx = createContext(null);

// Order of arrival, not a stagger for its own sake: structure first, then the
// things it connects, then the labels that name them.
const STEP = 0.055;

const drawing = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (i = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 0.85, delay: i * STEP, ease: [0.23, 1, 0.32, 1] },
      opacity: { duration: 0.18, delay: i * STEP },
    },
  }),
};

const fading = {
  hidden: { opacity: 0 },
  show: (i = 0) => ({
    opacity: 1,
    transition: { duration: 0.4, delay: 0.05 + i * STEP, ease: [0.23, 1, 0.32, 1] },
  }),
};

// Reduced motion keeps the drawing, drops the drawing-of-it.
const still = {
  hidden: { opacity: 0, pathLength: 1 },
  show: { opacity: 1, transition: { duration: 0.2 } },
};

function useDraw() {
  return useContext(DrawCtx);
}

/* Primitives ------------------------------------------------------------- */

function L({ i = 0, ...rest }) {
  const { draw } = useDraw();
  return <motion.line variants={draw} custom={i} {...rest} />;
}

function P({ i = 0, ...rest }) {
  const { draw } = useDraw();
  return <motion.path variants={draw} custom={i} {...rest} />;
}

// Closed shapes fade rather than draw. Partly because `pathLength` on basic
// shapes is unevenly supported, and partly because it reads better: the
// structure arrives, then the connections between it are drawn in.
function R({ i = 0, ...rest }) {
  const { fade } = useDraw();
  return <motion.rect variants={fade} custom={i} {...rest} />;
}

function C({ i = 0, ...rest }) {
  const { fade } = useDraw();
  return <motion.circle variants={fade} custom={i} {...rest} />;
}

function T({ i = 0, children, ...rest }) {
  const { fade } = useDraw();
  return (
    <motion.text variants={fade} custom={i} dominantBaseline="middle" {...rest}>
      {children}
    </motion.text>
  );
}

const shape = { i: PropTypes.number };
L.propTypes = shape;
R.propTypes = shape;
P.propTypes = shape;
C.propTypes = shape;
T.propTypes = { ...shape, children: PropTypes.node };

/** A labelled block: the unit every diagram is built from. */
function Box({ x, y, w, h, label, i = 0, live = false, dim = false, sub }) {
  const stroke = live ? 'var(--dg-live)' : dim ? 'var(--dg-dim)' : 'var(--dg-stroke)';
  return (
    <>
      <R
        i={i}
        x={x}
        y={y}
        width={w}
        height={h}
        rx="2"
        fill="var(--dg-node)"
        stroke={stroke}
        strokeWidth={live ? 1.8 : 1.2}
        strokeDasharray={dim ? '3 3' : undefined}
      />
      {label && (
        <T
          i={i}
          x={x + w / 2}
          y={y + h / 2 + (sub ? -6 : 0)}
          textAnchor="middle"
          className={live ? 'live' : dim ? 'dim' : undefined}
        >
          {label}
        </T>
      )}
      {sub && (
        <T i={i} x={x + w / 2} y={y + h / 2 + 9} textAnchor="middle" className="dim">
          {sub}
        </T>
      )}
    </>
  );
}

Box.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  w: PropTypes.number.isRequired,
  h: PropTypes.number.isRequired,
  label: PropTypes.string,
  sub: PropTypes.string,
  i: PropTypes.number,
  live: PropTypes.bool,
  dim: PropTypes.bool,
};

/** Chevron head, drawn only where direction is part of the meaning. */
function Head({ x, y, dir = 'right', i = 0, live = false }) {
  const s = 4.5;
  const d =
    dir === 'right'
      ? `M${x - s} ${y - s} L${x} ${y} L${x - s} ${y + s}`
      : dir === 'down'
        ? `M${x - s} ${y - s} L${x} ${y} L${x + s} ${y - s}`
        : dir === 'up'
          ? `M${x - s} ${y + s} L${x} ${y} L${x + s} ${y + s}`
          : `M${x + s} ${y - s} L${x} ${y} L${x + s} ${y + s}`;
  return (
    <P
      i={i}
      d={d}
      fill="none"
      stroke={live ? 'var(--dg-live)' : 'var(--dg-stroke)'}
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

Head.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  dir: PropTypes.oneOf(['right', 'left', 'up', 'down']),
  i: PropTypes.number,
  live: PropTypes.bool,
};

const wire = {
  fill: 'none',
  stroke: 'var(--dg-stroke)',
  strokeWidth: 1.2,
};

const faint = {
  fill: 'none',
  stroke: 'var(--dg-dim)',
  strokeWidth: 1,
};

const hot = {
  fill: 'none',
  stroke: 'var(--dg-live)',
  strokeWidth: 1.8,
};

/* Drawings --------------------------------------------------------------- */

/** Decentra Cert - a Merkle tree, with one certificate's proof path lit. */
function Merkle() {
  return (
    <>
      {/* proof path, drawn first so the structure overlays it cleanly */}
      <L i={0} x1={78} y1={210} x2={142} y2={142} {...hot} />
      <L i={1} x1={142} y1={118} x2={240} y2={54} {...hot} />

      <L i={2} x1={240} y1={54} x2={338} y2={118} {...wire} />
      <L i={3} x1={142} y1={142} x2={170} y2={210} {...wire} />
      <L i={4} x1={338} y1={142} x2={310} y2={210} {...wire} />
      <L i={5} x1={338} y1={142} x2={402} y2={210} {...wire} />

      <Box i={6} x={208} y={30} w={64} h={24} label="root" />
      <Box i={7} x={104} y={118} w={76} h={24} label="h(01·02)" />
      <Box i={8} x={300} y={118} w={76} h={24} label="h(03·04)" />

      <Box i={9} x={44} y={210} w={68} h={24} label="cert 01" live />
      <Box i={10} x={136} y={210} w={68} h={24} label="cert 02" />
      <Box i={11} x={276} y={210} w={68} h={24} label="cert 03" />
      <Box i={12} x={368} y={210} w={68} h={24} label="cert 04" />

      <T i={13} x={240} y={272} textAnchor="middle" className="dim">
        one root on chain · a whole cohort under it
      </T>
    </>
  );
}

/** Cross Protocol Bridging - CoAP over UDP terminated into MQTT over TCP. */
function Bridge() {
  return (
    <>
      <L i={0} x1={124} y1={75} x2={196} y2={92} {...wire} />
      <L i={1} x1={124} y1={145} x2={196} y2={148} {...wire} />
      <L i={2} x1={124} y1={215} x2={196} y2={204} {...wire} />
      <L i={3} x1={300} y1={148} x2={356} y2={145} {...wire} />

      <Box i={4} x={28} y={58} w={96} h={34} label="node 01" />
      <Box i={5} x={28} y={128} w={96} h={34} label="node 02" />
      <Box i={6} x={28} y={198} w={96} h={34} label="node 03" />

      <R
        i={7}
        x={196}
        y={52}
        width={104}
        height={196}
        rx="2"
        fill="var(--dg-fill)"
        stroke="var(--dg-stroke)"
        strokeWidth="1.6"
      />
      <L i={8} x1={196} y1={150} x2={300} y2={150} {...faint} />

      {/* the translation itself */}
      <L i={9} x1={248} y1={122} x2={248} y2={178} {...hot} />
      <Head i={10} x={248} y={178} dir="down" live />
      <Head i={10} x={248} y={122} dir="up" live />

      <Box i={11} x={356} y={128} w={96} h={34} label="broker" />
      <Box i={12} x={372} y={54} w={80} h={26} label="sub" dim />
      <Box i={13} x={372} y={212} w={80} h={26} label="sub" dim />

      <L i={14} x1={404} y1={128} x2={404} y2={80} {...faint} />
      <L i={15} x1={404} y1={162} x2={404} y2={212} {...faint} />

      <T i={16} x={248} y={38} textAnchor="middle">
        bridge
      </T>
      <T i={17} x={248} y={96} textAnchor="middle">
        CoAP
      </T>
      <T i={18} x={248} y={204} textAnchor="middle">
        MQTT
      </T>
      <T i={19} x={160} y={62} textAnchor="middle" className="dim">
        udp
      </T>
      <T i={20} x={328} y={130} textAnchor="middle" className="dim">
        tcp
      </T>
      <T i={21} x={240} y={280} textAnchor="middle" className="dim">
        request/response terminated, republished as a stream
      </T>
    </>
  );
}

/** Bank Networks - every inter-branch path forced through the ASA. */
function Branch() {
  return (
    <>
      <L i={0} x1={128} y1={63} x2={196} y2={126} {...wire} />
      <L i={1} x1={128} y1={237} x2={196} y2={174} {...wire} />
      <L i={2} x1={352} y1={150} x2={284} y2={150} {...wire} />

      {/* the path that is not allowed to exist */}
      <L i={3} x1={76} y1={82} x2={76} y2={218} {...faint} strokeDasharray="4 4" />
      <P i={4} d="M69 143 L83 157 M83 143 L69 157" {...faint} strokeLinecap="round" />

      <R
        i={5}
        x={196}
        y={112}
        width={88}
        height={76}
        rx="2"
        fill="var(--dg-fill)"
        stroke="var(--dg-stroke)"
        strokeWidth="1.6"
      />
      <L i={6} x1={210} y1={124} x2={210} y2={176} {...faint} />
      <L i={7} x1={270} y1={124} x2={270} y2={176} {...faint} />

      <Box i={8} x={24} y={44} w={104} h={38} label="branch a" />
      <Box i={9} x={24} y={218} w={104} h={38} label="branch b" />
      <Box i={10} x={352} y={131} w={104} h={38} label="branch c" />

      <T i={11} x={240} y={150} textAnchor="middle">
        ASA
      </T>
      <T i={12} x={92} y={150} className="dim">
        denied
      </T>
      <T i={13} x={240} y={284} textAnchor="middle" className="dim">
        inter-branch traffic is inspected, never switched
      </T>
    </>
  );
}

/** Portfolio - one data source, three routes that cannot disagree. */
function Route() {
  return (
    <>
      <L i={0} x1={240} y1={210} x2={72} y2={100} {...wire} />
      <L i={1} x1={240} y1={210} x2={208} y2={100} {...wire} />
      <L i={2} x1={240} y1={210} x2={372} y2={100} {...wire} />

      <Head i={3} x={72} y={96} dir="up" />
      <Head i={3} x={208} y={96} dir="up" />
      <Head i={3} x={372} y={96} dir="up" />

      <Box i={4} x={44} y={64} w={56} h={30} label="/" />
      <Box i={5} x={152} y={64} w={112} h={30} label="/projects" />
      <Box i={6} x={304} y={64} w={136} h={30} label="/project/:id" />

      <Box i={7} x={172} y={210} w={136} h={34} label="projects.js" live />

      <T i={8} x={240} y={282} textAnchor="middle" className="dim">
        one source · no route can serve a project that does not exist
      </T>
    </>
  );
}

/**
 * Practice - the shape of a box, from outside to root, and out again as a
 * writeup. The dashed enclosure is the target: recon is the only stage that
 * happens outside it, which is the whole reason recon is a stage at all.
 */
function Chain() {
  return (
    <>
      {/* the target boundary, drawn first so the chain crosses over it */}
      <R
        i={0}
        x={124}
        y={48}
        width={346}
        height={112}
        rx="2"
        fill="none"
        stroke="var(--dg-dim)"
        strokeWidth="1"
        strokeDasharray="4 4"
      />
      <T i={1} x={134} y={62} className="dim">
        target
      </T>

      <L i={2} x1={94} y1={112} x2={134} y2={112} {...wire} />
      <Head i={3} x={138} y={112} dir="right" />
      <L i={4} x1={222} y1={112} x2={251} y2={112} {...wire} />
      <Head i={5} x={255} y={112} dir="right" />
      <L i={6} x1={339} y1={112} x2={368} y2={112} {...hot} />
      <Head i={7} x={372} y={112} dir="right" live />

      <Box i={8} x={10} y={94} w={84} h={36} label="recon" sub="nmap · ffuf" />
      <Box i={9} x={138} y={94} w={84} h={36} label="foothold" sub="exploit" />
      <Box i={10} x={255} y={94} w={84} h={36} label="privesc" sub="suid · sudo" />
      <Box i={11} x={372} y={94} w={84} h={36} label="root" sub="flag" live />

      {/* the finding leaves the box: the part that makes it practice */}
      <P i={12} d="M414 130 L414 216 L286 216" {...faint} />
      <Head i={13} x={282} y={216} dir="left" />
      <Box i={14} x={198} y={202} w={84} h={28} label="writeup" dim />

      <T i={15} x={240} y={272} textAnchor="middle" className="dim">
        the writeup is the deliverable - the flag is only the receipt
      </T>
    </>
  );
}

/**
 * Mini-RAFT Board - a write is only committed once a majority has it. Two
 * followers acknowledge, the third is behind and catching up, which is the
 * whole point: the cluster does not wait for it.
 */
function Consensus() {
  return (
    <>
      {/* client stroke into the leader */}
      <L i={0} x1={86} y1={54} x2={182} y2={54} {...wire} />
      <Head i={1} x={186} y={54} dir="right" />
      <Box i={2} x={10} y={38} w={76} h={32} label="client" sub="stroke" />

      <Box i={3} x={190} y={34} w={100} h={40} label="leader" live />

      {/* replication fan-out: two acknowledge, one lags */}
      <P i={4} d="M214 74 L84 124" {...hot} />
      <L i={5} x1={240} y1={74} x2={240} y2={124} {...hot} />
      <P i={6} d="M266 74 L396 124" {...faint} strokeDasharray="4 4" />

      <Box i={7} x={18} y={124} w={100} h={38} label="replica 1" sub="ack" />
      <Box i={8} x={190} y={124} w={100} h={38} label="replica 2" sub="ack" />
      <Box i={9} x={362} y={124} w={100} h={38} label="replica 3" sub="behind" dim />

      {/* the majority line: 2 of 3 is enough, drawn as the quorum bracket */}
      <P i={10} d="M18 176 L18 188 L290 188 L290 176" {...hot} />
      <T i={11} x={154} y={206} textAnchor="middle" className="live">
        2 of 3 · quorum
      </T>

      {/* the lagging replica resyncs from where the logs diverged */}
      <L i={12} x1={412} y1={162} x2={412} y2={192} {...faint} />
      <Head i={13} x={412} y={196} dir="down" />
      <Box i={14} x={353} y={196} w={118} h={28} label="sync-log" dim />

      <T i={15} x={240} y={268} textAnchor="middle" className="dim">
        the commit does not wait for the slowest node
      </T>
    </>
  );
}

/**
 * Terrain Classification - a window of gait telemetry, convolved along time,
 * collapsing to one label. Drawn as signal in, class out.
 *
 * The three traces are sampled from a sum of two sines rather than hand-written
 * as curve shorthand: a plausible periodic signal with a harmonic on it looks
 * like gait, and sampling keeps the amplitude bounded, which reflected-control
 * shorthand does not.
 */
function Sequence() {
  const trace = (y, amp, freq, phase) => {
    const pts = [];
    for (let x = 46; x <= 214; x += 4) {
      const t = x - 46;
      const v = Math.sin(t * freq + phase) * amp + Math.sin(t * freq * 2.4 + phase) * amp * 0.32;
      pts.push(`${x} ${(y + v).toFixed(1)}`);
    }
    return `M${pts.join(' L')}`;
  };

  const rows = [
    { label: 'imu', y: 60, d: trace(60, 8, 0.11, 0) },
    { label: 'joint', y: 92, d: trace(92, 9, 0.075, 1.1) },
    { label: 'force', y: 124, d: trace(124, 7, 0.16, 2.2) },
  ];

  return (
    <>
      {rows.map((row, n) => (
        <P
          key={row.label}
          i={n}
          d={row.d}
          {...(n === 1 ? wire : faint)}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}

      {rows.map((row, n) => (
        <T key={row.label} i={n} x={10} y={row.y} className="dim">
          {row.label}
        </T>
      ))}

      {/* the receptive field: one window is what the model actually sees */}
      <R
        i={3}
        x={136}
        y={44}
        width={64}
        height={96}
        rx="2"
        fill="none"
        stroke="var(--dg-live)"
        strokeWidth="1.6"
      />
      <T i={4} x={168} y={154} textAnchor="middle" className="live">
        window
      </T>

      <L i={5} x1={214} y1={92} x2={232} y2={92} {...hot} />
      <Head i={6} x={236} y={92} dir="right" live />

      {/* convolution stack, narrowing as it pools */}
      <Box i={7} x={236} y={78} w={68} h={28} label="conv 1d" />
      <L i={8} x1={304} y1={92} x2={308} y2={92} {...wire} />
      <Box i={9} x={308} y={78} w={44} h={28} label="pool" />
      <L i={10} x1={352} y1={92} x2={356} y2={92} {...wire} />
      <Box i={11} x={356} y={78} w={34} h={28} label="fc" />

      <L i={12} x1={390} y1={92} x2={404} y2={92} {...hot} />
      <Head i={13} x={408} y={92} dir="right" live />

      {/* the output: one class wins, the others are not connected to anything */}
      <Box i={14} x={410} y={48} w={68} h={24} label="gravel" dim />
      <Box i={15} x={410} y={80} w={68} h={26} label="grass" live />
      <Box i={16} x={410} y={114} w={68} h={24} label="concrete" dim />

      <L i={17} x1={40} y1={196} x2={440} y2={196} {...faint} />
      <T i={18} x={240} y={220} textAnchor="middle">
        0.8950 test accuracy
      </T>
      <T i={19} x={240} y={252} textAnchor="middle" className="dim">
        no camera - the robot&apos;s own gait is the sensor
      </T>
    </>
  );
}

/**
 * AURA - three inputs, one forecast, and a certificate that only exists for a
 * lot that cleared. The chain node is separate because it is the only part a
 * buyer reads.
 */
function Pillars() {
  return (
    <>
      <Box i={0} x={10} y={44} w={92} h={30} label="weather" dim />
      <Box i={1} x={10} y={86} w={92} h={30} label="satellite" dim />
      <Box i={2} x={10} y={128} w={92} h={30} label="storage" dim />

      <P i={3} d="M102 59 L146 96" {...faint} />
      <P i={4} d="M102 101 L146 101" {...faint} />
      <P i={5} d="M102 143 L146 106" {...faint} />
      <Head i={6} x={150} y={101} dir="right" />

      <Box i={7} x={150} y={80} w={104} h={42} label="risk" sub="48-72 h" live />

      {/* the decision splits: cleared goes on chain, at-risk raises an alert */}
      <L i={8} x1={254} y1={92} x2={296} y2={92} {...wire} />
      <Head i={9} x={300} y={92} dir="right" />
      <Box i={10} x={300} y={76} w={110} h={32} label="cleared" />

      <P i={11} d="M180 122 L180 196" {...faint} />
      <Head i={12} x={180} y={200} dir="down" />
      <Box i={13} x={124} y={200} w={112} h={30} label="alert" dim />

      {/* the record a buyer can actually check, minted only for a cleared lot */}
      <L i={14} x1={355} y1={108} x2={355} y2={186} {...hot} />
      <Head i={15} x={355} y={190} dir="down" live />

      <R
        i={16}
        x={294}
        y={190}
        width={122}
        height={34}
        rx="2"
        fill="var(--dg-node)"
        stroke="var(--dg-live)"
        strokeWidth="1.8"
      />
      <T i={17} x={355} y={207} textAnchor="middle" className="live">
        on-chain cert
      </T>

      <L i={18} x1={416} y1={207} x2={432} y2={207} {...wire} />
      <T i={19} x={436} y={207} className="dim">
        buyer
      </T>

      <T i={20} x={240} y={266} textAnchor="middle" className="dim">
        predicted from conditions, because a test at sale finds the loss too late
      </T>
    </>
  );
}

/**
 * Blood Donation System - four roles onto one store, and the allocation policy
 * drawn as the swappable part it is.
 */
function Roles() {
  const roles = ['organiser', 'donor', 'hospital', 'inventory'];
  return (
    <>
      {roles.map((label, n) => (
        <Box key={label} i={n} x={10 + n * 118} y={38} w={104} h={30} label={label} />
      ))}

      {roles.map((label, n) => (
        <L
          key={`${label}-w`}
          i={4 + n}
          x1={62 + n * 118}
          y1={68}
          x2={62 + n * 118}
          y2={92}
          {...faint}
        />
      ))}

      {/* the security boundary every role passes through */}
      <R
        i={8}
        x={10}
        y={92}
        width={460}
        height={28}
        rx="2"
        fill="var(--dg-fill)"
        stroke="var(--dg-stroke)"
        strokeWidth="1.2"
      />
      <T i={9} x={240} y={106} textAnchor="middle">
        role-based access
      </T>

      <L i={10} x1={240} y1={120} x2={240} y2={146} {...wire} />
      <Head i={11} x={240} y={150} dir="down" />

      <Box i={12} x={168} y={150} w={144} h={34} label="requests" sub="ranked by severity" />

      {/* the strategy: two policies, one interface, one of them live */}
      <P i={13} d="M204 184 L150 216" {...faint} />
      <P i={14} d="M276 184 L330 216" {...hot} />

      <Box i={15} x={78} y={216} w={116} h={30} label="fifo" dim />
      <Box i={16} x={286} y={216} w={116} h={30} label="priority" live />

      {/* sits in the gap the two diagonals leave, above both policies, because it
          describes what they share rather than either one of them */}
      <T i={17} x={240} y={202} textAnchor="middle" className="dim">
        one interface
      </T>

      <T i={18} x={240} y={278} textAnchor="middle" className="dim">
        expiry says oldest first, triage says sickest first - so it is a policy
      </T>
    </>
  );
}

/**
 * Capture the Calendar - one write, and every other client already has it. The
 * subscription is the point; the absence of a poll loop is the result.
 */
function Realtime() {
  return (
    <>
      <Box i={0} x={10} y={54} w={100} h={36} label="client a" sub="edits" live />

      <L i={1} x1={110} y1={72} x2={176} y2={72} {...hot} />
      <Head i={2} x={180} y={72} dir="right" live />
      <T i={3} x={143} y={60} textAnchor="middle" className="dim">
        write
      </T>

      <R
        i={4}
        x={180}
        y={44}
        width={120}
        height={112}
        rx="2"
        fill="var(--dg-fill)"
        stroke="var(--dg-stroke)"
        strokeWidth="1.6"
      />
      <T i={5} x={240} y={62} textAnchor="middle">
        postgres
      </T>
      <L i={6} x1={180} y1={76} x2={300} y2={76} {...faint} />
      <T i={7} x={240} y={96} textAnchor="middle" className="dim">
        row change
      </T>
      <Box i={8} x={196} y={110} w={88} h={30} label="realtime" live />

      {/* push out to the others - no client asked */}
      <P i={9} d="M300 118 L346 84" {...hot} />
      <P i={10} d="M300 128 L346 128" {...hot} />
      <P i={11} d="M300 138 L346 172" {...hot} />
      <Head i={12} x={350} y={82} dir="right" live />
      <Head i={13} x={350} y={128} dir="right" live />
      <Head i={14} x={350} y={174} dir="right" live />

      <Box i={15} x={350} y={66} w={104} h={32} label="client b" />
      <Box i={16} x={350} y={112} w={104} h={32} label="client c" />
      <Box i={17} x={350} y={158} w={104} h={32} label="client d" />

      {/* the thing that is not there */}
      <P i={18} d="M402 198 L402 226 L240 226" {...faint} strokeDasharray="4 4" />
      <P i={19} d="M233 219 L247 233 M247 219 L233 233" {...faint} strokeLinecap="round" />
      <T i={20} x={218} y={226} textAnchor="end" className="dim">
        no poll
      </T>

      <T i={21} x={240} y={272} textAnchor="middle" className="dim">
        the cache reconciles the event - it does not refetch the month
      </T>
    </>
  );
}

/**
 * Compit Pal - a streak is only worth counting if it can break. The gap is the
 * subject of the drawing.
 */
function Streak() {
  // Six days kept, one missed, then the count restarts. That is the design.
  const days = [
    { on: true },
    { on: true },
    { on: true },
    { on: false },
    { on: true },
    { on: true },
  ];

  return (
    <>
      <Box i={0} x={10} y={44} w={110} h={34} label="room" sub="join by code" />
      <L i={1} x1={120} y1={61} x2={158} y2={61} {...wire} />
      <Head i={2} x={162} y={61} dir="right" />
      <Box i={3} x={162} y={44} w={110} h={34} label="submit" sub="once a day" />

      {/* the ledger of days */}
      <L i={4} x1={40} y1={148} x2={440} y2={148} {...faint} />

      {days.map((day, n) => {
        const x = 60 + n * 66;
        return day.on ? (
          <R
            key={n}
            i={5 + n}
            x={x - 14}
            y={120}
            width={28}
            height={28}
            rx="2"
            fill="var(--dg-node)"
            stroke="var(--dg-live)"
            strokeWidth="1.8"
          />
        ) : (
          <R
            key={n}
            i={5 + n}
            x={x - 14}
            y={120}
            width={28}
            height={28}
            rx="2"
            fill="none"
            stroke="var(--dg-dim)"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
        );
      })}

      {/* the run that survives, and the one that was ended */}
      <P i={12} d="M46 168 L46 178 L246 178 L246 168" {...faint} />
      <T i={13} x={146} y={194} textAnchor="middle" className="dim">
        3 days
      </T>

      <P i={14} d="M310 168 L310 178 L444 178 L444 168" {...hot} />
      <T i={15} x={377} y={194} textAnchor="middle" className="live">
        streak: 2
      </T>

      <T i={16} x={258} y={112} textAnchor="middle" className="dim">
        missed
      </T>

      <T i={17} x={240} y={240} textAnchor="middle">
        leaderboard ranks the room, not the world
      </T>
      <T i={18} x={240} y={272} textAnchor="middle" className="dim">
        a counter that only goes up is not accountability
      </T>
    </>
  );
}

/**
 * VaidyaDhara - the assistant, and the refusal path that is the actual design
 * constraint. The dashboard reads the same queries from the side.
 */
function Assistant() {
  return (
    <>
      <Box i={0} x={10} y={72} w={96} h={36} label="question" sub="multilingual" />
      <L i={1} x1={106} y1={90} x2={148} y2={90} {...wire} />
      <Head i={2} x={152} y={90} dir="right" />

      <R
        i={3}
        x={152}
        y={58}
        width={112}
        height={64}
        rx="2"
        fill="var(--dg-fill)"
        stroke="var(--dg-stroke)"
        strokeWidth="1.6"
      />
      {/* the box is taller than a Box so the two exits get vertical separation;
          the label pair is optically centred inside it rather than pushed apart */}
      <T i={4} x={208} y={82} textAnchor="middle">
        assistant
      </T>
      <T i={5} x={208} y={101} textAnchor="middle" className="dim">
        triage
      </T>

      {/* the two exits, and the one that matters is the refusal */}
      <P i={6} d="M264 74 L310 52" {...wire} />
      <Head i={7} x={314} y={50} dir="right" />
      <Box i={8} x={314} y={36} w={110} h={30} label="prevention" sub="answered" />

      <P i={9} d="M264 106 L310 140" {...hot} />
      <Head i={10} x={314} y={142} dir="right" live />
      <Box i={11} x={314} y={126} w={110} h={32} label="refer" sub="to a clinician" live />

      <T i={12} x={286} y={176} textAnchor="middle" className="live">
        refuses to diagnose
      </T>

      {/* the second half: the same queries, read as signal */}
      <L i={13} x1={208} y1={122} x2={208} y2={212} {...faint} />
      <Head i={14} x={208} y={216} dir="down" />
      <Box i={15} x={148} y={216} w={120} h={32} label="dashboard" sub="by region" />

      {/* the authority reads the dashboard, so the arrow points at it, not away */}
      <L i={16} x1={268} y1={232} x2={300} y2={232} {...faint} />
      <Head i={17} x={304} y={232} dir="right" />
      <T i={18} x={310} y={232} className="dim">
        authority
      </T>

      <T i={19} x={240} y={282} textAnchor="middle" className="dim">
        what is being asked, and where, moves before a case count does
      </T>
    </>
  );
}

const DRAWINGS = {
  consensus: { node: Consensus, alt: 'A RAFT cluster: a client stroke reaching the leader, which replicates to three followers. Two acknowledge and form a quorum of two of three; the third is behind and catches up through a log-sync endpoint.' },
  merkle: { node: Merkle, alt: 'A Merkle tree: four certificates hashed into two branches and one root, with the proof path from one certificate to the root highlighted.' },
  sequence: { node: Sequence, alt: 'Three channels of robot gait telemetry with one time window highlighted, feeding a 1D convolution, pooling and fully-connected stack that selects one terrain class. Test accuracy 0.8950.' },
  roles: { node: Roles, alt: 'Four roles - organiser, donor, hospital and inventory manager - passing through a role-based access layer to a severity-ranked request queue, which is served by one of two interchangeable allocation policies.' },
  pillars: { node: Pillars, alt: 'Weather, satellite and storage inputs feeding a 48-to-72-hour risk forecast, which splits into a cleared lot recorded as an on-chain certificate a buyer can check, or an alert.' },
  realtime: { node: Realtime, alt: 'One client writing to Postgres, whose row change is pushed by a realtime layer to three other connected clients, with a polling loop crossed out.' },
  streak: { node: Streak, alt: 'Six days of submissions with one missed, breaking a three-day run and restarting the streak at two.' },
  assistant: { node: Assistant, alt: 'A multilingual health question entering an assistant that either answers prevention guidance or refers to a clinician, with the same queries feeding a regional analytics dashboard.' },
  chain: { node: Chain, alt: 'A capture-the-flag chain: recon from outside the target boundary, then foothold, privilege escalation and root inside it, with the finding routed back out as a writeup.' },
  bridge: { node: Bridge, alt: 'Three edge devices speaking CoAP over UDP into a bridge, which republishes to an MQTT broker over TCP and out to subscribers.' },
  branch: { node: Branch, alt: 'Three bank branches connected only through a central ASA firewall, with the direct branch-to-branch path marked denied.' },
  route: { node: Route, alt: 'A single projects data file feeding three routes: the home page, the projects index, and the project detail page.' },
};

export default function Diagram({ kind, className }) {
  const reduce = useReducedMotion();
  const entry = DRAWINGS[kind];
  if (!entry) return null;

  const Drawing = entry.node;
  const ctx = reduce
    ? { draw: still, fade: still }
    : { draw: drawing, fade: fading };

  return (
    <DrawCtx.Provider value={ctx}>
      <Frame
        className={className}
        viewBox="0 0 480 300"
        role="img"
        aria-label={entry.alt}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
      >
        <Drawing />
      </Frame>
    </DrawCtx.Provider>
  );
}

Diagram.propTypes = {
  kind: PropTypes.oneOf(Object.keys(DRAWINGS)).isRequired,
  className: PropTypes.string,
};
