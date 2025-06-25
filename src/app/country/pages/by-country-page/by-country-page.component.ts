import { Component, inject, resource, signal } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountrySearchInputComponent } from '../../components/country-search-input/country-search-input.component';
import { CountryService } from '../../services/country.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'by-country-page',
  imports: [CountryListComponent, CountrySearchInputComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent { 

  countryService = inject(CountryService);
  query = signal('');

  countryResource = resource({
    request : () => ({query: this.query()}),
    loader: async({request}) => {
      if(!request.query) return [];
      return await firstValueFrom(
        this.countryService.searchByCountry(request.query)
      )
    }
  });

}
