import { AxiosResponse } from "axios";
import { title } from "process";
import { $api } from "../http";
import { IAllMessages, INewChannels } from "../models/IChat";


export default class ChatService {

  static async newChannel(title: string, customers_id:number[]):Promise<AxiosResponse<{data:INewChannels[]}>> {
    return $api.post(`/v2/channels/?token=${localStorage.getItem("token")}`, {title,customers_id},{
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json'
        },
      })    
  }

  static async getChannels() {
    return $api.get(`/v2/channels/?token=${localStorage.getItem("token")}`);
  }
  static async getChannelsById(channel_id:number) {
    return $api.get(`/v2/channels/${channel_id}?token=${localStorage.getItem("token")}`);
  }

  static async changeChannel(channel_id: number,title: string, customers_id:number[]) {
    return $api.put(`/v2/channels/${channel_id}?token=${localStorage.getItem("token")}`,{title,customers_id},{
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json'
        },
      })    
  }

  static async deleteChannel(channel_id:number) {
    return $api.delete(`/v2/channels/${channel_id}?token=${localStorage.getItem("token")}`);
  }

  static async sendMessage(content: string, channel_id:number) {
    return $api.post(`/v2/messages/?token=${localStorage.getItem("token")}`, {content,channel_id},{
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json'
        },
      })    
  }

  static async listMessages(channel_id:number):Promise<AxiosResponse<{data:IAllMessages[]}>> {
    return $api.get(`/v2/messages?channel_id=${channel_id}&token=${localStorage.getItem("token")}`);
  }

  static async oneMessage(message_id:number) {
    return $api.get(`/v2/messages/${message_id}?token=${localStorage.getItem("token")}`);
  }

  static async changeMessage(message_id: number,content: string) {
    return $api.put(`/v2/messages/${message_id}?token=${localStorage.getItem("token")}`, {content},{
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json'
        },
      })    
  }

  static async deleteMessage(message_id:number) {
    return $api.delete(`/v2/messages/${message_id}?token=${localStorage.getItem("token")}`);
  }

}
