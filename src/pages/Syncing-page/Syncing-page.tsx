import './syncing-page.scss'
import apple from '../../assets/image/syncing/Apple-health.png'
import samsung from '../../assets/image/syncing/Samsung-Health.png'
import huawei from '../../assets/image/syncing/Huawei-Health.png'
import google from '../../assets/image/syncing/Google-fit.png'
import mi from '../../assets/image/syncing/Mi-Fit.png'
import Header from '../../Components/Header/Header'

export const SyncingPage = () => {
  return (
    <div className={'sync-page'}>
      <Header title={'Синхронизация'} />
      <div className='sync-page__item'>
        <div className='sync-page__column'>
          <div className='sync-page__icon'>
            <img src={google} alt='google' />
          </div>
          <div className='sync-page__title'>Google fit</div>
        </div>
        <div className='sync-page__action text-yellow'>Отключить</div>
      </div>
      <div className='sync-page__item'>
        <div className='sync-page__column'>
          <div className='sync-page__icon'>
            <img src={apple} alt='apple' />
          </div>
          <div className='sync-page__title'>Apple Health</div>
        </div>
        <div className='sync-page__action text-blue'>Подключить</div>
      </div>
      <div className='sync-page__item'>
        <div className='sync-page__column'>
          <div className='sync-page__icon'>
            <img src={samsung} alt='samsung' />
          </div>
          <div className='sync-page__title'>Samsung Health</div>
        </div>
        <div className='sync-page__action text-blue'>Подключить</div>
      </div>
      <div className='sync-page__item'>
        <div className='sync-page__column'>
          <div className='sync-page__icon'>
            <img src={huawei} alt='huawei' />
          </div>
          <div className='sync-page__title'>Huawei Health</div>
        </div>
        <div className='sync-page__action text-blue'>Подключить</div>
      </div>
      <div className='sync-page__item'>
        <div className='sync-page__column'>
          <div className='sync-page__icon'>
            <img src={mi} alt='mi' />
          </div>
          <div className='sync-page__title'>Mi Fit</div>
        </div>
        <div className='sync-page__action text-blue'>Подключить</div>
      </div>
    </div>
  )
}
