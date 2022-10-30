import {instance} from "./api";


export const registrationAPI = {

    getPlatforms() {
        return instance.get(`v2/platforms`);
    },
};