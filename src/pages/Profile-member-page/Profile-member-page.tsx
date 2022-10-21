import React from 'react';
import {ProfileSteps} from "../../Components/Profile/Profile-steps";
import {ProfileChallenge} from "../../Components/Profile/Profile-challenge";
import {ProfileMemberHead} from "../../Components/Profile/Profile-member-head";
import './profile-member-page.scss'
import {ProfileMemberContact} from "../../Components/Profile/Profile-member-contact";
import Header from "../../Components/Header/Header";

export const ProfileMemberPage = () => {
    return (
        <div className={'profile-member-page'}>
            <Header title={'Профиль учатсника'} />
            <div className="profile-member-page__block">
                <ProfileMemberHead />
            </div>
            <div className="profile-member-page__block">
                <ProfileSteps kilometer={246} steps={45645645} />
            </div>
            <div className="profile-member-page__block">
                <ProfileChallenge />
            </div>
            <div className="profile-member-page__block">
               <ProfileMemberContact />
            </div>
        </div>
    );
};
