import {getItemsDays, getItemsMonth, getItemsYear} from "../../utils/common-functions";
import {useAppDispatch, useAppSelector} from "../../utils/hooks/redux-hooks";
import {daySelector, monthSelector, setDay, setMonth, setYear, yearSelector} from "../../Redux/slice/registrationSlice";
import {ScrollPicker} from "../Scroll-picker/Scroll-picker";
import React from "react";

export const Birthday = () => {

    const itemDays = getItemsDays()
    const itemMonths = getItemsMonth()
    const itemYears = getItemsYear(1970, 2020)

    const day = useAppSelector(daySelector)
    const month = useAppSelector(monthSelector)
    const year = useAppSelector(yearSelector)

    const dispatch = useAppDispatch()

    const onChangeDay = (value: string) => dispatch(setDay(value))
    const onChangeMonth = (value: any) => dispatch(setMonth(value))
    const onChangeYear = (value: string) => dispatch(setYear(value))


    return (
        <div className={'registration__picker'}>
            <div className="registration__picker-item">
                <ScrollPicker onChange={onChangeDay} items={itemDays} value={day}/>
            </div>
            <div className="registration__picker-item">
                <ScrollPicker onChange={onChangeMonth} items={itemMonths} value={month}/>
            </div>
            <div className="registration__picker-item">
                <ScrollPicker onChange={onChangeYear} items={itemYears} value={year}/>
            </div>
        </div>
    )
}