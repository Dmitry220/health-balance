import React from 'react'
import icon_platform from '../../assets/image/plug.png'
import './Platform.scss'
import { useGetCurrentPlatformQuery } from '../../services/PlatformService'
import { Preloader } from '../Preloader/Preloader'
import { IMAGE_URL } from '../../http'

export const Platform = () => {

	const { data:platform, isError, isLoading } = useGetCurrentPlatformQuery()

	if (isLoading) {
		return <Preloader height='auto' />
	}

	if (isError) {
		return <h1>Error</h1>
	}


	return (
		<div className='platform'>
			<div className="platform__container">
				<div className="platform__row">
					<div className="platform__body">
						<div className="platform__sub-text text-yellow">Ваша платформа</div>
						<div className="platform__name-platform">{platform?.title}</div>
					</div>
				</div>
				<div className="platform__img">
					<img src={IMAGE_URL + 'avatars/' + platform?.image || icon_platform} alt="image-platform" />
				</div>
			</div>
		</div>
	)
}
