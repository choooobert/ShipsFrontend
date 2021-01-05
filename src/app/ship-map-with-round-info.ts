import {ShipMapCellStatus} from "./ship-map-cell-status";

export interface ShipMapWithRoundInfo{
    isPlayerTurn : boolean;
    isPlayerLooser : boolean;
    shipMap : Map<number, ShipMapCellStatus>;
}