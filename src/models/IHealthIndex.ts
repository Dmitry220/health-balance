interface IQuestions {
	id: number,
	tag: string,
	question: string,
	answer_type: number,
	answers: string[]
}

export interface IQuestionnaire{
	index:{
		id: number,
		name: string,
		questions: IQuestions[]
	},
}

export interface IGetProgressAndIDPolls {
	id: number,
	progress: number,
	created_at: number
}