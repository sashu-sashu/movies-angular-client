import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  /**
   * added router to route to different components
   * @param router 
   */
  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  /**
   * route to movies list
   */
  goToMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * route to user's profile
   */
  goToProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * route to welcome component of the app from user's profile
   */
  logOut(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }

}