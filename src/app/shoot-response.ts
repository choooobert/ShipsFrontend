import { ShootMapCellStatus } from "./shoot-map-cell-status.enum";

export interface ShootResponse {
    shootMapCellStatus : ShootMapCellStatus;
    winner : boolean;
} 
