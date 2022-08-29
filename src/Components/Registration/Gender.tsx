import {useAppDispatch} from "../../Redux/hooks";
import React from "react";
import {setGender} from "../../Redux/slice/registrationSlice";

export const Gender = () => {

    const dispatch = useAppDispatch()

    const handlerGender = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(setGender(e.target.value))

    return (
        <div className={'registration__gender select-gender'} onChange={handlerGender}>
            <input type="radio" id={'man'} name={'gender'} value={'Мужской'} defaultChecked={true}/>
            <label htmlFor={'man'}>Мужской</label>
            <input type="radio" id={'woman'} name={'gender'} value={'Женский'}/>
            <label htmlFor={'woman'}>Женский</label>
        </div>
    )
}