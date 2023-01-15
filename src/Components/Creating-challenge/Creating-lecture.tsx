import { ChangeEvent, forwardRef, useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import ru from 'date-fns/locale/ru'
import './creating-challenge.scss'
import LessonService from '../../services/LessonsService'
import { useAppSelector } from '../../utils/hooks/redux-hooks'
import { challengeIdSelector } from '../../Redux/slice/challengeSlice'
import FileService from '../../services/FilesServices'
import { showToast } from '../../utils/common-functions'
import { Link, useParams } from 'react-router-dom'
import { CHALLENGE_ROUTE } from '../../provider/constants-route'
import icon_camera from '../../assets/image/icon-camera-add.svg'
import Header from '../Header/Header'
registerLocale('ru', ru)

interface IAnswer {
  answer: string
}

export const CreatingLecture = () => {
  const END_DATE = new Date()
  END_DATE.setDate(END_DATE.getDate() + 3)

  const params = useParams()

  const challenge_id = useAppSelector(challengeIdSelector)

  const [typeLesson, setTypeLesson] = useState<number>(0)
  const [answers, setAnswers] = useState<IAnswer[] | []>([{ answer: '' }])
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [qrCode, setQrCode] = useState<string>('')
  const [question, setQuestion] = useState<string>('')
  // const [answer, setAnswer] = useState<string>('')
  const [score, setScore] = useState<string>('10')
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(END_DATE)
  const [correctAnswer, setCorrectAnswer] = useState<number>(0)
  const [videoUrl, setVideoUrl] = useState<string>('')
  const [image, setImage] = useState<any>('')
  const [photoPath, setPhotoPath] = useState<any | null>(null)

  const addCover = async (e: ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData()
    const file: any = e.target.files
    if (file[0]) {
      formData.append('image', file[0])
      setPhotoPath(URL.createObjectURL(file[0]))
      const response = await FileService.addImageLesson(formData)
      setImage(response.data.data.avatar)
    }
  }

  const changePeriod = (dates: any) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }

  const reset = () => {
    // setAnswer('')
    setTitle('')
    setAnswers([{ answer: '' }])
    setCorrectAnswer(0)
    setDescription('')
    setEndDate(END_DATE)
    setStartDate(new Date())
    setImage('')
    setQrCode('')
    setQuestion('')
    setVideoUrl('')
    setScore('10')
    setPhotoPath('')
    setTypeLesson(-5)
  }

  const addLecture = async () => {
    const formData = new FormData()
    const idChallenge =
      Number(params.id) === 0 ? challenge_id : Number(params.id)
    formData.append('title', title)
    formData.append('challenge', JSON.stringify(idChallenge))
    formData.append('description', description)
    formData.append('type', JSON.stringify(typeLesson))
    formData.append('video', videoUrl)
    formData.append('start_date', startDate.toLocaleDateString())
    formData.append('end_date', endDate.toLocaleDateString())
    formData.append('score', score)
    formData.append('image', image)
    switch (typeLesson) {
      case 1:
        formData.append('answers', JSON.stringify(answers))
        formData.append('correct_answer', correctAnswer + '')
        formData.append('question', question)
        break
      case 2:
        formData.append('qr_code', qrCode)
        break
      case 3:
        formData.append('question', question)
        break
      case 4:
        break
      default:
        break
    }

    try {
      //Проверка на не пустые поля
      if (
        title &&
        description &&
        typeLesson &&
        image &&
        (typeLesson === 2 ? qrCode : typeLesson === 4 ? true : question) &&
        score &&
        videoUrl
      ) {
        await LessonService.createLesson(formData)
        showToast('Лекция успешно добавлена!')
        reset()
      } else {
        await showToast('Вы заполнили не все поля!')
      }
    } catch (error) {
      showToast('Произошла ошибка!')
      console.log(error)
    }
  }

  return (
    <div className={'creating-lecture'}>
      <Header title='Создание лекции' />
      <div className='creating-lecture__title creating-title'>Лекции и ДЗ</div>
      <div className='creating-lecture__sub-title creating-sub-title'>
        Лекция
      </div>
      <input
        type='text'
        className='creating-lecture__input _field'
        placeholder={'Заголовок лекции'}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
        value={title}
      />
      <input
        className={'creating-lecture__url _field'}
        placeholder={'URL лекции'}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setVideoUrl(e.target.value)
        }
        value={videoUrl}
      />
      <input
        type='text'
        className='creating-lecture__description _field'
        placeholder={'Описание задания'}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setDescription(e.target.value)
        }
        value={description}
      />
      <input
        id='image'
        type='file'
        className='creating-lecture__description'
        onChange={addCover}
      />
      <label htmlFor='image' className='creating-lecture__image'>
        {photoPath && <img src={photoPath} alt='' />}
        {!photoPath && (
          <div className={'creating-lecture__local-image'}>
            <img src={icon_camera} alt='' /> <br />
            <br />
          </div>
        )}
      </label>
      <div className='creating-lecture__sub-title creating-sub-title'>
        Задание
      </div>

      <div className='creating-lecture__select _custom-select'>
        <select
          name='type-task'
          value={typeLesson}
          id='type-task'
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setTypeLesson(+e.target.value)
          }
        >
          <option value='0'>Тип задания</option>
          <option value='1'>Выбор правильного ответа</option>
          <option value='2'>Отсканировать QR Код</option>
          <option value='3'>Строка для ответа</option>
          <option value='4'>Загрузить файл</option>
        </select>
      </div>
      {typeLesson === 1 && (
        <div className='choice-answer'>
          <input
            type='text'
            className='choice-answer__input _field'
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setQuestion(e.target.value)
            }
            value={question}
            placeholder='Вопрос'
          />
          {answers.map((item, i) => (
            <input
              type='text'
              className={
                correctAnswer === i
                  ? 'choice-answer__input _field + choice-answer__input_corrected'
                  : 'choice-answer__input _field'
              }
              placeholder='Ответ на вопрос'
              onClick={() => setCorrectAnswer(i)}
              value={item.answer}
              key={i}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setAnswers((prev) =>
                  prev.map((answer, index) =>
                    index === i ? { answer: e.target.value } : answer
                  )
                )
              }
            />
          ))}
          <div className='choice-answer__buttons'>
            <button
              className='choice-answer__button'
              onClick={(e: ChangeEvent<any>) =>
                setAnswers((prev) => [...prev, { answer: e.target.value }])
              }
            >
              Добавить
            </button>
            <button
              className='choice-answer__button choice-answer__button_del'
              onClick={(e: ChangeEvent<any>) =>
                setAnswers((prev) => prev.slice(0, prev.length - 1))
              }
            >
              Удалить
            </button>
          </div>
        </div>
      )}
      {typeLesson === 2 && (
        <div className='qr-code'>
          <input
            type='text'
            className='qr-code__input _field'
            placeholder={'Информация для QR кода'}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setQrCode(e.target.value)
            }
            value={qrCode}
          />
        </div>
      )}
      {typeLesson === 3 && (
        <div className='string-answer'>
          <input
            type='text'
            className='string-answer__input _field'
            placeholder={'Вопрос'}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setQuestion(e.target.value)
            }
            value={question}
          />
          {/* <input
            type='text'
            className='string-answer__input _field'
            placeholder={'Ответ'}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setAnswer(e.target.value)
            }
            value={answer}
          /> */}
        </div>
      )}
      {typeLesson === 4 && <div className='dowload-file'></div>}
      <div className='creating-lecture__date'>
        <div className='creating-lecture__sub-title creating-sub-title'>
          Продолжительность выполнения задания
        </div>
        <DatePicker
          onChange={changePeriod}
          selectsRange
          startDate={startDate}
          endDate={endDate}
          dateFormat='dd.MM.yyyy'
          locale={ru}
          customInput={<ExampleCustomInput />}
        />
      </div>

      <div className='creating-lecture__score'>
        <div className='creating-lecture__sub-title creating-sub-title'>
          Награда за выполненное задания
        </div>
        <input
          type='number'
          className='_field'
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setScore(e.target.value.replace(/\D/, ''))
          }
          value={score}
        />
      </div>
      <div className='creating-lecture__buttons'>
        <Link
          to={CHALLENGE_ROUTE}
          className='creating-lecture__button button-end'
        >
          Завершить
        </Link>
        <button
          className='creating-lecture__button _button-white'
          onClick={addLecture}
        >
          Добавить лекцию
        </button>
      </div>
    </div>
  )
}

const ExampleCustomInput = forwardRef(({ value, onClick }: any, ref: any) => {
  return (
    <div className={'text-blue'} onClick={onClick}>
      {value}
    </div>
  )
})
