import React, {FC} from 'react'
import status_full from '../../assets/image/purpose__status_full_green.svg'
import {ITrack} from '../../models/ITracker'
import missed from '../../assets/image/tracker/missed.svg'


interface IHealthySleepItem {
	item: ITrack,
	index: number,
	completeTrackSleep: (index: number) => void
}

export const HealthySleepItem: FC<IHealthySleepItem> = ({ item, index, completeTrackSleep }) => {

	return (
		<div className='healthy-sleep__item-day' key={item.id}>
			{
				(new Date().getTime() >= item?.send_time * 1000) ? <img
					className='healthy-sleep__icon-full'
					src={item?.sleep_time! >= 8 ? status_full : missed}
					onClick={() => completeTrackSleep(index)}
					alt='status_full'
				/> :
					<div className='healthy-sleep__circle' />
			}
			<div className='healthy-sleep__day-text'>
				{item.additional}
			</div>
		</div>
	)
}
