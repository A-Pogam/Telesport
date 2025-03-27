import { Participation } from './Participation';

export interface Olympic {
  id: number;
  country: string;
  medalsCount: number; 
  participations: Participation[]; // Tableau de participations
}
