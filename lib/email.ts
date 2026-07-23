import type { QuoteInput } from './validation';
import { PROJECT_TYPE_LABELS } from './validation';

const RESEND_ENDPOINT = 'https://api.resend.com/emails';

type SendResult = { ok: true; id: string } | { ok: false; error: string };

export async function sendLeadEmail(
  data: QuoteInput,
  meta: { ip: string | null; userAgent: string | null },
): Promise<SendResult> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL ?? 'Verto Landscapes <onboarding@resend.dev>';

  if (!key || !to) {
    return { ok: false, error: 'RESEND_API_KEY or LEAD_TO_EMAIL not configured' };
  }

  const subject = `New enquiry, ${data.name} (${PROJECT_TYPE_LABELS[data.projectType]})`;

  const text =
    `New quote request from the Verto Landscapes website.\n\n` +
    `Name:     ${data.name}\n` +
    `Email:    ${data.email}\n` +
    `Phone:    ${data.phone}\n` +
    `Project:  ${PROJECT_TYPE_LABELS[data.projectType]}\n\n` +
    `Message:\n${data.message}\n\n` +
    `Submitted ${new Date().toISOString()}\n` +
    `IP ${meta.ip ?? 'unknown'}\n` +
    `UA ${meta.userAgent ?? 'unknown'}\n`;

  const html =
    `<div style="font-family: -apple-system, system-ui, sans-serif; max-width: 560px; color: #1A1A17;">` +
    `<h2 style="font-family: Georgia, serif; font-weight: 500; letter-spacing: -0.02em;">New enquiry</h2>` +
    `<table cellpadding="6" style="border-collapse: collapse; margin: 12px 0;">` +
    row('Name', escape(data.name)) +
    row('Email', `<a href="mailto:${escape(data.email)}">${escape(data.email)}</a>`) +
    row('Phone', `<a href="tel:${escape(data.phone)}">${escape(data.phone)}</a>`) +
    row('Project type', escape(PROJECT_TYPE_LABELS[data.projectType])) +
    `</table>` +
    `<h3 style="font-family: Georgia, serif; font-weight: 500;">Message</h3>` +
    `<p style="white-space: pre-wrap; line-height: 1.5;">${escape(data.message)}</p>` +
    `<hr style="border: 0; border-top: 1px solid #E4DFD3; margin: 20px 0;" />` +
    `<p style="font-size: 12px; color: #86847A;">Submitted ${new Date().toISOString()}<br/>IP ${escape(meta.ip ?? 'unknown')}<br/>UA ${escape(meta.userAgent ?? 'unknown')}</p>` +
    `</div>`;

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject,
        text,
        html,
      }),
    });
    const json = (await res.json().catch(() => ({}))) as { id?: string; message?: string };
    if (!res.ok) {
      return { ok: false, error: json.message || `HTTP ${res.status}` };
    }
    return { ok: true, id: json.id ?? '' };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

function row(label: string, value: string) {
  return `<tr><td style="font-size:11px; text-transform:uppercase; letter-spacing:0.15em; color:#86847A; padding-right:16px; vertical-align:top;">${label}</td><td>${value}</td></tr>`;
}

function escape(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
}
