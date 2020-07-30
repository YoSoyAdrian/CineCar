import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-peliculas-index',
  templateUrl: './peliculas-index.component.html',
  styleUrls: ['./peliculas-index.component.scss']
})
export class PeliculasIndexComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
