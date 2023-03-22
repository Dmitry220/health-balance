import { useEffect } from 'react'
import './registration.scss'
import photo from '../../assets/image/icon-camera-add.svg'
import { useAppDispatch } from '../../hooks/redux-hooks'
import {
  setAvatarRegistartion,
  setDisabledButton
} from '../../Redux/slice/authSlice'
import { useLoadImage } from '../../hooks/useLoadImage'
import { typeImage } from '../../utils/enums'

export const SetPhoto = () => {
  const dispatch = useAppDispatch()
  const [image, photoPath, isLoadingAvatar, clearImages, uploadImage] = useLoadImage()
  
  const dowloadPicture = async () => {
    await uploadImage(typeImage.avatars)
  }

  useEffect(() => {
    if (photoPath) {
      dispatch(setAvatarRegistartion(image))
      dispatch(setDisabledButton(false))
    } else {
      dispatch(setDisabledButton(true))
    }
  }, [image])

  return (
    <div className={'set-photo'}>
      <div className='set-photo__photo'>
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
