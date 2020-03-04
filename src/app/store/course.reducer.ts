import { Course } from '../models/course.model';


const initialCourse: Course = {
    id: '18A',
    name: 'Standard 18 Course',
    holes: [],
    players: []
};

// TO DO: IMPLEMENT AND PUT HERE PROPER ACTIONS!
export function CourseReducer(state: Course = initialCourse, action: any) {
    return state;
}
