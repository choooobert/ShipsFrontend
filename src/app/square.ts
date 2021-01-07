/**
 * Represents square on the grid map - fields to be updated;
 * Status needs to be changed to enum (SHIP_HIT, SHIP_MISS, EMPTY, SHIP);
 * Taken boolean is not to be used for identification if the square is taken by the ship
 */
export interface Square {
    id: number;
    status: number;
}
