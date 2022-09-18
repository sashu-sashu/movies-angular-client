/*eslint-disable @angular-eslint/no-empty-lifecycle-method*/
import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

type User = {
  Username: string;
  Password: string;
  Email: string;
  Birth: string;
};

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  /**
   * Shows UserProfile page thatnks to its route reference 'profile'.
   * The data it's partial because the user might change their data just partially.
   * @param data 
   */
  @Input() userData: Partial<User> = {
    Username: '',
    Password: '',
    Email: '',
    Birth: '',
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserProfileComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {}

  //allowing user to edit details
  editUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe(() => {
      this.dialogRef.close();
      localStorage.clear();

      // Log out user if they update Username or Password to avoid errors
      this.router.navigate(['welcome']);
    });
  }
}
