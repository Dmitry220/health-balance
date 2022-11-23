import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IListPlatform } from '../../models/IPlatforms';
import { platformCreatingChallengeSelector, setDisabledButton, setPlatformChallenge } from '../../Redux/slice/creatingChallengeSlice';
import PlatformService from '../../services/PlatformService';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks';
import './creating-challenge.scss'

export const SelectPlatform = () => {

    const dispatch = useAppDispatch()
    const platform = useAppSelector(platformCreatingChallengeSelector)
    const [listPlatforms, setListPlatforms] = useState([])

    const handlerPlatforms = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setPlatformChallenge(+e.target.value))
        dispatch(setDisabledButton(false))
    }

    useEffect(() => {
        async function getListPlatform() {
            const response = await PlatformService.getPlatfotms()
            setListPlatforms(response.data.data)
        }
        getListPlatform();
    }, [])

    return (
        <div className={'select-platform'}>
            <div className="select-platform__title main-title">Выберите платформу</div>
            <div className="select-platform__select _custom-select">
                <select defaultValue={platform === 0 ? 'DEFAULT' : platform} onChange={handlerPlatforms}>
                    <option value={'DEFAULT'} disabled>Ваша платформа</option>
                    {listPlatforms.map((platform: IListPlatform) => (
                        <option value={platform.id} key={platform.id}>{platform.title}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};
