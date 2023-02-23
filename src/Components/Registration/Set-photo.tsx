import { useEffect, useState } from 'react'
import './registration.scss'
import photo from '../../assets/image/icon-camera-add.svg'
import { Camera, CameraResultType } from '@capacitor/camera'
import { useAppDispatch } from '../../utils/hooks/redux-hooks'
import {
  setAvatarRegistartion,
  setDisabledButton
} from '../../Redux/slice/authSlice'
import FileService from '../../services/FilesServices'
import { showToast } from '../../utils/common-functions'

export const SetPhoto = () => {
  const [photoPath, setPhotoPath] = useState<any | null>(null)
  const dispatch = useAppDispatch()
  const [isLoadingAvatar, setIsLoadingAvatar] = useState<boolean>(false)

  // const dowloadPicture = async (e: ChangeEvent<HTMLInputElement>) => {
  //   const formData = new FormData()
  //   const file: any = e.target.files

  //   if (file[0]) {
  //     setPhotoPath(URL.createObjectURL(file[0]))
  //     formData.append('image', file[0])
  //     dispatch(setDisabledButton(false))
  //     const response = await FileService.uploadFile(formData)
  //     dispatch(setAvatarRegistartion(response.data.data.avatar))
  //   }
  // }

  const dowloadPicture = async () => {
    const image = await Camera.getPhoto({
      quality: 50,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      promptLabelPhoto: "Выбрать фото из галерии",
      promptLabelPicture:"Сделать фотографию",
      promptLabelHeader:"Фото"
      
    })

    let imageUrl = image.webPath || ''

    let blob = await fetch(imageUrl).then((r) => r.blob())
    setIsLoadingAvatar(true)
    dispatch(setDisabledButton(true))
    if (blob) {
      const formData = new FormData()
      formData.append('image', blob)
      try {
        const response = await FileService.uploadFile(formData)
        if(response.data.data.avatar){
          setPhotoPath(imageUrl)
          dispatch(setAvatarRegistartion(response.data.data.avatar))
        } else{
          await showToast('Максимальный вес изображения 3 мб')
        }   
        setIsLoadingAvatar(false)
        dispatch(setDisabledButton(false))
      } catch (error) {
        setIsLoadingAvatar(false)
        dispatch(setDisabledButton(true))
        await showToast('Максимальный вес изображения 3 мб')
        setPhotoPath('')
      }
    } else {
      await showToast('Изображения нет')
    }
  }

  useEffect(() => {
    if (photoPath) {
      dispatch(setDisabledButton(false))
    } else {
      dispatch(setDisabledButton(true))
    }
  }, [])

  return (
    <div className={'set-photo'}>
      <div className='set-photo__photo'>
        {/* <input type={'file'} onChange={dowloadPicture} id={'avatar'} /> */}
        {!isLoadingAvatar ? (
          <div className='set-photo__label' onClick={dowloadPicture}>
            {!photoPath && (
              <img className={'set-photo__photo-icon-add'} src={photo} alt='' />
            )}
            {photoPath && (
              <img
                className={'set-photo__photo-demo'}
                src={photoPath}
                alt='45'
              />
            )}
          </div>
        ) : (
          <h1>Загружается...</h1>
        )}
      </div>
    </div>
  )
}
