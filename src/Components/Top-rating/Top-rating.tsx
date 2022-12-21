import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IMAGE_URL } from '../../http'
import { PROFILE_MEMBER_ROUTE } from '../../provider/constants-route'
import { leaderboard, topTodaySelector } from '../../Redux/slice/leaderBoardSlice'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks'
import './top-rating.scss'

export const TopRating = () => {

  const dispatch = useAppDispatch()
  const topToday = useAppSelector(topTodaySelector)
  let leaderDisplayOrder = 2

  useEffect(() => {
    dispatch(leaderboard())
  }, [])



  return (
    <div className={'top-rating'}>
      <div className='top-rating__header-top'>
        {
          topToday.length ? (topToday.length >= 3 ? topToday.map((item, i, topToday) => {

            if (leaderDisplayOrder === 0) {
              leaderDisplayOrder = 3
            }
            leaderDisplayOrder--

            if (i <= 2) {
              return <Link
                key={i}
                to={PROFILE_MEMBER_ROUTE + '/' + topToday[leaderDisplayOrder].id}
                className='top-rating__personal personal'
              >
                <div className={'personal__avatar ' + (leaderDisplayOrder === 0 && 'leader')} >
                  <span className={'personal__place personal__place' + (leaderDisplayOrder + 1 != 1 && '_' + (leaderDisplayOrder + 1))}>{leaderDisplayOrder + 1}</span>
                  <img
                    src={topToday[leaderDisplayOrder].avatar ? (IMAGE_URL + 'avatars/' + topToday[leaderDisplayOrder].avatar)
                      : 'https://i2.wp.com/www.easttamakidentist.co.nz/wp-content/uploads/2016/10/male-member-placeholder-1.jpg?fit=800%2C800&ssl=1'}
                    alt='avatar'
                  />
                </div>
                <div className='personal__name'>
                  {topToday[leaderDisplayOrder].name} <br /> {topToday[leaderDisplayOrder].surname}
                </div>
                <div className='personal__count-steps'>{topToday[leaderDisplayOrder].total_quantity} шагов</div>
              </Link>
            }


          }
          ) : topToday.map((item, i) => <Link key={i}
            to={PROFILE_MEMBER_ROUTE + '/' + item.id}
            className='top-rating__personal personal'>
            <div className={'personal__avatar ' + (i === 0 && 'leader')} >
              <span className={'personal__place personal__place_' + (i + 1)}>{i + 1}</span>
              <img
                src={item.avatar ? (IMAGE_URL + 'avatars/' + item.avatar)
                  : 'https://i2.wp.com/www.easttamakidentist.co.nz/wp-content/uploads/2016/10/male-member-placeholder-1.jpg?fit=800%2C800&ssl=1'}
                alt='avatar'
              />
            </div>
            <div className='personal__name'>
              {item.name} <br /> {item.surname}
            </div>
            <div className='personal__count-steps'>{item.total_quantity} шагов</div>
          </Link>)) : <h1>Топа нет</h1>
        }
      </div>
      <div className='top-rating__list list-participant'>
        {
          topToday.length && topToday.map((item, i) => i > 2 &&

            <Link to={PROFILE_MEMBER_ROUTE + '/' + item.id} className='list-participant__item' key={i}>
              <div className='list-participant__column'>
                <div className='list-participant__number'>{i + 1}</div>
                <div className='list-participant__avatar'>
                  <img
                    src={item.avatar ? IMAGE_URL + 'avatars/' + item.avatar
                      : 'https://i2.wp.com/www.easttamakidentist.co.nz/wp-content/uploads/2016/10/male-member-placeholder-1.jpg?fit=800%2C800&ssl=1'}
                    alt='avatar'
                  />
                </div>
                <div className='list-participant__name'>{item.name}</div>
              </div>
              <div className='list-participant__column'>
                <div className='list-participant__count-steps'>{item.total_quantity} шагов</div>
              </div>
            </Link>
          )
        }
      </div>
    </div>
  )
}
