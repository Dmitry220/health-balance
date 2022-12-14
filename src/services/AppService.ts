import { AxiosResponse } from "axios";
import { $api } from "../http";
import { IBalance, IStepsPerDay, IStepsPerMonth } from "../models/IApp";

export default class AppService {
  static getBalance(): Promise<AxiosResponse<{ data: IBalance }>> {
    return $api.get(`/v2/balance?token=${localStorage.getItem("token")}`);
  }

  static updateSteps(params: FormData) {
    return $api.post(
      `/v2/steps?token=${localStorage.getItem("token")}`,
      params,
      {
        headers: {
          accept: "application/json",
          "Content-Type": `multipart/form-data`,
        },
      }
    );
  }

  static getStepsPerDay(start_date:string, end_date:string): Promise<AxiosResponse<{ data: IStepsPerDay[] }>> {
    return $api.get(`/v2/steps?end_date=${end_date}&start_date=${start_date}&token=${localStorage.getItem("token")}`);
  }

  static getStepsPerWeekAndMonth(start_date:string, end_date:string, type:1|2){
    return $api.get(`/v2/steps?end_date=${end_date}&start_date=${start_date}&type=${type}&token=${localStorage.getItem("token")}`);
  }
}
