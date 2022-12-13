import React, { ChangeEvent, useEffect, useState } from "react";
import "./questionnaire.scss";
import { Quiz } from "../../Components/Quiz/Quiz";
import Header from "../../Components/Header/Header";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/redux-hooks";
import {
  answersQuestionnaireSelector,
  generateResultsPoll,
  getProgressAndIdPolls,
  getQuestionnaire,
  idPolleSelector,
  progressPollSelector,
  questionnaireSelector,
} from "../../Redux/slice/healthIndexSlice";
import { ProgressBar } from "../../Components/Progress-bar/Progress-bar";
import { typesChallenge } from "../../types/enums";
import { useNavigate } from "react-router-dom";
import {
  HEALTH_INDEX_RESULTS_ROUTE,
  HEALTH_INDEX_ROUTE,
} from "../../provider/constants-route";
import TextQuiz from "../../Components/Quiz/TextQuiz";
import { addIndexPageAnswer,resetAnswers,saveCurrentResult } from "../../Redux/slice/healthIndexSlice";
import RadioQuiz from "../../Components/Quiz/RadioQuiz";
import CheckboxQuiz from "../../Components/Quiz/CheckboxQuiz";
import { CheckboxWithAnswer } from "../../Components/Quiz/CheckboxWithAnswer";
import { NumberQuiz } from "../../Components/Quiz/NumberQuiz";
import { DateQuiz } from "../../Components/Quiz/DateQuiz";
import { RadioWithAnswer } from "../../Components/Quiz/RadioWithAnswer";


export const Questionnaire = () => {
  const dispatch = useAppDispatch();
  const questionnaire = useAppSelector(questionnaireSelector);
  const answers = useAppSelector(answersQuestionnaireSelector)
  const idPoll = useAppSelector(idPolleSelector)
  const progressPoll = useAppSelector(progressPollSelector)
  const [indexQuestion, setIndexQuestion] = useState(0)
  const [finished, setFinished] = useState<boolean>(false)
  const navigation = useNavigate();

  useEffect(() => {
   // dispatch(getProgressAndIdPolls())
    dispatch(getQuestionnaire());
    dispatch(resetAnswers());
  }, []);



  useEffect(() => {
    if (questionnaire[progressPoll]?.questions.length === indexQuestion) {      
       dispatch(saveCurrentResult(idPoll));
       dispatch(resetAnswers()); 
       setIndexQuestion(0) 
       console.log(progressPoll);
       
       if(progressPoll === 9 ){
        console.log('Попал');
        
        dispatch(generateResultsPoll(idPoll))
        setFinished(true)
        return
      }    
    }
   
  }, [indexQuestion])

   if(finished){
    return <h1>Конец</h1>
   }


  const answerHandler = (answer: any) => {    
    dispatch(addIndexPageAnswer(answer));
    setIndexQuestion(prev => prev + 1)
  };

  console.log(Object.assign({},...answers));
  

 return (
    <div className="questionnaire-page">
      {(
        <div>
          {questionnaire ? (
            <div>
              <Header title={"Анкета #" + (progressPoll+1)} />
              <div className="questionnaire-page__progress-bar">
                <div className="questionnaire-page__progress-value">
                  {answers.length + 1} / {questionnaire[progressPoll]?.questions.length}
                  <span>{questionnaire[progressPoll]?.name}</span>
                </div>
                <ProgressBar
                  percent={((answers.length+1) * 100) / questionnaire[progressPoll]?.questions.length}                
                  type={typesChallenge.common}
                />
              </div>
              <div className="questionnaire-page__question">               
                <div>
                  {
                    questionnaire[progressPoll]?.questions[indexQuestion]?.answer_type === 1 &&
                    <RadioQuiz
                      question={questionnaire[progressPoll]?.questions[indexQuestion]?.question}
                      answerHandler={answerHandler}
                      answers={questionnaire[progressPoll].questions[indexQuestion].answers}
                      id={questionnaire[progressPoll]?.questions[indexQuestion]?.id}
                    />
                  }
                  {
                    questionnaire[progressPoll]?.questions[indexQuestion]?.answer_type === 2 &&
                    <TextQuiz answerHandler={answerHandler} question={questionnaire[progressPoll]?.questions[indexQuestion]?.question} />
                  }
                  {
                    questionnaire[progressPoll]?.questions[indexQuestion]?.answer_type === 3 &&
                    <NumberQuiz 
                    answerHandler={answerHandler} 
                    id={questionnaire[progressPoll]?.questions[indexQuestion]?.id}
                    question={questionnaire[progressPoll]?.questions[indexQuestion]?.question} />
                  }
                  {
                    questionnaire[progressPoll]?.questions[indexQuestion]?.answer_type === 4 &&
                    <CheckboxQuiz
                      id={questionnaire[progressPoll]?.questions[indexQuestion]?.id}
                      answers={questionnaire[progressPoll]?.questions[indexQuestion]?.answers}
                      answerHandler={answerHandler}
                      question={questionnaire[progressPoll]?.questions[indexQuestion]?.question} />
                  }
                  {
                    questionnaire[progressPoll]?.questions[indexQuestion]?.answer_type === 5 &&
                    <DateQuiz answerHandler={answerHandler} question={questionnaire[progressPoll]?.questions[indexQuestion]?.question} />
                  }
                  {
                    questionnaire[progressPoll]?.questions[indexQuestion]?.answer_type === 6 &&
                    <RadioWithAnswer id={questionnaire[progressPoll]?.questions[indexQuestion]?.id} answers={questionnaire[progressPoll]?.questions[indexQuestion]?.answers} answerHandler={answerHandler} question={questionnaire[progressPoll]?.questions[indexQuestion]?.question} />
                  }
                  {
                    questionnaire[progressPoll]?.questions[indexQuestion]?.answer_type === 7 &&
                    <CheckboxWithAnswer
                      id={questionnaire[progressPoll]?.questions[indexQuestion]?.id}
                      answers={questionnaire[progressPoll]?.questions[indexQuestion]?.answers}
                      answerHandler={answerHandler}
                      question={questionnaire[progressPoll]?.questions[indexQuestion]?.question} />
                  }
                </div>
              </div>
            </div>
          ) : (
            <div>Анкета заполнена</div>
          )}
        </div>
      )}
    </div>
  );
};


const b = {
  "1": "Имя",
  "2": "Почта",
  "3": "234234",
  "4": 0,
  "5": 0,
  "6": 1,
  "7": 2,
  "8": [
      1,
      {}
  ],
  "9": 0,
  "10": 1
}
const a = {
  "25": 1,
  "27": [
      3,
      4
  ],
  "28": null,
  "29": 4,
  "30": 0,
  "31": 0,
  "32": 1,
  "33": 1,
  "34": 3,
  "35": 1,
  "36": 1,
  "37": 0,
  "38": 3,
  "39": 2,
  "116": [
      0,
      1,
      {
          "custom": null
      }
  ],
  "117": [
      {
          "custom": null
      }
  ],
  "118": [
      {
          "custom": null
      }
  ],
  "119": [
      {
          "custom": null
      }
  ],
  "120": [
      {
          "custom": null
      }
  ],
  "121": [
      {
          "custom": null
      }
  ],
  "122": [
      {
          "custom": null
      }
  ],
  "123": [
      {
          "custom": null
      }
  ],
  "124": [
      {
          "custom": null
      }
  ],
  "125": [
      {
          "custom": null
      }
  ],
  "126": [
      {
          "custom": null
      }
  ],
  "127": [
      {
          "custom": null
      }
  ],
  "128": [
      {
          "custom": null
      }
  ],
  "129": [
      {
          "custom": null
      }
  ],
  "130": [
      {
          "custom": null
      }
  ],
  "131": [
      {
          "custom": null
      }
  ],
  "132": [
      {
          "custom": null
      }
  ],
  "133": [
      {
          "custom": null
      }
  ],
  "134": [
      {
          "custom": null
      }
  ],
  "135": [
      {
          "custom": null
      }
  ],
  "136": [
      {
          "custom": null
      }
  ],
  "137": [
      {
          "custom": null
      }
  ],
  "138": [
      {
          "custom": null
      }
  ],
  "140": [
      1,
      {
          "custom": null
      }
  ],
  "141": [
      0,
      1,
      {
          "custom": null
      }
  ],
  "142": [
      0,
      1,
      {
          "custom": null
      }
  ]
}