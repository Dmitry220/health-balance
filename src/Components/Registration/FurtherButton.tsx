import React, {Dispatch, FC, SetStateAction} from "react";
import { Link } from "react-router-dom";
import { START_ROUTE } from "../../provider/constants-route";
import {useAppDispatch, useAppSelector} from "../../utils/hooks/redux-hooks";
import {disableButtonSelector, requestRegistration, setDisabledButton} from "../../Redux/slice/registrationSlice";


export interface IFurtherButton {
    order: number,
    setOrder: Dispatch<SetStateAction<number>>,
}

export const FurtherButton: FC<IFurtherButton> = ({order, setOrder}) => {

    const disabledButton = useAppSelector(disableButtonSelector)
    const dispatch = useAppDispatch()

    const indexIdenticalButtons = [0, 1,2,3,4,5,6]

    const submitRegistration = () => {
        //dispatch(requestRegistration())
        setOrder((prev) => prev + 1) 
        dispatch(setDisabledButton(true))   
    }

    return (
        <>
            {indexIdenticalButtons.includes(order) &&
                <button className={'registration__button _button-white' + (disabledButton ? ' disabled' : '')}
                        disabled={disabledButton}
                        onClick={() => {
                            setOrder((prev) => prev + 1)
                            order !== 2 && order !== 3 && dispatch(setDisabledButton(true))
                        }}
                >Далее
                </button>
            }
            {
                order === 7 &&
            
                <button className={'registration__button _button-white' + (disabledButton ? ' disabled' : '')}
                        disabled={disabledButton}
                        onClick={submitRegistration}
                >Завершить регистрацию
                </button>
            } 
            {
                order === 8 &&
            <>
                <button className={'registration__button _button-white' + (disabledButton ? ' disabled' : '')}
                        disabled={disabledButton}
                        onClick={()=>setOrder((prev) => prev + 1)}
                >Сохранить
                </button>
                <span className="registration__link text-yellow" onClick={()=>setOrder((prev) => prev + 1)}>Пропустить</span>
                </>
            }
        </>
    )
}