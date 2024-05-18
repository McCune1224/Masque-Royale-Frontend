import { fetchWrapper } from "./util";

export interface Healthcheck {
  response_time: number;
}

export async function getHealthcheck(): Promise<Healthcheck> {
  return fetchWrapper<Healthcheck>(`/healthcheck`);
}

