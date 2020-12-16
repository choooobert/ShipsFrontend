import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Player } from './player';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const players = [];
    return {players};
  }

  // Overrides the genId method to ensure that a player always has an id.
  // If the players array is empty,
  // the method below returns the initial number (1).
  // if the players array is not empty, the method below returns the highest
  // player id + 1.
  genId(players: Player[]): number {
    return players.length > 0 ? Math.max(...players.map(player => player.id)) + 1 : 1;
  }
}