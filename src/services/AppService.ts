import { AxiosResponse } from "axios";
import { $api } from "../http";
import { IBalance } from "../models/IApp";

export default class AppService {

	static getBalance():Promise<AxiosResponse<{data:IBalance}>>{
		return $api.get(`/v2/balance?token=${localStorage.getItem('token')}`)
	}
}
