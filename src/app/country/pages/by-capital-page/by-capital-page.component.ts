import { Component, inject, signal } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountrySearchInputComponent } from '../../components/country-search-input/country-search-input.component';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'by-capital-page',
  imports: [CountryListComponent, CountrySearchInputComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent { 
  countryService = inject(CountryService);
  isLoading = signal(false);
  isError = signal<string|null>(null);
  countries = signal<Country[]>([])

  onSearch(query:string){
    if(this.isLoading()) return;
    this.isLoading.set(true);
    this.isError.set(null);

    this.countryService.searchByCapital(query).subscribe((countries) => {
      this.isLoading.set(false);
      this.countries.set(countries)
    });
  }

}
