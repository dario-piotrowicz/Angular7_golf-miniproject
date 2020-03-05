import { Action } from '@ngrx/store';
import { Player } from '../models/player.model';

export const ADD_PLAYER = '[PLAYER] Add';
export const EDIT_PLAYER = '[PLAYER] edit';
export const DELETE_PLAYER = '[PLAYER] delete';


export class AddPlayer implements Action {
    readonly type = ADD_PLAYER;

    constructor(public payload: Player) {}
}

export class EditPlayer implements Action {
    readonly type = EDIT_PLAYER;

    constructor(public payload: Player) {}
}

export class DeletePlayer implements Action {
    readonly type = DELETE_PLAYER;

    constructor(public payload: string) {}
}

export type Actions = AddPlayer | EditPlayer | DeletePlayer;
