import React, {Dispatch, FC, SetStateAction} from 'react';
import {stageCreatingChallenge} from "../../types/enums";
import {SelectPlatform} from "./Select-platform";
import {TypeChallenge} from "./Type-challenge";
import {CreatingTargets} from "./Creating-targets";
import {CreatingDate} from "./Creating-date";
import {CreatingTitleChallenge} from "./Creating-title-challenge";
import {CreatingDescriptionChallenge} from "./Creating-description-challenge";
import {CreatingCommandsChallenge} from "./Creating-commands-challenge";
import './creating-challenge.scss'
import {TaskChallenge} from "../Challenge/Task-challenge";
import {FinalVariant} from "./Final-variant";
import {CreatingLecture} from "./Creating-lecture";

interface ICreatingChallengeItem {
    stage: stageCreatingChallenge,
    order: number,
    setOrder: Dispatch<SetStateAction<number>>,
}

export const CreatingChallengeItem:FC<ICreatingChallengeItem> = ({order,setOrder,stage}) => {
    const renderField = () => {
        switch (stage) {
            case stageCreatingChallenge.platform:
                return <SelectPlatform />
            case stageCreatingChallenge.type:
                return <TypeChallenge />
            case stageCreatingChallenge.target:
                return <CreatingTargets />
            case stageCreatingChallenge.data:
                return <CreatingDate />
            case stageCreatingChallenge.title:
                return <CreatingTitleChallenge/>
            case stageCreatingChallenge.description:
                return <CreatingDescriptionChallenge/>
            case stageCreatingChallenge.teams:
                return <CreatingCommandsChallenge/>
            case stageCreatingChallenge.finally:
                return <FinalVariant setOrder={setOrder}/>
            case stageCreatingChallenge.lecture:
                return <CreatingLecture />
            default:
                return null
        }
    }
    console.log("creating challenge Item")
    return (
        <div className={'creating-challenge-item'}>
            {renderField()}
        </div>
    );
};
