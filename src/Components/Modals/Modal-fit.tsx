import { Health } from '@awesome-cordova-plugins/health';
import React, { Dispatch, FC, SetStateAction } from 'react';
import "./modals.scss"

interface IModalFit{
	active: boolean, 
	setActive:Dispatch<SetStateAction<boolean>>, 
	children:any
}

export const ModalFit:FC<IModalFit> = ({active, setActive, children}) => {

	const closeModal = () => {
		setActive(false)
		Health.isAvailable()
      .then((available) => {
        if (available) {
          Health.requestAuthorization([{ read: ['steps'] }])
            .then(() => {
              Health.promptInstallFit().then(() => {
               
              })
            })
            .catch((error) => console.error(error))
        }
      })
      .catch((error) => console.error(error))
	}

  return (
	  <div className={active ? "modal-fit active" : "modal"} onClick={closeModal}>
		
		  <div className={active ? "modal-fit__content active" : "modal-fit__content"} onClick={e=>e.stopPropagation()}>
		  <div className="modal-fit__close" onClick={closeModal}>&#10006;</div>
				{children}
			<div className="modal-fit__close" onClick={closeModal}>Ок</div>
		  </div>
	  </div>
  );
};