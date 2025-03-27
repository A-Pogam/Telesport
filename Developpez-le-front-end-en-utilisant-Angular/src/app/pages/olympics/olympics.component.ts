import { Component } from '@angular/core';
import { OlympicService } from '../../core/services/olympic.service';
import { OnInit } from '@angular/core';
import { Olympic } from '../../core/models/Olympic';
import { CommonModule } from '@angular/common'; 


@Component({
  selector: 'app-olympics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './olympics.component.html',
  styleUrl: './olympics.component.scss'
})

export class OlympicsComponent implements OnInit {
  olympics: Olympic[] | null = null;

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympicService.getOlympics().subscribe(data => {
      this.olympics = data;
    });
  }
}