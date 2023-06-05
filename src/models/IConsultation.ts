import { formatConsultation } from "../utils/enums"

export interface IConsultation{
	name: string
	phone: string
	city: string
	type: formatConsultation
	comment: string
}