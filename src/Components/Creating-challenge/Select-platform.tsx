import { useEffect,ChangeEvent } from 'react'
import {
  platformCreatingChallengeSelector,
  setDisabledButton,
  setPlatformChallenge
} from '../../Redux/slice/challengeSlice'
import { useGetPlatformsForChallengeQuery } from '../../services/PlatformService'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import './creating-challenge.scss'
import { Preloader } from '../Preloader/Preloader'

export const SelectPlatform = () => {
  const dispatch = useAppDispatch()
  const platform = useAppSelector(platformCreatingChallengeSelector)
  const { data, isLoading, isError } = useGetPlatformsForChallengeQuery()

  const handlerPlatforms = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setPlatformChallenge(+e.target.value))
    dispatch(setDisabledButton(false))
  }

  useEffect(() => {
    if (platform) {
      dispatch(setDisabledButton(false))
      return
    }
    dispatch(setDisabledButton(true))
  }, [])

  if (isError) {
    return <h1>Ошибка!</h1>
  }
  if (isLoading) {
    return <Preloader height='auto'/>
  }
  

  return (
    <div className={'select-platform'}>
      <div className='select-platform__title main-title'>
        Выберите платформу
      </div>
      <div className='select-platform__select _custom-select'>
        <select
          defaultValue={platform === 0 ? 'DEFAULT' : platform}
          onChange={handlerPlatforms}
        >
          <option value={'DEFAULT'} disabled>
            Ваша платформа
          </option>
          {data?.data.map((platform) => (
            <option value={platform.id} key={platform.id}>
              {platform.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
