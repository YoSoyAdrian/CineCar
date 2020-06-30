import { Component } from '@angular/core';

import * as $ from "jquery";
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';



@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.scss'],

})
export class CarrouselComponent {

  title = 'ngSlick';


  slides = [342, 453, 846, 855, 234, 564, 744, 243];

  slideConfig = {
    "slidesToShow": 4,
    "slidesToScroll": 1,
    "nextArrow": "<div class='nav-btn next-slide'></div>",
    "prevArrow": "<div class='nav-btn prev-slide'></div>",
    "dots": true,
    "infinite": false
  };

  addSlide() {
    this.slides.push(488)
  }

  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }

  slickInit(e) {
    console.log('slick initialized');
  }

  breakpoint(e) {
    console.log('breakpoint');
  }

  afterChange(e) {
    console.log('afterChange');
  }

  beforeChange(e) {
    console.log('beforeChange');
  }


}
