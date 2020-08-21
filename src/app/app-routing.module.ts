import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesRoutingModule } from "./pages/pages.routing";
import { AuthRoutingModule } from "./auth/auth.routes";

import { NopagefoundComponent } from './nopagefound/nopagefound.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: "/dashboard",
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NopagefoundComponent
  }
]


@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ]
})
export class AppRoutingModule { }
