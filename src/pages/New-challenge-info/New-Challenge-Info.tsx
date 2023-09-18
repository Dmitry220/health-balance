import React from 'react'
import './new-challenge-info.scss'
import Header from '../../Components/Header/Header'
import {HeaderChallenge} from '../../Components/Challenge/Header-challenge'
import icon_clock from '../../assets/image/Interesting/clock.svg'
import {TaskChallenge} from '../../Components/Challenge/Task-challenge'
import {RewardCount} from '../../Components/Reward/Reward-count'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {CHALLENGE_ROUTE, TEAM_SELECTION_ROUTE} from '../../provider/constants-route'
import {definitionColor, nFormatter} from '../../utils/common-functions'
import {useChallengeJoinMutation, useGetChallengeByIdQuery} from '../../services/ChallengeService'
import {Preloader} from '../../Components/Preloader/Preloader'
import {ActiveChallengePage} from '../Active-challenge-page/Active-challenge-page'
import {typesChallenge} from "../../utils/enums";

export const NewChallengeInfo = () => {

    const params = useParams()
    const navigate = useNavigate()
    const [challengeJoin, {isLoading}] = useChallengeJoinMutation()
    const {data:challenge,isLoading:getChallengeLoading} = useGetChallengeByIdQuery(Number(params.id))

    const itemsTask = [
        {
            title: 'Шагов для завершения',
            value: 0,
            text: nFormatter(challenge?.purpose?.quantity || 0, 1),
            id: 1
        },
        {
            title: 'Обучающий материал',
            value: challenge?.homeworks || 0,
            text: challenge?.total_lessons + ' лекций',
            id: 2
        }
    ]

    const enterIntoChallenge = async () => {
        const response = await challengeJoin(Number(params.id)).unwrap()
        if (response.success) navigate(CHALLENGE_ROUTE)
    }

    if (challenge?.active) return <ActiveChallengePage/>

    return (
        <div className={'new-challenge-info'}>
            <>
                {getChallengeLoading ? (
                    <Preloader/>
                ) : challenge ? (
                    <>
                        <Header
                            title={'Челлендж'}
                            customClass={'new-challenge-info__header'}
                        />
                        <div className='new-challenge-info__main'>
                            <HeaderChallenge
                                image={challenge.image}
                                title={challenge.title}
                                type={challenge.type}
                            />
                        </div>
                        <div
                            className='new-challenge-info__description'
                            dangerouslySetInnerHTML={{__html: challenge?.description}}
                        />
                        <div className='new-challenge-info__row'>
                            <div
                                className={definitionColor(
                                    challenge.type,
                                    'new-challenge-info__data'
                                )}
                            >
                                <img
                                    className={'new-challenge-info__data-clock'}
                                    src={icon_clock}
                                    alt='icon_clock'
                                />
                                {new Date(challenge.start_date * 1000).toLocaleDateString() +
                                ' - ' +
                                new Date(challenge?.end_date * 1000).toLocaleDateString()}
                            </div>
                            <div className='new-challenge-info__reward'>
                                <div className='new-challenge-info__reward-text'>Награда:</div>
                                <RewardCount count={challenge.purpose?.reward || 0}/>
                            </div>
                        </div>
                        <div className='new-challenge-info__title-block block-title'>
                            Задания
                        </div>
                        <div className='new-challenge-info__tasks'>
                            <TaskChallenge type={challenge.type} tasks={itemsTask}/>
                        </div>
                        {challenge.type === typesChallenge.command && (
                            <Link
                                className='new-challenge-info__button _button-white'
                                to={TEAM_SELECTION_ROUTE + '/' + challenge.id}
                            >
                                Принять участие
                            </Link>
                        )}
                        {(challenge.type === typesChallenge.common || challenge.type === typesChallenge.personal) && (
                            <button
                                className='new-challenge-info__button _button-white'
                                onClick={enterIntoChallenge}
                                disabled={isLoading}
                            >
                                Принять участие
                            </button>

                        )}
                    </>
                ) : (
                    <h1>Челленджа не существует</h1>
                )}
            </>

        </div>
    )
}
