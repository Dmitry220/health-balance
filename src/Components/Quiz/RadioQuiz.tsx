import { ChangeEvent, FC, useState } from "react";
import "./quiz.scss";
interface ITextQuiz {
  question: string;
  answerHandler: Function;
  answers: any;
  id: string;
}

const RadioQuiz: FC<ITextQuiz> = ({ question, answerHandler, answers, id }) => {

  
  const [value, setValue] = useState<number | null>(null);
  const handleClick = () => {
    setValue(null);
    answerHandler({[id]:value});
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {  
      setValue(+e.target.value);
  };
  
  return (
    <div className={"quiz"}>
      <div className="quiz__title">{question}</div>
      <div className="custom-checkbox" style={{ marginBottom: "10px" }}>
        {answers &&
          answers.map((item: any, i: number) => (
            <div key={i}>
              <input
                checked={i+1 === value}
                value={i+1}
                type="radio"
                name={"radio" + id}
                className={"custom-checkbox__checkbox"}
                id={i + id}
                onChange={handleChange}
              />
              <label htmlFor={i + id}>{item}</label>
            </div>
          ))}
      </div>
      <button
        disabled={value === null}
        className={
          value === null
            ? "questionnaire-page__button _button-white disabled"
            : "questionnaire-page__button _button-white"
        }
        onClick={handleClick}
      >
        Далее
      </button>
    </div>
  );
};

export default RadioQuiz;
