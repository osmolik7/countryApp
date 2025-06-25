import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, catchError, throwError, delay, of } from 'rxjs';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mappers';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);

  searchByCapital(query:string): Observable<Country[]>{
    query = query.toLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
    .pipe(
      map( (resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp) ),
      catchError(error => {
        return throwError(() => new Error(`No se pudo obtener paises con el valor: ${query}`))
      })
    )
  }

  searchByCountry(query:string): Observable<Country[]>{
    query = query.toLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`)
    .pipe(
      map( (resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp) ),
      delay(2000),
      catchError(error => {
        return throwError(() => new Error(`No se pudo obtener paises con el valor: ${query}`))
      })
    )
  }

  searchCountryByAlphaCode(code:string){

    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`)
    .pipe(
      map( (resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp) ),
      map( countries => countries.at(0)),
      catchError(error => {
        return throwError(() => new Error(`No se pudo obtener pais con el codigo: ${code}`))
      })
    )
  }


}
