import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IMovieData } from '../../models/movieModel';
import { IMovieList } from '../../models/movieListModel';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {

  private imdb = new Subject<IMovieData[]>();

  private _movieListURL = 'http://www.omdbapi.com/?s=Batman&apikey=3acb67c4';
  private _movieData = 'http://www.omdbapi.com/?i=';

  constructor(private _http: HttpClient) { }

  // this call grabs all the imdbIDs, gets movie list data
  getMovieListData(): Observable<IMovieList[]> {
    // get movie list data
    return this._http
      .get<IMovieList[]>(this._movieListURL, { observe: 'response' })
      .pipe(
        map((response: any) => {
          let results: IMovieList[];
          results = response.body.Search;
          return results;
        })
      );
  }

  // this takes each imdbID and hits the movie search api, gets full movie details
  getMovieData(imdbID: string): Observable<IMovieData> {
    return this._http.get<IMovieData>(this._movieData + imdbID + '&apikey=3acb67c4', {
        observe: 'response'})
      .pipe(map((response: any) => {
          let results: IMovieData;
          results = response.body;
          return results;
        })
      );
  }
}
