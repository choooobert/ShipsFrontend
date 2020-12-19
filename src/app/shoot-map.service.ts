import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './messages.service';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { Button } from './button';

@Injectable({
  providedIn: 'root'
})
export class ShootMapService {
  private shootMapUrl = 'api/BUTTONS';  // URL to web api
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(public messageService: MessageService, private http: HttpClient) { }

  /** GET player map with ships from the server */
  getGrid(): Observable<Button[]> {
    return this.http.get<Button[]>(this.shootMapUrl)
                    .pipe(
                      tap(_ => this.log('map updated')),
                      catchError(this.handleError<Button[]>('getGrid', []))
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
