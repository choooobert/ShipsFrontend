import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './messages.service';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { Button } from './button';


@Injectable({
  providedIn: 'root'
})
export class MapService {

  private mapUrl = 'api/FIELDS';  // URL to web api
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(public messageService: MessageService, private http: HttpClient) { }

  /** GET player map with ships from the server */
  getGrid(): Observable<Button[]> {
    return this.http.get<Button[]>(this.mapUrl)
                    .pipe(
                      tap(_ => this.log('map updated')),
                      catchError(this.handleError<Button[]>('getGrid', []))
                      );
  }

  /** GET button by id. Will 404 if id not found */
  getButton(id: number): Observable<Button> {
    const url = `${this.mapUrl}/${id}`;
    return this.http.get<Button>(url)
                    .pipe(tap(_ => this.log(`downloaded button id=${id}`)),
                    catchError(this.handleError<Button>(`getHero id=${id}`))
    );
  }

  /** PUT: update the button on the server */
  updateButton(button: Button): Observable<any> {
    return this.http.put(this.mapUrl, button, this.httpOptions)
                    .pipe(tap(_ => this.log(`updated button id=${button.id}`)),
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
    this.messageService.add(`Player map status: ${message}`);
  }
}
