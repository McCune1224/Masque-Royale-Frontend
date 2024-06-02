import { PUBLIC_BACKEND_URL } from '$env/static/public';
import { ApiClientBase } from './api';
import type { Player } from './types';

export class playerApi extends ApiClientBase {
	constructor() {
		super(PUBLIC_BACKEND_URL);
	}
	public async getAllPlayersForGame(gameId: number): Promise<Player[]> {
		return this.get<Player[]>(`/api/games/${gameId}/players`);
	}
	//
	// create the player, only with a few fields being required
	public async createPlayer(gameID: string, player: Partial<Player>): Promise<Player> {
		return this.post<Player>(`/api/games/${gameID}/players`, player);
	}
}
