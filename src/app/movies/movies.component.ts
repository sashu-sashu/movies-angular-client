import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

type Movie = {
  _id: string,
  Title: string,
  Description: string,
  Year: string,
  Duration: string,
  ImageURL: string,
  Director: {
    Name: string,
    BIO: string,
    Birth: string,
    Death: string,
  },
  Genre: {
    Name: string,
    Description: string,
  }
}

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
  

  
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  favoriteMovies: Movie[] = [];

  constructor(public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: Movie[]) => {
      this.movies = response;
      console.log(response)
      return response;
    });
  }

    getFavoriteMovies(): void {
    this.fetchApiData.getFavoriteMovies().subscribe((response: Movie[]) => {
      this.favoriteMovies = response;
      console.log(response)
      return response;
    });
  }

  isFav(id: string): boolean {
    return this.favoriteMovies.findIndex(favoriteMovie => favoriteMovie._id === id) !== -1
  }

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description,
      },
      // Assign dialog width
      width: '500px'
    });
  }

  openDirectorDialog(name: string, bio: string, birthday: string): void {
    this.dialog.open(DirectorComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birthdate: Date.parse(birthday),
      },
      width: '500px'
    });
  }

  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisComponent, {
      data: {
        Title: title,
        Description: description,
      },
      width: '500px'
    });
  }

  addFavoriteMovie(movie_id: string): void {
    this.fetchApiData.addFavoriteMovie(movie_id).subscribe((result: Record<string, any>) => {
      console.log(result);
    },
    (result: Record<string, any>) => {
        console.log(result);

    })
  }

  removeFavoriteMovie(id: string): void {
    console.log(id);
    this.fetchApiData.removeFavoriteMovie(id).subscribe((result: Record<string, any>) => {
      console.log(result);
      this.ngOnInit();
    })
  }
}
