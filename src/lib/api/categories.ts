import { PUBLIC_BACKEND_URL } from '$env/static/public';
import { ApiClientBase } from './api';
import type { Category } from './types';

export class categoryApi extends ApiClientBase {
	constructor() {
		super(PUBLIC_BACKEND_URL);
	}
	public async getCategory(id: number): Promise<Category[]> {
		return this.get<Category[]>(`/api/categories/${id}`);
	}

}
