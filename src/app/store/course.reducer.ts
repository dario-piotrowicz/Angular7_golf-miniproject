import { Course } from '../models/course.model';
import * as GolfActions from './golf.actions';
import { Player } from '../models/player.model';

const initialCourse: Course = {
    id: '18A',
    name: 'Standard 18 Course',
    holes: [
        {idx: 1, number: 1, par: 5 },
        {idx: 2, number: 2, par: 3 },
        {idx: 3, number: 3, par: 1 }
    ],
    players: []
};

export function CourseReducer(state: Course = initialCourse, action: GolfActions.Actions) {
    let playerId: string;
    let newPlayersList: Player[];
    switch (action.type) {
        case GolfActions.ADD_PLAYER:
            return { ...state , players: [...state.players, action.payload] };
        case GolfActions.EDIT_PLAYER:
            const editPlayer = action.payload;
            playerId = editPlayer.id;
            newPlayersList =  state.players.map( p => {
                if (p.id === playerId ) {
                    return { ...editPlayer };
                }
                return p;
            });
            return { ...state, players: newPlayersList };
        case GolfActions.DELETE_PLAYER:
            playerId = action.payload;
            newPlayersList = state.players.filter( p => p.id !== playerId );
            return { ...state, players: newPlayersList };
        default:
            return state;
    }
}
