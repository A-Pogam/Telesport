import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from '../../core/models/Olympic';
import { Router } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<Olympic[] | null> = of(null);
  selectedCountry: Olympic | null = null;
  pieChartData: { name: string; value: number }[] = [];

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.loadOlympicData();
  }

    //prévoir un unsubscribe pour éviter les fuites de mémoire
  private loadOlympicData(): void {
    this.olympics$.subscribe((data) => {
      if (data) {
        this.preparePieChartData(data);
      }
    });
  }

  private preparePieChartData(olympics: Olympic[]): void {
    this.pieChartData = olympics.map((country) => ({
      name: country.country,
      value: country.participations?.reduce((total, participation) => total + (participation.medalsCount || 0), 0) || 0
    }));
    console.log('Pie Chart Data:', this.pieChartData); 
  }

  onCountryClick(event: any): void {
    const countryName = event.name;
    const country = this.pieChartData.find((item) => item.name === countryName);

    if (country) {
      this.router.navigate([`/olympics/${countryName}`]);  // Redirection vers la page du pays
    }
}
navigateToOlympics(): void {
  this.router.navigate(['/olympics']);
}

}
