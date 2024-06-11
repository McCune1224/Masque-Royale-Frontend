import { gameApi } from './game';
import { roleApi } from './role';
import { adminApi } from './admin';
import { roomApi } from './room';
import { playerApi } from './player';
import { abilityDetailsApi } from './ability_details';
import { anyAbilityDetailsApi } from './any_ability_details';
import { statusApi } from './status';

export class ApiClient {
	public gameApi: gameApi;
	public adminApi: adminApi;
	public playerApi: playerApi;
	public roleApi: roleApi;
	public roomApi: roomApi;
	public abilityDetailsApi: abilityDetailsApi;
	public anyAbilityDetailsApi: anyAbilityDetailsApi;
	public statusApi: statusApi;

	constructor() {
		this.gameApi = new gameApi();
		this.adminApi = new adminApi();
		this.playerApi = new playerApi();
		this.roleApi = new roleApi();
		this.roomApi = new roomApi();
		this.abilityDetailsApi = new abilityDetailsApi();
		this.anyAbilityDetailsApi = new anyAbilityDetailsApi();
		this.statusApi = new statusApi();
		// this.productApi = new ProductApi();
	}
}
