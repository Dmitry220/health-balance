import { ICreatingPurpose, IPurpose } from "./IPurpose";

export interface IChallengeCard {
  id: number;
  title: string;
  description: string;
  type: number;
  image: string;
  start_date: number;
  end_date: number;
  team_amount?: number;
  max_peoples?: number;
  register_team?: number;
  total_lessons?: number;
  active: number;
  purpose: ICreatingPurpose;
  teams?: any;
  platform: {
    id: number;
    title: string;
    register_start: number;
    register_end: number;
    start_date: number;
    end_date: number;
    status: boolean;
  };
  homeworks: number;
  remains_to_pass: number
}

export interface ICommandList {
  id: number;
  challenge_id: number;
  title: string;
  size: number;
}
export interface IMembersCommandList {
  customers: {
  id: number;
  name: string;
  avatar: string;
  }[]
  title: string
}
