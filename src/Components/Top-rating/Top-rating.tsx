import { Link } from 'react-router-dom'
import { PROFILE_MEMBER_ROUTE } from '../../provider/constants-route'
import './top-rating.scss'

export const TopRating = () => {
  return (
    <div className={'top-rating'}>
      <div className='top-rating__header-top'>
        <Link
          to={PROFILE_MEMBER_ROUTE + '/1'}
          className='top-rating__personal personal'
        >
          <div className='personal__avatar'>
            <span className={'personal__place personal__place_2'}>2</span>
            <img
              src='https://i2.wp.com/www.easttamakidentist.co.nz/wp-content/uploads/2016/10/male-member-placeholder-1.jpg?fit=800%2C800&ssl=1'
              alt='avatar'
            />
          </div>
          <div className='personal__name'>
            Иван <br /> Иванов
          </div>
          <div className='personal__count-steps'>0 шагов</div>
        </Link>
        <div className='top-rating__personal personal'>
          <div className='personal__avatar leader'>
            <span className={'personal__place'}>1</span>
            <img
              src='https://i2.wp.com/www.easttamakidentist.co.nz/wp-content/uploads/2016/10/male-member-placeholder-1.jpg?fit=800%2C800&ssl=1'
              alt='avatar'
            />
          </div>
          <div className='personal__name'>
            Валентина <br /> Ревз
          </div>
          <div className='personal__count-steps'>4 456 шагов</div>
        </div>
        <div className='top-rating__personal personal'>
          <div className='personal__avatar'>
            <span className={'personal__place personal__place_3'}>3</span>
            <img
              src='https://i2.wp.com/www.easttamakidentist.co.nz/wp-content/uploads/2016/10/male-member-placeholder-1.jpg?fit=800%2C800&ssl=1'
              alt='avatar'
            />
          </div>
          <div className='personal__name'>
            Валентина <br /> Ревз
          </div>
          <div className='personal__count-steps'>4 456 шагов</div>
        </div>
      </div>
      <div className='top-rating__list list-participant'>
        <div className='list-participant__item'>
          <div className='list-participant__column'>
            <div className='list-participant__number'>4</div>
            <div className='list-participant__avatar'>
              <img
                src='https://i2.wp.com/www.easttamakidentist.co.nz/wp-content/uploads/2016/10/male-member-placeholder-1.jpg?fit=800%2C800&ssl=1'
                alt='avatar'
              />
            </div>
            <div className='list-participant__name'>Имя Фамилия</div>
          </div>
          <div className='list-participant__column'>
            <div className='list-participant__count-steps'>1 500 шагов</div>
          </div>
        </div>
        <div className='list-participant__item'>
          <div className='list-participant__column'>
            <div className='list-participant__number'>5</div>
            <div className='list-participant__avatar'>
              <img
                src='https://i2.wp.com/www.easttamakidentist.co.nz/wp-content/uploads/2016/10/male-member-placeholder-1.jpg?fit=800%2C800&ssl=1'
                alt='avatar'
              />
            </div>
            <div className='list-participant__name'>Имя Фамилия</div>
          </div>
          <div className='list-participant__column'>
            <div className='list-participant__count-steps'>1 500 шагов</div>
          </div>
        </div>
        <div className='list-participant__item'>
          <div className='list-participant__column'>
            <div className='list-participant__number'>6</div>
            <div className='list-participant__avatar'>
              <img
                src='https://i2.wp.com/www.easttamakidentist.co.nz/wp-content/uploads/2016/10/male-member-placeholder-1.jpg?fit=800%2C800&ssl=1'
                alt='avatar'
              />
            </div>
            <div className='list-participant__name'>Имя Фамилия</div>
          </div>
          <div className='list-participant__column'>
            <div className='list-participant__count-steps'>1 500 шагов</div>
          </div>
        </div>
        <div className='list-participant__item'>
          <div className='list-participant__column'>
            <div className='list-participant__number'>7</div>
            <div className='list-participant__avatar'>
              <img
                src='https://i2.wp.com/www.easttamakidentist.co.nz/wp-content/uploads/2016/10/male-member-placeholder-1.jpg?fit=800%2C800&ssl=1'
                alt='avatar'
              />
            </div>
            <div className='list-participant__name'>Имя Фамилия</div>
          </div>
          <div className='list-participant__column'>
            <div className='list-participant__count-steps'>1 500 шагов</div>
          </div>
        </div>
        <div className='list-participant__item'>
          <div className='list-participant__column'>
            <div className='list-participant__number'>8</div>
            <div className='list-participant__avatar'>
              <img
                src='https://i2.wp.com/www.easttamakidentist.co.nz/wp-content/uploads/2016/10/male-member-placeholder-1.jpg?fit=800%2C800&ssl=1'
                alt='avatar'
              />
            </div>
            <div className='list-participant__name'>Имя Фамилия</div>
          </div>
          <div className='list-participant__column'>
            <div className='list-participant__count-steps'>1 500 шагов</div>
          </div>
        </div>
      </div>
    </div>
  )
}
