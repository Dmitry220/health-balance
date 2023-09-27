import React, {FC} from 'react'
import status_full from '../../assets/image/purpose__status_full_green.svg'
import {ITrack} from '../../models/ITracker'
import missed from '../../assets/image/tracker/missed.svg'
import disabled from '../../assets/image/tracker/disabled.svg'
import {timeUserTimestampSelector} from '../../Redux/slice/appSlice';
import {useAppSelector} from "../../hooks/redux-hooks";


interface IHealthySleepItem {
    item: ITrack,
    index: number,
    completeTrackSleep: (index: number) => void,
    isTrackExist: boolean
}

export const HealthySleepItem: FC<IHealthySleepItem> = ({item, index, completeTrackSleep, isTrackExist}) => {
    const timeUser = useAppSelector(timeUserTimestampSelector)
    return (
        <div className='healthy-sleep__item-day' key={item.id}>
            {
                (timeUser >= item?.send_time * 1000) ? <img
                        className='healthy-sleep__icon-full'
                        src={isTrackExist ? (item?.sleep_time! >= 8 ? status_full : missed) : disabled}
                        onClick={() => completeTrackSleep(index)}
                        alt='status_full'
                    /> :
                    <div className='healthy-sleep__circle'/>
            }
            <div className={`healthy-sleep__day-text ${(timeUser >= item?.send_time * 1000) ? isTrackExist ?
                (item?.sleep_time! >= 8 ? 'healthy-sleep__day-text_green'
                    : 'healthy-sleep__day-text_yellow')
                : 'healthy-sleep__day-text_gray' : ''}`}
            >
                {item.additional}
            </div>
        </div>
    )
}
