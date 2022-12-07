import { AxiosResponse } from "axios";
import { $api } from "../http";
import { IPurposeResponse } from "../models/IPurpose";
import { IGetTracker, ITrack } from "../models/ITracker";
import { ITracker } from "../Redux/slice/trackerSlice";

export default class TrackerService {
  static async creatingTracker(params: FormData) {
    return $api.post(
      `/v2/tracker/?token=${localStorage.getItem("token")}`,
      params,
      {
        headers: {
          accept: "application/json",
          "Content-Type": `multipart/form-data`,
        },
      }
    );
  }


  static async getTracker():Promise<AxiosResponse<{data:IGetTracker}>> {
    return $api.get(`/v2/tracker/?token=${localStorage.getItem("token")}`);
  }

  
}
