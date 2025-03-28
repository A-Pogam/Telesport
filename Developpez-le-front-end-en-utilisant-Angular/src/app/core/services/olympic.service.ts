import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, EMPTY } from 'rxjs';
import { catchError, tap, filter, defaultIfEmpty } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[] | null>(null);

  constructor(private http: HttpClient) {
    this.loadInitialData();
  }

  loadInitialData(): Observable<Olympic[]> {  // Change le type ici
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((data) => {
        this.olympics$.next(data);
      }),
      catchError((error) => {
        console.error('Erreur de chargement des médailles :', error);
        this.olympics$.next(null);
        return EMPTY; // Retourne un observable vide en cas d'erreur
      })
    );
  }

  

  getOlympics(): Observable<Olympic[]> {
    return this.olympics$.asObservable().pipe(
      filter((data) => data !== null), // Ignore null
      defaultIfEmpty([]) // Si c'est null, renvoie un tableau vide
    );
  }
}
