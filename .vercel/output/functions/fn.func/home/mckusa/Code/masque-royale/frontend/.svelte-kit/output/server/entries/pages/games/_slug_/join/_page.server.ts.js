import { b as gamesGetByID } from "../../../../../chunks/game.js";
const load = async ({ params }) => {
  try {
    let response = await gamesGetByID(+params.slug);
    const game = response;
    if (game == void 0) {
      return {
        gameId: params.slug,
        error: `Game ID ${params.slug} is not valid`
      };
    }
    return {
      game,
      gameId: params.slug
    };
  } catch (err) {
    return {
      gameId: params.slug,
      error: err.message
    };
  }
};
export {
  load
};
