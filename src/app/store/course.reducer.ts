import { Course } from '../models/course.model';
import * as GolfActions from './golf.actions';
import { Player } from '../models/player.model';

const initialCourse: Course = {
    id: '18A',
    name: 'Standard 18 Course',
    holes: [
        {idx: 6, number: 1, par: 5 },
        {idx: 15, number: 2, par: 3 },
        {idx: 3, number: 3, par: 6 },
        {idx: 4, number: 4, par: 3 },
        {idx: 14, number: 5, par: 2 },
        {idx: 17, number: 6, par: 4 },
        {idx: 8, number: 7, par: 2 },
        {idx: 16, number: 8, par: 3 },
        {idx: 12, number: 9, par: 3 },
        {idx: 1, number: 10, par: 3 },
        {idx: 9, number: 11, par: 5 },
        {idx: 13, number: 12, par: 1 },
        {idx: 7, number: 13, par: 3 },
        {idx: 18, number: 14, par: 3 },
        {idx: 10, number: 15, par: 2 },
        {idx: 2, number: 16, par: 6 },
        {idx: 5, number: 17, par: 5 },
        {idx: 11, number: 18, par: 3 }
    ],
    players: [
        {
            id: 'dfgw234dfgdg',
            name: 'Dario Test 1',
            handicap: 0,
            strokes: [
                {
                    holeNumber: 2,
                    numberOfStrokes: 2
                },
                {
                    holeNumber: 3,
                    numberOfStrokes: 3
                },
                {
                    holeNumber: 4,
                    numberOfStrokes: 4
                },
                {
                    holeNumber: 5,
                    numberOfStrokes: 5
                },
                {
                    holeNumber: 6,
                    numberOfStrokes: 6
                },
                {
                    holeNumber: 7,
                    numberOfStrokes: 7
                }
            ],
            score: 9
        },
        {
            id: 'dsgdsw234',
            name: 'Dario Test 2',
            handicap: 5,
            strokes: [
                {
                    holeNumber: 1,
                    numberOfStrokes: 10
                },
                {
                    holeNumber: 5,
                    numberOfStrokes: 7
                },
                {
                    holeNumber: 11,
                    numberOfStrokes: 2
                }
            ],
            score: 5
        },
        {
            id: 'fdhetyhu',
            name: 'Dario Test 3',
            handicap: 10,
            strokes: [
                {
                    holeNumber: 1,
                    numberOfStrokes: 1
                },
                {
                    holeNumber: 2,
                    numberOfStrokes: 8
                },
                {
                    holeNumber: 3,
                    numberOfStrokes: 4
                },
                {
                    holeNumber: 4,
                    numberOfStrokes: 9
                },
                {
                    holeNumber: 5,
                    numberOfStrokes: 5
                },
                {
                    holeNumber: 6,
                    numberOfStrokes: 2
                },
                {
                    holeNumber: 7,
                    numberOfStrokes: 3
                },
                {
                    holeNumber: 8,
                    numberOfStrokes: 10
                },
                {
                    holeNumber: 9,
                    numberOfStrokes: 8
                },
                {
                    holeNumber: 10,
                    numberOfStrokes: 8
                },
                {
                    holeNumber: 11,
                    numberOfStrokes: 9
                },
                {
                    holeNumber: 12,
                    numberOfStrokes: 9
                },
                {
                    holeNumber: 13,
                    numberOfStrokes: 10
                },
                {
                    holeNumber: 14,
                    numberOfStrokes: 5
                },
                {
                    holeNumber: 15,
                    numberOfStrokes: 7
                },
                {
                    holeNumber: 16,
                    numberOfStrokes: 2
                },
                {
                    holeNumber: 17,
                    numberOfStrokes: 7
                },
                {
                    holeNumber: 18,
                    numberOfStrokes: 2
                },
            ],
            score: 27
        },
    ]
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
