import { ChangeEvent, useEffect, useState } from 'react'
import './registration.scss'
import photo from '../../assets/image/icon-camera-add.svg'
import { Camera, CameraResultType } from '@capacitor/camera'
import { useAppDispatch } from '../../utils/hooks/redux-hooks'
import {
  setAvatarRegistartion,
  setDisabledButton
} from '../../Redux/slice/authSlice'
import { defineCustomElements } from '@ionic/pwa-elements/loader'
import FileService from '../../services/FilesServices'

export const SetPhoto = () => {
  const [photoPath, setPhotoPath] = useState<any | null>(null)
  const dispatch = useAppDispatch()

  const dowloadPicture = async (e: ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData()
    const file: any = e.target.files

    if (file[0]) {
      setPhotoPath(URL.createObjectURL(file[0]))
      formData.append('image', file[0])
      dispatch(setDisabledButton(false))
      const response = await FileService.uploadFile(formData)
      dispatch(setAvatarRegistartion(response.data.data.avatar))
    }
  }

  useEffect(() => {
    if (photoPath) {
      dispatch(setDisabledButton(false))
    }else{
      dispatch(setDisabledButton(true))
    }
  }, [])

  return (
    <div className={'set-photo'}>
      <div className='set-photo__photo'>
        <input type={'file'} onChange={dowloadPicture} id={'avatar'} />
        <label className='editing__label' htmlFor='avatar'>
          {!photoPath && (
            <img className={'set-photo__photo-icon-add'} src={photo} alt='' />
          )}
          {photoPath && (
            <img className={'set-photo__photo-demo'} src={photoPath} alt='45' />
          )}
        </label>
      </div>
    </div>
  )
}
