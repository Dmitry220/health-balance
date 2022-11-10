import { $api } from "../http";

export default class UserService {

	static async getUserDataOnId (id:number){			
		return $api.get(`/v2/customers/${id}`)	
	}

	static async editingProfile(params:URLSearchParams){			

		return $api.patch(`/v2/customers/?token=${localStorage.getItem('token')}`,params ,{
			headers:{
				'accept': 'application/json',
				'Content-Type': "application/x-www-form-urlencoded"
			},	
		})	
	}
}