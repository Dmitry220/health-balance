import { useState } from 'react'
import { Dispatch, SetStateAction } from 'react'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import {  TEAM_MEMBER_ROUTE} from '../../provider/constants-route'
import ChallengeService from '../../services/ChallengeService'
import './team-selection.scss'
import plug from '../../assets/image/plug.png'
import { showToast } from '../../utils/common-functions'


interface ITeamItem {
	img: string
	title: string
	challengeId: number
	commandId: number
	existTeam: boolean
	setExistTeam: Dispatch<SetStateAction<boolean>>
 }
 
 export const TeamItem: FC<ITeamItem> = ({
	img,
	title,
	challengeId,
	commandId,
	setExistTeam,
	existTeam
 }) => {
	const [disabledTeams, setDisabledTeams] = useState(false)
 
	const joinToChallenge = async () => {
	  try {
		 const response = await ChallengeService.challengeJoin(Number(challengeId))
		 if (!response.data.success) {
			await showToast('Ошибка!')
		 }
	  } catch (error) {
		 await showToast('Ошибка!')
	  }
	}
 
	const joinToCommand = async () => {
	  try {
		 const response = await ChallengeService.teamJoin(commandId)
		 if (response.data.success) {
			await showToast('Вы в команде!')
			setDisabledTeams(true)
			setExistTeam(true)
			await joinToChallenge()
		 } else {
			await showToast(response.data?.errors)
		 }
	  } catch (error) {
		 await showToast('Ошибка запроса!')
	  }
	}
 
	return (
	  <div className='team-selection__item team-item'>
		 <Link
			to={TEAM_MEMBER_ROUTE + '/' + commandId}
			className={
			  !existTeam ? 'team-item__column' : 'team-item__column disabled'
			}
		 >
			<div className='team-item__img'>
			  <img src={plug} alt='' />
			</div>
			<div className='team-item__title'>{title}</div>
		 </Link>
		 {!disabledTeams && (
			<div
			  className={
				 (existTeam ? disabledTeams : !existTeam)
					? 'team-item__join text-blue'
					: 'team-item__join disabled text-blue'
			  }
			  onClick={joinToCommand}
			>
			  Вступить
			</div>
		 )}
		 {disabledTeams && (
			<div className='team-item__join text-yellow'>
			  Вы в команде <span />
			</div>
		 )}
	  </div>
	)
 }
 