import { optimizeDeps } from 'vite';
import { fetchWrapper, postRequest } from './util';
import type { ApiResponse } from './util';

export interface Game {
	id: number;
	name: string;
	phase: string;
	round: number;
	player_ids: number[];
	updatedAt: string;
	createdAt: string;
}

export async function getGames(): Promise<Game[]> {
	return fetchWrapper<Game[]>('/api/games/');
}

export async function gamesGetByID(id: number): Promise<Game> {
	return fetchWrapper<Game>(`/api/games/${id}`);
}

export async function gamesCreate(name: string): Promise<ApiResponse<Game>> {
	try {
		const opts: RequestInit = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name: name })
		};
		return fetchWrapper<ApiResponse<Game>>(`/api/games`, opts);
	} catch (error) {
		console.error('Error:', error);
		throw error;
	}
}

export async function updateGame(id: number, gameData: Partial<Game>): Promise<ApiResponse<Game>> {
	return postRequest<Partial<Game>, Game>(`api/games/${id}`, gameData);
}
