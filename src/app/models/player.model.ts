export interface Player {
    id: string;
    name: string;
    handicap: number;
    strokes: Strokes[];
};

export interface Strokes {
    holeNumber: number;
    numberOfStrokes: number;
}