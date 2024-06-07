import { PUBLIC_BACKEND_URL } from '$env/static/public';
import type { Action } from 'svelte/action';
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

	public async createGameAction(gameId: string, action: Partial<Action>): Promise<Action> {
		return this.post<Action>(`/api/games/${gameId}/actions`, action);
	}

	public async GetActionsForGame(gameId: string): Promise<Action[]> {
		return this.get<Action[]>(`/api/games/${gameId}/actions`);
	}
}
