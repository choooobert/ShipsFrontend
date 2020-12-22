import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
  
import { Observable, of } from 'rxjs';
  
import { Player } from './player';

/**
* Service provides communication with backend for players requests.
* @Injectable - allowing for it to be injected as constructor parameter
*/
@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private playersUrl = 'api/players';  // URL to web api
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /**
   * Using injection of http client
   * @param http - http clientrequired for communication
   */
  constructor(private http: HttpClient) { }
  
  /** GET players from the server */
  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.playersUrl)
                    .pipe(catchError(this.handleError<Player[]>('getPlayers', []))
      );
  }

  /** GET player by id. Will 404 if id not found 
   * To be updated to retrieve player by name
   */
  getPlayer(id: number): Observable<Player> {
    const url = `${this.playersUrl}/${id}`;
    return this.http.get<Player>(url)
                    .pipe(catchError(this.handleError<Player>(`getPlayer id=${id}`)));
  }

  /**
   * POST: add a new player to the server
   * @param player - player to be added
   */
  addPlayer(player: Player): Observable<Player> {
    return this.http.post<Player>(this.playersUrl, player, this.httpOptions)
                    .pipe(catchError(this.handleError<Player>('addPlayer')));
  }
  
  /**
   * DELETE: delete the hero from the server
   * @param player - player or player id to be removed from the server (to be updated when player definition changes)
   */
  deletePlayer(player: Player | number): Observable<Player> {
    const id = typeof player === 'number' ? player : player.id;
    const url = `${this.playersUrl}/${id}`;

    return this.http.delete<Player>(url, this.httpOptions)
                    .pipe(catchError(this.handleError<Player>('deletePlayer')));
  }

  /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
