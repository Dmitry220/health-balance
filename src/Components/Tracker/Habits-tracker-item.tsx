import React, {memo} from 'react'
import './tracker.scss'
import successfully from '../../assets/image/tracker/successfully.svg'
import missed from '../../assets/image/tracker/missed.svg'
import {ITrack, ITrackAdditional} from '../../models/ITracker'
import {useCompleteTrackMutation} from '../../services/tracker.api'
import {showToast} from '../../utils/common-functions'
import {confirmAlert} from 'react-confirm-alert'
import {useAppSelector} from "../../hooks/redux-hooks";
import {timeUserTimestampSelector} from "../../Redux/slice/appSlice";
import disabled from '../../assets/image/tracker/disabled.svg'

interface IWaterTargetItem {
    track: ITrack
}

const HabitsTargetItem = memo<IWaterTargetItem>(({track}) => {
    const time = `${new Date(track.send_time * 1000)
        .getHours()
        .toString()
        .padStart(2, '0')}:${new Date(track.send_time * 1000)
        .getMinutes()
        .toString()
        .padStart(2, '0')}`
    let additional = isJsonString(track.additional)
    const timeUser = useAppSelector(timeUserTimestampSelector)
    const [complete] = useCompleteTrackMutation()

    const definitionTargetTrack = (type: number) => {
        switch (type) {
            case 2:
                return 'выпить воды'
            case 3:
                return 'поесть фрукты'
            default:
                break
        }
    }

    function isJsonString(str: string): string {
        try {
            const jsonParse: ITrackAdditional = JSON.parse(str)
            if (track.type === 3) return jsonParse?.unit
            if (track.type === 2) return jsonParse.amount + ' ' + jsonParse?.unit
            return str
        } catch (e) {
            return str
        }
    }

    const completeTrack = async () => {
        if (track.id === 0) return

        if (!track.completed) {
            confirmAlert({
                title: `Выполнить цель "${definitionTargetTrack(
                    track.type
                )}" в ${time}?`,
                buttons: [
                    {
                        label: 'Да',
                        onClick: async () =>
                            complete(track.id)
                                .unwrap()
                                .then(() => showToast('Цель выполнена'))
                    },
                    {
                        label: 'Нет'
                    }
                ]
            })
        }
    }

    return (
        <div className='habits-tracker-item'>
            {(timeUser >= track?.send_time * 1000) ? (
                <>
                    <img
                        src={track.id ? (track.completed ? successfully : missed) : disabled}
                        onClick={completeTrack}
                        alt={track.id ? (track.completed ? 'successfully' : 'missed') : 'disabled'}
                        style={{marginBottom: 3}}
                        width={34}
                        height={34}
                    />
                    <div
                        className={`habits-tracker-item__value ${
                            track.id ? track.completed
                                    ? 'habits-tracker-item__value_green'
                                    : 'habits-tracker-item__value_yellow'
                                : 'habits-tracker-item__value_gray'
                        }`}
                    >
                        {additional}
                    </div>
                </>
            ) : (
                <>
                    <div className='habits-tracker-item__data'>
                        {new Date(track.send_time * 1000)
                                .getHours()
                                .toString()
                                .padStart(2, '0') +
                            ':' +
                            new Date(track.send_time * 1000)
                                .getMinutes()
                                .toString()
                                .padStart(2, '0')}
                    </div>
                    {!track.completed && (
                        <div className={'habits-tracker-item__value'}>{additional}</div>
                    )}
                </>
            )}
        </div>
    )
})

export default HabitsTargetItem
