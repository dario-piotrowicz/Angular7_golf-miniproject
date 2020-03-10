export interface Player {
    id: string;
    name: string;
    handicap: number;
    strokes: number[];
    // strokes: Strokes[];
    score?: number;
}

// export interface Strokes {
//    holeNumber: number;
//    numberOfStrokes: number;
// }
