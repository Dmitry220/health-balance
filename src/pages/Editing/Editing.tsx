import React from 'react';
import Header from "../../Components/Header/Header";
import './editing.scss'
import {Camera, CameraResultType} from "@capacitor/camera";
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks';
import { dataUserSelector, isSuccesfullRequestSelector, setUserData, updateProfile } from '../../Redux/slice/userSlice';
import InputMask from "react-input-mask";
import { useForm, Controller } from 'react-hook-form';
import { Toast } from '@capacitor/toast';

interface FormData {
    email: string,
    name: string,
    surname: string,
    phone: string,
    gender: number,
    birthday: string,
    avatar: string
};


export const Editing = () => {

    const { register,handleSubmit,control,formState: { errors }} = useForm<FormData>();

    const dataUser = useAppSelector(dataUserSelector)
    const isSuccesfullRequest = useAppSelector(isSuccesfullRequestSelector)
    const id = Number(localStorage.getItem("id"))
    const dispatch = useAppDispatch()

    console.log('render');    

    const takePicture = async () => {
        const cameraResult = await Camera.getPhoto({
            quality: 90,
            allowEditing: true,
            resultType: CameraResultType.Uri
        });

        const path = cameraResult?.path || cameraResult?.webPath

        console.log(path);        

        //setAvatar(path)
    };


    const showToast = async (text:string) => {
        await Toast.show({
          text: text,
          position:'center'
        });
      };  

    const onSubmit = handleSubmit(({ email,birthday,gender,name,phone,surname,avatar }) => {
        const data = {id,name,surname,gender,birthday,phone,email,avatar}
        dispatch(updateProfile(data)) 
        if(isSuccesfullRequest){
            showToast('Данные успешно сохранены!')
        }else{
            showToast('Ошибка!')
        }              
      }); 


    return (
        <form className={'editing'} onSubmit={onSubmit}>
            <input type="submit" className='editing__submit' value={'Готово'}/>  
            <Header title={'Редактирование'} />          
            <div className="editing__row">
                <div className="editing__wrapper-header">
                    <div className="editing__avatar" onClick={takePicture}>
                        {!dataUser.avatar && <img
                          src={"https://i2.wp.com/www.easttamakidentist.co.nz/wp-content/uploads/2016/10/male-member-placeholder-1.jpg?fit=800%2C800&ssl=1"}
                          alt="avatar"
                        />}
                        {dataUser.avatar &&  <img
                          src={dataUser.avatar}
                          alt="avatar"
                        />}
                        <span>Изменить</span>
                    </div>
                    <div className="editing__names">
                        <div className="editing__caption" style={{margin:0}}>Имя</div>
                        <input className="editing__input" style={{marginBottom:15, padding:"5px 0"}} defaultValue={dataUser.name} {...register("name")}/> 
                        <div className="editing__caption" style={{margin:0}}>Фамилия</div>
                        <input className="editing__input" style={{marginBottom:15, padding:"5px 0"}} defaultValue={dataUser.surname} {...register("surname")}/>
                    </div>
                </div>
                <div className={'editing__gender select-gender'} >
                    <input type="radio" id={'man'} defaultValue={1} defaultChecked={dataUser.gender === 1} {...register("gender")}/>
                    <label htmlFor={'man'}>Мужской</label>
                    <input type="radio" id={'woman'} defaultValue={2} defaultChecked={dataUser.gender === 2} {...register("gender")}/>
                    <label htmlFor={'woman'}>Женский</label>
                </div>
            </div>
            <div className="editing__row">
                <div className="editing__caption">Email</div>
                <input className="editing__input" defaultValue={dataUser.email} {...register("email")}/>
                <div className="editing__caption">Телефон</div>                
                <Controller
                    control={control}        
                    name="phone"
                    rules={{ required: true }}
                    defaultValue={dataUser.phone}
                    render={({ field }) =>  <InputMask className="editing__input" {...field}  mask="+7 (999) 999-99-99" placeholder="+7 (---) --------"/>}
                />           
                <div className="editing__caption">Дата рождения</div>
                <input className="editing__input" defaultValue={dataUser.birthday+''} {...register("birthday")}/>                
            </div>  
        </form>
    );
};
