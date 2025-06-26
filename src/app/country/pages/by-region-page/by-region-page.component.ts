import { Component, inject, linkedSignal, signal } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { Region } from '../../interfaces/region.type';
import { ActivatedRoute, Router } from '@angular/router';

function validateQueryParam(queryParam: string): Region{
  queryParam = queryParam.toLowerCase();

  const validRegions: Record<string, Region> = {
    'africa': 'Africa',
    'americas': 'Americas',
    'asia': 'Asia',
    'europe': 'Europe',
    'oceania': 'Oceania',
    'antarctic': 'Antarctic',
  };
  return validRegions[queryParam] ?? 'Americas';
}

@Component({
  selector: 'by-region-page',
  imports: [CountryListComponent],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent { 

  regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  countryService = inject(CountryService);

  activatedRoute = inject(ActivatedRoute);
  router  = inject(Router);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';
  query = linkedSignal<Region>(() => validateQueryParam(this.queryParam));

  countryResource = rxResource({
    request : () => ({query: this.query()}),
    loader: ({request}) => {
      if(!request.query) return of([]);
      this.router.navigate(['/country/by-region'], {
        queryParams: {
          query: request.query
        }
      });
      return this.countryService.searchByRegion(request.query)
    }
  });
  
}
