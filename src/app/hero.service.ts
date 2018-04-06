import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { catchError, map, tap } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http"

import { MessageService } from "./message.service";

import { Hero } from "./hero";
import { HEROES } from "./mock-heroes";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable()
export class HeroService {
  
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
    
  private heroesUrl = 'api/heroes';
  
  
  private log(message: string): void{
    this.messageService.add('HeroService: ' + message);
  }
  
  private handleError<T> (operation = 'operation', result?:T) {
    return (error: any): Observable<T> => {
      console.error(error);
      
      this.log('${operation} failed: ${error.message}');

      return of(result as T);
    }
  }

  getHeroes(): Observable<Hero[]> {
  return this.http.get<Hero[]>(this.heroesUrl)
  .pipe(
    tap(heroes => this.log('fetched heroes')),
    catchError(this.handleError('getHeroes', [])));
    // return of(HEROES);  => this method is used when using a mock file.
  }


  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url)
    .pipe(
      tap(_ => this.log(`fetched hero id: ${id}`)),
      catchError(this.handleError<Hero>('getHero id: ${id})'))
    );
    // return of(HEROES.find(hero => hero.id === id));
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions)
    .pipe(
      tap(_ => this.log(`updated hero id: ${hero.id}`)),
      catchError(this.handleError('updateHero'))
    );
  } 

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
    .pipe(
      tap((hero: Hero) => this.log(`added hero w/ id: ${hero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  deleteHero(hero: Hero | number): Observable<Hero> {
    const id =  typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>( url, httpOptions)
    .pipe(
      tap(_ => this.log(`deleted hero id: ${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if(!term.trim()) { return of([]); }

    return this.http.get<Hero[]>(`api/heroes/?name=${term}`)
    .pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

}