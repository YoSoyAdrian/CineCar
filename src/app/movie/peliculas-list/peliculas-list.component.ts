import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-peliculas-list',
  templateUrl: './peliculas-list.component.html',
  styleUrls: ['./peliculas-list.component.scss']
})
export class PeliculasListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $('.button, .close').on('click', function (e) {
      e.preventDefault();
      $('.detail, html, body').toggleClass('open');
    });
  }

}
