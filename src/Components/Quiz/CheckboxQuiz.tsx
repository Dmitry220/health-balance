import { FC, useState } from "react";
import "./quiz.scss";
interface ITextQuiz {
  question: string;
  answerHandler: Function;
  answers: any;
  id: string;
}

const CheckboxQuiz: FC<ITextQuiz> = ({
  question,
  answerHandler,
  answers,
  id,
}) => {
  const [value, setValue] = useState<any>([]);
  const handleClick = () => {
    setValue([]);
    answerHandler({[id]:value});
  };

  const handleChange = (val: string) => {
    if (value.includes(val)) {
      setValue(value.filter((e: string) => e !== val));
      return false;
    }
    setValue([...value, +val]);
  };
  return (
    <div className={"quiz"}>
      <div className="quiz__title">{question}</div>
      <div className="custom-checkbox" style={{ marginBottom: "10px" }}>
        {answers &&
          answers.map((item: any, i: number) => (
            <div key={i}>
              <input
                // checked={item === value}
                value={i+1}
                type="checkbox"
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
        disabled={value.length === 0}
        className={
          value.length === 0
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

export default CheckboxQuiz;
