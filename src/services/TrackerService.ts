import { AxiosResponse } from "axios";
import { $api } from "../http";
import { ICreatingTracker, IGetTracker, ITrack } from "../models/ITracker";

export default class TrackerService {
  static async creatingTracker(data: ICreatingTracker) {
    return $api.post(
      `tracker/?token=${localStorage.getItem("token")}`,
      data,
      {
        headers: {
          accept: "application/json",
          "Content-Type": `multipart/form-data`,
        },
      }
    );
  }

  static async getTracker(): Promise<AxiosResponse<{ data: IGetTracker }>> {
    return $api.get(`tracker/?token=${localStorage.getItem("token")}`);
  }

  static async updateTracker(
    id: number,
    type: "weight" | "fruits" | "wake_up_time",
    value: string
  ):Promise<AxiosResponse<{ tracker_id: number }>> {
    const body = type + "=" + value;
    return (
      $api.patch(
        `tracker/${id}/update?token=${localStorage.getItem("token")}`,
        body,{
          headers: {
            "Content-Type": "text/plain",
          },
        }
      )      
    );
  }

  static async installPushTracker(
    type: 1 | 2 | 3,
    time: string,
    send_time: number,
    additional?: string
  ) {
    return (
      $api.post(`tracks?token=${localStorage.getItem("token")}`, {
        type,
        time,
        additional,
        send_time,
      }),
      {
        headers: {
          accept: "application/json",
          "Content-Type": `multipart/form-data`,
        },
      }
    );
  }

  static async complteteTrack(id: number) {
    return (
      $api.post(
        `tracks/${id}/complete?token=${localStorage.getItem("token")}`,{},  {
          headers: {
            accept: "application/json",
            "Content-Type": `multipart/form-data`,
          },
        }
      )
    
    );
  }

  static async createTrack(type: 1 | 2 | 3, time: string, additional: string) {
    return (
      $api.post(`tracks?token=${localStorage.getItem("token")}`, {
        type,
        time,
        additional,
      }),
      {
        headers: {
          accept: "application/json",
          "Content-Type": `multipart/form-data`,
        },
      }
    );
  }

  static async getTracks(
    date: string
  ): Promise<AxiosResponse<{ data: ITrack[] }>> {
    return $api.get(
      `tracks/?date=${date}&token=${localStorage.getItem("token")}`
    );
  }

  static async updateTrack(data: {
    id: number;
    type?: 1 | 2 | 3;
    additional?: string;
    time?: string;
    send_time?: number;
  }) {

    return (
      $api.patch(
        `tracks/${data.id}?token=${localStorage.getItem("token")}`,data
      ),
      {
        headers: {
          accept: "application/json",
          "Content-Type": "text/plain",
        },
      }
    );
  }

  static async deleteTracker(): Promise<AxiosResponse<{ success: boolean }>> {
    return $api.delete(`tracker?token=${localStorage.getItem("token")}`);
  }
}
