import {Navigation} from '../../Components/Navigation/Navigation'
import {WaterTarget} from '../../Components/Tracker/Water-target'
import {FruitTarget} from '../../Components/Tracker/Fruit-target'
import './tracker-habits_page.scss'
import icon_fruit from '../../assets/image/tracker/icon-fruit.svg'
import icon_water from '../../assets/image/tracker/icon-water.svg'
import {NavLink, useNavigate} from 'react-router-dom'
import {
    ACTIVITY_ROUTE,
    GOAL_FRUITS__ROUTE,
    GOAL_WATER__ROUTE,
    STATISTICS_TRACKER__ROUTE
} from '../../provider/constants-route'
import {HeaderTwo} from '../../Components/Header-two/Header-two'
import {showToast, sklonenie} from '../../utils/common-functions'
import {useDeleteTrackerMutation, useGetTrackerQuery, useGetTracksQuery} from '../../services/tracker.api'
import {confirmAlert} from 'react-confirm-alert'
import {HealthySleep} from '../../Components/Tracker/Healthy-sleep'
import React, {useRef} from "react";
import {usePullToRefresh} from "../../hooks/usePulltoRefresh";


export const TrackerHabitsPage = () => {
    console.log('sddsf sdf sdf sdf sdf sdff')
    const {data: tracker} = useGetTrackerQuery()

    const {refetch} = useGetTracksQuery(new Date().toLocaleDateString(), {
        refetchOnMountOrArgChange: true
    })

    const countWater = tracker && ((tracker.weight * 35) / 1000).toFixed(1);
    const [deleteTrackers, {isLoading}] = useDeleteTrackerMutation()
    const navigate = useNavigate()

    const deleteTracker = async () => {
        try {
            const response = await deleteTrackers(null).unwrap()
            if (response?.success) {
                await showToast('Трекер успешно удален')
                navigate(ACTIVITY_ROUTE)
            }
        } catch (error) {
            await showToast('Произошла ошибка')
        }
    }

    const redirectToChangeTrack = (path: string) => {
        confirmAlert({
            title:
                'Вы уверены что хотите изменить цель?  Будет создан новый трекер и старые выполненные цели будут аннулированы!',
            buttons: [
                {
                    label: 'Да',
                    onClick: () => navigate(path)
                },
                {
                    label: 'Нет'
                }
            ]
        })
    }

    const handleRefresh = async () => {
      refetch()
    }
    const pullToRefresh = useRef(null)

    usePullToRefresh(pullToRefresh, handleRefresh)


    return (
        <div className={'tracker-habits-page'}>
            <Navigation/>
            <HeaderTwo title={'Трекер привычек'} marginBottom={20}/>
            <div style={{position: "relative"}}>
                <div ref={pullToRefresh}>
                    <div className='tracker-habits-page__statistical-btn-wrapper'>
                        <NavLink
                            to={STATISTICS_TRACKER__ROUTE}
                            style={{color: '#fff'}}
                            className='_button-dark'
                        >
                            Смотреть статистику
                        </NavLink>
                    </div>
                    <div className='tracker-habits-page__target'>
                        <HealthySleep/>
                    </div>

                    <div className='tracker-habits-page__task-title'>
                        <div className='tracker-habits-page__task-column'>
                            <img src={icon_water} alt='icon_water'/>
                            <span>{countWater} л.</span>
                            воды сегодня
                        </div>
                        <div className='tracker-habits-page__task-column'>
                            <div
                                onClick={() => redirectToChangeTrack(GOAL_WATER__ROUTE)}
                                className='text-blue'
                            >
                                изменить цель
                            </div>
                        </div>
                    </div>
                    <div className='tracker-habits-page__target'>
                        <WaterTarget/>
                    </div>
                    <div className='tracker-habits-page__task-title'>
                        <div className='tracker-habits-page__task-column'>
                            <img src={icon_fruit} alt=''/>
                            Съесть <span>{tracker?.fruits}</span>{' '}
                            {tracker && sklonenie(tracker?.fruits, ['фрукт', 'фрукта', 'фруктов'])} /{' '}
                            {tracker && sklonenie(tracker?.fruits, ['овощ', 'овоща', 'овощей'])}
                        </div>
                        <div className='tracker-habits-page__task-column'>
                            <div
                                onClick={() => redirectToChangeTrack(GOAL_FRUITS__ROUTE)}
                                className='text-blue'
                            >
                                изменить цель
                            </div>
                        </div>
                    </div>
                    <div className='tracker-habits-page__target'>
                        <FruitTarget/>
                    </div>
                    <div className='tracker-habits-page__statistical-btn-wrapper'>
                        <button
                            style={{color: '#fff'}}
                            disabled={isLoading}
                            onClick={deleteTracker}
                            className='_button-dark'
                        >
                            {isLoading ? (
                                <span className='spinner'>
              <i className='fa fa-spinner fa-spin'></i> Загрузка
            </span>
                            ) : (
                                'Отключить трекер'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
