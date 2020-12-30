import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './messages.service';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { Square } from './square';

/**
* Service provides communication with backend for Ship-Map.
* @Injectable - allowing for it to be injected as constructor parameter
*/
@Injectable({
  providedIn: 'root'
})
export class ShipMapService {

  private mapUrl = 'api/SHIPS';  // URL to web api
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /**
   * Using injection of http client and messages service
   * @param messageService - messaging service used to provide messages on the website
   * @param http - http clientrequired for communication
   */
  constructor(public messageService: MessageService, private http: HttpClient) { }

  /** GET players ship-map from the server */
  getShipMapGrid(): Observable<Square[]> {
    return this.http.get<Square[]>(this.mapUrl)
                    .pipe(
                      tap(_ => this.log('map updated')),
                      catchError(this.handleError<Square[]>('getShipMapGrid', []))
                      );
  }

  /**
  * GET square by id. Will 404 if id not found - can be used for updating one square after enemy shot (or to be removed)
  * @param id - square identification number on the map
  */
  getSquare(id: number): Observable<Square> {
    const url = `${this.mapUrl}/${id}`;
    return this.http.get<Square>(url)
                    .pipe(tap(_ => this.log(`downloaded square id=${id}`)),
                    catchError(this.handleError<Square>(`getSquare id=${id}`))
    );
  }

  /**
  * PUT: updates the square on the server - can be used for sending ship placement before the game beginns
  * @param square - square object with the ship definition
  */
  updateSquare(square: Square): Observable<any> {
    return this.http.put(this.mapUrl, square, this.httpOptions)
                    .pipe(tap(_ => this.log(`updated button id=${square.id}`)),
                    catchError(this.handleError<any>('updateSquare'))
    );
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

  /** Log a ShipMapService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`Ship-map status: ${message}`);
  }
}
