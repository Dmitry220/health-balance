export enum roles {
    members = 'Участники',
    commands = 'Комманды'
}

export enum typesChallenge {
    personal = 1,
    command = 2,
    common = 3,  
    
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
    photo = 'photo',
    tracker = 'tracker'
}
export enum stageCreatingChallenge {
    platform= 'platform',
    type= 'typeChallenge',
    target= 'target',
    data= 'data',
    title= 'titleChallenge',
    description= 'descriptionChallenge',
    teams= 'teams',
    finally = "finally",
    lecture = "lecture"
}
export enum stageAccessRecovery {
    email = 'email',
    password = 'password',
}