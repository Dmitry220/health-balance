import { AxiosResponse } from "axios";
import { title } from "process";
import { $api } from "../http";


export default class ChatService {
  static async newChannel(title: string, customers_id:number[]) {
    return $api.post(`/v2/channels/?token=${localStorage.getItem("token")}`, {
        "title": 'title',
        "customers_id": [2,3],
      },{
        headers: {
          accept: "application/json",
          "Content-Type": `multipart/form-data`,
        },
      })    
  }

  static async getChannels() {
    return $api.get(`/v2/channels/?token=${localStorage.getItem("token")}`);
  }

}
