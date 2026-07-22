'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECT_TYPES, PROJECT_TYPE_LABELS, type QuoteInput } from '@/lib/validation';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function QuoteForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [serverError, setServerError] = useState<string | null>(null);
  const [submittedName, setSubmittedName] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<QuoteInput>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      projectType: 'design',
      message: '',
      honeypot: '',
    },
  });

  const onSubmit = async (data: QuoteInput) => {
    setStatus('submitting');
    setServerError(null);
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) {
        const msg =
          json?.errors?.[0]?.message ||
          (res.status === 429 ? 'Too many submissions — please try again in a few minutes.' : 'Something went wrong. Please try again or email us directly.');
        setServerError(msg);
        setStatus('error');
        return;
      }
      setSubmittedName(data.name.split(' ')[0] || data.name);
      setStatus('success');
      reset();
    } catch {
      setServerError('Network error. Please try again.');
      setStatus('error');
    }
  };

  return (
    <AnimatePresence mode="wait">
      {status === 'success' ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="border border-paper/15 bg-ink-2 p-10 lg:p-14"
        >
          <div className="meta mb-4 text-sage">Received</div>
          <p className="font-serif italic text-3xl md:text-4xl leading-tight tracking-tighter2 text-balance">
            Thanks, {submittedName} — we&rsquo;ll be in touch within two business days.
          </p>
          <p className="mt-6 text-sm text-paper/60 max-w-md">
            We read every enquiry ourselves. If we&rsquo;re not the right fit for the project, we&rsquo;ll say so — and point you to someone who is.
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-7"
        >
          {/* Honeypot — hidden from real users */}
          <div className="absolute -left-[10000px]" aria-hidden="true">
            <label>
              Leave this field empty
              <input type="text" tabIndex={-1} autoComplete="off" {...register('honeypot')} />
            </label>
          </div>

          <Field label="Name" id="name" error={errors.name?.message}>
            <input
              id="name"
              type="text"
              autoComplete="name"
              {...register('name', { required: 'Please enter your name' })}
              className="field-input"
              placeholder="Your full name"
            />
          </Field>

          <div className="grid sm:grid-cols-2 gap-7">
            <Field label="Email" id="email" error={errors.email?.message}>
              <input
                id="email"
                type="email"
                autoComplete="email"
                {...register('email', { required: 'Enter your email' })}
                className="field-input"
                placeholder="you@example.com"
              />
            </Field>
            <Field label="Phone" id="phone" error={errors.phone?.message}>
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                {...register('phone', { required: 'Enter a phone number' })}
                className="field-input"
                placeholder="+61 ..."
              />
            </Field>
          </div>

          <Field label="Project type" id="projectType" error={errors.projectType?.message}>
            <select
              id="projectType"
              {...register('projectType')}
              className="field-input appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 12 12%22 fill=%22none%22 stroke=%22%23F2EFE7%22 stroke-width=%221.5%22><path d=%22M2 4l4 4 4-4%22/></svg>')] bg-no-repeat bg-[right_0_center] pr-8"
            >
              {PROJECT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {PROJECT_TYPE_LABELS[t]}
                </option>
              ))}
            </select>
          </Field>

          <Field label="What are you hoping to do?" id="message" error={errors.message?.message}>
            <textarea
              id="message"
              rows={6}
              {...register('message', { required: 'Tell us a little about your project' })}
              className="field-input resize-none"
              placeholder="A few sentences on the project, the property, and your hopes for it."
            />
          </Field>

          {serverError && (
            <div className="border border-red-400/40 bg-red-950/40 px-4 py-3 text-sm text-red-200">{serverError}</div>
          )}

          <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-5">
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="btn-light group disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === 'submitting' ? 'Sending…' : 'Send enquiry'}
              <span aria-hidden>→</span>
            </button>
            <p className="text-xs text-paper/50 max-w-xs">
              We&rsquo;ll only use your details to reply to this enquiry. No marketing, no list.
            </p>
          </div>

          <style jsx>{`
            .field-input {
              width: 100%;
              background: transparent;
              border: 0;
              border-bottom: 1px solid rgba(242, 239, 231, 0.28);
              padding: 14px 0;
              font-size: 17px;
              color: #f2efe7;
              outline: none;
              transition: border-color 300ms ease;
            }
            .field-input::placeholder {
              color: rgba(154, 166, 146, 0.55);
            }
            .field-input:focus {
              border-bottom-color: #ac9469;
            }
            textarea.field-input {
              border: 1px solid rgba(242, 239, 231, 0.28);
              padding: 14px 16px;
            }
            textarea.field-input:focus {
              border-color: #ac9469;
            }
            select.field-input {
              background-color: transparent;
              cursor: pointer;
            }
          `}</style>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="meta-sm mb-2 block text-sage">
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-300">{error}</p>}
    </div>
  );
}
