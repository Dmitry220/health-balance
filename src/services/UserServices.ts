import { $api } from "../http";
import { IUser } from "../models/IUsers";

export default class UserService {

	static async getUserDataOnId (id:number){			
		return $api.get(`/v2/customers/${id}`)	
	}

	static async editingProfile(
		// name: string,
		// surname: string,
		// gender: number,
		// birthday: number,
		// phone: string,
		// email: string,
		// avatar: string
		){			
		return $api.patch(`/v2/customers/`,'name=Max',{
			headers:{
				'accept': 'application/json',
				'Content-Type': `application/x-www-form-urlencoded`,
			},	
		})	
	}

	static async login(email:string, password:string){
		const formData = new FormData()
		formData.append('email',email)
		formData.append('password',password)
		return $api.post('/v2/login', formData, {
			headers:{
				//'accept': 'application/json',
				'Content-Type': `application/x-www-form-urlencoded`,
			},			
		})
	}
}