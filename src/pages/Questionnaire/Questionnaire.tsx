import React, { ChangeEvent, useEffect, useState } from 'react'
import './questionnaire.scss'
import { Quiz } from '../../Components/Quiz/Quiz'
import Header from '../../Components/Header/Header'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks'
import {
  fetchGetQuestionnaire,
  IQuestions,
  questions
} from '../../Redux/slice/quizSlice'
import { ProgressBar } from '../../Components/Progress-bar/Progress-bar'
import { typesChallenge } from '../../types/enums'
import { useNavigate } from 'react-router-dom'
import { HEALTH_INDEX_RESULTS_ROUTE } from '../../provider/constants-route'

export const Questionnaire = () => {
  const dispatch = useAppDispatch()
  const questionsQuiz = useAppSelector(questions)
  const [currentQuestion, setCurrentQuestion] = useState<number>(8)
  const [disabledButton, setDisabledButton] = useState<boolean>(true)
  const [checkedValues, setCheckedValues] = useState<any>()
  let navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchGetQuestionnaire())
  }, [])

  console.log(questionsQuiz)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked
    switch (questionsQuiz[currentQuestion].answer_type) {
      case '1':
        setCheckedValues(e.target.value)

        break
      // case '4':
      //     checked ? setCheckedValues(prev => [...prev, {
      //             response_body: e.target.value
      //         }]) :
      //         setCheckedValues(prev => [...prev.filter(item => item.response_body !== e.target.value)])
      //     break
      default:
        break
    }
    setDisabledButton(false)
  }

  const nextQuestion = () => {
    if (currentQuestion >= questionsQuiz.length - 1) {
      navigate(HEALTH_INDEX_RESULTS_ROUTE)
    } else {
      setCurrentQuestion((prev) => prev + 1)
      setCheckedValues('')
      setDisabledButton(true)
    }
  }

  const showQuestion = (current: number) => {
    const itemQuestion = questionsQuiz[current]
    console.log(checkedValues)

    return (
      itemQuestion && (
        <Quiz
          answer_type={itemQuestion.answer_type}
          answers={itemQuestion.answers}
          id={itemQuestion.id}
          question={itemQuestion.question}
          tag={itemQuestion.tag}
          handleChange={handleChange}
          value={checkedValues}
        />
      )
    )
  }

  return (
    <div className='questionnaire-page'>
      <Header title={'Анкета'} />
      <div className='questionnaire-page__question-item item-question'>
        <div className='questionnaire-page__progress-bar'>
          <div className='questionnaire-page__progress-value'>
            {currentQuestion + 1} / {questionsQuiz.length}
            <span>Общая информация</span>
          </div>
          <ProgressBar
            percent={((currentQuestion + 1) * 100) / questionsQuiz.length}
            type={typesChallenge.common}
          />
        </div>
        <div className='questionnaire-page__question'>
          {showQuestion(currentQuestion)}
        </div>
        <button
          disabled={disabledButton}
          className={
            disabledButton
              ? 'questionnaire-page__button _button-white disabled'
              : 'questionnaire-page__button _button-white'
          }
          onClick={nextQuestion}
        >
          Далее
        </button>
      </div>
    </div>
  )
}
