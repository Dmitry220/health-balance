import { useEffect } from 'react'
import './lecures-page.scss'
import CardLecture from '../../Components/Lecture/Card-lecture'
import Header from '../../Components/Header/Header'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import {
  getLessons,
  isLoadingSelector,
  lessonsSelector
} from '../../Redux/slice/lessonsSlice'
import { IMAGE_URL } from '../../http'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { CREATING_LECTURE_ROUTE } from '../../provider/constants-route'
import plug from '../../assets/image/plug.png'
import { dataUserSelector } from '../../Redux/slice/profileSlice'
import { Preloader } from '../../Components/Preloader/Preloader'
import PullToRefresh from 'react-simple-pull-to-refresh'


export const LecturesPages = () => {
  const dispatch = useAppDispatch()
  const params = useParams()
  const dataUser = useAppSelector(dataUserSelector)
  const lessons = useAppSelector(lessonsSelector)
  const isLoading = useAppSelector(isLoadingSelector)

  useEffect(() => {
    async function fetch() {
      await dispatch(getLessons(Number(params.id)))
    }
    fetch()
  }, [])

  const handleRefresh = async () => {
    await dispatch(getLessons(Number(params.id)))
  }


  if (isLoading) {
    return <Preloader />
  }

  return (
    <div className={'lectures-pages'}>
      <Header title={'Лекции и дз'} />
      <PullToRefresh
        maxPullDownDistance={95}
        pullDownThreshold={67}
        fetchMoreThreshold={100}
        pullingContent={''}
        refreshingContent={<span id="loader"></span>}
        onRefresh={handleRefresh}
        className='pull-to-refresh'
      >
        <>
          <div className='lectures-pages__title main-title'>Лекции</div>
          {lessons.map((lesson) => (
            <CardLecture
              id={lesson.id}
              img={lesson.image ? IMAGE_URL + 'lessons/' + lesson.image : plug}
              title={lesson.title}
              date={new Date(lesson.end_date * 1000).toLocaleDateString()}
              reward={lesson.score}
              key={lesson.id}
              completed={lesson.completed}
            />
          ))}
          {!lessons.length && <h1 style={{ marginBottom: 20 }}>Лекций нет</h1>}
          {(dataUser.role === 1 || dataUser.role === 2) && <Link
            to={CREATING_LECTURE_ROUTE + '/' + params.id}
            className='_button-yellow'
          >
            Добавить лекции и ДЗ
          </Link>}
        </>
      </PullToRefresh>
    </div>
  )
}
