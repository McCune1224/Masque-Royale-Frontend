export interface Game {
	id: number;
	name: string;
	phase: string;
	round: number;
	player_ids: number[];
	updated_at: string;
	created_at: string;
}
