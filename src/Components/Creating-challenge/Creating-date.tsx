import React, {useEffect, useState} from 'react';
import './creating-challenge.scss'
import {ScrollPicker} from "../Scroll-picker/Scroll-picker";
import {getItemsDays, getItemsMonth, getItemsYear} from "../../utils/common-functions";
import DatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css'
import {registerLocale} from "react-datepicker";
import ru from 'date-fns/locale/ru';
import arrowRight from '../../assets/image/Calendar/arrow-right.svg'
import arrowLeft from '../../assets/image/Calendar/arrow-left.svg'
import axios from "axios";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";
registerLocale('ru', ru)

export const CreatingDate = () => {

    const itemDays = getItemsDays()
    const itemMonths = getItemsMonth()
    const itemYears = getItemsYear(1970, 2020)

    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<any>(new Date().setDate(new Date().getDate() + 3));
    const onChange = (dates: any) => {
        const [start, end] = dates;
            setStartDate(start);
            setEndDate(end);

    };


    const [day, setDay] = useState<string>('15')
    const [month, setMonth] = useState<string>('6')
    const [year, setYear] = useState<string>('1998')

    useEffect(()=>{
        let day = document.querySelectorAll('.react-datepicker__day')
        day.forEach(item=>{
         //   if(item.classList.contains('-selectedStart')){

                item.innerHTML = `<span class="plank">${item.textContent}</span>`
           // }
        })
    }, [endDate])

    const onChangeDay = (value: string) => setDay(value)

    const onChangeMonth = (value: any) => setMonth(value)

    const onChangeYear = (value: string) => setYear(value)

    useEffect(()=>{
        (async () => {
            const res = await axios.get('http://test.health-balance.ru/api/v2/platforms',{
                headers: {
                    "Content-Type": "aplication/json",
                    //"X-API-KEY": API_KEY,
                },
            })
            console.log(res.data.data)
        })();
    }, [])

    return (
        <div className={'creating-date'}>
            <div className="creating-date__title creating-title">Даты</div>
            <div className="creating-date__sub-title creating-sub-title">Начало регистрации
                <span>{day + '.' + (month.length === 1 ? '0' + month : month )+ '.' + year}</span>
            </div>
            <div className={'creating-date__picker'}>
                <div className="creating-date__picker-item">
                    <ScrollPicker onChange={onChangeDay} items={itemDays} value={day}/>
                </div>
                <div className="creating-date__picker-item">
                    <ScrollPicker onChange={onChangeMonth} items={itemMonths} value={month}/>
                </div>
                <div className="creating-date__picker-item">
                    <ScrollPicker onChange={onChangeYear} items={itemYears} value={year}/>
                </div>
            </div>
            <div className="creating-date__sub-title creating-sub-title">Продолжительность челленджа
                <span>{startDate && startDate.toLocaleString().substring(0, 10)} - {endDate && endDate.toLocaleString().substring(0, 10)}</span>
            </div>
            <div className="creating-date__calendar">
                <DatePicker
                    renderCustomHeader={({
                                             monthDate,
                                             decreaseMonth,
                                             increaseMonth,
                                             prevMonthButtonDisabled,
                                             nextMonthButtonDisabled,
                                         }) => (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled} className={'calendar-arrow-button'}>
                                <img src={arrowLeft} alt="arrowLeft"/>
                            </button>
                            <span className="react-datepicker__current-month">
                                {monthDate.toLocaleString("ru", {
                                    month: "long",
                                    year: "numeric",
                                })}
                            </span>
                            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}  className={'calendar-arrow-button'}>
                                <img src={arrowRight} alt="arrowRight"/>
                            </button>
                        </div>
                    )}
                    wrapperClassName={'datePickerCustom'}
                    dateFormat='dd.MM.yyyy'
                    selected={startDate}
                    onChange={onChange}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    inline
                    locale={ru}
                />
            </div>

        </div>
    );
};

