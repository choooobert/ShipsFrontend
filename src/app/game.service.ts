import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

  
import { Observable, throwError } from 'rxjs';
  
import { ShipMapWithRoundInfo } from './ship-map-with-round-info';
import { ShootMapCellStatus } from './shoot-map-cell-status';
import { ShootResponse } from './shoot-response';

/**
* Service provides communication with GameService.
* @Injectable - allowing for it to be injected as constructor parameter
*/
@Injectable({
  providedIn: 'root'
})
export class GameService {
  private gameUrl = 'https://ships-game-service-backend.herokuapp.com/maps';  // URL to web api
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /**
   * Using injection of http client
   * @param http - http clientrequired for communication
   */
  constructor(private http: HttpClient) { }
  
  getShipMapWithRoundInfo(name: string) : Observable<ShipMapWithRoundInfo>{
    let url : string = `${this.gameUrl}/shipmap/${name}`
    return this.http.get<ShipMapWithRoundInfo>(url) 
      .pipe(catchError(this.handleError));
  }

  getShootMap(name: string) : Observable<Map<number, ShootMapCellStatus>>{
    let url : string = `${this.gameUrl}/shootmap/${name}`
    return this.http.get<Map<number, ShootMapCellStatus>>(url) 
      .pipe(catchError(this.handleError));
  }

  shootPlayer(sourceName : string, targetName : string, cellIndex : number) : Observable<ShootResponse>{
    let url : string = `${this.gameUrl}/${sourceName}-vs-${targetName}/${cellIndex}`;
    return this.http.get<ShootResponse>(url) 
    .pipe(catchError(this.handleError));
  }


  deleteAllPlayers() : void {
    this.http.delete(this.gameUrl) 
    .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error.error);
  }
}
