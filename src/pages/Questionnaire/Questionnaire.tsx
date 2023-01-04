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
  isLoadingSelector,
  progressPollSelector,
  questionnaireSelector,
  resetQuestionnaire,
} from "../../Redux/slice/healthIndexSlice";
import { ProgressBar } from "../../Components/Progress-bar/Progress-bar";
import { typesChallenge } from "../../types/enums";
import { useNavigate } from "react-router-dom";
import {
  ACTIVITY_ROUTE,
  HEALTH_INDEX_RESULTS_ROUTE,
  HEALTH_INDEX_ROUTE,
} from "../../provider/constants-route";
import TextQuiz from "../../Components/Quiz/TextQuiz";
import { addIndexPageAnswer, resetAnswers, saveCurrentResult } from "../../Redux/slice/healthIndexSlice";
import RadioQuiz from "../../Components/Quiz/RadioQuiz";
import CheckboxQuiz from "../../Components/Quiz/CheckboxQuiz";
import { CheckboxWithAnswer } from "../../Components/Quiz/CheckboxWithAnswer";
import { NumberQuiz } from "../../Components/Quiz/NumberQuiz";
import { DateQuiz } from "../../Components/Quiz/DateQuiz";
import { RadioWithAnswer } from "../../Components/Quiz/RadioWithAnswer";
import { ContinueQuestionaire, StartQuestionaire } from "../Health-index/Health-index-page";
import { ModalStatus } from "../../Components/Modals/Modal-status";
import { Preloader } from "../../Components/Preloader/Preloader";


export const Questionnaire = () => {
  const dispatch = useAppDispatch();
  const questionnaire = useAppSelector(questionnaireSelector);
  const answers = useAppSelector(answersQuestionnaireSelector)
  const idPoll = useAppSelector(idPolleSelector)
  const progressPoll = useAppSelector(progressPollSelector)
  const [indexQuestion, setIndexQuestion] = useState(0)
  const [finished, setFinished] = useState<boolean>(false)
  const isLoading = useAppSelector(isLoadingSelector)


  const generateResult = async () => {
    await dispatch(generateResultsPoll(idPoll))
    dispatch(resetQuestionnaire())
    setFinished(true)
  }


  useEffect(() => {
    // dispatch(getProgressAndIdPolls())    
    dispatch(getQuestionnaire());
    dispatch(resetAnswers());
  }, []);


  useEffect(() => {
    if (questionnaire[progressPoll]?.questions.length === indexQuestion) {
      dispatch(saveCurrentResult(idPoll));
      dispatch(resetAnswers());
      if(progressPoll!==9){
        setIndexQuestion(0)
      }      

      if (progressPoll === 9) {
        generateResult()
        return
      }
    }

    if (progressPoll + 1 === 3 && indexQuestion === 2 && !answers[1]['22'].includes(3)) {
      dispatch(addIndexPageAnswer({ '23': null }));
      setIndexQuestion(prev => prev + 1)
    }
    if (progressPoll + 1 === 4 && indexQuestion === 1 && (answers[0]['61'] === 8 || answers[0]['61'] === 9)) {
      dispatch(addIndexPageAnswer({ '62': null }));
      dispatch(addIndexPageAnswer({ '63': null }));
      setIndexQuestion(prev => prev + 2)
    }

  }, [indexQuestion])


  const answerHandler = (answer: any) => {
    dispatch(addIndexPageAnswer(answer));
    setIndexQuestion(prev => prev + 1)
  };

  console.log(Object.assign({}, ...answers));
console.log(questionnaire);
  if(isLoading){
    return <Preloader />
  }

  if (finished) {
    return <ModalStatus route={HEALTH_INDEX_ROUTE} subTitle={'Нажмите ОК для просмотра результатов'} />
  }


  return (
    <div className="questionnaire-page">
      {(
        <div>
          {questionnaire.length ? (
            <div>
              <Header title={"Анкета #" + (progressPoll + 1)} />
              <div className="questionnaire-page__progress-bar">
                <div className="questionnaire-page__progress-value">
                  {answers.length + 1} / {questionnaire[progressPoll]?.questions.length}
                  <span>{questionnaire[progressPoll]?.name}</span>
                </div>
                <ProgressBar
                  percent={((answers.length + 1) * 100) / questionnaire[progressPoll]?.questions.length}
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
            <div></div>
          )}
        </div>
      )}
    </div>
  );
};
