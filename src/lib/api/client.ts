import { gameApi } from './game';
import { adminApi } from './admin';

export class ApiClient {
	public gameApi: gameApi;
	public adminApi: adminApi;
	// public productApi: ProductApi;

	constructor() {
		this.gameApi = new gameApi();
		this.adminApi = new adminApi();
		// this.productApi = new ProductApi();
	}
}
