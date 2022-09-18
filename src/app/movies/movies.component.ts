import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

type Movie = {
  _id: string;
  Title: string;
  Description: string;
  Year: string;
  Duration: string;
  ImageURL: string;
  Director: {
    Name: string;
    BIO: string;
    Birth: string;
    Death: string;
  };
  Genre: {
    Name: string;
    Description: string;
  };
};

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  favoriteMovies: Movie[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * uses API end-point to get a list of all movies in json format
   * @function getAllMovies
   * @returns an array of movies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: Movie[]) => {
      this.movies = response;
      console.log(response);
      return response;
    });
  }

  /**
   * opens the dialog to display user favorite movies list
   * @function getFavoriteMovies
   * @returns displays all the favourite movies selected by user
  */
  getFavoriteMovies(): void {
    this.fetchApiData.getFavoriteMovies().subscribe((response: Movie[]) => {
      this.favoriteMovies = response;
      console.log(response);
      return response;
    });
  }

  /**
   * opens the dialog to display user favorite movies list
   * @function isFav
   * @param id {string} a movie id
   * @returns a boolean stating if the selected movie is true or false
  */
  isFav(id: string): boolean {
    return (
      this.favoriteMovies.findIndex(
        favoriteMovie => favoriteMovie._id === id
      ) !== -1
    );
  }

  /**
   * opens the dialog to display information from GenreViewComponent
   * @function openGenreDialog
   * @param name {string}
   * @param description {string}
   * @returns display genre information of the selected movie
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '500px',
    });
  }

  /**
   * opens dialog to display information from DirectorViewComponent
   * @function openDirectorDialog
   * @param name {string}
   * @param bio {string}
   * @param birth {date}
   * @returns displays director information of the selected movie
   */
  openDirectorDialog(name: string, bio: string, birthday: string): void {
    this.dialog.open(DirectorComponent, {
      data: {
        Name: name,
        BIO: bio,
        Birth: Date.parse(birthday),
      },
      width: '500px',
    });
  }

  /**
   * opens dialog to display information about movie
   * @function openSynopsisDialog
   * @param title {string}
   * @param description {string}
   * @returns movie information
   */
  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisComponent, {
      data: {
        Title: title,
        Description: description,
      },
      width: '500px',
    });
  }

  /**
   * add selected movie to user profile's favourite movies list
   * @function addFavoriteMovie
   * @param movie_id {string}
   * @returns adds movie to user's favourite movie list
   */
  addFavoriteMovie(movie_id: string): void {
    this.fetchApiData.addFavoriteMovie(movie_id).subscribe(
      (result: Record<string, any>) => {
        console.log(result);
      },
      (result: Record<string, any>) => {
        console.log(result);
      }
    );
  }

  /**
   * remove movie from user's favourite movie list
   * @function removeFavoriteMovie
   * @param id {string}
   * @returns removes selected movie from favourite movies list
   */
  removeFavoriteMovie(id: string): void {
    console.log(id);
    this.fetchApiData
      .removeFavoriteMovie(id)
      .subscribe((result: Record<string, any>) => {
        console.log(result);
        this.ngOnInit();
      });
  }
}
