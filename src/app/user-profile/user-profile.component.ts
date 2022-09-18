/*eslint-disable @angular-eslint/no-empty-lifecycle-method*/
import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

type User = {
  Username: string;
  Password: string;
  Email: string;
  Birth: string;
  FavouriteMovies: string[]
};

const initalUser: User = {
    Username: '',
    Password: '',
    Email: '',
    Birth: '',
    FavouriteMovies: []
  }

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user: User = initalUser;
  movies: any[] = [];
  filteredMovies: any[] = [];
  /**
   * Shows UserProfile page thatnks to its route reference 'profile'.
   * The data it's partial because the user might change their data just partially.
   * @param data 
   */
  @Input() userData: Partial<User> = initalUser;

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<UserProfileComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getFavoriteMovies();
  }

  //allowing user to edit details
  editUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe(() => {
      this.dialogRef.close();
      localStorage.clear();

      // Log out user if they update Username or Password to avoid errors
      this.router.navigate(['welcome']);
    });
  }

  /**
   * @function getUser
   * opens dialog to get user information 
   */
  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      return this.user;
    })
  }

  /**
   * @function openEditProfileDialog
   * opens dialog to allow user to edit information
   */
  openEditProfileDialog(): void {
    this.dialog.open(UserProfileComponent, {
      width: '300px'
    })
  }

  /**
   * @function deleteProfile
   * opens dialog to delete user and clear the stored user information
   */
  deleteProfile(): void {
    if (confirm('Are you sure u want to delete your account?')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('successfully deleted the account', 'OK', {
          duration: 2000
        });
      })
      this.fetchApiData.deleteUser().subscribe((result) => {
        console.log(result);
        localStorage.clear();
      });
    }
  }

  /**
   * @function getFavoriteMovies
   * opens dailog to add movie to user favorite movies list
   */
  getFavoriteMovies(): void {
    this.fetchApiData
      .getAllMovies().subscribe((response: any) => {
        this.movies = response;
        this.filteredMovies = this.filterMovies(this.movies, this.user.FavouriteMovies);
        return this.filteredMovies;
      });
  }

  filterMovies(movies: any, FavouriteMovies: any): any {
    let remainingMovies = [];
    for (let movie in movies) {
      if (FavouriteMovies.includes(movies[movie]._id)) {
        remainingMovies.push(movies[movie]);
      }
    }
    return remainingMovies;
  }

  /**
   * @function removeFavoriteMovie
   * 
   * @param movie_id 
   * @returns removes selected movie from user favorite movies list 
   */
  removeFavoriteMovie(movie_id: string): void {
    this.fetchApiData
      .removeFavoriteMovie(movie_id)
      .subscribe((response) => {
        console.log(response);
        window.location.reload();
      });
  }
}
