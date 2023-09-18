import {TabContent, Tabs} from '../../Components/Tabs/Tabs'
import React, {useState} from 'react'
import Header from '../../Components/Header/Header'
import './statistic-tracker.scss'
import {WaterTarget} from '../../Components/Tracker/Water-target'
import {FruitTarget} from '../../Components/Tracker/Fruit-target'
import DayStatistic from '../../Components/Tracker/Day-statistic'
import ReactDatePicker from 'react-datepicker'
import ru from 'date-fns/locale/ru'
import {HealthySleep} from "../../Components/Tracker/Healthy-sleep";
import {useGetTracksQuery} from "../../services/tracker.api";
import {PullToRefresh} from "../../Components/PullToRefresh/PulltoRefresh";


export const StatisticTracker = () => {

    const namesTabsDynamics = ['Сон', 'Вода', 'Фрукты']
    const [currentValueTab, setCurrentValueTab] = useState<number>(0)
    const [startDate, setStartDate] = useState<Date>(new Date())

    const {refetch} = useGetTracksQuery(startDate.toLocaleDateString())

    const handleRefresh = async () => {
        refetch()
    }

    return (
        <div className='statistic-tracker'>
            <PullToRefresh onTrigger={handleRefresh}/>
            <Header title='Статистика трекера'/>
            <div style={{position: "relative"}}>
                <>
                    <div className='statistic-tracker__calendar'>
                        <ReactDatePicker
                            selected={startDate}
                            maxDate={new Date()}
                            onChange={(date: Date) => {
                                setStartDate(date)
                            }}
                            locale={ru}
                            inline
                        />
                    </div>
                    <DayStatistic date={startDate.toLocaleDateString()}/>
                    <Tabs
                        labels={namesTabsDynamics}
                        onClick={setCurrentValueTab}
                        value={currentValueTab}
                    />
                    <div style={{height: '25px'}}/>
                    <TabContent index={0} value={currentValueTab}>
                        <HealthySleep editProhibition date={startDate.toLocaleDateString()}/>
                    </TabContent>
                    <TabContent index={1} value={currentValueTab}>
                        <WaterTarget date={startDate.toLocaleDateString()}/>
                    </TabContent>
                    <TabContent index={2} value={currentValueTab}>
                        <FruitTarget date={startDate.toLocaleDateString()}/>
                    </TabContent>
                </>
            </div>
        </div>
    )
}
