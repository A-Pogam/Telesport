import { Component, OnInit } from '@angular/core';
import { OlympicService } from '../../core/services/olympic.service';
import { Olympic } from '../../core/models/Olympic';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HttpErrorResponse } from '@angular/common/http'; 
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


@Component({
  selector: 'app-olympics',
  standalone: true,
  imports: [NgxChartsModule], 
  templateUrl: './olympics.component.html',
  styleUrls: ['./olympics.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
      const countryId = params.get('countryId');
      if (countryId) {
        this.loadCountryDetails(countryId);
      }
    });
  }

  private loadCountryDetails(countryId: string): void {
    this.selectedCountry = this.olympics?.find(country => country.id.toString() === countryId) || null;
    
    if (this.selectedCountry) {
      this.lineChartData = [{
        name: this.selectedCountry.country,
        series: this.selectedCountry.participations.map(participation => ({
          name: participation.year.toString(),
          value: participation.medalsCount
        }))
      }];
      
      // Calcul des totaux
      this.totalMedals = this.selectedCountry.participations.reduce((total, participation) => total + (participation.medalsCount || 0), 0);
      this.totalAthletes = this.selectedCountry.participations.reduce((total, participation) => total + (participation.athleteCount || 0), 0);  // Correction ici
    }
  }


  onCountryClick(event: any): void {
    const countryName = event.name;  
    const country = this.olympics?.find(c => c.country === countryName);
    if (country) {
      this.router.navigate([`/olympics/${country.id}`]);
    }
  }

  navigateToOlympics(): void {
    this.router.navigate(['/']);  // Retour à la page d'accueil
  }
}
