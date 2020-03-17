export interface Player {
    id: string;
    name: string;
    handicap: number;
    strokes: Stroke[];
    score?: number;
}

export interface Stroke {
    holeNumber: number;
    numberOfStrokes: number;
}
