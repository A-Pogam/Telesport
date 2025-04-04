import { Component, OnInit } from '@angular/core';
import { OlympicService } from '../../core/services/olympic.service';
import { Olympic } from '../../core/models/Olympic';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-olympics',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './olympics.component.html',
  styleUrls: ['./olympics.component.scss']
})
export class OlympicsComponent implements OnInit {
  olympics: Olympic[] | null = null;
  selectedCountry: Olympic | null = null;
  lineChartData: { name: string; series: { name: string; value: number }[] }[] = [];
  totalMedals: number = 0;
  totalAthletes: number = 0;

  constructor(
    private olympicService: OlympicService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadOlympicData();
  }

  private loadOlympicData(): void {
    this.olympicService.getOlympics().subscribe({
      next: (data) => {
        this.olympics = data;
        this.checkSelectedCountry();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Erreur de chargement des données olympiques:', error);
      }
    });
  }

  private checkSelectedCountry(): void {
    this.route.paramMap.subscribe((params) => {
      const countryName = params.get('countryId');
      if (countryName) {
        this.loadCountryDetails(countryName);
      }
    });
  }

  private loadCountryDetails(countryName: string): void {
    this.selectedCountry = this.olympics?.find(country => country.country === countryName) || null;

    if (this.selectedCountry) {
      this.lineChartData = [{
        name: this.selectedCountry.country,
        series: this.selectedCountry.participations.map(p => ({
          name: p.year.toString(),
          value: p.medalsCount
        }))
      }];

      this.totalMedals = this.selectedCountry.participations.reduce((sum, p) => sum + p.medalsCount, 0);
      this.totalAthletes = this.selectedCountry.participations.reduce((sum, p) => sum + p.athleteCount, 0);
    }
  }

  navigateToOlympics(): void {
    this.router.navigate(['/']);
  }
}
