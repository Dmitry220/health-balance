import { AxiosResponse } from "axios";
import { $api } from "../http";
import { IBalance } from "../models/IApp";

export default class AppService {

	static getBalance():Promise<AxiosResponse<{data:IBalance}>>{
		return $api.get(`/v2/balance?token=${localStorage.getItem('token')}`)
	}

	static async creatingPersonalPurpose(params:FormData){			

		return $api.post(`/v2/purposes/?token=${localStorage.getItem('token')}`,params ,{
			headers:{
				'accept': 'application/json',
				'Content-Type': `application/x-www-form-urlencoded`,
			},	
		})	
	}

	// static async creatingPersonalPurpose(params:FormData){			

	// 	return $api.post(`/v2/purposes/?token=${localStorage.getItem('token')}`,params ,{
	// 		headers:{
	// 			'accept': 'application/json',
	// 			'Content-Type': 'multipart/form-data'
	// 		},	
	// 	})	
	// }
}
