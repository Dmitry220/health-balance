import React, { FC, Dispatch } from 'react'
import './NoNetworkConnection.scss'
import { Steps } from '../../Components/Steps/Steps'
import { useAppSelector } from '../../hooks/redux-hooks'
import { currentStepsCountSelector } from '../../Redux/slice/appSlice'

interface INoNetworkConnection {
	setConnect: Dispatch<boolean>
}

export const NoNetworkConnection: FC<INoNetworkConnection> = ({ setConnect }) => {

	const currentStepsCount = useAppSelector(currentStepsCountSelector)

	const checkNetworkConnection = () => {
		if (window.navigator.onLine) {
			setConnect(true)
		}
	}

	return (
		<div className='NoNetworkConnection'>
			<Steps maxStepsCount={0}
				userStepsCount={currentStepsCount} />
			<div className="NoNetworkConnection__text">
				Соединение с интернетом отсутствует
			</div>
			<button className="NoNetworkConnection__button _button-dark" onClick={checkNetworkConnection}>Повторить попытку</button>
		</div>
	)
}
