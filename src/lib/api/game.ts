import { PUBLIC_BACKEND_URL } from '$env/static/public';
import { ApiClientBase } from './api';
import type { Game } from './types';

export class gameApi extends ApiClientBase {
	constructor() {
		super(PUBLIC_BACKEND_URL);
	}
	public getAllGames(): Promise<Game[]> {
		return this.get<Game[]>('/api/games');
	}

	public createGame(user: Partial<Pick<Game, 'name'>>): Promise<Game> {
		return this.post<Game>('/api/games', user);
	}
}
