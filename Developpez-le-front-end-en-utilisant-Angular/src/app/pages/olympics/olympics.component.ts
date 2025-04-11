import { Component, OnInit, HostListener } from '@angular/core';
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
  view: [number, number] = [700, 400];

  constructor(
    private olympicService: OlympicService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadOlympicData();
    this.updateChartDimensions();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateChartDimensions();
  }

  private updateChartDimensions(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (width <= 400 && height <= 845) {
      this.view = [300, 200]; 
    } else if (width < 600) {
      this.view = [300, 200];
    } else if (width < 900) {
      this.view = [500, 300];
    } else {
      this.view = [700, 400];
    }
  }

  private loadOlympicData(): void {
    this.olympicService.getOlympics().subscribe({
      next: (data) => {
        this.olympics = data;
        this.checkSelectedCountry();
      },
      error: (error: HttpErrorResponse) => {
        console.error('error data olympics loading:', error);
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
  
    if (!this.selectedCountry) {
      this.router.navigate(['/not-found']);
      return;
    }
  
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
  

  navigateToOlympics(): void {
    this.router.navigate(['/']);
  }
}
