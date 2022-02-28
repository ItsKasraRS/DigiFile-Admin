import { AuthService } from './Services/Auth/auth.service';
import { AdminInterceptor } from './Utilities/Interceptor/admin.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { NgxUiLoaderConfig, NgxUiLoaderHttpModule, NgxUiLoaderModule, NgxUiLoaderRouterModule, PB_DIRECTION, POSITION, SPINNER } from 'ngx-ui-loader';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


// Material Components
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './Layout/sidebar/sidebar.component';
import { HeaderComponent } from './Layout/header/header.component';
import { MainLayoutComponent } from './Layout/main-layout/main-layout.component';
import { NoLayoutComponent } from './Layout/no-layout/no-layout.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { TestComponent } from './Pages/test/test.component';
import { LoginComponent } from './Pages/login/login.component';
import { UserRoleFilter } from './Utilities/Filters';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './Pages/user/user-list/user-list.component';
import { UserService } from './Services/User/user.service';
import { UserAddComponent } from './Pages/user/user-add/user-add.component';
import { UserEditComponent } from './Pages/user/user-edit/user-edit.component';
import { ProductListComponent } from './Pages/product/product-list/product-list.component';
import { ProductService } from './Services/Product/product.service';
import { ProductAddComponent } from './Pages/product/product-add/product-add.component';
import { ProductEditComponent } from './Pages/product/product-edit/product-edit.component';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  'bgsColor': '#3e7dff',
  'bgsOpacity': 0.5,
  'bgsPosition': 'top-left',
  'bgsSize': 60,
  'bgsType': 'ball-spin',
  'blur': 5,
  'delay': 0,
  'fastFadeOut': true,
  'fgsColor': '#3e7dff',
  'fgsPosition': 'center-center',
  'fgsSize': 60,
  'fgsType': 'rectangle-bounce',
  'gap': 24,
  'logoPosition': 'center-center',
  'logoSize': 80,
  'logoUrl': './assets/images/Logo.png',
  'masterLoaderId': 'master',
  'overlayBorderRadius': '0',
  'overlayColor': 'rgba(255,255,255,0.9)',
  'pbColor': '#3e7dff',
  'pbDirection': 'ltr',
  'pbThickness': 3,
  'hasProgressBar': true,
  'text': '',
  'textColor': '#FFFFFF',
  'textPosition': 'center-center',
  'maxTime': -1,
  'minTime': 300
};

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
    UserListComponent,
    UserAddComponent,
    UserRoleFilter,
    UserEditComponent,
    ProductListComponent,
    ProductAddComponent,
    ProductEditComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CKEditorModule,
    ReactiveFormsModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderRouterModule,
    NgxUiLoaderHttpModule.forRoot({showForeground: true}),
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right'
     }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AdminInterceptor, multi: true },
    AuthService,
    UserService,
    ProductService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
