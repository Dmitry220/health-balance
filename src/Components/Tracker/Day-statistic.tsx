import { FC, useEffect, useState } from "react";
import icon_dream from "../../assets/image/tracker/icon-dream.svg";
import icon_fruit from "../../assets/image/tracker/icon-fruit.svg";
import icon_water from "../../assets/image/tracker/icon-water.svg";
import { tracksSelector } from "../../Redux/slice/trackerSlice";
import { sklonenie } from "../../utils/common-functions";
import { useAppSelector } from "../../hooks/redux-hooks";
import { ITrack } from "../../models/ITracker";

interface IDayStatistic {
  date: string;
}

const DayStatistic: FC<IDayStatistic> = ({ date }) => {

  const tracks = useAppSelector(tracksSelector)
  const water  = tracks.waterTrack.filter(item => item.completed)
  const fruits  = tracks.fruitTrack.filter(item => item.completed)
  const daysWeek = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']
  const indexWeek = new Date(date.replace( /(\d{2}).(\d{2}).(\d{4})/, "$2/$1/$3")).getDay() === 0 ? 6 : new Date(date.replace( /(\d{2}).(\d{2}).(\d{4})/, "$2/$1/$3")).getDay() - 1
  const [currentDay, setCurrentDay] = useState<ITrack>()

  useEffect(()=>{
    setCurrentDay(tracks.sleepTrack.find(item => item.additional === daysWeek[indexWeek]))
  }, [tracks.sleepTrack])

  return (
    <div className="day-statistic-wrapper">
      <div className="day-statistic-wrapper__title">{date}</div>
      <div className="day-statistic-wrapper__stat">
        <div  style={{color: (currentDay?.type === 1 && currentDay?.sleep_time! >= 8)?'#00A62E':'#F4C119'}}>
          <img src={icon_dream} alt="" /> {(currentDay?.type === 1 && currentDay?.sleep_time! >= 8)
                ? currentDay?.sleep_time + sklonenie(currentDay?.sleep_time!, [' час', ' часа', ' часов'])
                : 'менее 8 часов'}
        </div>
        <div style={{ color: "#00A62E" }}>
          <img src={icon_water} alt="" />
          {tracks.waterTrack.length ? (water.length*100/tracks.waterTrack.length).toFixed(): 0}%
        </div>
        <div style={{ color: "#F4C119" }}>
          <img src={icon_fruit} alt="" />
          {tracks.fruitTrack.length ? (fruits.length*100/tracks.fruitTrack.length).toFixed(): 0}%
        </div>
      </div>
    </div>
  );
};

export default DayStatistic;
