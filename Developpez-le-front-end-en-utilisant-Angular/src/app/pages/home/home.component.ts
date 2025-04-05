import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from '../../core/models/Olympic';
import { Router } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';

interface CountryChartEvent {
  name: string;  // Le nom du pays
  value: number; // La valeur associée à ce pays (par exemple, le nombre de médailles)
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public olympics$: Observable<Olympic[] | null> = of(null);
  selectedCountry: Olympic | null = null;
  pieChartData: { name: string; value: number }[] = [];
  private olympicSub!: Subscription;
  totalJOs: number = 0;
  view: [number, number] = [600, 400];

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.loadOlympicData();
    this.updateChartDimensions();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
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
      this.view = [600, 400];
    }
  }

  private loadOlympicData(): void {
    this.olympicSub = this.olympics$.subscribe((data) => {
      if (data) {
        this.preparePieChartData(data);
        this.totalJOs = data.reduce((sum, country) => sum + (country.participations?.length || 0), 0);
      } else {
        this.pieChartData = [];
        this.totalJOs = 0;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.olympicSub) {
      this.olympicSub.unsubscribe();
    }
  }

  private preparePieChartData(olympics: Olympic[]): void {
    this.pieChartData = olympics.map((country) => ({
      name: country.country,
      value: country.participations?.reduce((total, participation) => total + (participation.medalsCount || 0), 0) || 0
    }));
    console.log('Pie Chart Data:', this.pieChartData);
  }

  onCountryClick(event: CountryChartEvent): void { 
    const countryName = event.name;
    this.router.navigate([`/olympics/${countryName}`]);  
  }

  navigateToOlympics(): void {
    this.router.navigate(['/olympics']);
  }
}
