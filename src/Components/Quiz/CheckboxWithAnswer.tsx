import { ChangeEvent, FC, useState } from "react";
import "./quiz.scss";


interface ICheckboxWithAnswer {
  question: string;
  answerHandler: Function;
  answers: any;
  id: string;
}

export const CheckboxWithAnswer: FC<ICheckboxWithAnswer> = ({
  question,
  answerHandler,
  answers,
  id,
}) => {
  const [value, setValue] = useState<number[]>([]);
  const [input, setInput] = useState<string>('')

  const handleClick = () => {
    answerHandler({[id]: {variant:value, custom:input}});
    setValue([]);
    setInput('');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (value.includes(+e.target.value)) {
      setValue(value.filter(item => item != +e.target.value));
      return false;
    }
    setValue([...value, +e.target.value]);
  };
  
  return (
    <div className={"quiz"}>
      <div className="quiz__title">{question}</div>
      <div className="custom-checkbox" style={{ marginBottom: "10px" }}>
        {answers &&
          answers.map((item: any, i: number) => (
            <div key={i}>
              <input
                checked={value.includes(i+1)}
                value={i+1}
                type="checkbox"                
                className={"custom-checkbox__checkbox"}
                id={i + id}
                onChange={handleChange}
              />
              <label htmlFor={i + id}>{item}</label>
            </div>
          ))}
			 <input type="text" className="_field" onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)} value={input} />
      </div>
      <button
        className={"questionnaire-page__button _button-white"}
        onClick={handleClick}
      >
        Далее
      </button>
    </div>
  );
};

const a = {
	"data": {
		 "id": 1,
		 "progress": 1,
		 "created_at": 1670596196
	}
}