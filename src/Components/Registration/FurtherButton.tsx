import React, {Dispatch, FC, SetStateAction} from "react";
import {useAppDispatch, useAppSelector} from "../../utils/hooks/redux-hooks";
import {avatarSelector, daySelector, disableButtonSelector, emailSelector, genderSelector, 
    monthSelector, nameUserSelector, passwordSelector, platformSelector, requestRegistration, setDisabledButton, surNameSelector, telephoneSelector, yearSelector} from "../../Redux/slice/authSlice";
import { Device } from '@capacitor/device';
import './registration.scss'

export interface IFurtherButton {
    order: number,
    setOrder: Dispatch<SetStateAction<number>>,
}


export const FurtherButton: FC<IFurtherButton> = ({order, setOrder}) => {

    const disabledButton = useAppSelector(disableButtonSelector)
    const dispatch = useAppDispatch()   

    const indexIdenticalButtons = [0, 1,2,3,4,5,6]

    return (
        <div className="registration__nav">               
            {
                order > 0 && order <= 7 &&          
                <button className={'registration__button _button-white'}
                        onClick={()=>{
                            setOrder((prev) => prev - 1)                           
                            order !== 5 && order !== 4 && dispatch(setDisabledButton(false))
                        }}
                >Назад
                </button>
            }
            {indexIdenticalButtons.includes(order) &&
                <button className={'registration__button _button-white' + (disabledButton ? ' disabled' : '')}
                        disabled={disabledButton}
                        onClick={() => {
                            setOrder((prev) => prev + 1)                           
                           order !== 2 && order !== 3 && dispatch(setDisabledButton(true))                                                                              
                        }}
                >{order !== 7 ? 'Далее' : 'Завершить регистрацию'}
                </button>
            }    
            {
                order === 8 && <ButtonSubmit order={order} setOrder={setOrder} />      
            }        
        </div>
    )
}

const ButtonSubmit:FC<IFurtherButton> = ({order, setOrder}) => {

    const dispatch = useAppDispatch()
    const month= useAppSelector(monthSelector)
    const day= useAppSelector(daySelector)
    const year= useAppSelector(yearSelector)

    const disabledButton = useAppSelector(disableButtonSelector)
    const email = useAppSelector(emailSelector)
    const password = useAppSelector(passwordSelector)
    const phone = useAppSelector(telephoneSelector)
    const avatar = useAppSelector(avatarSelector)
    const name = useAppSelector(nameUserSelector)
    const surname = useAppSelector(surNameSelector)
    const gender = useAppSelector(genderSelector)
    const birhday = day +'.'+ (month.length === 2 ? month : '0'+month)+'.' + year

    const platform = useAppSelector(platformSelector)
  
    
    const submitRegistration = async () => {
        setOrder((prev) => prev + 1) 
        dispatch(setDisabledButton(true))   

        const uuid = await Device.getId();
        let formData = new FormData()
       
        const device_token = uuid.uuid
        
        dispatch(requestRegistration({name, surname, birhday,gender,avatar,phone,email,password,device_token,platform,formData}))
  
    }
    return (
        <div style={{textAlign: 'center'}}>
        <button className={'registration__button _button-white' + (disabledButton ? ' disabled' : '')}
                disabled={disabledButton}
                onClick={submitRegistration}
        >Сохранить
        </button>
        <span className="registration__link text-yellow" onClick={submitRegistration}>Пропустить</span>
        </div>
    )
}