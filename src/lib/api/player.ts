import { PUBLIC_BACKEND_URL } from '$env/static/public';
import { ApiClientBase } from './api';
import type { Action, Player, PlayerAbility } from './types';

export class playerApi extends ApiClientBase {
	constructor() {
		super(PUBLIC_BACKEND_URL);
	}
	public async getAllPlayersForGame(gameId: string): Promise<Player[]> {
		return this.get<Player[]>(`/api/games/${gameId}/players`);
	}
	//
	// create the player, only with a few fields being required
	public async createPlayer(gameID: string, player: Partial<Player>): Promise<Player> {
		return this.post<Player>(`/api/games/${gameID}/players`, player);
	}

	public async updatePlayer(player: Partial<Player>): Promise<Player> {
		return this.put<Player>(`/api/games/${player.game_id}/players/${player.id}`, player);
	}

	public async deletePlayer(player: Partial<Player>): Promise<Player> {
		return this.delete<Player>(`/api/games/${player.game_id}/players/${player.id}`);
	}

	public async getPlayer(gameId: string, playerId: string): Promise<Player> {
		return this.get<Player>(`/api/games/${gameId}/players/${playerId}`);
	}

	public async getPlayerAbilities(gameId: string, playerId: string): Promise<PlayerAbility[]> {
		return this.get<PlayerAbility[]>(`/api/games/${gameId}/players/${playerId}/abilities`);
	}

	public async updatePlayerAbility(gameId: string, playerId: string, abilityId: string, newCharge: number): Promise<PlayerAbility> {
		return this.put<PlayerAbility>(`/api/games/${gameId}/players/${playerId}/abilities/${abilityId}`, { charges: newCharge });
	}

	public async getPlayerNotes(gameId: string, playerId: string): Promise<{ player_id: number, notes: string }> {
		return this.get<{ player_id: number, notes: string }>(`/api/games/${gameId}/players/${playerId}/notes`);
	}

}
