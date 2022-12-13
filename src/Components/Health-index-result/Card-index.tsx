import { FC } from "react"

interface ICardIndex {
  value: number,
  title: string
}

export const CardIndex: FC<ICardIndex> = ({ title, value }) => {

  const definitionRisk = (value: number) => {
    switch (value) {
      case 1:
        return 'low'
      case 2:
        return 'average'
      case 3:
        return 'Опасное для здоровья'
      default:
        break;
    }
  }

  return (
    <div className={'card-index ' + 'card-index_'+value}>
      <div className='card-index__head'>
        <div className='card-index__title'>{title}</div>
        <div className={'card-index__hint'}>Есть риски</div>
      </div>

      <div className='card-index__value'>{definitionRisk(value)}</div>
    </div>
  )
}
