import './motivation.scss'
import Header from '../../Components/Header/Header'
import {PostInteresting} from '../../Components/Interesting/Post-interesting'
import {CommentForm} from '../../Components/Comment/Comment-form'
import {ListComments} from '../../Components/Comment/List-comments'
import {useRef} from 'react'
import {useParams} from 'react-router-dom'
import {usePullToRefresh} from "../../hooks/usePulltoRefresh";
import {useGetListCommentsQuery, useGetNewsByIdQuery} from "../../services/news.api";
import {Preloader} from "../../Components/Preloader/Preloader";

export const MotivationPage = () => {

    const pullToRefresh = useRef(null)

    const params = useParams()

    const {data: news, isLoading,refetch:refetchNewsById} = useGetNewsByIdQuery(Number(params.id))
    const {refetch} = useGetListCommentsQuery(Number(params.id))

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
        await refetchNewsById()
        await refetch()
    }

    usePullToRefresh(pullToRefresh, handleRefresh)


    return (
        <div className={'motivation-page'}>
            <Header title={conversionCategory(news?.category || 0)}/>
            <div style={{position: "relative"}}>
                <div ref={pullToRefresh}>
                    {isLoading ? (
                        <Preloader height={'auto'} />
                    ) : news ? (
                        <div>
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
                        </div>
                    ) : (
                        <h1>Новость была удалена или ее не существует!</h1>
                    )}
                </div>
            </div>
        </div>
    )
}
