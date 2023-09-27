import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FungiMapComponent } from './fungi-map/fungi-map.component';

const routes: Routes = [
  {path: 'fungi', component: FungiMapComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
