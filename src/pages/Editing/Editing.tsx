import React, {useState} from 'react';
import Header from "../../Components/Header/Header";
import './editing.scss'

export const Editing = () => {

    const [gender, setGender] = useState<string>('Мужской')

    const handlerGender = (e: React.ChangeEvent<HTMLInputElement>) => setGender(e.target.value)

    return (
        <div className={'editing'}>
            <Header title={'Редактирование'} />
            <div className="editing__row">
                <div className="editing__wrapper-header">
                    <div className="editing__avatar">
                        <img
                            src="https://i2.wp.com/www.easttamakidentist.co.nz/wp-content/uploads/2016/10/male-member-placeholder-1.jpg?fit=800%2C800&ssl=1"
                            alt="avatar"
                        />
                        <span>Изменить</span>
                    </div>

                    <div className="editing__names">
                        <div className="editing__caption" style={{margin:0}}>Имя</div>
                        <input type="text" className="editing__input" style={{marginBottom:15, padding:"5px 0"}} value={'Усейн'}/>
                        <div className="editing__caption" style={{margin:0}}>Фамилия</div>
                        <input type="text" className="editing__input" style={{marginBottom:15, padding:"5px 0"}} value={'Болт'}/>
                    </div>
                </div>
                <div className={'editing__gender select-gender'} onChange={handlerGender}>
                    <input type="radio" id={'man'} name={'gender'} value={'Мужской'} defaultChecked={true}/>
                    <label htmlFor={'man'}>Мужской</label>
                    <input type="radio" id={'woman'} name={'gender'} value={'Женский'}/>
                    <label htmlFor={'woman'}>Женский</label>
                </div>
            </div>
            <div className="editing__row">
                <div className="editing__caption">Email</div>
                <input type="text" className="editing__input" value={'useinbolt@gmail.com'}/>
                <div className="editing__caption">Телефон</div>
                <input type="text" className="editing__input" value={'+7 937 719 91 40'}/>
                <div className="editing__caption">Дата рождения</div>
                <input type="text" className="editing__input" value={'18.09.1988'}/>
            </div>
        </div>
    );
};
