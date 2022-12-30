import { AxiosResponse } from "axios";
import { $api } from "../http";
import { IDynamics, IGetProgressAndIDPolls, IListReport, IQuestionnaire } from "../models/IHealthIndex";

export default class HealthIndexService {
  static async saveCurrentResult(
    id: number,
    params: FormData
  ): Promise<AxiosResponse<{ data: { progress: number } }>> {
    return $api.post(
      `/v2/polls/${id}/answers?token=${localStorage.getItem("token")}`,
      params,
      {
        headers: {
          accept: "application/json",
          "Content-Type": `application/x-www-form-urlencoded`,
        },
      }
    );
  }

  static async getProgressAndIdPolls(): Promise<
    AxiosResponse<{ data: IGetProgressAndIDPolls }>
  > {
    return $api.post(`/v2/polls/?token=${localStorage.getItem("token")}`, {
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
      `/v2/polls/${id}/interrupt?token=${localStorage.getItem("token")}`,
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
      `/v2/polls/${id}/generate-result?token=${localStorage.getItem("token")}`,
      {
        headers: {
          accept: "application/json",
          "Content-Type": `application/x-www-form-urlencoded`,
        },
      }
    );
  }

  static async getQuestionnaire(): Promise<AxiosResponse<{data:IQuestionnaire[]}>> {
    return $api.get(`/v2/questions/?token=${localStorage.getItem("token")}`);
  }

  static async getDynamics(): Promise<AxiosResponse<{data:IDynamics[]}>> {
    return $api.get(`/v2/dynamics/?token=${localStorage.getItem("token")}`);
  }

  static async getListReports(): Promise<AxiosResponse<{data:IListReport[]}>> {
    return $api.get(`/v2/indexes/?token=${localStorage.getItem("token")}`);
  }

  static async getReport(idIndex:number){
    return $api.get(`/v2/indexes/${idIndex}?token=${localStorage.getItem("token")}`);
  }
}
