import { AxiosResponse } from "axios";
import { $api } from "../http";
import { IPurposeResponse } from "../models/IChallenge";

export default class ChallengeService {

	static async creatingPurpose(params:FormData):Promise<AxiosResponse<IPurposeResponse>>{
		return $api.post(`/v2/purposes/?token=${localStorage.getItem('token')}`,params ,{
			headers:{
				'accept': 'application/json',
				'Content-Type': `multipart/form-data`,
			},	
		})	
	}

	static async creatingChallenge(params:FormData){
		return $api.post(`/v2/challenges/?token=${localStorage.getItem('token')}`,params ,{
			headers:{
				'accept': 'application/json',
				'Content-Type': `multipart/form-data`,
			},	
		})	
	}
}