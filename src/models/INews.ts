export interface ICreatingNews {
	title: string,
	annotation: string,
	content: string,
	image: string,
	team: number,
	category: number,
	push: 0 | 1
}

export interface INews {
	id: number,
	title: string,
	annotation: string,
	content: string,
	image: string,
	created_at: number,
	category: number
	push: boolean,
	status: boolean,
	team: number | null,
	likes: number
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