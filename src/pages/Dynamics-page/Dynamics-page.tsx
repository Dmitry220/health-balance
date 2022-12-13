import './dynamics-page.scss'
import { CardIndex } from '../../Components/Health-index-result/Card-index'
import Header from '../../Components/Header/Header'
import { useAppSelector } from '../../utils/hooks/redux-hooks'
import { dynamicsSelector } from '../../Redux/slice/healthIndexSlice'
import { Bar } from 'react-chartjs-2'
import { optionsChartBar,getGradient } from '../../Components/Charts/Chart-options'

export const DynamicsPage = () => {

  const dynamics = useAppSelector(dynamicsSelector)
  const labels = [
    {
      day: 'Пн',
      value: 1500
    },
    {
      day: 'Вт',
      value: 5000
    },
    {
      day: 'Cр',
      value: 7000
    },
    {
      day: 'Чт',
      value: 10000
    },
    {
      day: 'Пь',
      value: 7000
    },
    {
      day: 'Сб',
      value: 7000
    },
    {
      day: 'Вс',
      value: 100
    }
  ]
  const dataDay = {
    labels: labels.map((item) => item.day),
    datasets: [
      {
        data: dynamics.map((item) => +item.biological_age),
        //backgroundColor: '#F2994A',
        backgroundColor: function (context: any) {
          const chart = context.chart
          const { ctx, chartArea } = chart
          if (!chartArea) return null

          return getGradient(ctx, chartArea, '#00A62E', '#3CF470')
        },
        borderRadius: 5
      }
    ]
  }

  return (
    <div className={'dynamics-page'}>
      <Header title={'Динамика'} />
      <div className='dynamics-page__title title-17'>Показатели вне нормы</div>
      <div className='dynamics-page__index'>
        {/* <div className='dynamics-page__index-item'>
          <CardIndex />
        </div>
        <div className='dynamics-page__index-item'>
          <CardIndex />
        </div>
        <div className='dynamics-page__index-item'>
          <CardIndex />
        </div> */}
      </div>
      <div className='dynamics-page__main-title main-title'>Динамика</div>
      <div className='dynamics__chart'>
            <Bar options={optionsChartBar} data={dataDay} />
          </div>
          <div className={'dynamics__info'}>
            <div className='dynamics__value'>
              120
            </div>
            <div className='dynamics__value'>
            Нет результатов
            </div>
    
          </div>
    </div>
  )
}
