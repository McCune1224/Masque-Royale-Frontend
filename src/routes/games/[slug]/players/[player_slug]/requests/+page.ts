import { ApiClient } from "$lib/api/client";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ parent, params }) => {
  const { slug, player_slug } = params;
  const client = new ApiClient();
  const player = await client.playerApi.getPlayer(slug, player_slug);  
  const actions = await client.gameApi.getActionsForGame(slug);
  return { player, actions };
}
