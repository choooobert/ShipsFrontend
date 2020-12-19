import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

  
import { Observable, of, throwError } from 'rxjs';
  
import { Player } from './player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private playersUrl = 'https://ships-room-service-backend-dev.herokuapp.com/room';  // URL to web api
  
   httpOptions = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json', 
     "charset": "UTF-8"})
   };
  
  constructor(private http: HttpClient) { }
  
  /** GET players from the server */
  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.playersUrl)
    .pipe(catchError(this.handleError));
  }

    /** GET player by id. Will 404 if id not found */
    getPlayer(id: number): Observable<Player> {
      const url = `${this.playersUrl}/${id}`;
      return this.http.get<Player>(url)
      .pipe(catchError(this.handleError));
    }
  
  /** POST: add a new player to the server */
  addPlayer(player: Player): Observable<Player> {
    return this.http.post<Player>(this.playersUrl, player, this.httpOptions)
    .pipe(catchError(this.handleError));
  }
  
  /** DELETE: delete the player from the server */
  deleteHero(player: Player | number): Observable<Player> {
    const id = typeof player === 'number' ? player : player.id;
    const url = `${this.playersUrl}/${id}`;

    return this.http.delete<Player>(url, this.httpOptions)
    .pipe(catchError(this.handleError));
  }

    /** DELETE: delete all the players from the server */
    deleteAllPlayers(): Observable<Player[]> {
      const url = `${this.playersUrl}/all`;
      return this.http.delete<Player[]>(url, this.httpOptions)
          .pipe(catchError(this.handleError));
    }


  private handleError(error: HttpErrorResponse) {
    return throwError(error.error);
  }
}
