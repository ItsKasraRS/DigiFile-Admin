import { AuthService } from './Services/Auth/auth.service';
import { AdminInterceptor } from './Utilities/Interceptor/admin.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

// Material Components
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './Layout/sidebar/sidebar.component';
import { HeaderComponent } from './Layout/header/header.component';
import { MainLayoutComponent } from './Layout/main-layout/main-layout.component';
import { NoLayoutComponent } from './Layout/no-layout/no-layout.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { TestComponent } from './Pages/test/test.component';
import { LoginComponent } from './Pages/login/login.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    MainLayoutComponent,
    NoLayoutComponent,
    DashboardComponent,
    TestComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right'
     }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AdminInterceptor, multi: true },
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
