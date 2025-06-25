import { Component, effect, input, output, signal } from '@angular/core';
import { single } from 'rxjs';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './country-search-input.component.html',
})
export class CountrySearchInputComponent {

  capital = output<string>();
  placeholder = input<string>('Buscar');
  inputValue = signal<string>('');

  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue();
    const timeout = setTimeout(() => {
      this.capital.emit(value);
    }, 500);
    onCleanup(() => {
      clearTimeout(timeout);
    })
  });

  onSearch(value:string){
    this.capital.emit(value)
  }

 }
