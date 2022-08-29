import React, {useState} from 'react';
import './creating-challenge.scss'
import {ScrollPicker} from "../Scroll-picker/Scroll-picker";
import {getItemsDays, getItemsMonth, getItemsYear} from "../../utils/common-functions";
import DatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css'
import {registerLocale} from "react-datepicker";
import ru from 'date-fns/locale/ru';

registerLocale('ru', ru)

export const CreatingDate = () => {

    const itemDays = getItemsDays()
    const itemMonths = getItemsMonth()
    const itemYears = getItemsYear(1970, 2020)

    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<any>(null);
    const onChange = (dates: any) => {
        const [start, end] = dates;
            setStartDate(start);
            setEndDate(end);

    };


    const [day, setDay] = useState<string>('15')
    const [month, setMonth] = useState<string>('6')
    const [year, setYear] = useState<string>('1998')


    const onChangeDay = (value: string) => setDay(value)

    const onChangeMonth = (value: any) => setMonth(value)

    const onChangeYear = (value: string) => setYear(value)

    return (
        <div className={'creating-date'}>
            <div className="creating-date__title creating-title">Даты</div>
            <div className="creating-date__sub-title creating-sub-title">Начало регистрации
                <span>{day + '.' + month + '.' + year}</span>
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
                                             date,
                                             changeYear,
                                             monthDate,
                                             changeMonth,
                                             decreaseMonth,
                                             increaseMonth,
                                             prevMonthButtonDisabled,
                                             nextMonthButtonDisabled,
                                         }) => (
                        <div
                            style={{
                                marginBottom: 20,
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                                {"<"}
                            </button>
                            <span className="react-datepicker__current-month">
                                {monthDate.toLocaleString("ru", {
                                    month: "long",
                                    year: "numeric",
                                })}
                            </span>

                            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                                {">"}
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

