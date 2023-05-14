import { FC } from 'react'

interface ICardIndex {
  value: number
  title: string
}

export const CardIndex: FC<ICardIndex> = ({ title, value }) => {
  const definitionRisk = (value: number) => {
    switch (value) {
      case 0:
        return 'Не посчитано'
      case 1:
        return 'Все в порядке'
      case 2:
        return 'Средне'
      case 3:
        return 'Опасное для здоровья'
      default:
        return value
    }
  }

  const hintRisk = (value: number) => {
    switch (value) {
      case 0:
        return 'Не посчитано'
      case 1:
        return 'Рисков нет'
      case 2:
        return 'Есть рсики'
      case 3:
        return 'Критично!'
      default:
        return value < 18 ? 'Дефицит' : value < 25 ? 'Рисков нет' : 'Ожирение'
    }
  }

  return (
    <div
      className={
        'card-index ' +
        'card-index' +
        (value <= 3
          ? '_' + value
          : value < 18
          ? '_' + 2
          : value < 25
          ? '_' + 1
          : '_' + 3)
      }
    >
      <div className='card-index__head'>
        <div className='card-index__title'>{title}</div>
        <div className={'card-index__hint'}>{hintRisk(value)}</div>
      </div>
      <div
        className={
          'card-index__value' +
          (value <= 3
            ? '_' + value
            : value < 18
            ? '_' + 2
            : value < 25
            ? '_' + 1
            : '_' + 3)
        }
      >
        {definitionRisk(value)}
      </div>
    </div>
  )
}
