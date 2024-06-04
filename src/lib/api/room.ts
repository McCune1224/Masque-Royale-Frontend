import { PUBLIC_BACKEND_URL } from '$env/static/public';
import { ApiClientBase } from './api';
import type { Room } from './types';


export class roomApi extends ApiClientBase {
	constructor() {
		super(PUBLIC_BACKEND_URL);
	}
	public async getAllRooms(): Promise<Room[]> {
		return this.get<Room[]>('/api/rooms');
	}

	public async getRoom(id: string): Promise<Room> {
		return this.get<Room>(`/api/rooms/${id}`);
	}

}
