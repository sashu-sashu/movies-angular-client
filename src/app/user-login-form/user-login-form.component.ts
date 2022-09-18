/*eslint-disable @angular-eslint/no-empty-lifecycle-method*/
import { Component, Input, OnInit } from '@angular/core';
// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.css'],
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '' };
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {}

  /**
   * This is the function responsible for sending the form inputs to the backend
   * @function loginUser
   * @returns store user inputs to backend 
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (result: any) => {
        // Logic for a successful user registration goes here! (To be implemented)
        this.dialogRef.close(); // This will close the modal on success!
        //token and username in local storage
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', result.user.Username);

        //redirect to movies
        this.router.navigate(['movies']);
      },
      (result: any) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
