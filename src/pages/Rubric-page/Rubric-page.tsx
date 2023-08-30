import {ChangeEvent} from 'react'
import {useNavigate} from 'react-router-dom'
import Header from '../../Components/Header/Header'
import {CREATING_INTERESTING_ROUTE} from '../../provider/constants-route'
import {creatingNewsSelector, handlerNews} from '../../Redux/slice/newsSlice'
import {useAppDispatch, useAppSelector} from '../../hooks/redux-hooks'
import './rubric-page.scss'
import {RUBRICS} from '../../utils/globalConstants'


export const RubricPage = () => {

  const navigate = useNavigate()

  const dataNews = useAppSelector(creatingNewsSelector)

  const saveRubric = () => {
    if (dataNews.category !== 0) {
      navigate(CREATING_INTERESTING_ROUTE)
    }
  }

  const dispatch = useAppDispatch()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
      dispatch(handlerNews({...dataNews,category: +e.target.value}))

  return (
    <div className={'rubric-page'}>
      <Header title={'Рубрики'} />
      <div className='custom-checkbox'>
        {RUBRICS.map((item: any, i: number) => (
          <div key={item.id}>
            <input
              value={item.id}
              type='radio'
              name={'radio'}
              defaultChecked={item.id === dataNews.category}
              className={'custom-checkbox__checkbox'}
              id={i + item.id}
              onChange={handleChange}
            />
            <label htmlFor={i + item.id}>{item.title}</label>
          </div>
        ))}
      </div>
      <button
        className='rubric-page__button _button-white'
        onClick={saveRubric}
      >
        Сохранить
      </button>
    </div>
  )
}
