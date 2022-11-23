import React from "react";
import Picker from "rmc-picker";
import { typesChallenge } from "../types/enums";

export const definitionColor = (type: number, className: string) => {
    switch (type) {
        case typesChallenge.common:
            return className
        case typesChallenge.personal:
            return className + ' ' + className + '_personal'
        case typesChallenge.command:
            return className + ' ' + className + '_command'
        default:
            return className
    }
}

export function getItemsDays() {
    const items: any[] = [];
    for (let i = 1; i <= 31; i++) {
        items.push(i >= 10 ? i + '' : `0${i}`);
    }
    return items;
}

export function getItemsMonth() {
    const items: any[] = ['Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь']
    return items.map((month, i) => month);
}

export function getItemsYear(start: number, end: number) {
    const items = [];
    for (let i = start; i <= end; i++) {
        items.push(i >= 10 ? i + '' : `0${i}`);
    }
    return items;
}

export function getItemsStep(start: number, end: number) {
    const items: any[] = [];
    if (end - start > 500) {
        for (let i = start; i < end; i += 500) {
            items.push(<Picker.Item value={i + ''} key={i}>
                {i}
            </Picker.Item>);
        }
        return items;
    }
    return null

}

export function getItemsWeight(start: number, end: number, prefix: string) {
    const items: any[] = [];

    for (let i = start; i < end; i += 1) {
        items.push(<Picker.Item value={i + ''} key={i}>
            {i + ' ' + prefix}
        </Picker.Item>);
    }
    return items;
}

export function getItemsHour() {
    const items: any[] = [];

    for (let i = 0; i < 24; i += 1) {
        items.push(<Picker.Item value={i + ''} key={i}>
            {i >= 10 ? i : `0${i}`}
        </Picker.Item>);
    }
    return items;
}
export function getItemsMinutes() {
    const items: any[] = [];

    for (let i = 0; i < 60; i += 1) {
        items.push(<Picker.Item value={i + ''} key={i}>
            {i >= 10 ? i : `0${i}`}
        </Picker.Item>);
    }
    return items;
}

export const typeConversion = (type: number) =>{
    switch (type) {
        case 1:
            return 'Личный'
        case 2:
            return 'Командный'
        default:
            return 'Общий'
    }
}