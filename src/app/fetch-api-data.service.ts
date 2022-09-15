import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

const apiUrl = 'https://bw-movies-server.herokuapp.com/';

//get token from localStorage
const token = localStorage.getItem('token');

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {

  constructor(private http: HttpClient) {
    this.http = http
  }
}

export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

 // User registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + `users`, userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // User login endpoint
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // gets all movies (needs token)
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .get(apiUrl + `movies`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // gets selected movie (needs token)
  public getMovies(Title: any): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .get(apiUrl + `movies/${Title}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // gets director's info (needs token)
  public getDirector(directorName: any): Observable<any> {

    return this.http
      .get(apiUrl + `movies/director/${directorName}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // gets genre information of a selected movie
  public getGenre(genreName: any): Observable<any> {
    return this.http
      .get(apiUrl + `movies/genre/${genreName}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // gets user and their favorite movies
  public getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    // Get username from localStorage for URLs
    const username = localStorage.getItem('user');
    return this.http
      .get(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // adds movie to user favorite movies list
  public addFavoriteMovie(movieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    // Get username from localStorage for URLs
    const username = localStorage.getItem('user');
    return this.http
      .post(apiUrl + `users/${username}/movies/${movieID}`, {}, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // allows user to edit their info
  public editUser(updateDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    // Get username from localStorage for URLs
    const username = localStorage.getItem('user');
    return this.http
      .put(apiUrl + `users/${username}`, updateDetails, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token
        })
      })
  }

  // displays favorite movies list of a user
  getFavoriteMovies(): Observable<any> {
    // Get Authorization token stored in local storage
    const token = localStorage.getItem('token');
    // Get Username stored in local storage
    const username = localStorage.getItem('Username');
    return this.http
      .get(apiUrl + `users/${username}/movies`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // removes movie from user's favorite movies list
  public removeFavoriteMovie(movieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    // Get username from localStorage for URLs
    const username = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + `users/${username}/movies/${movieID}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // deletes all details of a user
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    // Get username from localStorage for URLs
    const username = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }


  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.log(error);
      console.error(
        `Error Status code ${error.status}, Error body is: ${error.error}`
      );
      console.table(error);
    }
    return throwError(
      'Something bad happened; please try again later.'
    );
  }
}
