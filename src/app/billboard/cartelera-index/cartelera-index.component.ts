import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cartelera-index',
  templateUrl: './cartelera-index.component.html',
  styleUrls: ['./cartelera-index.component.scss']
})
export class CarteleraIndexComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
