import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router"

import { HeroesComponent } from "./heroes/heroes.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HeroDetailComponent } from "./hero-detail/hero-detail.component";

// Routes Array must be declared outside of the class!!!
const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
  // { path: 'heroes',  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
  // declarations: []   => Routing modules usually don't declare any components.
})
export class AppRoutingModule {

}
