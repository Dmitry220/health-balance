import { FC } from 'react'
import { IFurtherButton } from '../Registration/FurtherButton'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks'
import { disableButtonSelector } from '../../Redux/slice/accessRecoverySlice'
import './access-recovery.scss'

export const FurtherRecoveryButton: FC<IFurtherButton> = ({
  order,
  setOrder
}) => {
  const disabledButton = useAppSelector(disableButtonSelector)
  const dispatch = useAppDispatch()

  return (
    <button
      className={
        'access-recovery__button _button-white' +
        (disabledButton ? ' disabled' : '')
      }
      disabled={disabledButton}
      onClick={() => {
        if (order < 1) {
          setOrder((prev) => prev + 1)
        }
      }}
    >
      Далее
    </button>
  )
}
