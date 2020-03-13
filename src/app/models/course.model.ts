import { Hole } from './hole.model';
import { Player } from './player.model';

export interface Course {
    id: string;
    name: string;
    holes: Hole[];
    players: Player[];
}
