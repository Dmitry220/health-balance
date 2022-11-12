import React, { FC } from 'react'
import ReactDatePicker, {registerLocale} from 'react-datepicker'
import arrowRight from '../../assets/image/Calendar/arrow-right.svg'
import arrowLeft from '../../assets/image/Calendar/arrow-left.svg'
import ru from 'date-fns/locale/ru';
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import './calendar.scss'
import { getItemsMonth } from '../../utils/common-functions';
import 'react-datepicker/dist/react-datepicker.css'

registerLocale('ru', ru)

interface ICalendar {
  
}

export const Calendar:FC<ICalendar> = () => {

    const CustomInput = React.forwardRef(({ value, onClick }:any, ref:any) => (
        <button className='editing__input' onClick={onClick} ref={ref}>
          {value}
        </button>
      ))

      const months = getItemsMonth() 
      months.forEach(item=>item.toLocaleLowerCase()) 
      console.log(months.indexOf('Март'));
      
      
      const appp = (monthDate:Date) => {
    
        const temp = monthDate.toLocaleDateString().substring(3,5)
        console.log( temp.length === 2 ? +temp.substring(1) : +temp);
        
        return temp.length === 2 ? +temp.substring(1)-1 : +temp-1
    }

  return (
	 <div
                    // renderCustomHeader={({
                    //                          monthDate,
                    //                          decreaseMonth,
                    //                          changeMonth,
                    //                          increaseMonth,
                    //                          prevMonthButtonDisabled,
                    //                          nextMonthButtonDisabled,
                    //                      }) => {
                    //                         let selectedMonth = monthDate.toLocaleString("ru", {
                    //                             month: "long",
                    //                            // year: "numeric",
                    //                         })
                    //                         console.log('f',selectedMonth[0].toLocaleUpperCase() + selectedMonth.slice(1));
                                            
                    //                         return <div className='calendar-header'>
                    //         <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled} className={'calendar-arrow-button'}>
                    //             <img src={arrowLeft} alt="arrowLeft"/>
                    //         </button>
                    //         <span className="react-datepicker__current-month">
                    //             {monthDate.toLocaleString("ru", {
                    //                 month: "long",
                    //                  year: "numeric",
                    //             })}
                    //         </span>
                    //         {/* <select                            
                    //             value={selectedMonth[0].toLocaleUpperCase() + selectedMonth.slice(1)}
                    //         >
                    //             {months.map((option) => (
                    //             <option key={option} value={option}>
                    //             {option}
                    //             </option>
                    //             ))}                                
                    //         </select> */}
                    //         <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}  className={'calendar-arrow-button'}>
                    //             <img src={arrowRight} alt="arrowRight"/>
                    //         </button>
                    //     </div>
                    //                      }}
                  //  className='editing__input'                    
                    //wrapperClassName={'datePickerCustom'}
                   // dateFormat='dd.MM.yyyy'
                  //  selected={selectedDate}
                  //  selectsRange={selectsRange}                    
                  //  startDate={startDate}
                 //   endDate={endDate}
                  //  peekNextMonth
                  //  showMonthDropdown
                   // showYearDropdown
                   // dropdownMode="select"
                   // fixedHeight
                    // showYearDropdown
                    // dateFormatCalendar="MMMM"
                    // yearDropdownItemNumber={15}
                    // scrollableYearDropdown
                    //inline={inline}
                    //showMonthYearDropdown
                  //  locale={ru}
                    //customInput={<CustomInput/>}
                />
  )
}

/*

<ReactDatePicker
renderCustomHeader={({
  monthDate,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
  changeMonth,
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
{/* <select
value={getYear(date)}
onChange={({ target: { value } }) => changeYear(value)}
>
{years.map((option) => (
<option key={option} value={option}>
  {option}
</option>
))}
</select> *-/}

<select
// //@sts-ignore
value={months[appp(monthDate)]}
onChange={({ target: { value } }) =>
changeMonth(months.indexOf(value))
}
>
{months.map((option) => (
<option key={option} value={option}>
  {option + 'dsfg' + appp(monthDate)}
</option>
))}
</select>
</span>
<button onClick={increaseMonth} disabled={nextMonthButtonDisabled}  className={'calendar-arrow-button'}>
<img src={arrowRight} alt="arrowRight"/>
</button>
</div>
)}
  className="input"
  placeholderText="Дата рождения"
  onChange={(e) => field.onChange(e)}
  selected={field.value}
  customInput={<CustomInput />}
  dateFormat='dd.MM.yyyy'
/>
*/