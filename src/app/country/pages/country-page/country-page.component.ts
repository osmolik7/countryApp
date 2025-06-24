import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-country-page',
  imports: [],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {

  pais = toSignal(
    inject(ActivatedRoute).params.pipe(
      map( params => params['pais'] ?? 'noquery')
    )
  );
 }
