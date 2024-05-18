import { fetchWrapper } from "./util";


//id | name | player_count |         created_at         |         updated_at         
export interface Game {
  Id: number
  Name: string
  PlayerCount: number
  UpdatedAt: string
  CreatedAt: string
}

export async function getRandomGame(): Promise<Game> {
  return fetchWrapper<Game>(`/api/games/random`);
}

