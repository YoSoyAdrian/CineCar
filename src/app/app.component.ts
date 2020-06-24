import { Component } from '@angular/core';
import { Router } from "@angular/router";
import * as $ from "jquery";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'appMovieCar';
  constructor(public router: Router) { }
}
