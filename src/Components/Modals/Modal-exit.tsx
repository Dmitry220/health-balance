import { FC } from "react";
import "./modals.scss";

interface IModalExit {
  closeCallback: Function;
  actionCallback: Function;
  text?: string
}

export const ModalExit: FC<IModalExit> = ({ closeCallback, actionCallback,text }) => {
  return (
    <div className="modal">
      <div className="modal__background"></div>
      <div className="modal__wrapper">
        <div className="modal__button-wrapper">
          <div className="modal__button modal__button_exit" onClick={() => actionCallback()}>{text||'Вы действительно хотите выйти из аккаунта?'}</div>
          <div className="modal__button" onClick={() => closeCallback(false)}>Отмена</div>
        </div>
      </div>
    </div>
  );
};

