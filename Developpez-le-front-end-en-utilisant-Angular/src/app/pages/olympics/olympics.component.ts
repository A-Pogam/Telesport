import { Component, OnInit } from '@angular/core';
import { OlympicService } from '../../core/services/olympic.service';
import { Olympic } from '../../core/models/Olympic';
import { CommonModule, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-olympics',
  standalone: true,
  imports: [CommonModule, NgxChartsModule, NgIf], 
  templateUrl: './olympics.component.html',
  styleUrls: ['./olympics.component.scss']
})

export class OlympicsComponent implements OnInit {
  olympics: Olympic[] | null = null;
  selectedCountry: Olympic | null = null;
  pieChartData: { name: string; value: number }[] = [];
  lineChartData: { name: string; series: { name: string; value: number }[] }[] = [];

  constructor(private olympicService: OlympicService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Charger les données des olympiades
    this.olympicService.getOlympics().subscribe((data) => {
      this.olympics = data;

      // Préparer les données pour le graphique en tarte
      this.pieChartData = this.olympics?.map((country) => ({
        name: country.country,
        value: country.participations
          ? country.participations.reduce(
              (total, participation) => total + (participation.medalsCount || 0),
              0
            )
          : 0,
      })) || [];

      // Vérifier si un pays est sélectionné dans l'URL
      this.route.paramMap.subscribe((params) => {
        const countryId = params.get('countryId');
        if (countryId) {
          this.loadCountryDetails(countryId);
        }
      });
    });
  }

  loadCountryDetails(countryId: string) {
    this.selectedCountry = this.olympics?.find(
      (country) => country.id.toString() === countryId
    ) || null;

    if (this.selectedCountry) {
      this.lineChartData = [{
        name: this.selectedCountry.country,
        series: this.selectedCountry.participations.map(participation => ({
          name: participation.year.toString(),
          value: participation.medalsCount
        }))
      }];
    }
  }

  onCountryClick(countryName: string) {
    const country = this.olympics?.find(c => c.country === countryName);
    if (country) {
      this.router.navigate([`/olympics/${country.id}`]);
    }
  }
}
