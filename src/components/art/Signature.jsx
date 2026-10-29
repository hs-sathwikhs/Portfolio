export default function Signature({ kind = 'moon', className, style }) {
  return <svg className={className} style={style} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
    {kind === 'moon' && <path d="M33 5A19 19 0 1 0 33 43A21 21 0 0 1 33 5Z" />}
    {kind === 'damaru' && <><path d="M13 9Q24 23 35 9V39Q24 25 13 39ZM13 9L35 39M35 9L13 39M24 24C38 8 47 22 38 27M24 24C12 39 3 25 10 20" /><ellipse cx="24" cy="9" rx="11" ry="4" /><ellipse cx="24" cy="39" rx="11" ry="4" /></>}
    {kind === 'claws' && <><path d="M10 41L16 7M20 41L27 4M31 41L38 7" strokeWidth="2" /></>}
    {kind === 'arc' && <><circle cx="24" cy="24" r="20" /><circle cx="24" cy="24" r="16" /><path d="M12 16H36L24 36Z" /></>}
    {kind === 'echo' && <><path d="M14 39V9M21 34V14" /><path d="M28 17A10 10 0 0 1 28 31M32 10A18 18 0 0 1 32 38" /></>}
    {kind === 'branch' && <><path d="M24 44V16M24 25C8 22 8 10 12 4M24 31C40 29 41 10 36 4" /><path d="M24 18L18 10M24 22L31 13" /></>}
    {kind === 'spark' && <path d="M28 3L11 27H23L19 45L38 19H26Z" />}
    {kind === 'web' && <><path d="M24 0V48M0 24H48M6 6L42 42M6 42L42 6" opacity=".6" /><path d="M24 7L36 12L41 24L36 36L24 41L12 36L7 24L12 12ZM24 16L30 18L32 24L30 30L24 32L18 30L16 24L18 18Z" /></>}
    {kind === 'flame' && <path d="M25 3C25 19 39 20 38 32C36 48 10 47 10 31C10 23 17 19 16 12C23 21 17 24 21 29C30 24 19 17 25 3Z" />}
    {kind === 'wink' && <><circle cx="24" cy="24" r="19" /><path d="M24 5V43M12 20L20 24L13 27M28 21L36 18M29 28L35 25" /></>}
  </svg>;
}
