import { z } from 'zod';
export const csvSchema = z.object({
  csv: z
    .instanceof(File, { message: 'Please upload a file.'})
    .refine((f) => f.size < 500_000, 'Max 500 kB upload size.')
});

