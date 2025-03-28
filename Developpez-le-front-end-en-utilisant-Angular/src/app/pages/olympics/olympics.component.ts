import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OlympicService } from '../../core/services/olympic.service';
import { Olympic } from '../../core/models/Olympic';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';

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
  pieChartData: { name: string; value: number }[] = [];
  lineChartData: { name: string; series: { name: string; value: number }[] }[] = [];

  constructor(private olympicService: OlympicService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadOlympicData();
  }

  private loadOlympicData(): void {
    this.olympicService.getOlympics().subscribe((data) => {
      this.olympics = data;
      this.preparePieChartData();
      this.checkSelectedCountry();
    });
  }

  private preparePieChartData(): void {
    this.pieChartData = this.olympics?.map((country) => ({
      name: country.country,
      value: country.participations?.reduce((total, participation) => total + (participation.medalsCount || 0), 0) || 0
    })) || [];
    console.log(this.pieChartData);
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
    }
  }



  navigateToOlympics(): void {
    this.router.navigate(['/olympics']);
  }
}
