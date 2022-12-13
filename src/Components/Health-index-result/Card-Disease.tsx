import warning from '../../assets/image/icon-warning.svg'
import danger from '../../assets/image/icon-danger.svg'
import success from '../../assets/image/purpose__status_full_green.svg'
import { FC } from 'react'

interface ICardDisease {
  title: string,
  risk: number
}

export const CardDisease: FC<ICardDisease> = ({ risk, title }) => {

  const definitionRisk = (value: number) => {
    switch (value) {
      case 1:
        return 'Низкий'
      case 2:
        return 'Средний'
      case 3:
        return 'Высокий'
      default:
        return 'Не определен'
    }
  }

  return (
    <div className={'card-disease'}>
      <div className='card-disease__title'>{title}</div>
      <div className='card-disease__mark' style={{ color: risk === 3 ? '#F24A4A' : risk === 2 ? '#F4C119' : '#00A62E' }}>
        {risk === 1 && <img src={success} alt='' />}
        {risk === 2 && <img src={warning} alt='' />}
        {risk === 3 && < img src={danger} alt='' />}
        {definitionRisk(risk)}
      </div>
    </div>
  )
}
