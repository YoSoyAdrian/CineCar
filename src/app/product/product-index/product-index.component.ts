import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-index',
  templateUrl: './product-index.component.html',
  styleUrls: ['./product-index.component.scss']
})
export class ProductIndexComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
