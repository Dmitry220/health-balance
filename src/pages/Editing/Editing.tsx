import { useState } from 'react'
import Header from '../../Components/Header/Header'
import './editing.scss'
import { Camera, CameraResultType } from '@capacitor/camera'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks'
import {
  dataUserSelector,
  isSuccesfullRequestSelector,
  updateProfile
} from '../../Redux/slice/profileSlice'
import InputMask from 'react-input-mask'
import { useForm, Controller } from 'react-hook-form'
import { Toast } from '@capacitor/toast'
import 'react-datepicker/dist/react-datepicker.css'
import ReactDatePicker, { registerLocale } from 'react-datepicker'
import ru from 'date-fns/locale/ru'
import photo from '../../assets/image/icon-camera-add.svg'
import FileService from '../../services/FilesServices'
import { IMAGE_URL } from '../../http'
import { ModalExit } from '../../Components/Modals/Modal-exit'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../Redux/slice/authSlice'
import AuthService from '../../services/AuthService'

registerLocale('ru', ru)

interface FormData {
  email: string
  name: string
  surname: string
  phone: string
  gender: number
  birthdayParameter: Date
}

export const Editing = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FormData>()

  const dataUser = useAppSelector(dataUserSelector)
  const [isLogoutModal, setLogoutModal] = useState<boolean>(false)
  const id = Number(localStorage.getItem('id'))
  const [avatar, setAvatar] = useState<any>()
  const [photoPath, setPhotoPath] = useState<any | null>(null)
  const [isLoadingAvatar, setIsLoadingAvatar] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const showToast = async (text: string) => {
    await Toast.show({
      text: text,
      position: 'center'
    })
  }

  const onSubmit = handleSubmit(
    ({ email, birthdayParameter, gender, name, phone, surname }) => {
      const birthday = birthdayParameter.getTime() / 1000
      const data = { id, name, surname, gender, birthday, phone, email, avatar }
      dispatch(updateProfile(data))
    }
  )

  const dowloadPicture = async () => {
    const image = await Camera.getPhoto({
      quality: 50,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      promptLabelPhoto: "Выбрать фото из галерии",
      promptLabelPicture:"Сделать фотографию"
    })

    let imageUrl = image.webPath || ''

    let blob = await fetch(imageUrl).then((r) => r.blob())
    setIsLoadingAvatar(true)

    if (blob) {
      const formData = new FormData()
      formData.append('image', blob)
      try {
        const response = await FileService.uploadFile(formData)
        setPhotoPath(imageUrl)
        setAvatar(response.data.data.avatar)
        setIsLoadingAvatar(false)
      } catch (error) {
        setIsLoadingAvatar(false)
        await showToast('Изображение слишком много весит')
        setPhotoPath('')
      }
    } else {
      await showToast('Изображения нет')
    }
  }

  if(isLogoutModal){
    return <ModalExit actionCallback={async ()=>{
      const response = await AuthService.deleteCustomerAccount()
      if(response.data.success){
        dispatch(logout())
        await showToast('Ваш аккаунт успешно удален!')
      }else{
        await showToast('Ошибка')
      }     
    }} 
    closeCallback={setLogoutModal}
    text={"Вы действительно хотите удалить аккаунт?"}
    />
 }

  return (
    <form className={'editing'} onSubmit={onSubmit}>
      <input type='submit' className='editing__submit' value={'Готово'} />
      <Header title={'Редактирование'} />
      <div className='editing__row'>
        <div className='editing__wrapper-header'>
          <div className='editing__avatar'>
            {/* <input type={'file'} onChange={dowloadPicture} id='file' /> */}
            {!isLoadingAvatar ? (
              <div className='editing__label' onClick={dowloadPicture}>
                {!dataUser.avatar && !photoPath && (
                  <img
                    src={photo}
                    style={{ borderRadius: 0, objectFit: 'contain' }}
                    alt='avatar'
                  />
                )}
                {(dataUser.avatar || photoPath) && (
                  <img
                    src={photoPath || IMAGE_URL + 'avatars/' + dataUser.avatar}
                    alt='avatar'
                  />
                )}
                <span>Изменить</span>
              </div>
            ) : (
              <h1>Загружается...</h1>
            )}
          </div>
          <div className='editing__names'>
            <div className='editing__caption' style={{ margin: 0 }}>
              Имя
            </div>
            <input
              className='editing__input'
              style={{ marginBottom: 15, padding: '5px 0' }}
              defaultValue={dataUser.name}
              {...register("name", {
                required: true,
                minLength: 2,
                maxLength: 20
              })}
              aria-invalid={errors.name ? "true" : "false"}
            />
            {errors.name?.type === 'required' && <p role="alert" className='editing__error'>Данное поле не может быть пустым</p>}
            {errors.name?.type === 'maxLength' && <p role="alert" className='editing__error'>Длина имени должна быть от 2 до 20 символов</p>}
            {errors.name?.type === 'minLength' && <p role="alert" className='editing__error'>Длина имени должна быть от 2 до 20 символов</p>}
            <div className='editing__caption' style={{ margin: 0 }}>
              Фамилия
            </div>
            <input
              className='editing__input'
              style={{ marginBottom: 15, padding: '5px 0' }}
              defaultValue={dataUser.surname}
              {...register('surname', {
                required: true,
                minLength: 2,
                maxLength: 20
              })}
            />
            {errors.surname?.type === 'required' && <p role="alert" className='editing__error'>Данное поле не может быть пустым</p>}
            {errors.surname?.type === 'maxLength' && <p role="alert" className='editing__error'>Длина фамилии должна быть от 2 до 20 символов</p>}
            {errors.surname?.type === 'minLength' && <p role="alert" className='editing__error'>Длина фамилии должна быть от 2 до 20 символов</p>}
          </div>
        </div>
        <div className={'editing__gender select-gender'}>
          <input
            type='radio'
            id={'man'}
            defaultValue={1}
            defaultChecked={dataUser.gender === 1}
            {...register('gender')}
          />
          <label htmlFor={'man'}>Мужской</label>
          <input
            type='radio'
            id={'woman'}
            defaultValue={2}
            defaultChecked={dataUser.gender === 2}
            {...register('gender')}
          />
          <label htmlFor={'woman'}>Женский</label>
        </div>
      </div>
      <div className='editing__row'>
        <div className='editing__caption'>Email</div>
        <input
          className='editing__input'
          defaultValue={dataUser.email}
          {...register('email', {
            pattern: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
          })}
        />
        {errors.email?.type === 'pattern' && <p role="alert" className='editing__error'>Не валидный email</p>}
        <div className='editing__caption'>Телефон</div>
        <Controller
          control={control}
          name='phone'
          rules={{ required: true, pattern: /^([+]?[0-9\s-\(\)]{3,25})*$/i }}
          defaultValue={dataUser.phone}
          render={({ field }) => (
            <InputMask
              className='editing__input'
              {...field}
              mask='+7 (999) 999-99-99'
              placeholder='+7 (---) --------'
            />
          )}
        />
        {errors.phone?.type === 'pattern' && <p role="alert" className='editing__error'>Не корректный номер телефона</p>}
        <div className='editing__caption'>Дата рождения</div>
        <Controller
          control={control}
          name='birthdayParameter'
          // rules={{ required: true }}
          defaultValue={new Date(dataUser.birthday * 1000)}
          render={({ field: { value, ...fieldProps } }) => (
            <ReactDatePicker
              {...fieldProps}
              className='editing__input'
              selected={value}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dateFormat='dd.MM.yyyy'
              dropdownMode='select'
              locale={ru}
            />
          )}
        />
      </div>
      <div className='editing__row'>
        <div className='editing__delete'onClick={() => setLogoutModal(true)}>
          Удалить аккаунт
        </div>
      </div>
    </form>
  )
}
