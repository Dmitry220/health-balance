import React, {Dispatch, FC, SetStateAction, useState} from 'react';
import {getItemsDays, getItemsMonth, getItemsYear} from "../../utils/common-functions";
import {stageAccessRecovery, stageRegistration} from "../../types/enums";
import {ScrollPicker} from "../Scroll-picker/Scroll-picker";
import {Link} from "react-router-dom";
import {RecoveryEmail} from "./Recovery-email";
import {FurtherButton} from "../Registration/FurtherButton";
import {FurtherRecoveryButton} from "./Further-recovery-button";
import {RecoveryPassword} from "./Recovery-password";


interface IAccessRecoveryItem {
    stage: stageAccessRecovery,
    order: number,
    setOrder: Dispatch<SetStateAction<number>>,
}

export const AccessRecoveryItem:FC<IAccessRecoveryItem> = ({stage, order, setOrder}) => {

    const renderField = () => {
        switch (stage) {
            case stageAccessRecovery.email:
                return <RecoveryEmail />
            case stageAccessRecovery.password:
                return <RecoveryPassword />
            default:
                return null
        }
    }

    console.log("render item")

    return (
        <>
            {renderField()}
            <FurtherRecoveryButton setOrder={setOrder} order={order}/>
        </>
    );
};

