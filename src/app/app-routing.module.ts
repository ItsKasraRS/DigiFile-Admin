import { LoginComponent } from './Pages/login/login.component';
import { TestComponent } from './Pages/test/test.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './Layout/main-layout/main-layout.component';
import { NoLayoutComponent } from './Layout/no-layout/no-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: DashboardComponent, data: { title: 'Home' } },
    ]
  },
  {
    path: '',
    component: NoLayoutComponent,
    children: [  
      { path: 'login', component: LoginComponent, data: { title: 'Log in' }}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
