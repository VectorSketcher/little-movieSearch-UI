import { Component, OnInit, Input } from '@angular/core';
import { MovieServiceService } from '../services/movie-service.service';
import { IMovieData } from 'src/models/movieModel';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  dataOne: any;
  movies: any;
  imdbID: any;
  movieInfo: IMovieData[] = [];
  filteredMovies: IMovieData[] = [];
  clickedOne = false;
  clickedTwo = false;
  highYear = '2000';

  constructor(private _movieSvc: MovieServiceService) {
    this.filteredMovies = this.movieInfo;
  }

  ngOnInit() {
    this.getMovieData();
  }

  // grabbing all the imdbIDs from calling the first movie api and combining them,
  // than passing that combination/object (which is now called dataOne) into the second api call
  getMovieData() {
    this._movieSvc.getMovieListData().subscribe(movies => {
      this.movies = movies;
      const dataOne = movies.map(t => t.imdbID);
      this.getMovies(dataOne);
    });
  }

  // taking the object we created above (dataOne) and looping through each imdbID and hitting the second api
  // to bring back the first 10 movies in that search list
  getMovies(dataOne) {
    const imdbIDList = dataOne;
    imdbIDList.forEach(i => {
      this._movieSvc.getMovieData(i).subscribe(response => {
        this.movieInfo.push(response);
        return response;
      });
    });
  }

  // filters by 2000's
  higherDecade() {
    this.filteredMovies = this.movieInfo.filter(
      movie => movie.Year >= this.highYear
    );
    this.clickedOne = true;
    this.clickedTwo = false;
  }

  // filters by 1900's
  lowerDecade() {
    this.filteredMovies = this.movieInfo.filter(
      movie => movie.Year <= this.highYear
    );
    this.clickedOne = false;
    this.clickedTwo = true;
  }

  //show all movies
  showAllMovies() {
    this.filteredMovies = this.movieInfo;
    this.clickedTwo = false;
    this.clickedOne = false;
  }
}
