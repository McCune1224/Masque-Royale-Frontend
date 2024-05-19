import { GamesGetByID, type Game } from "$lib/api/game";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {

  let game: Game

  try {
    let response = await GamesGetByID(+params.slug)
    game = response
    if (game == undefined) {
      return {
        gameId: params.slug,
        error: `Game ID ${params.slug} is not valid`,
      }
    }
    return {
      game,
      gameId: params.slug
    }
  }
  catch (err) {
    return {

      gameId: params.slug,
      error: (err as Error).message
    }
  }
}
