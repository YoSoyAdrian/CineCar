import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { GenericService } from 'src/app/share/generic.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-peliculas-create',
  templateUrl: './peliculas-create.component.html',
  styleUrls: ['./peliculas-create.component.scss']
})
export class PeliculasCreateComponent implements OnInit {

  $: any;
  ngOnInit() {

    $(function () {
      $('#file-input').change(function (e) {
        addImage(e);
      });

      function addImage(e) {
        var file = e.target.files[0],
          imageType = /image.*/;

        if (!file.type.match(imageType))
          return;

        var reader = new FileReader();
        reader.onload = fileOnload;
        reader.readAsDataURL(file);
      }

      function fileOnload(e) {
        var result = e.target.result;
        $('#imgSalida').attr("src", result);
      }

      $('input[type=file]').change(function () {
        var filename = $(this).val().split('\\').pop();
        var idname = $(this).attr('id');
        $('span.' + idname).next().find('span').html(filename);

      });
    });



  }
}
