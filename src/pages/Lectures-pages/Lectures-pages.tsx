import React, { useEffect } from 'react';
import './lecures-page.scss'
import CardLecture from "../../Components/Card-lecture/Card-lecture";
import Header from "../../Components/Header/Header";
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks';
import { getLessons, isLoadingSelector, lessonsSelector } from '../../Redux/slice/lessonsSlice';
import { IMAGE_URL } from '../../http';

export const LecturesPages = () => {

    const dispatch = useAppDispatch()

    const lessons = useAppSelector(lessonsSelector)
    const isLoading = useAppSelector(isLoadingSelector) 
  
    useEffect(()=>{
        async function asd() {
            await dispatch(getLessons())
        }
        asd()
    }, [])

    if(isLoading){
        return <h1>Загрузка...</h1>
    }
    
    return (
        <div className={'lectures-pages'}>
            <Header title={'Лекции и дз'} />
            <div className="lectures-pages__title main-title">Лекции</div>
            {
                lessons.map(lesson=> <CardLecture
                    id={lesson.id}
                    img={IMAGE_URL+'lessons/'+lesson.image}
                    title={lesson.title}
                    date={new Date(lesson.end_date*1000).toLocaleDateString()}
                    reward={lesson.score}
                    key={lesson.id}
                />)
            }          
        </div>
    );
};

