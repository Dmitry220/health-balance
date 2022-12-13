interface IQuestions {
  id: number;
  tag: string;
  question: string;
  answer_type: number;
  answers: {
    position: number;
    value: string;
  }[];
}

export interface IQuestionnaire {
  id: number;
  name: string;
  questions: IQuestions[];
}

export interface IGetProgressAndIDPolls {
  id: number;
  progress: number;
  created_at: number;
}

export interface IDynamics {
  id: number;
  poll_id: number;
  biological_age: number;
  body_mass_index: number;
  physical_activity: number;
  nutrition_risk: number;
  cholesterol_risk: number;
  alcohol_risk: number;
  depression_risk: number;
  stress_risk: number;
  oncology_risk: number;
  chronic_risk: number;
  cardio_risk: number;
}
