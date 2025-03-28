import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { OlympicService } from './core/services/olympic.service';
import { Olympic } from '../app/core/models/Olympic';
import { OlympicsComponent } from './pages/olympics/olympics.component';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements OnInit {
  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympicService.loadInitialData().pipe(take(1)).subscribe({
      next: (data: Olympic[]) => {
        console.log('Data loaded :', data);
      },
      error: (error) => {
        console.error('Error during loading data :', error);
      }
    });
  }
}


