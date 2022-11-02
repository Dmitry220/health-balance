import {useAppDispatch, useAppSelector} from "../../utils/hooks/redux-hooks";
import {setDisabledButton, setSurname, surNameSelector} from "../../Redux/slice/registrationSlice";
import React, { useEffect } from "react";

export const SurName = () => {

    const surName = useAppSelector(surNameSelector)
    const dispatch = useAppDispatch()

    useEffect(()=>{
        if(surName){
            dispatch(setDisabledButton(false))
        }
    }, [])

    const validateSurname = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        dispatch(setSurname(value))
        value.length < 3 ? dispatch(setDisabledButton(true)) : dispatch(setDisabledButton(false))
    }
    return (
        <div style={{position: "relative"}}>
            <input type="text" className="registration__field _field" value={surName}
                   onChange={validateSurname}/>
            <span className={'registration__sub-text-input'}>Это обязательное поле</span>
        </div>
    )
}
