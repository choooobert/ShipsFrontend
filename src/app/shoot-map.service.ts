import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './messages.service';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { Square } from './square';

@Injectable({
  providedIn: 'root'
})
export class ShootMapService {
  private shootMapUrl = 'api/BUTTONS';  // URL to web api
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(public messageService: MessageService, private http: HttpClient) { }

  /** GET enemy map with ships from the server */
  getGrid(): Observable<Square[]> {
    return this.http.get<Square[]>(this.shootMapUrl)
                    .pipe(
                      tap(_ => this.log('map updated')),
                      catchError(this.handleError<Square[]>('getGrid', []))
                      );
  }

  /** GET button by id. Will 404 if id not found */
  getButton(id: number): Observable<Square> {
    const url = `${this.shootMapUrl}/${id}`;
    return this.http.get<Square>(url)
                    .pipe(tap(_ => this.log(`downloaded button id=${id}`)),
                    catchError(this.handleError<Square>(`getHero id=${id}`))
    );
  }

  /** PUT: update the button on the server */
  updateButton(button: Square): Observable<any> {
    return this.http.put(this.shootMapUrl, button, this.httpOptions)
                    .pipe(tap(_ => this.log(`updated button id=${button.id} on the server`)),
                    catchError(this.handleError<any>('updateHero'))
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

  /** Log a MapService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`Enemy map status: ${message}`);
  }
}
