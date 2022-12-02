import { type } from "os"

export interface INewChallenge {
	id: number,
	platform: number,
	title: string,
	description:string,
	type: number, 
	image: string, 
	start_date: number, 
	end_date: number,
	team_amount?: number, 
	max_peoples?: number, 
	register_team?: number,
	total_lessons?: number
}
