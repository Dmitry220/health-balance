import { AxiosResponse } from "axios";
import { $api } from "../http";
import { IUpdateUser, IUser } from "../models/IUsers";

export default class UserService {
  static async getUserDataOnId(
    id: number
  ): Promise<AxiosResponse<{ data: IUser }>> {
    return $api.get(`/v2/customers/${id}`);
  }

  static async editingProfile(data: IUpdateUser) {
    return $api.patch(
      `/v2/customers/?token=${localStorage.getItem("token")}`,
      data
    );
  }
}
