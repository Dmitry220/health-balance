import React, {useRef} from 'react';
import previewVideo from "../../assets/image/lecture/lecture_img.jpg";

export const Video = () => {

    const videoPlayer:React.Ref<any> = useRef()

    const runVideo = () => {
        console.log(videoPlayer.current)
    }


    return (
        <div className="lecture__video">
            <video poster={previewVideo} ref={videoPlayer} />
            <source src={'https://youtu.be/p2Lb_DVH6fU'} type="video/mp4"/>
            <div className="lecture__video-run" onClick={runVideo}/>
        </div>
    );
};

