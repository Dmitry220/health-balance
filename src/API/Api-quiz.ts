import {instance} from "./api";


export const quizAPI = {

    getQuestionnaire() {
        return instance.get(`/questionary/listing?token=97d058b9f03d4c4ac7668c4c6cb94858f9b2b060`);
    },
};