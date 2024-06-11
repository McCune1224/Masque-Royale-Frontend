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

export interface PassiveDetails {
	id: number;
	name: string;
	description: string;
}

export interface AbilityDetails {
	id: number;
	name: string;
	description: string;
	default_charges: number;
	category_ids: number[];
	rarity: string;
	priority: number;
	anyAbility: boolean;
}

export interface AnyAbilityDetails {
	id: number;
	name: string;
	shorthand: string;
	description: string;
	category_ids: number[];
	rarity: string;
	priority: number;
}

export interface Category {
	id: number;
	name: string;
	priority: number;
}

export interface CompleteRole {
	role: Role;
	passives: PassiveDetails[];
	abilities: AbilityDetails[];
}

export interface Room {
	id: number;
	name: string;
	description: string;
}

export interface Status {
	id: number;
	name: string;
	description: string;
}

export interface Action {
	id: number;
	game_id: number;
	player_id: number;
	pending_approval: boolean;
	resolved: boolean;
	target: string;
	context: string;
	ability_name: string;
	round: number;
	priority: number;
	role_id?: number;
}
