import React from 'react';
import {ItemComment} from "./List-comments";

export const CommentAnswer = () => {
    return (
        <div>
            <div className={'item-comment-answer'}>
                <div className="item-comment-answer__avatar">
                    <img src="https://ru-static.z-dn.net/files/dcd/4e5cc0ed36e2dd53bf9518fd16a72492.jpg" alt=""/>
                </div>
                <div className="item-comment-answer__info">
                    <div className="item-comment-answer__author author-text">Усейн Болт <span className={'small-text-comment'}>Ответила Усейну</span></div>
                    <div className="item-comment-answer__message message-text">
                        Бегаю каждую минуту и всю свою жизнь!
                        Бегать нужно тогда, когда это возможно!
                    </div>
                    <div className="item-comment-answer__data small-text-comment">12.12.21 в 12:32 <span>Ответить</span></div>
                </div>
            </div>
        </div>
    );
};

