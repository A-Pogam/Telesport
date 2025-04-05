import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { OlympicsComponent } from './pages/olympics/olympics.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'olympics', component: OlympicsComponent }, 
  { path: 'olympics/:countryId', component: OlympicsComponent },  
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
