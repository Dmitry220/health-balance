import { AxiosResponse } from "axios";
import { $api } from "../http";
import { IUpdateUser, IUser } from "../models/IUsers";

export default class UserService {
  static async getUserDataOnId(
    id: number
  ): Promise<AxiosResponse<{ data: IUser }>> {
    return $api.get(`customers/${id}`);
  }

  static async editingProfile(data: IUpdateUser) {
    return $api.patch(
      `customers/?token=${localStorage.getItem("token")}`,
      data
    );
  }
}
