import React, {Dispatch, FC, SetStateAction} from "react";
import { Link } from "react-router-dom";
import { START_ROUTE } from "../../provider/constants";
import {useAppDispatch, useAppSelector} from "../../Redux/hooks";
import {disableButtonSelector, requestRegistration, setDisabledButton} from "../../Redux/slice/registrationSlice";


export interface IFurtherButton {
    order: number,
    setOrder: Dispatch<SetStateAction<number>>,
}

export const FurtherButton: FC<IFurtherButton> = ({order, setOrder}) => {

    const disabledButton = useAppSelector(disableButtonSelector)
    const dispatch = useAppDispatch()

    const submitRegistration = () => {
        //dispatch(requestRegistration())
        setOrder((prev) => prev + 1)
        console.log("465")
    }

    return (
        <>
            {order !== 7 && order !== 8 &&
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
                        onClick={submitRegistration}
                >Сохранить
                </button>
                <Link to={START_ROUTE} className="registration__link text-yellow">Пропустить</Link>
                </>
            }                   
            
        </>
    )
}