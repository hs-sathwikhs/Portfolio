import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ToastContext = createContext(null);
const Notice = styled.aside`
  position: fixed;
  inset: auto 1rem 1rem auto;
  z-index: 300;
  width: min(26rem, calc(100% - 2rem));
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 1rem 1.25rem;
  background: ${(p) => p.theme.paper};
  color: ${(p) => p.theme.ink};
  border: 1px solid ${(p) => p.theme.ruleStrong};
  border-radius: ${(p) => p.theme.radius.sm};
  font-size: ${(p) => p.theme.type.small};
  button { margin-left: auto; min-height: 44px; text-decoration: underline; }
`;

export function ToastProvider({ children }) {
  const [notice, setNotice] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const sequence = useRef(0);
  const notify = useCallback((message, error = false) => {
    setNotice({ message, error, id: ++sequence.current });
  }, []);

  useEffect(() => {
    if (!notice || notice.error || hovered || focused) return undefined;
    const timer = setTimeout(() => setNotice(null), 6000);
    return () => clearTimeout(timer);
  }, [notice, hovered, focused]);

  return (
    <ToastContext.Provider value={notify}>
      {children}
      <span className="sr-only" role="status" aria-atomic="true">{notice && !notice.error ? <span key={notice.id}>{notice.message}</span> : null}</span>
      <span className="sr-only" role="alert" aria-atomic="true">{notice?.error ? <span key={notice.id}>{notice.message}</span> : null}</span>
      {notice && (
        <Notice aria-label="Notification" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
          onFocus={() => setFocused(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
          <p>{notice.message}</p>
          <button type="button" onClick={() => { setNotice(null); setHovered(false); setFocused(false); }} aria-label="Dismiss notification">Dismiss</button>
        </Notice>
      )}
    </ToastContext.Provider>
  );
}

ToastProvider.propTypes = { children: PropTypes.node.isRequired };
export function useToast() { return useContext(ToastContext); }
