import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './auth/login/login.component';
import { TrainingComponent } from './training/training.component';
import { IQListComponent } from './iq-list/iq-list.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'iq', component: IQListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'training', component: TrainingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
