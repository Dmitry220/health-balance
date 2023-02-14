import { FC, useEffect } from "react";
import icon_dream from "../../assets/image/tracker/icon-dream.svg";
import icon_fruit from "../../assets/image/tracker/icon-fruit.svg";
import icon_water from "../../assets/image/tracker/icon-water.svg";
import { tracksSelector } from "../../Redux/slice/trackerSlice";
import { sklonenie } from "../../utils/common-functions";
import { useAppSelector } from "../../utils/hooks/redux-hooks";

interface IDayStatistic {
  date: string;
}

const DayStatistic: FC<IDayStatistic> = ({ date }) => {

  const tracks = useAppSelector(tracksSelector)
  const water  = tracks.waterTrack.filter(item => item.completed)
  const wake_up  = (tracks.waterTrack.length>2&&tracks.waterTrack[0].completed && tracks.waterTrack[1].completed)
  const fruits  = tracks.fruitTrack.filter(item => item.completed)

  return (
    <div className="day-statistic-wrapper">
      <div className="day-statistic-wrapper__title">{date}</div>
      <div className="day-statistic-wrapper__stat">
        <div style={{ color: "#00A62E" }}>
          <img src={icon_dream} alt="" />{wake_up ? 8+' '+ sklonenie(8,['час','часа','часов']) : 'менее 8 часов'}
        </div>
        <div style={{ color: "#00A62E" }}>
          <img src={icon_water} alt="" />
          {(water.length * 10).toFixed()}%
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
