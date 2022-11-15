import { AxiosResponse } from "axios";
import { $api } from "../http";
import { IFileAvatar } from "../models/IFiles";

export default class FileService {

	static async uploadFile(params:FormData):Promise<AxiosResponse<IFileAvatar>>{			

		return $api.post(`/v2/images/?type=avatars&token=${localStorage.getItem('token')}`,params ,{
			headers:{
				'accept': 'application/json',
				'Content-Type': 'multipart/form-data'
			},	
		})	
	}
}