import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { OlympicService } from './core/services/olympic.service';
import { Olympic } from '../app/core/models/Olympic';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympicService.loadInitialData().pipe(take(1)).subscribe({
      next: (data: Olympic[]) => {
        console.log('Données chargées avec succès :', data);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des données :', error);
      }
    });
  }
}


