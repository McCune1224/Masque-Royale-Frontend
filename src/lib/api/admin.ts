import { PUBLIC_BACKEND_URL } from '$env/static/public';
import { ApiClientBase } from './api';

export class adminApi extends ApiClientBase {
	constructor() {
		super(PUBLIC_BACKEND_URL);
	}

	public async uploadRolesCSV(gameId: number, buffer: ArrayBuffer): Promise<any> {
			const csvJson = {
				foo: buffer
			};
		return this.post<any>(`/api/games/${gameId}/admin/sync-roles-csv`, csvJson);
	}
}
