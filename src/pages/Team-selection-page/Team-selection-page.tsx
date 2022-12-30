import './team-selection-page.scss'
import { TeamSelection } from '../../Components/Team-selection/Team-selection'
import Header from '../../Components/Header/Header'
import { Link } from 'react-router-dom'
import { CHALLENGE_ROUTE } from '../../provider/constants-route'

export const TeamSelectionPage = () => {
  return (
    <div className={'team-selection-page'}>
      <Header title={'Выбор команды'} />
      <div className='team-selection-page__title main-title'>
        Вступите в команду
      </div>
      <div className='team-selection-page__sub-title'>
        Информацию о команде уточняйте у куратора
      </div>
      <div className='team-selection-page__team'>
        <TeamSelection />
      </div>

      <Link to={CHALLENGE_ROUTE} className='team-selection-page__button _button-white'>
        Готово
      </Link>
    </div>
  )
}
