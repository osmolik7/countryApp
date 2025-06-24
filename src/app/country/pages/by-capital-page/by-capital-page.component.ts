import { Component, inject } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountrySearchInputComponent } from '../../components/country-search-input/country-search-input.component';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'by-capital-page',
  imports: [CountryListComponent, CountrySearchInputComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent { 
  countryService = inject(CountryService);

  onSearch(query:string){
    this.countryService.searchByCapital(query).subscribe((resp) => {
      console.log(resp);
    });
  }

}
