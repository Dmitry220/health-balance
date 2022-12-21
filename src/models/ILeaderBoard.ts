export interface ILeaderBoardItem {
	id: number,
	name: string,
	total_quantity: number,
	avatar: string,
	surname:string
}

export interface ILeaderBoardResponse {
	data:{
		today: ILeaderBoardItem[],
		month: ILeaderBoardItem[],
		year: ILeaderBoardItem[]
	}
}