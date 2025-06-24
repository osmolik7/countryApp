import { Component, input, output } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './country-search-input.component.html',
})
export class CountrySearchInputComponent {

  capital = output<string>();
  placeholder = input<string>('Buscar');

  onSearch(value:string){
    this.capital.emit(value)
  }

 }
