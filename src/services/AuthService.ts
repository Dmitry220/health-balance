import { AxiosResponse } from "axios";
import { $api } from "../http";
import { IAuthResponse } from "../models/IAuth";

export default class AuthService {
  static async registration(
    name: string,
    surname: string,
    birthday: number,
    gender: number,
    avatar: string,
    phone: string,
    email: string,
    password: string,
    device_token: string,
    platform: number | null
  ) {
    const formData: FormData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("name", name);
    formData.append("surname", surname);
    formData.append("gender", gender + "");
    formData.append("avatar", avatar);
    formData.append("birthday", birthday + "");
    formData.append("device_token", device_token);
    formData.append("platform", platform + "");
    formData.append("phone", phone);

    return $api.post("/v2/customers", formData, {
      headers: {
        accept: "application/json",
        "Content-Type": `multipart/form-data`,
      },
    });
  }

  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<IAuthResponse>> {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    return $api.post("/v2/login", formData, {
      headers: {
        accept: "application/json",
        "Content-Type": `application/x-www-form-urlencoded`,
      },
    });
  }

  static async getPlatfotms() {
    return $api.get("/v2/platforms");
  }

  static async restorePassword(email: string) {
    return $api.post("/v2/restore_password", {email}, {
      headers: {
        accept: "application/json",
        "Content-Type": `multipart/form-data`,
      },
    });
  }

  static async updatePassword(email: string, code:number, password:string) {
    return $api.post("/v2/update_password", {email,code,password}, {
      headers: {
        accept: "application/json",
        "Content-Type": `multipart/form-data`,
      },
    });
  }
}
