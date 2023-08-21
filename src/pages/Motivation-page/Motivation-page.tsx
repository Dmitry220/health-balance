import './motivation.scss'
import Header from '../../Components/Header/Header'
import {PostInteresting} from '../../Components/Interesting/Post-interesting'
import {CommentForm} from '../../Components/Comment/Comment-form'
import {ListComments} from '../../Components/Comment/List-comments'
import {getComments, getNewsById, newsByIdSelector} from '../../Redux/slice/newsSlice'
import {useAppDispatch, useAppSelector} from '../../hooks/redux-hooks'
import {useEffect, useRef} from 'react'
import {useParams} from 'react-router-dom'
import {usePullToRefresh} from "../../hooks/usePulltoRefresh";

export const MotivationPage = () => {
    const pullToRefresh = useRef(null)


    const news = useAppSelector(newsByIdSelector)
    const dispatch = useAppDispatch()
    const params = useParams()
    const conversionCategory = (category: number) => {
        switch (category) {
            case 1:
                return 'Психология'
            case 2:
                return 'Инструкция'
            case 3:
                return 'Мотивация'
            case 4:
                return 'Новость'
            default:
                return 'Новость'
        }
    }

    const handleRefresh = async () => {
        await dispatch(getNewsById(Number(params.id)))
        await dispatch(getComments(Number(params.id)))
    }

    usePullToRefresh(pullToRefresh, handleRefresh)

    useEffect(() => {
        dispatch(getNewsById(Number(params.id)))
    }, [])

    return (
        <div className={'motivation-page'}>
            <Header title={conversionCategory(news?.category || 0)}/>
            <div style={{position: "relative"}}>

                <div ref={pullToRefresh}>
                    {news ? (
                        <>
                            <div className='motivation-page__card'>
                                <PostInteresting/>
                            </div>
                            <div className='motivation-page__hr'/>
                            <div className='motivation-page__comments'>
                                <CommentForm parentId={0}/>
                                <br/>
                                <br/>
                                <ListComments/>
                            </div>
                        </>
                    ) : (
                        <h1>Новость была удалена или ее не существует!</h1>
                    )}
                </div>
            </div>
        </div>
    )
}
