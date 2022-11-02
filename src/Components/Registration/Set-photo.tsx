import React, {useState} from 'react';
import './registration.scss'
import photo from '../../assets/image/icon-camera-add.svg'
import { Camera, CameraResultType } from '@capacitor/camera';
import {useAppDispatch} from "../../utils/hooks/redux-hooks";
import {setAvatarRegistartion, setDisabledButton} from "../../Redux/slice/authSlice";

export const SetPhoto = () => {

    const [photoPath, setPhotoPath] = useState<any | null>(null)
    const dispatch = useAppDispatch()

    const takePicture = async () => {
        const cameraResult = await Camera.getPhoto({
            quality: 90,
            allowEditing: true,
            resultType: CameraResultType.Uri
        });
        console.log("camera open")
        const path = cameraResult?.path || cameraResult?.webPath

        if(path) {            
            dispatch(setDisabledButton(false))
            dispatch(setAvatarRegistartion(path))
        }

       setPhotoPath(path)
    };


    return (
        <div className={'set-photo'}>
            <div className="set-photo__photo" onClick={takePicture}>
                {!photoPath && <img className={'set-photo__photo-icon-add'} src={photo} alt=""/>}
                {photoPath && <img className={'set-photo__photo-demo'} src={photoPath} alt="45"/>}
            </div>
        </div>
    );
};

