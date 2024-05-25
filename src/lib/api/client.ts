import { gameApi } from './game';

export class ApiClient {
	public userApi: gameApi;
	// public productApi: ProductApi;

	constructor() {
		this.userApi = new gameApi();
		// this.productApi = new ProductApi();
	}
}
