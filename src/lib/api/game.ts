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

	public async getGameActions(gameId: number): Promise<Action[]> {
		return this.get<Action[]>(`/api/games/${gameId}/actions`);
	}

	public async getGameAction(gameId: number, actionId: number): Promise<Action> {
		return this.get<Action>(`/api/games/${gameId}/actions/${actionId}`);
	}

	public async createGameAction(gameId: number, action: Partial<Action>): Promise<Action> {
		return this.post<Action>(`/api/games/${gameId}/actions`, action);
	}

	public async updateGameAction(gameId: number, actionId: number, action: Partial<Action>): Promise<Action> {
		return this.put<Action>(`/api/games/${gameId}/actions/${actionId}`, action);
	}

	public async deleteGameAction(gameId: number, actionId: number): Promise<Action> {
		return this.delete<Action>(`/api/games/${gameId}/actions/${actionId}`);
	}

	public async getGameActionByRound(gameId: number, round: number): Promise<Action[]> {
		return this.get<Action[]>(`/api/games/${gameId}/actions?round=${round}`);
	}

	public async getGameActionsByPlayer(gameId: number, playerId: number): Promise<Action[]> {
		return this.get<Action[]>(`/api/games/${gameId}/actions?player_id=${playerId}`);
	}


}
