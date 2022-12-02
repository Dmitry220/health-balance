import { AxiosResponse } from "axios";
import { $api } from "../http";
import { IBalance } from "../models/IApp";
import { IPurpose } from "../models/IPurpose";

export default class PurposeService {

	static async creatingPersonalPurpose(params:FormData){			

		return $api.post(`/v2/purposes/?token=${localStorage.getItem('token')}`,params ,{
			headers:{
				'accept': 'application/json',
				'Content-Type': `application/x-www-form-urlencoded`,
			},	
		})	
	}

	static getPersonalPurpose():Promise<AxiosResponse<{data:IPurpose}>>{
		return $api.get(`/v2/purposes?token=${localStorage.getItem('token')}`)
	}

	static getChallengePurpose(id:number):Promise<AxiosResponse<{data:IPurpose}>>{
		return $api.get(`/v2/purposes?challenge_id=${id}&token=${localStorage.getItem('token')}`)
	}

	static changePersonalPurpose(id:number, quantity:number){
		return $api.patch(`/v2/purposes/${id}/${quantity}?token=${localStorage.getItem('token')}`)
	}

}
