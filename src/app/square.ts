import { ButtonStatus } from "./button-status";

/**
 * Represents square on the grid map
 * Status represents (0: no-ship, 1: ship, 2: hit, 3: miss, 4: blocked);
 */
export interface Square {
    id: number;
    status: ButtonStatus;
}
