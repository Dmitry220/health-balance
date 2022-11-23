import { type } from "os"

export interface ICreatingPurpose {
	challenge: number,
	type: 1|2,
	quantity: number,
	reward: number,
}

export interface IPurposeResponse {
	purpose_id: number
}

export interface INewChallenge {
	id: number,
	platform: number,
	title: string,
	description:string,
	type: number, 
	image: string, 
	start_date: number, 
	end_date: number,
	team_amount: number, 
	max_peoples: number, 
}