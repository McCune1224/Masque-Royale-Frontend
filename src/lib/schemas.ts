import { z } from 'zod';

export const playerCreateSchema = z.object({
	name: z.string().min(1),
	role_id: z.number().min(1),
	room_id: z.number().min(1)
});

export type PlayerCreateSchema = typeof playerCreateSchema;
