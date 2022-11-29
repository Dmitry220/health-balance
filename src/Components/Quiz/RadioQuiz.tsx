import { FC, useState } from "react";
import "./quiz.scss";
interface ITextQuiz {
  question: string;
  answerHandler: Function;
  answers: any;
  id: string;
}

const RadioQuiz: FC<ITextQuiz> = ({ question, answerHandler, answers, id }) => {
  const [value, setValue] = useState("");
  const handleClick = () => {
    setValue("");
    answerHandler(value);
  };
  const handleChange = (val: string) => {
    if (val.length > 0) {
      setValue(val);
    } else {
      setValue(val);
    }
  };
  return (
    <div className={"quiz"}>
      <div className="quiz__title">{question}</div>
      <div className="custom-checkbox" style={{ marginBottom: "10px" }}>
        {answers &&
          JSON.parse(answers).map((item: any, i: number) => (
            <div key={i}>
              <input
                checked={item === value}
                value={item}
                type="radio"
                name={"radio" + id}
                className={"custom-checkbox__checkbox"}
                id={i + id}
                onChange={(e) => handleChange(e.target.value)}
              />
              <label htmlFor={i + id}>{item}</label>
            </div>
          ))}
      </div>
      <button
        disabled={value === ""}
        className={
          value === ""
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
