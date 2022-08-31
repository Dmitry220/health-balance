import React, {useState} from 'react';
import Header from "../../Components/Header/Header";
import './editing.scss'
import {Camera, CameraResultType} from "@capacitor/camera";
import {setAvatarRegistartion, setDisabledButton} from "../../Redux/slice/registrationSlice";

export const Editing = () => {

    const [gender, setGender] = useState<string>('Мужской')
    const [email, setEmail] = useState<string>('useinbolt@gmail.com')
    const [telephone, setTelephone] = useState<string>('+7 937 719 91 40')
    const [birthday, setBirthday] = useState<string>('18.09.1988')
    const [avatar, setAvatar] = useState<any>(null)
    const [userName, setUserName] = useState<string>('Усейн')
    const [surname, setSurname] = useState<string>('Болт')



    const handlerGender = (e: React.ChangeEvent<HTMLInputElement>) => setGender(e.target.value)
    const handlerEmail = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
    const handlerTelephone = (e: React.ChangeEvent<HTMLInputElement>) => setTelephone(e.target.value)
    const handlerBirthday = (e: React.ChangeEvent<HTMLInputElement>) => setBirthday(e.target.value)
    const handlerUserName = (e: React.ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)
    const handlerSurname = (e: React.ChangeEvent<HTMLInputElement>) => setSurname(e.target.value)

    const takePicture = async () => {
        const cameraResult = await Camera.getPhoto({
            quality: 90,
            allowEditing: true,
            resultType: CameraResultType.Uri
        });

        const path = cameraResult?.path || cameraResult?.webPath

        setAvatar(path)
    };


    return (
        <div className={'editing'}>
            <Header title={'Редактирование'} />
            <div className="editing__row">
                <div className="editing__wrapper-header">
                    <div className="editing__avatar" onClick={takePicture}>
                        {!avatar && <img
                          src={"https://i2.wp.com/www.easttamakidentist.co.nz/wp-content/uploads/2016/10/male-member-placeholder-1.jpg?fit=800%2C800&ssl=1"}
                          alt="avatar"
                        />}
                        {avatar &&  <img
                          src={avatar}
                          alt="avatar"
                        />}
                        <span>Изменить</span>
                    </div>

                    <div className="editing__names">
                        <div className="editing__caption" style={{margin:0}}>Имя</div>
                        <input type="text" className="editing__input" style={{marginBottom:15, padding:"5px 0"}} value={userName} onChange={handlerUserName}/>
                        <div className="editing__caption" style={{margin:0}}>Фамилия</div>
                        <input type="text" className="editing__input" style={{marginBottom:15, padding:"5px 0"}} value={surname} onChange={handlerSurname}/>
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
                <input type="text" className="editing__input" value={email} onChange={handlerEmail}/>
                <div className="editing__caption">Телефон</div>
                <input type="text" className="editing__input" value={telephone} onChange={handlerTelephone}/>
                <div className="editing__caption">Дата рождения</div>
                <input type="text" className="editing__input" value={birthday} onChange={handlerBirthday}/>
            </div>
        </div>
    );
};
