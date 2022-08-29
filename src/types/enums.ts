export enum roles {
    members = 'Участники',
    commands = 'Комманды'
}

export enum typesChallenge {
    common = 'Общий',
    personal = ' Личный',
    command = 'Командный'
}

export enum stageRegistration {
    email = 'email',
    password = 'password',
    telephone = '',
    birthday = 'birthday',
    gender = 'gender',
    userName = 'userName',
    surname = 'surname',
    platform = 'platform',
    photo = 'photo'
}
export enum stageCreatingChallenge {
    platform= 'platform',
    type= 'typeChallenge',
    target= 'target',
    data= 'data',
    title= 'titleChallenge',
    description= 'descriptionChallenge',
    teams= 'teams',
    finally = "finally"
}
export enum stageAccessRecovery {
    email = 'email',
    password = 'password',
}