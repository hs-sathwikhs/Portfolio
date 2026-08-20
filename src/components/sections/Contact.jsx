import { useRef, useState } from 'react';
import styled from 'styled-components';
import { Shell, Band, Meta, Opener, SectionRule, ActionButton, Quiet } from '../ui/Primitives';
import Reveal from '../ui/Reveal';
import { profile } from '../../data/profile';

/**
 * A form that actually sends.
 *
 * The previous version of this section logged the message to the console and
 * then showed an alert thanking you for it - the one interaction on the site
 * that made a promise it did not keep. This one submits through EmailJS when
 * the keys are configured and falls back to opening a pre-filled mail client
 * when they are not, and it says which of those two things happened.
 */

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
  gap: clamp(2rem, 5vw, 4rem);
  align-items: start;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const Direct = styled.dl`
  border-top: 1px solid ${(p) => p.theme.ruleStrong};

  > div {
    display: grid;
    gap: 0.3rem;
    padding-block: 1rem;
    border-bottom: 1px solid ${(p) => p.theme.rule};
  }

  dd {
    font-size: ${(p) => p.theme.type.small};
    color: ${(p) => p.theme.ink};
    overflow-wrap: anywhere;
  }
`;

/** The address and its copy affordance share one line, inside the same <dd>. */
const Addressed = styled.dd`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.4rem 1rem;
`;

/** A quiet utility, not a button competing with the form's own submit. */
const Copy = styled.button`
  font-family: ${(p) => p.theme.font.mono};
  font-size: ${(p) => p.theme.type.label};
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${(p) => p.theme.graphite};
  padding: 0.2rem 0;
  transition: color var(--dur-hover) var(--ease-out);

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      color: ${(p) => p.theme.seal};
    }
  }
`;

const Socials = styled.ul`
  margin-top: 1.25rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.25rem;

  li {
    font-size: ${(p) => p.theme.type.small};
  }
`;

const Form = styled.form`
  display: grid;
  gap: 1.15rem;
`;

const Pair = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.15rem;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.div`
  display: grid;
  gap: 0.45rem;

  input,
  textarea {
    width: 100%;
    padding: 0.7rem 0.85rem;
    background: ${(p) => p.theme.paper};
    border: 1px solid ${(p) => (p.$invalid ? p.theme.seal : p.theme.ruleStrong)};
    border-radius: ${(p) => p.theme.radius.sm};
    font-size: ${(p) => p.theme.type.small};
    transition:
      border-color var(--dur-hover) var(--ease-out),
      background-color var(--dur-hover) var(--ease-out);
  }

  textarea {
    min-height: 9.5rem;
    resize: vertical;
    line-height: 1.6;
  }

  input:focus,
  textarea:focus {
    background: ${(p) => p.theme.paperInk};
  }

  input::placeholder,
  textarea::placeholder {
    color: ${(p) => p.theme.graphite};
  }
`;

const Note = styled.p`
  font-family: ${(p) => p.theme.font.mono};
  font-size: ${(p) => p.theme.type.micro};
  color: ${(p) => p.theme.seal};
  letter-spacing: 0.01em;
`;

const Foot = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem 1.5rem;
  margin-top: 0.35rem;
`;

const Status = styled.p`
  font-size: ${(p) => p.theme.type.small};
  color: ${(p) => (p.$bad ? p.theme.seal : p.theme.graphite)};
  max-width: 42ch;
`;

/** The receipt. It states what happened and where the reply will go. */
const Receipt = styled.div`
  border: 1px solid ${(p) => p.theme.ruleStrong};
  background: ${(p) => p.theme.paper};
  padding: clamp(1.5rem, 4vh, 2rem);
  display: grid;
  gap: 0.85rem;
  justify-items: start;

  h3 {
    font-size: ${(p) => p.theme.type.d4};
  }

  p {
    font-size: ${(p) => p.theme.type.small};
    color: ${(p) => p.theme.graphite};
    max-width: 46ch;
  }
`;

const EMPTY = { name: '', email: '', subject: '', message: '' };

const EMAIL_SHAPE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const KEYS = {
  service: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  template: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

const configured = Boolean(KEYS.service && KEYS.template && KEYS.publicKey);

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Required - who is writing.';
  if (!values.email.trim()) errors.email = 'Required - otherwise there is no way to reply.';
  else if (!EMAIL_SHAPE.test(values.email.trim())) errors.email = 'That address is missing a part.';
  if (values.message.trim().length < 12) errors.message = 'A little more than that, please.';
  return errors;
}

export default function Contact() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [state, setState] = useState('idle'); // idle | sending | sent | handoff | failed
  const [copied, setCopied] = useState(false);
  const sentTo = useRef('');

  const update = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear a field's error the moment it is being corrected, not on blur -
    // an error that persists while you fix it reads as the form arguing.
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // No clipboard permission. The address is on screen already, so this is
      // a convenience that failed rather than a feature that broke.
      setCopied(false);
    }
  };

  const handoffToMailClient = () => {
    const subject = values.subject.trim() || `Message from ${values.name.trim()}`;
    const body = `${values.message.trim()}\n\n- ${values.name.trim()} (${values.email.trim()})`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setState('handoff');
  };

  const submit = async (event) => {
    event.preventDefault();

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setState('idle');
      return;
    }

    sentTo.current = values.email.trim();

    if (!configured) {
      handoffToMailClient();
      return;
    }

    setState('sending');
    try {
      // Loaded on submit so the SDK is not part of first paint.
      const { default: emailjs } = await import('@emailjs/browser');
      await emailjs.send(
        KEYS.service,
        KEYS.template,
        {
          from_name: values.name.trim(),
          from_email: values.email.trim(),
          subject: values.subject.trim() || 'Portfolio enquiry',
          message: values.message.trim(),
        },
        { publicKey: KEYS.publicKey },
      );
      setValues(EMPTY);
      setState('sent');
    } catch {
      setState('failed');
    }
  };

  return (
    <Band id="contact" $recessed>
      <Shell>
        <Reveal>
          <Opener>
            <h2>If any of this is useful to you, write to me.</h2>
            <SectionRule index="05" name="Contact" />
            <p>
              Internships, blockchain or network work, or a question about something above. The form
              sends a real message; the address beside it works just as well.
            </p>
          </Opener>
        </Reveal>

        <Grid>
          <Reveal>
            <div>
              <Direct>
                <div>
                  <Meta as="dt">Email</Meta>
                  <Addressed>
                    <Quiet href={`mailto:${profile.email}`}>{profile.email}</Quiet>
                    <Copy type="button" onClick={copyEmail}>
                      {copied ? 'Copied' : 'Copy'}
                    </Copy>
                    <span className="sr-only" role="status" aria-live="polite">
                      {copied ? 'Email address copied to clipboard' : ''}
                    </span>
                  </Addressed>
                </div>
                <div>
                  <Meta as="dt">Phone</Meta>
                  <dd>
                    <Quiet href={`tel:${profile.phoneHref}`}>{profile.phone}</Quiet>
                  </dd>
                </div>
                <div>
                  <Meta as="dt">Located</Meta>
                  <dd>{profile.city}</dd>
                </div>
                <div>
                  <Meta as="dt">Coordinates</Meta>
                  <dd className="tabular">{profile.coordinates}</dd>
                </div>
              </Direct>

              <Socials>
                {profile.social.map(({ label, href }) => (
                  <li key={label}>
                    <Quiet href={href} target="_blank" rel="noopener noreferrer">
                      {label}
                    </Quiet>
                  </li>
                ))}
              </Socials>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            {state === 'sent' || state === 'handoff' ? (
              <Receipt>
                <Meta $seal>{state === 'sent' ? 'Sent' : 'Handed to your mail client'}</Meta>
                <h3>
                  {state === 'sent'
                    ? 'The message is through.'
                    : 'Your mail app should be open now.'}
                </h3>
                <p>
                  {state === 'sent'
                    ? `I'll reply to ${sentTo.current}. If nothing arrives, the address above reaches me directly.`
                    : `The draft is pre-filled and addressed to ${profile.email}. Nothing has been sent until you send it yourself.`}
                </p>
                <ActionButton type="button" onClick={() => setState('idle')}>
                  Write another
                </ActionButton>
              </Receipt>
            ) : (
              <Form onSubmit={submit} noValidate>
                <Pair>
                  <Field $invalid={Boolean(errors.name)}>
                    <label htmlFor="name">
                      <Meta as="span">Name</Meta>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={values.name}
                      onChange={update}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name ? <Note id="name-error">{errors.name}</Note> : null}
                  </Field>

                  <Field $invalid={Boolean(errors.email)}>
                    <label htmlFor="email">
                      <Meta as="span">Email</Meta>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={values.email}
                      onChange={update}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email ? <Note id="email-error">{errors.email}</Note> : null}
                  </Field>
                </Pair>

                <Field>
                  <label htmlFor="subject">
                    <Meta as="span">Subject - optional</Meta>
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={values.subject}
                    onChange={update}
                  />
                </Field>

                <Field $invalid={Boolean(errors.message)}>
                  <label htmlFor="message">
                    <Meta as="span">Message</Meta>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={values.message}
                    onChange={update}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  {errors.message ? <Note id="message-error">{errors.message}</Note> : null}
                </Field>

                <Foot>
                  <ActionButton type="submit" disabled={state === 'sending'}>
                    {state === 'sending' ? 'Sending…' : 'Send message'}
                  </ActionButton>

                  <Status role="status" aria-live="polite" $bad={state === 'failed'}>
                    {state === 'failed'
                      ? 'That did not go through. Use the address on the left and it will reach me.'
                      : null}
                    {state === 'idle' && !configured
                      ? 'Opens a pre-filled draft in your own mail client.'
                      : null}
                  </Status>
                </Foot>
              </Form>
            )}
          </Reveal>
        </Grid>
      </Shell>
    </Band>
  );
}
