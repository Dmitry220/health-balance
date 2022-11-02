import { AxiosResponse } from "axios";
import { $api } from "../http";

export default class AuthService {

	static async registration (name:string,surname:string,birthday:string,gender:number, 
		avatar:string,phone:string, email:string, password:string, device_token:string,platform:number | null, formData:any){
		
			formData.append('email',email)
			formData.append('password',password)
			formData.append('name',name)
			formData.append('surname',surname)
			formData.append('gender',gender)
			formData.append('avatar',avatar)
			formData.append('birthday',birthday)
			formData.append('device_token',device_token)
			formData.append('platform',platform)
			formData.append('phone',phone)
			
		return $api.post('/v2/customers', formData, {
			headers:{
				'accept': 'application/json',
			'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
			},
			
		})
	
	}

	static async login(email:string, password:string){
		const formData = new FormData()
		formData.append('email',email)
		formData.append('password',password)
		return $api.post('/v2/login', formData, {
			headers:{
				'accept': 'application/json',
			'Content-Type': `application/x-www-form-urlencoded`,
			},
			
		})
	}

	static getPlatfotms (){
		return $api.get('/v2/platforms')
	}
}