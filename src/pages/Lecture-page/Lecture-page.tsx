import React from 'react';
import './lecture-pages.scss'
import Header from "../../Components/Header/Header";
import {LectureTask} from "../../Components/Lecture/Lecture-task";
import {Video} from "../../Components/Lecture/Video";
import {LectureHead} from "../../Components/Lecture/Lecture-head";

export const LecturePage = () => {


    return (
        <div className={'lecture-page'}>
            <Header title={'Лекция'}/>
            <div className="lecture-page__video">
                <Video/>
            </div>

            <div className="lecture__task task-lecture">
                <LectureHead
                    text={' Lorem ipsum dolor sit amet, consectetur adipiscing elit consectetur adipiscing elit'}
                    title={'Задание'}
                />
                <div className="task-lecture__body">
                    <LectureTask typeTask={4}/>
                </div>
            </div>
        </div>

    );
};

