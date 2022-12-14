import {
  ChangeEvent,
  forwardRef,
  useState,
} from 'react'
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
  const [answer, setAnswer] = useState<string>('')
  const [score, setScore] = useState<number>(10)
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(END_DATE)
  const [correctAnswer, setCorrectAnswer] = useState<number>(0)
  const [videoUrl, setVideoUrl] = useState<string>('')
  const [image, setImage] = useState<any>('')
  const [photoPath, setPhotoPath] = useState<any | null>(null)

  console.log(correctAnswer);


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
    setAnswer('')
    setTitle('')
    setAnswers([])
    setCorrectAnswer(0)
    setDescription('')
    setEndDate(END_DATE)
    setStartDate(new Date())
    setImage('')
    setQrCode('')
    setQuestion('')
    setVideoUrl('')
    setScore(0)
    setPhotoPath('')
    setTypeLesson(0)
  }

  const addLecture = async () => {
    const formData = new FormData()
    const idChallenge = Number(params.id) === 0 ? challenge_id : Number(params.id)
    formData.append('title', title)
    formData.append('challenge', JSON.stringify(idChallenge))
    formData.append('description', description)
    formData.append('type', JSON.stringify(typeLesson))
    formData.append('video', videoUrl)
    formData.append('start_date', JSON.stringify(startDate.setHours(0, 0, 0, 0) / 1000))
    formData.append('end_date', JSON.stringify(endDate.setHours(0, 0, 0, 0) / 1000))
    formData.append('score', JSON.stringify(score))
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
      if (title &&
        description &&
        typeLesson &&
        (typeLesson === 1 ? (question && answers && correctAnswer) : typeLesson === 3 ? question : qrCode) &&
        score &&
        startDate&&
        endDate &&       
        videoUrl
        ) {
        const response = await LessonService.createLesson(formData)
        console.log(response)
        showToast('???????????? ?????????????? ??????????????????!')
        reset()
      } else {
        await showToast('???? ?????????????????? ???? ?????? ????????!')
      }

    } catch (error) {
      showToast('?????????????????? ????????????!')
      console.log(error)
    }
  }

  return (
    <div className={'creating-lecture'}>
      <Header title='???????????????? ????????????' />
      <div className='creating-lecture__title creating-title'>???????????? ?? ????</div>
      <div className='creating-lecture__sub-title creating-sub-title'>
        ????????????
      </div>
      <input
        type='text'
        className='creating-lecture__input _field'
        placeholder={'?????????????????? ????????????'}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
        value={title}
      />
      <input
        className={'creating-lecture__url _field'}
        placeholder={'URL ????????????'}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setVideoUrl(e.target.value)
        }
        value={videoUrl}
      />
      <input
        type='text'
        className='creating-lecture__description _field'
        placeholder={'???????????????? ??????????????'}
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
        ??????????????
      </div>

      <div className='creating-lecture__select _custom-select'>
        <select
          name='type-task'
          id='type-task'
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setTypeLesson(+e.target.value)
          }
        >
          <option value=''>?????? ??????????????</option>
          <option value='1'>?????????? ?????????????????????? ????????????</option>
          <option value='2'>?????????????????????????? QR ??????</option>
          <option value='3'>???????????? ?????? ????????????</option>
          <option value='4'>?????????????????? ????????</option>
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
            placeholder='????????????'
          />
          {answers.map((item, i) => (
            <input
              type='text'
              className={
                correctAnswer === i
                  ? 'choice-answer__input _field + choice-answer__input_corrected'
                  : 'choice-answer__input _field'
              }
              placeholder='?????????? ???? ????????????'
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
              ????????????????
            </button>
            <button
              className='choice-answer__button choice-answer__button_del'
              onClick={(e: ChangeEvent<any>) =>
                setAnswers((prev) => prev.slice(0, prev.length - 1))
              }
            >
              ??????????????
            </button>
          </div>
        </div>
      )}
      {typeLesson === 2 && (
        <div className='qr-code'>
          <input
            type='text'
            className='qr-code__input _field'
            placeholder={'???????????????????? ?????? QR ????????'}
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
            placeholder={'????????????'}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setQuestion(e.target.value)
            }
            value={question}
          />
          <input
            type='text'
            className='string-answer__input _field'
            placeholder={'??????????'}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setAnswer(e.target.value)
            }
            value={answer}
          />
        </div>
      )}
      {typeLesson === 4 && <div className='dowload-file'></div>}
      <div className='creating-lecture__date'>
        <div className='creating-lecture__sub-title creating-sub-title'>
          ?????????????????????????????????? ???????????????????? ??????????????
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
          ?????????????? ???? ?????????????????????? ??????????????
        </div>
        <input
          type='number'
          className='_field'
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setScore(+e.target.value)
          }
          value={score}
        />
      </div>
      <div className='creating-lecture__buttons'>
        <Link
          to={CHALLENGE_ROUTE}
          className='creating-lecture__button button-end'
        >
          ??????????????????
        </Link>
        <button
          className='creating-lecture__button _button-white'
          onClick={addLecture}
        >
          ???????????????? ????????????
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
