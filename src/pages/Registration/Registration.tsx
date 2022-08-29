import React, {useState} from 'react';
import Header from "../../Components/Header/Header";
import {RegistrationItem} from "../../Components/Registration/RegistrationItem";
import {stageRegistration} from "../../types/enums";

export const RegistrationPage = () => {

    const [order, setOrder] = useState<number>(0)

    console.log("registration page render")

    const renderRegistrationItems = () => {
        switch (order) {
            case 0:
                return <RegistrationItem stage={stageRegistration.email}
                                         order={order} setOrder={setOrder}
                                         title={'Какая у вас почта?'}/>
            case 1:
                return <RegistrationItem stage={stageRegistration.password}
                                         order={order} setOrder={setOrder}
                                         title={'Какой у вас пароль?'}/>
            case 2:
                return <RegistrationItem stage={stageRegistration.telephone}
                                         order={order} setOrder={setOrder}
                                         title={'Ваш телефон'}/>
            case 3:
                return <RegistrationItem stage={stageRegistration.birthday}
                                         order={order} setOrder={setOrder}
                                         title={'Когда у вас день\n' + 'рождения?'}/>
            case 4:
                return <RegistrationItem stage={stageRegistration.gender}
                                         order={order} setOrder={setOrder}
                                         title={'Укажите пол'}/>
            case 5:
                return <RegistrationItem stage={stageRegistration.userName}
                                         order={order} setOrder={setOrder}
                                         title={'Как вас зовут?'}/>
            case 6:
                return <RegistrationItem stage={stageRegistration.surname}
                                         order={order} setOrder={setOrder}
                                         title={'Какая у вас фамилия?'}/>
            case 7:
                return <RegistrationItem stage={stageRegistration.platform}
                                         order={order} setOrder={setOrder}
                                         title={'Выберите платформу'}/>
            case 8:
                return <RegistrationItem stage={stageRegistration.photo}
                                         order={order} setOrder={setOrder}
                                         title={'Установите фото профиля'}/>
        }
    }

    return (
        <div className={'registration=page'}>
            <Header title={'Регистрация'} />
            {renderRegistrationItems()}
        </div>
    );
};
