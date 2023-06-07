import { ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../Components/Header/Header'
import { CREATING_INTERESTING_ROUTE } from '../../provider/constants-route'
import {
  creatingNewsSelector,
  setRubricNews
} from '../../Redux/slice/newsSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import './rubric-page.scss'

const rubrics = [
  {
    id: 1,
    title: 'Психология'
  },
  {
    id: 2,
    title: 'Инструкция'
  },
  {
    id: 3,
    title: 'Мотивация'
  },
  {
    id: 4,
    title: 'Новость'
  }
]

export const RubricPage = () => {
  const news = useAppSelector(creatingNewsSelector)
  const navigate = useNavigate()

  const saveRubric = () => {
    if (news.category !== 0) {
      navigate(CREATING_INTERESTING_ROUTE)
    }
  }

  const dispatch = useAppDispatch()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(setRubricNews(+e.target.value))

  return (
    <div className={'rubric-page'}>
      <Header title={'Рубрики'} />
      <div className='custom-checkbox'>
        {rubrics.map((item: any, i: number) => (
          <div key={item.id}>
            <input
              value={item.id}
              type='radio'
              name={'radio'}
              defaultChecked={item.id === news.category}
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
