import { fetchWrapper } from "./util";

export interface Game {
  Id: number
  Name: string
  Phase: string
  Round: number
  PlayerCount: number
  UpdatedAt: string
  CreatedAt: string
}

export async function GamesGetRandom(): Promise<Game> {
  return fetchWrapper<Game>(`/api/games/random`);
}

export async function GamesGetByID(id: number): Promise<Game> {
  return fetchWrapper<Game>(`/api/games/${id}`);
}

export async function GamesGetAll(): Promise<Game[]> {
  return fetchWrapper<Game[]>(`/api/games/all`);
}
