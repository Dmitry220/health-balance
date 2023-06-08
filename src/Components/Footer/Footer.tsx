import React from 'react'
import './Footer.scss'

export const Footer = () => {
	return (
		<div className='footer'>
			<div className="footer__body">
				<a href="mailto:info@health-balance.ru"><span>Техподдержка: </span>info@health-balance.ru</a>
				<a href="https://health-balance.ru/wiki"><span>Инструкция: </span>https://health-balance.ru/wiki</a>
			</div>
		</div>
	)
}
