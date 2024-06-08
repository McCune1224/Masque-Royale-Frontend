import { PUBLIC_BACKEND_URL } from '$env/static/public';
import { ApiClientBase } from './api';
import type { Action, Game } from './types';

export class gameApi extends ApiClientBase {
	constructor() {
		super(PUBLIC_BACKEND_URL);
	}
	public async getAllGames(): Promise<Game[]> {
		return this.get<Game[]>('/api/games');
	}

	public async getGame(id: number): Promise<Game> {
		return this.get<Game>(`/api/games/${id}`);
	}
	public async createGame(user: Partial<Pick<Game, 'name'>>): Promise<Game> {
		return this.post<Game>('/api/games', user);
	}

	public async updateGame(gameId: string, game: Partial<Game>): Promise<Game> {
		return this.put<Game>(`/api/games/${gameId}`, game);
	}

	public async deleteGame(gameId: string): Promise<Game> {
		return this.delete<Game>(`/api/games/${gameId}`);
	}

	public async createGameAction(gameId: string, action: Partial<Action>): Promise<Action> {
		return this.post<Action>(`/api/games/${gameId}/actions`, action);
	}

	public async getActionsForGame(gameId: string): Promise<Action[]> {
		return this.get<Action[]>(`/api/games/${gameId}/actions`);
	}

	public async updateAction(gameId: string, actionId: string, action: Partial<Action>): Promise<Action> {
		return this.put<Action>(`/api/games/${gameId}/actions/${actionId}`, action);
	}

	public async deleteAction(gameId: string, actionId: string): Promise<Action> {
		return this.delete<Action>(`/api/games/${gameId}/actions/${actionId}`);
	}

}
