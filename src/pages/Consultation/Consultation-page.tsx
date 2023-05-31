import React, { useState } from 'react'
import './Consultation-page.scss'
import Header from '../../Components/Header/Header'
import { Path, useForm, UseFormRegister, SubmitHandler, Controller } from "react-hook-form";
import { formatConsultation } from '../../utils/enums';
import InputMask from "react-input-mask";
import { ModalSuccess } from '../../Components/Modals/Modal-success';
import { ACTIVITY_ROUTE, PROFILE_ROUTE } from '../../provider/constants-route';


interface IFormInput {
	name: string
	phone: string
	city: string
	format: formatConsultation
	comments: string
}

export const ConsultationPage = () => {

	const {
		register,
		handleSubmit,
		control,
		formState: { errors, isValid }
	} = useForm<IFormInput>({
		mode: "onChange"
	})
	const [success, setSuccess] = useState(false)

	const onSubmit: SubmitHandler<IFormInput> = data => {
		console.log(data);
		setSuccess(true)
	};

	if(success){
		return <ModalSuccess title='Заявка принята' showReward={false} route={ACTIVITY_ROUTE}/>
	}

	return (
		<div className='consultation-page'>
			<Header title='Запись к психологу' />
			<div className="consultation-page__container">
				<div className="consultation-page__title main-title">Заявка на консультацию</div>
				<form onSubmit={handleSubmit(onSubmit)} className="consultation-page__form form-consultation">
					<div className="form-consultation__row">
						<div className="form-consultation__sub-text">Имя</div>
						<input {...register('name', { required: true, maxLength: 30 })} className='form-consultation__input _field' />
						{errors.name?.type === 'required' && (
							<p role='alert' className='form-consultation__error'>
								Данное поле не может быть пустым
							</p>
						)}
					</div>
					<div className="form-consultation__row">
						<div className="form-consultation__sub-text">Телефон</div>
						<Controller
							control={control}
							name='phone'
							rules={{ required: true, pattern: /^([+]?[0-9\s-\(\)]{3,25})*$/i }}
							defaultValue={''}
							render={({ field }) => (
								<InputMask
									className='form-consultation__input _field'
									{...field}
									mask='+7 (999) 999-99-99'
									placeholder='+7 (---) --------'
								/>
							)}
						/>
						{errors.phone?.type === 'required' && (
							<p role='alert' className='form-consultation__error'>
								Данное поле не может быть пустым
							</p>
						)}					
					</div>
					<div className="form-consultation__row">
						<div className="form-consultation__sub-text">Город</div>
						<input {...register("city", { required: true })} className='form-consultation__input _field' />
						{errors.city?.type === 'required' && (
							<p role='alert' className='form-consultation__error'>
								Данное поле не может быть пустым
							</p>
						)}
					</div>
					<div className="form-consultation__row">
						<div className="form-consultation__sub-text">Выберите формат встречи</div>
						<div className='_custom-select'>
							<select {...register("format", { required: true })}>
								<option value="Видео">Видео</option>
								<option value="Телефон">Телефон</option>
								<option value="Чат">Чат</option>
							</select>
						</div>
						{errors.format?.type === 'required' && (
							<p role='alert' className='form-consultation__error'>
								Данное поле не может быть пустым
							</p>
						)}
					</div>
					<div className="form-consultation__row">
						<div className="form-consultation__sub-text">Какой запрос у вас/проблема для решения</div>
						<input {...register("comments", { required: true })} className='form-consultation__input _field' />
						{errors.comments?.type === 'required' && (
							<p role='alert' className='form-consultation__error'>
								Данное поле не может быть пустым
							</p>
						)}
					</div>
					<input type='submit'
						className={
							'form-consultation__submit _button-white' +
							(!isValid ? ' disabled' : '')
						}
						value={'Далее'} disabled={!isValid}
					/>
				</form>
			</div>
		</div>
	)
}
