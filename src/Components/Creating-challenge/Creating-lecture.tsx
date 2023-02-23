import { ChangeEvent, forwardRef, useEffect, useState } from 'react'
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
import { useFieldArray, useForm } from 'react-hook-form'
import { Camera, CameraResultType } from '@capacitor/camera'
registerLocale('ru', ru)

interface IAnswer {
  answer: string
}

interface FormData {
  typeLesson: string
  answers: IAnswer[]
  title: string
  description: string
  question: string
  score: number
  startDate: any
  endDate: Date
  videoUrl: string
  qrCode: string
}

export const CreatingLecture = () => {
  const END_DATE = new Date()
  END_DATE.setDate(END_DATE.getDate() + 3)
  const params = useParams()
  const challenge_id = useAppSelector(challengeIdSelector)

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors }
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: { startDate: [] }
  })
  const allFiled = watch()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'answers'
  })

  useEffect(() => {
    append({ answer: '' })
  }, [])

  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(END_DATE)
  const [correctAnswer, setCorrectAnswer] = useState<number>(0)
  const [image, setImage] = useState<any>('')
  const [photoPath, setPhotoPath] = useState<any | null>(null)
  const [isLoadingAvatar, setIsLoadingAvatar] = useState<boolean>(false)
  const [isLoadingCreateNews, setIsLoadingCreateNews] = useState<boolean>(false)

  const addCover = async () => {

    const image = await Camera.getPhoto({
      quality: 50,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      promptLabelPhoto: "Выбрать фото из галерии",
      promptLabelPicture:"Сделать фотографию",
      promptLabelHeader:"Фото"
    })

    let imageUrl = image.webPath || ''

    let blob = await fetch(imageUrl).then((r) => r.blob())
    setIsLoadingAvatar(true)

    if (blob) {
      const formData = new FormData()
      formData.append('image', blob)
      try {
        const response = await FileService.addImageLesson(formData)
        if(response.data.data.avatar){
          setPhotoPath(imageUrl)
          setImage(response.data.data.avatar)
        } else{
          await showToast('Максимальный вес изображения 3 мб')
        }
        setIsLoadingAvatar(false)
      } catch (error) {
        setIsLoadingAvatar(false)
        setPhotoPath('')
        setImage('')
        await showToast('Максимальный вес изображения 3 мб')
      }
    } else {
      await showToast('Изображения нет')
    }
  }

  const changePeriod = (dates: any) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }

  const youtube_parser = (url:string) =>{
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}

  const convertVideo = (str:string) => 'https://www.youtube.com/embed/' + youtube_parser(str);

  const resetField = () => {
    const END_DATE = new Date()
    END_DATE.setDate(END_DATE.getDate() + 3)
    setPhotoPath('')
    setCorrectAnswer(0)
    setImage('')
    setStartDate(new Date())
    setEndDate(END_DATE)
    reset()
    append({ answer: '' })
  }

  const addLecture = handleSubmit(
    async ({
      answers,
      description,
      question,
      score,
      title,
      typeLesson,
      videoUrl,
      qrCode
    }) => {
      setIsLoadingCreateNews(true)
      const data = {
        answers,
        correctAnswer,
        description,
        endDate,
        image,
        question,
        score,
        startDate,
        title,
        typeLesson,
        videoUrl,
        qrCode
      }
      const formData = new FormData()
      const idChallenge =
        Number(params.id) === 0 ? challenge_id : Number(params.id)
      formData.append('title', title)
      formData.append('challenge', JSON.stringify(idChallenge))
      formData.append('description', description)
      formData.append('type', typeLesson)
      videoUrl && formData.append('video', convertVideo(videoUrl))
      formData.append('start_date', startDate.toLocaleDateString())
      formData.append('end_date', endDate.toLocaleDateString())
      formData.append('score', score + '')
      image && formData.append('image', image)
      switch (typeLesson) {
        case '1':
          formData.append('answers', JSON.stringify(answers))
          formData.append('correct_answer', correctAnswer + '')
          formData.append('question', question)
          break
        case '2':
          formData.append('qr_code', qrCode)
          break
        case '3':
          formData.append('question', question)
          break
        case '4':
          break
        default:
          break
      }
      try {
        const response = await LessonService.createLesson(formData)
        if (response.data.success) {
          showToast('Лекция успешно добавлена!')
          resetField()
        } else {
          showToast('Произошла ошибка!')
        }
      } catch (error) {
        showToast('Произошла ошибка!')
      }finally{
        setIsLoadingCreateNews(false)
      }
    }
  )

  return (
    <form onSubmit={addLecture} className={'creating-lecture'}>
      <Header title='Создание лекции' />
      <div className='creating-lecture__title creating-title'>Лекции и ДЗ</div>
      <div className='creating-lecture__sub-title creating-sub-title'>
        Лекция
      </div>
      <input
        type='text'
        className='creating-lecture__input _field'
        placeholder={'Заголовок лекции'}
        {...register('title', {
          required: true
        })}
      />
      {errors.title?.type === 'required' && (
        <p role='alert' className='creating-lecture__error'>
          Данное поле не может быть пустым
        </p>
      )}
      <input
        className={'creating-lecture__url _field'}
        placeholder={'URL лекции'}
        {...register('videoUrl')}
      />
      <input
        type='text'
        className='creating-lecture__description _field'
        placeholder={'Описание задания'}
        {...register('description', {
          required: true
        })}
      />
      {errors.description?.type === 'required' && <p role="alert" className='creating-lecture__error'>Данное поле не может быть пустым</p>}
   
      {!isLoadingAvatar ? <div onClick={addCover} className='creating-lecture__image'>
        {photoPath && <img src={photoPath} alt='' />}
        {!photoPath && (
          <div className={'creating-lecture__local-image'}>
            <img src={icon_camera} alt='' /> <br />
            <br />
          </div>
        )}
      </div> : <h1 style={{ marginBottom: 20 }}>Загружается...</h1>}
      <div className='creating-lecture__sub-title creating-sub-title'>
        Задание
      </div>

      <div className='creating-lecture__select _custom-select'>
        <select
          {...register('typeLesson', {
            required: 'select one option'
          })}
        >
          <option value={''}>Тип задания</option>
          <option value={1}>Выбор правильного ответа</option>
          <option value={2}>Отсканировать QR Код</option>
          <option value={3}>Строка для ответа</option>
          <option value={4}>Загрузить файл</option>
        </select>
      </div>
      {errors.typeLesson?.type === 'required' && (
        <p role='alert' className='creating-lecture__error'>
          Вы не выбрали тип задания
        </p>
      )}
      {allFiled.typeLesson === '1' && (
        <div className='choice-answer'>
          <input
            type='text'
            className='choice-answer__input _field'
            {...register('question', {
              required: true
            })}
            placeholder='Вопрос'
          />
          {errors.question?.type === 'required' && (
            <p role='alert' className='creating-lecture__error'>
              Данное поле не может быть пустым
            </p>
          )}
          {fields.map((item, index) => (
            <div key={item.id}>
              <input
                onClick={() => setCorrectAnswer(index)}
                placeholder='Ответ на вопрос'
                className={
                  correctAnswer === index
                    ? 'choice-answer__input _field + choice-answer__input_corrected'
                    : correctAnswer === -1
                    ? 'choice-answer__input _field + choice-answer__input_corrected'
                    : 'choice-answer__input _field'
                }
                {...register(`answers.${index}.answer`, {
                  required: true
                })}
              />
              {errors?.['answers']?.[index]?.['answer']?.type ===
                'required' && (
                <p role='alert' className='creating-lecture__error'>
                  Данное поле не может быть пустым
                </p>
              )}
            </div>
          ))}
          <div className='choice-answer__buttons'>
            <button
              className='choice-answer__button'
              type='button'
              onClick={() => append({ answer: '' })}
            >
              Добавить ответ
            </button>
            <button
              className='choice-answer__button choice-answer__button_del'
              type='button'
              onClick={() =>
                allFiled.answers.length > 1 &&
                remove(allFiled.answers.length - 1)
              }
            >
              Удалить ответ
            </button>
            <button
              className='choice-answer__button choice-answer__button_suc'
              type='button'
              onClick={() => setCorrectAnswer(-1)}
            >
              Все правильные
            </button>
          </div>
        </div>
      )}
      {allFiled.typeLesson === '2' && (
        <div className='qr-code'>
          <input
            type='text'
            className='qr-code__input _field'
            placeholder={'Информация для QR кода'}
            {...register('qrCode', {
              required: true
            })}
          />
          {errors.qrCode?.type === 'required' && (
            <p role='alert' className='creating-lecture__error'>
              Данное поле не может быть пустым
            </p>
          )}
        </div>
      )}
      {allFiled.typeLesson === '3' && (
        <div className='string-answer'>
          <input
            type='text'
            className='string-answer__input _field'
            placeholder={'Вопрос'}
            {...register('question', {
              required: true
            })}
          />
          {errors.question?.type === 'required' && (
            <p role='alert' className='creating-lecture__error'>
              Данное поле не может быть пустым
            </p>
          )}
        </div>
      )}
      {allFiled.typeLesson === '4' && <div className='dowload-file'></div>}
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
      {errors.startDate?.type === 'required' && (
        <p role='alert' className='creating-lecture__error'>
          Выберите начало и конец периода
        </p>
      )}
      <div className='creating-lecture__score'>
        <div className='creating-lecture__sub-title creating-sub-title'>
          Награда за выполненное задания
        </div>
        <input
          type='number'
          className='_field'
          {...register('score', {
            required: true,
            valueAsNumber: true
          })}
        />
      </div>
      {errors.score?.type === 'required' && (
        <p role='alert' className='creating-lecture__error'>
          Данное поле не может быть пустым
        </p>
      )}
      <div className='creating-lecture__buttons'>
        <Link
          to={CHALLENGE_ROUTE}
          className='creating-lecture__button button-end'
        >
          Завершить
        </Link>
        <button
        disabled={isLoadingCreateNews}
          className='creating-lecture__button _button-white'
          onClick={addLecture}
        >
          {isLoadingCreateNews ? <span className="spinner"><i className="fa fa-spinner fa-spin"></i> Загрузка</span> : 'Добавить лекцию '}
        </button>
      </div>
    </form>
  )
}

const ExampleCustomInput = forwardRef(({ value, onClick }: any, ref: any) => {
  return (
    <div className={'text-blue'} onClick={onClick}>
      {value}
    </div>
  )
})
