import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import * as $ from 'jquery';
@Component({
  selector: 'app-cartelera',
  templateUrl: './cartelera.component.html',
  styleUrls: ['./cartelera.component.scss']
})
export class CarteleraComponent implements OnInit {


  datos: any;
  error: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private notificacion: NotificacionService,

  ) {

  }

  ngOnInit(): void {


    this.listaCarteleras();
  }
  listaCarteleras() {
    this.gService
      .list('carteleras/all')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          this.datos = data;
        },
        (error: any) => {
          this.notificacion.mensaje(error.name, error.message, 'error');
        }
      );
  }
  Modal() {
    var $trigger = $('.modal-open');
    var $close = $('.modal-close');
    var $modal = $('.modal-box');

    $(window).on('resize', function () {
      var top = $trigger.offset().top + $trigger.outerHeight();
      var left = $trigger.offset().left;
      var width = $trigger.outerWidth();
      $trigger.attr({
        'data-top': top,
        'data-left': left,
        'data-width': width
      });
      $modal.css({
        top: top,
        left: left
      });
    }).trigger('resize');

    $trigger.on('click', function () {
      $modal.css({
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
      }).addClass('is-open');
    });

    $close.on('click', function () {
      var top = $trigger.offset().top + $trigger.outerHeight();
      var left = $trigger.offset().left;
      $modal.css({
        top: top,
        left: left,
        width: 0,
        height: '2px'
      }).removeClass('is-open');
    });
  }
}
