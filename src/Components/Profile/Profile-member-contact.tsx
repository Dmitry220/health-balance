import React from 'react';
import './profile.scss'

export const ProfileMemberContact = () => {
    return (
        <div className={'profile-member-contact'}>
            <div className="profile-member-contact__row">
                <div className="profile-member-contact__caption">Email</div>
                <div className="profile-member-contact__value title-17">useinbolt@gmail.com</div>
                <div className="profile-member-contact__caption">Телефон</div>
                <div className="profile-member-contact__value title-17">+7 937 719 91 40</div>
                <div className="profile-member-contact__caption">Дата рождения</div>
                <div className="profile-member-contact__value title-17">18.09.1988</div>
            </div>
        </div>
    );
};
