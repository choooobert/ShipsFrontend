import { ShootMapCellStatus } from "./shoot-map-cell-status";

export interface ShootResponse {
    shootMapCellStatus : ShootMapCellStatus;
    isWinner : boolean;
}