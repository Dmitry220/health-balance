import React, { Dispatch, FC, useEffect, useState } from 'react'
import status_full from '../../assets/image/purpose__status_full_green.svg'
import { ITrack } from '../../models/ITracker'
import { confirmAlert } from 'react-confirm-alert'
import { showToast, timeConverterUnix } from '../../utils/common-functions'
import TrackerService from '../../services/TrackerService'
import missed from '../../assets/image/tracker/missed.svg'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import { getTracks, tracksSelector } from '../../Redux/slice/trackerSlice'


interface IHealthySleepItem {
	item: ITrack,
	index: number,
	array: ITrack[],
	morning: string,
	evening: string,
	hour: number,
	setCurrentDay: Dispatch<ITrack>
}

export const HealthySleepItem: FC<IHealthySleepItem> = ({ item, index, array, evening, morning, hour, setCurrentDay }) => {

	const dispatch = useAppDispatch()

	const [trackCompleted, setTrackCompleted] = useState<boolean>(item?.sleep_time! >= 8)

	const firstItemTrackSleep = hour - 8 < 0 ? array[index + 1] : array[index - 1]

	const secondItemTrackSleep = array[index]

	const subtractedIndex = 1


	const completeTrackSleep = async () => {

		if (array[index].id === 0 && array[index + 1].id === 0) {
			await showToast('Время не соответствует старту трекера')
			return
		}

		confirmAlert({
			title:
				`Выполнить цель "здоровый сон" в ${item.additional}?`,
			buttons: [
				{
					disabled: firstItemTrackSleep.completed,
					style: { opacity: firstItemTrackSleep.completed ? 0.6 : 1 },
					label: `Засыпание в ${evening}`,
					onClick: async () => {
						if (new Date().getTime() < firstItemTrackSleep?.send_time * 1000) {
							await showToast('Время сна еще не наступило')
							return
						}

						if (firstItemTrackSleep.id != 0) {
							console.log('super son');
							try {
								const response = await TrackerService.complteteTrack(firstItemTrackSleep.id)
								if (response.data.success) await showToast("Цель засыпания выполнена")
								// if (index - subtractedIndex < 0 || array[index - subtractedIndex]?.completed) {
								// 	setCurrentDay({ ...item, sleep_time: 8 })
								// 	setTrackCompleted(true)
								// }				
								dispatch(getTracks(new Date().toLocaleDateString()))				
							} catch (error) {
								await showToast('Ошибка')
							}
						} else {
							await showToast('Время не соответствует старту трекера')
						}
					}
				},
				{
					disabled: secondItemTrackSleep.completed,
					style: { opacity: secondItemTrackSleep.completed ? 0.6 : 1 },
					label: `Просыпание в ${morning}`,
					onClick: async () => {

						if (secondItemTrackSleep?.id != 0) {
							console.log('super podem');
							try {
								const response = await TrackerService.complteteTrack(secondItemTrackSleep.id)
								if (response.data.success) await showToast("Цель просыпание выполнена")
								// if (index - subtractedIndex < 0 || array[index - subtractedIndex]?.completed) {
								// 	setCurrentDay({ ...item, sleep_time: 8 })
								// 	setTrackCompleted(true)
								// }
								dispatch(getTracks(new Date().toLocaleDateString()))
							} catch (error) {
								await showToast('Ошибка')
							}
						} else {
							await showToast('Время не соответствует старту трекера')
						}
					}
				}
			]
		})
	}

	useEffect(()=>{
		setTrackCompleted(item?.sleep_time! >= 8)
	}, [item])



	if(item.type === 1){
		return (
			<div className='healthy-sleep__item-day' key={item.id}>
	
				{item.type === 1 && <>
					{
						(new Date().getTime() >= array[index]?.send_time * 1000) ? <img
							className='healthy-sleep__icon-full'
							src={item?.sleep_time! >= 8 ? status_full : missed}
							onClick={completeTrackSleep}
							alt='status_full'
						/> :
							<div className='healthy-sleep__circle' />
					}
					<div className='healthy-sleep__day-text'>
						{item.additional}
					</div>
				</>}
			</div>
		)
	}

	return <></>

}
