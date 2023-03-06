import { ChangeEvent, FC, useState } from 'react'
import './quiz.scss'

interface ICheckboxWithAnswer {
  question: string
  answerHandler: Function
  answers: {
    position: number
    value: string
  }[]
  id: number
}

export const CheckboxWithAnswer: FC<ICheckboxWithAnswer> = ({
  question,
  answerHandler,
  answers,
  id
}) => {
  const [value, setValue] = useState<number[]>([])
  const [input, setInput] = useState<string>('')

  const handleClick = () => {
    answerHandler({ [id]: { variant: value, custom: input } })
    setValue([])
    setInput('')
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (value.includes(+e.target.value)) {
      setValue(value.filter((item) => item !== +e.target.value))
      return false
    }
    setValue([...value, +e.target.value])
  }

  return (
    <div className={'quiz'}>
      <div className='quiz__title'>{question}</div>
      <div className='custom-checkbox' style={{ marginBottom: '10px' }}>
        {answers &&
          answers.map((item, i) => {
            if (i < answers.length - 1) {
              return (
                <div key={item.position}>
                  <input
                    checked={value.includes(item.position + 1)}
                    value={item.position + 1}
                    type='checkbox'
                    className={'custom-checkbox__checkbox'}
                    id={item.position + id + ''}
                    onChange={handleChange}
                  />
                  <label htmlFor={item.position + id + ''}>{item.value}</label>
                </div>
              )
            }
          })}
        <div>{answers && answers[answers.length - 1].value}</div>
        <input
          type='text'
          className='_field'
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
          value={input}
        />
      </div>
      <button
        className={'questionnaire-page__button _button-white'}
        onClick={handleClick}
      >
        Далее
      </button>
    </div>
  )
}
