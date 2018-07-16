
export enum LoadedState {
    NOT_REQUESTED,
    WAITING, 
    FAILURE, 
    SUCCESS
}


export interface LoadedNotRequested {
    state: LoadedState.NOT_REQUESTED;
}

export interface LoadedWaiting {
    state: LoadedState.WAITING;
}

export interface LoadedFailure {
    state: LoadedState.FAILURE;
    reason: any;
}

export interface LoadedSuccess<T> {
    state: LoadedState.SUCCESS;
    value: T;
}

export type Loaded<T>
    = LoadedNotRequested
    | LoadedWaiting
    | LoadedFailure
    | LoadedSuccess<T>;