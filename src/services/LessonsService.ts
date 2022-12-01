import { $api } from "../http";

export default class LessonService {

	static async createLesson (params:FormData){			
		return $api.post(`/v2/lessons/?token=${localStorage.getItem('token')}`, params, {
			headers:{
				'accept': 'application/json',
				'Content-Type': `multipart/form-data`,
			},			
		})
	
	}

	static async login(params:FormData, id:number){
		return $api.post(`/v2/lessons/${id}/complete/?token=${localStorage.getItem('token')}`, params, {
			headers:{
				'accept': 'application/json',
				'Content-Type': `multipart/form-data`,
			},			
		})
	}

	static getLessons(){
		return $api.get(`/v2/lessons/?token=${localStorage.getItem('token')}`)
	}

	static getLessonById(id: number){
		return $api.get(`/v2/lessons/${id}/?token=${localStorage.getItem('token')}`)
	}
}