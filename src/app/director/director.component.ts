/*eslint-disable @angular-eslint/no-empty-lifecycle-method*/
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.css'],
})
export class DirectorComponent implements OnInit {
  /**
   * Injects data from MovieCard Component to DirectorComponent using the MAT_DIALOG_DATA injection token.
   * The data becomes a property on the class and is available to be output in the template.
   * @param data //
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
      BIO: string;
      Birth: string;
    }
  ) {}
  ngOnInit(): void {}
}
