import './profile.scss'

export const ProfileChallenge = () => {
  return (
    <div className={'profile-challenge'}>
      <div className='profile-challenge__title title-17'>Челленджи</div>
      <div className='profile-challenge__statistics-challenges'>
        <div className='profile-challenge__card-statistics'>
          <div className='profile-challenge__value'>3</div>
          <div className='profile-challenge__items-text small-text'>
            Активные
          </div>
        </div>
        <div className='profile-challenge__card-statistics'>
          <div className='profile-challenge__value'>16</div>
          <div className='profile-challenge__items-text small-text'>
            Пройдено
          </div>
        </div>
      </div>
    </div>
  )
}
