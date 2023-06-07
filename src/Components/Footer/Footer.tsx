import React from 'react'
import './Footer.scss'

export const Footer = () => {
	return (
		<div className='footer'>
			<div className="footer__body">
				<a href="mailto:info@health-balance.ru"><span>Техподдержка: </span>info@health-balance.ru</a>
				<a href="https://health-balance.ru/web/instruction"><span>Инструкция к приложению: </span>https://health-balance.ru/web/instruction</a>
			</div>
		</div>
	)
}
