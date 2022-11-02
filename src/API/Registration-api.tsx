import {instance} from "./api";


export const registrationAPI = {

    getPlatforms() {
        return instance.get(`v2/platforms`);
    },
    customers(name:string,surname:string,birthday:Date,gender:number, avatar:string,phone:string, email:string, password:string, device_token:string,platform:number | null) {
        return instance.post(`v2/customers`,{name,surname,birthday,gender, avatar,phone, email, password, device_token,platform});
    },
};