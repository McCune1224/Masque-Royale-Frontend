export interface Game {
	id: number;
	name: string;
	phase: string;
	round: number;
	player_ids?: number[];
	updated_at: string;
	created_at: string;
}

export interface Player {
	id: number;
	name: string;
	game_id: number;
	role_id: number;
	alive: boolean;
	alignment_override: string;
	notes: string;
	room_id: number;
}

export interface Role {
	id: number;
	name: string;
	alignment: string;
}


export interface Room {
	id: number;
	name: string;
	description: string;
}
