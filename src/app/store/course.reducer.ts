import { Course } from '../models/course.model';
import * as GolfActions from './golf.actions';

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

// TO DO :  IMPLEMENT PROPER REDUCER FUNCTIONALITIES
export function CourseReducer(state: Course = initialCourse, action: GolfActions.Actions) {
    switch(action.type) {
        case GolfActions.ADD_PLAYER:
            return { ...state , players: [...state.players, action.payload] };
        case GolfActions.EDIT_PLAYER:
            // in the course edit the player with the same id as the one specified
            return state;
        case GolfActions.DELETE_PLAYER:
            // from the course remove the player with the specified id
            return state;
        default:
            return state;
    }
}
