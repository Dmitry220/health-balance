export interface ICreatingTracker{
	wake_up_time: string,
	weight: number,
	fruits: number
}
export interface IGetTracker{
	id: number,
	wake_up_time: string,
	weight: number,
	fruits: number
}
export interface ITrack{
	id: string,
	type: number,
	additional: string,
	time: string,
	date: number,
	completed: null | boolean
}
