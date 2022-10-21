import React, {Dispatch, FC, SetStateAction, useRef, useState} from 'react';
import './registration.scss'
import {stageRegistration} from "../../types/enums";
import {FurtherButton} from "./FurtherButton";
import {Platform} from "./Platform";
import {SurName} from "./SurName";
import {NameUser} from "./NameUser";
import {Gender} from "./Gender";
import {Birthday} from "./Birthday";
import {Telephone} from "./Telephone";
import {Password} from "./Password";
import {Email} from "./Email";
import {SetPhoto} from "./Set-photo";
import {TrackerConnection} from "./Tracker-connection";

interface IRegistrationItem {
    title: string,
    stage: string,
    order: number,
    setOrder: Dispatch<SetStateAction<number>>,
}

export const RegistrationItem: FC<IRegistrationItem> = ({title, stage, order, setOrder}) => {

    const renderField = () => {
        switch (stage) {
            case stageRegistration.email:
                return <Email/>
            case stageRegistration.password:
                return <Password/>
            case stageRegistration.telephone:
                return <Telephone/>
            case stageRegistration.birthday:
                return <Birthday/>
            case stageRegistration.gender:
                return <Gender/>
            case stageRegistration.userName:
                return <NameUser/>
            case stageRegistration.surname:
                return <SurName/>
            case stageRegistration.platform:
                return <Platform/>
            case stageRegistration.photo:
                return <SetPhoto />
            case stageRegistration.tracker:
                return <TrackerConnection />
            default:
                return null
        }
    }
    console.log("registration Item")
    return (
        <>
            <div className="registration__title">
                {title}
            </div>
            {renderField()}
            <FurtherButton order={order} setOrder={setOrder}/>
        </>
    );
};
