import { AxiosResponse } from "axios";
import { $api } from "../http";
import { IDynamics, IGetProgressAndIDPolls, IListReport, IQuestionnaire, ISaveCurrentResult } from "../models/IHealthIndex";

export default class HealthIndexService {
  static async saveCurrentResult(
    id: number,
    params: ISaveCurrentResult
  ): Promise<AxiosResponse<{ data: { progress: number } }>> {
    return $api.post(
      `polls/${id}/answers?token=${localStorage.getItem("token")}`,
      params,
      {
        headers: {
          accept: "application/json",
          "Content-Type": `multipart/form-data`,
        },
      }
    );
  }

  static async getProgressAndIdPolls(): Promise<
    AxiosResponse<{ data: IGetProgressAndIDPolls }>
  > {
    return $api.post(`polls/?token=${localStorage.getItem("token")}`, {
      headers: {
        accept: "application/json",
        "Content-Type": `multipart/form-data`,
      },
    });
  }

  static async interruptPoll(
    id: number
  ): Promise<AxiosResponse<{ data: { success: boolean } }>> {
    return $api.patch(
      `polls/${id}/interrupt?token=${localStorage.getItem("token")}`,
      {
        headers: {
          accept: "application/json",
          "Content-Type": `application/x-www-form-urlencoded`,
        },
      }
    );
  }

  static async generateResultsPoll(
    id: number
  ): Promise<AxiosResponse<{ data: { success: boolean } }>> {
    return $api.post(
      `polls/${id}/generate-result?token=${localStorage.getItem("token")}`,
      {
        headers: {
          accept: "application/json",
          "Content-Type": `application/x-www-form-urlencoded`,
        },
      }
    );
  }

  static async getQuestionnaire(): Promise<AxiosResponse<{data:IQuestionnaire[]}>> {
    return $api.get(`questions/?token=${localStorage.getItem("token")}`);
  }

  static async getDynamics(): Promise<AxiosResponse<{data:IDynamics[]}>> {
    return $api.get(`dynamics/?token=${localStorage.getItem("token")}`);
  }

  static async getListReports(): Promise<AxiosResponse<{data:IListReport[]}>> {
    return $api.get(`indexes/?token=${localStorage.getItem("token")}`);
  }

  static async getReport(idIndex:number){
    return $api.get(`indexes/${idIndex}?token=${localStorage.getItem("token")}`);
  }
}
