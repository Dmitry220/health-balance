import React, {FC} from "react";
import {useAppSelector} from "../../hooks/redux-hooks";
import {idPolleSelector} from "../../Redux/slice/healthIndexSlice";
import {useNavigate} from "react-router-dom";
import {QUESTIONNAIRE_ROUTE} from "../../provider/constants-route";
import {Navigation} from "../Navigation/Navigation";
import {useGetProgressAndIdPollsMutation, useInterruptPollMutation} from "../../services/HealthIndexService";
import {showToast} from "../../utils/common-functions";

export const ContinueQuestionnaire: FC = () => {

    const idPoll = useAppSelector(idPolleSelector)
    const [getProgress, {}] = useGetProgressAndIdPollsMutation()
    const [interruptPoll,{}] = useInterruptPollMutation()
    const navigate = useNavigate()

    const continueTest = () => {
        navigate(QUESTIONNAIRE_ROUTE)
    }

    const resetTest = async () => {
        try {
            await interruptPoll(idPoll).unwrap();
            await getProgress(null).unwrap();
            navigate(QUESTIONNAIRE_ROUTE)
        } catch (error) {
            await showToast("Ошибка")
        }
    }

    return (
        <div className='continue-questionnaire'>
            <Navigation/>
            <div className='continue-questionnaire__title title'>
                Продолжить <br/> тестирование?
            </div>
            <div className='continue-questionnaire__text'>
                Ваши результаты были сохранены
            </div>
            <div className='_button-dark' onClick={continueTest}>
                Продолжить
            </div>
            <div
                className='_button-dark'
                onClick={resetTest}
                style={{color: '#fff', marginTop: '16px'}}
            >
                Начать сначала
            </div>
        </div>
    )
}