import { FC } from "react";
import icon_dream from "../../assets/image/tracker/icon-dream.svg";
import icon_fruit from "../../assets/image/tracker/icon-fruit.svg";
import icon_water from "../../assets/image/tracker/icon-water.svg";

interface IDayStatistic {
  date: string;
}

const DayStatistic: FC<IDayStatistic> = ({ date }) => {
  return (
    <div className="day-statistic-wrapper">
      <div className="day-statistic-wrapper__title">{date}</div>
      <div className="day-statistic-wrapper__stat">
        <div style={{ color: "#00A62E" }}>
          <img src={icon_dream} alt="" />8 часов
        </div>
        <div style={{ color: "#00A62E" }}>
          <img src={icon_water} alt="" />
          95%
        </div>
        <div style={{ color: "#F4C119" }}>
          <img src={icon_fruit} alt="" />
          50%
        </div>
      </div>
    </div>
  );
};

export default DayStatistic;
