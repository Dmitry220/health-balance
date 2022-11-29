import React, {useState} from 'react';
import './creating-interesting.scss'
import Header from "../../Components/Header/Header";
import paper_clip from '../../assets/image/icon-paper-clip.svg'
import {Camera, CameraResultType} from "@capacitor/camera";
import {setAvatarRegistartion, setDisabledButton} from "../../Redux/slice/authSlice";

export const CreatingInteresting = () => {

    const [coverPath, setCoverPath] = useState<any | null>(null)

    const takePicture = async () => {
        const cameraResult = await Camera.getPhoto({
            quality: 90,
            allowEditing: true,
            resultType: CameraResultType.Uri
        });
        const path = cameraResult?.path || cameraResult?.webPath

        if(path) {
            setCoverPath(path)
        }


    };

    return (
        <div className={'creating-interesting'}>
            <Header title={'Добавить интересное'} />
            <div className="creating-interesting__container">
                <div className="creating-interesting__fields">
                    <input type="text" className="creating-interesting__field" placeholder={'Введите заголовок записи...'}/>
                    <input type="text" className="creating-interesting__field" placeholder={'Введите текст записи...'}/>
                </div>
                <div className="creating-interesting__row">
                    <div className="creating-interesting__cover text-blue" onClick={takePicture}><img src={paper_clip} alt=""/>Загрузить обложку</div>
                    <div className="creating-interesting__category text-blue">Рубрика</div>
                </div>
                <div className="creating-interesting__push">
                    <div className="custom-checkbox">
                        <input type="checkbox" className="custom-checkbox__checkbox" id={'push'}/>
                        <label htmlFor="push">Отправить PUSH</label>
                    </div>
                </div>
                <button className="creating-interesting__button _button-white">Опубликовать</button>
            </div>
        </div>
    );
};
