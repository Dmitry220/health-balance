import React, { FC,useRef } from 'react';
// import previewVideo from "../../assets/image/lecture/lecture_img.jpg";

interface IVideo {
    url: string
}

export const Video:FC<IVideo> = ({url}) => {

    const videoPlayer: React.Ref<any> = useRef()

    const runVideo = () => {
        console.log(videoPlayer.current)
    }


    return (
        <div className="lecture__video">
            <iframe src={url}
                //frameborder="0"
                ></iframe>
        </div>
    );
};

