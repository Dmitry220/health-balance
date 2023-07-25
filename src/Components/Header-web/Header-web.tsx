import React from 'react'
import './Header-web.scss'
import { RewardCount } from '../Reward/Reward-count'
import logoWeb from '../../assets/image/logo-web.svg'
import iconChat from '../../assets/image/icon_chat.svg'
import { Link } from 'react-router-dom'
import { CHAT__ROUTE } from '../../provider/constants-route'
import { useSelector } from 'react-redux'
import { dataUserSelector } from '../../Redux/slice/profileSlice'
import { IMAGE_URL } from '../../http'
import avatar from '../../assets/image/avatar.jpeg'

export const HeaderWeb = () => {
	const profile = useSelector(dataUserSelector)

	return (
		<div className='header-web'>
			<div className="header-web__container">
				<div className="header-web__row">
					<div className="header-web__logo">
						<img src={logoWeb} alt="logo" />
					</div>
				</div>
				<div className="header-web__row">
					<div className="header-web__q">
						<div className="header-web__profile">
							<div className="header-web__profile-avatar">
								{profile.avatar && (
									<img
										src={IMAGE_URL + 'avatars/' + profile.avatar}
										alt='avatar'
									/>
								)}
								{!profile.avatar && <img src={avatar} alt='avatar' />}
							</div>
							<div className="header-web__profile-name">{profile.name + ' ' + profile.surname}</div>
						</div>
						<div className="header-web__reward">
							<RewardCount count={365} />
						</div>
						<Link to={CHAT__ROUTE} className="header-web__chat">
							<img src={iconChat} alt="chat" />
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
