import { z } from 'zod';

export const PROJECT_TYPES = ['design', 'build', 'maintenance', 'not-sure'] as const;
export type ProjectType = (typeof PROJECT_TYPES)[number];

export const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  design: 'Garden design',
  build: 'Landscape build',
  maintenance: 'Ongoing care',
  'not-sure': 'Not sure yet',
};

export const quoteSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name').max(80),
  email: z.string().trim().email('Enter a valid email address').max(120),
  phone: z
    .string()
    .trim()
    .min(6, 'Enter a phone number')
    .max(30)
    .regex(/^[0-9+()\-\s]+$/, 'Numbers, spaces, and + ( ) - only'),
  projectType: z.enum(PROJECT_TYPES),
  message: z
    .string()
    .trim()
    .min(10, 'Tell us a little about your project')
    .max(2000, 'Keep it under 2000 characters'),
  // Honeypot: not validated here. The route returns 200 and silently
  // discards the submission when this is non-empty, defeating bots without
  // tipping them off.
  honeypot: z.string().optional(),
});

export type QuoteInput = z.infer<typeof quoteSchema>;
