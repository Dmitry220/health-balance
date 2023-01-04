export interface ILesson {
  id: number
  title: string
  description: string
  type: number
  video: string
  question: string
  answers: string[]
  correct_answer: number
  qr_code: string
  start_date: number
  end_date: number
  score: number
  image: string,
  completed: boolean
}
