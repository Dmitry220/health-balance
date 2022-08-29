import React, {FC} from 'react';
import {definitionColor} from "../../utils/common-functions";

interface ITaskValue {
    title: string,
    value: string
}

interface ITask {
    tasks: ITaskValue[],
    type: string
}

export const TaskChallenge:FC<ITask> = ({type, tasks}) => {
    return (
        <div className={'task-challenge'}>
            <div className="task-challenge__body">
                {tasks.map(item=> (
                    <article className="task-challenge__card-task card-task">
                        <div className="card-task__container">
                            <div className="card-task__title">
                                {item.title}
                            </div>
                            <div className={definitionColor(type, 'card-task__count')}>
                                {item.value}
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
};
