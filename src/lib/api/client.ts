import { gameApi } from './game';
import { roleApi } from './role';
import { adminApi } from './admin';
import { roomApi } from './room';
import { playerApi } from './player';

export class ApiClient {
	public gameApi: gameApi;
	public adminApi: adminApi;
	public playerApi: playerApi;
	public roleApi: roleApi;
	public roomApi: roomApi;

	constructor() {
		this.gameApi = new gameApi();
		this.adminApi = new adminApi();
		this.playerApi = new playerApi();
		this.roleApi = new roleApi();
		this.roomApi = new roomApi();
		// this.productApi = new ProductApi();
	}
}
