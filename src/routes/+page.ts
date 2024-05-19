import { GamesGetAll, type Game } from '$lib/api/game';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	let games: Game[]
	try {
		let resp = await GamesGetAll()
		games = resp
		return {
			games
		}
	}
	catch (err) {
		return {
			error: (err = (err as Error).message),
		}
	}
}
