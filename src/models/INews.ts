export interface ICreatingNews {
	title: string,
	annotation: string,
	content: string,
	image: string,
	team: number
}

export interface INews {
	id: number,
	title: string,
	annotation: string,
	content: string,
	image: string,
	created: number
}

export interface ICreatingComment {
	news_id: number,
	parent_id: number,
	comment: string,
}

export interface IListComment {
	id: number,
	customer: number,
	comment: string,
	childrens : any
}