import React, {ChangeEvent, useState} from 'react';
import Header from "../../Components/Header/Header";

interface IRubric {
    id: number,
    title?: string
}

const rubrics = [
    {
        id: 1,
        title: "Психология"
    },
    {
        id: 2,
        title: "Интсрукция"
    },
    {
        id: 3,
        title: "Мотивация"
    },
    {
        id: 4,
        title: "Новость"
    },
]

export const RubricPage = () => {

    const [checkedValues, setCheckedValues] = useState<IRubric[]>([])

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {

        const checked = e.target.checked

        checked ? setCheckedValues(prev => [...prev, {
                id: +e.target.value,
            }]) :
            setCheckedValues(prev => [...prev.filter(item => item.id !== +e.target.value)])
    }

    return (
        <div className={'rubric-page'}>
            <Header title={'Рубрики'} />
            <div className="custom-checkbox">
                {rubrics.map((item:any, i:number)=>(<div key={item.id}>
                    <input value={item.id} type="checkbox" name={'radio'+item.id} className={'custom-checkbox__checkbox'} id={i+item.id} onChange={handleChange} />
                    <label htmlFor={i+item.id}>{item.title}</label>
                </div>))}
            </div>
        </div>
    )
}
