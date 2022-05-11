import { CategoryListComponent } from './Pages/category/category-list/category-list.component';
import { ProductEditComponent } from './Pages/product/product-edit/product-edit.component';
import { LoginComponent } from './Pages/login/login.component';
import { TestComponent } from './Pages/test/test.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './Layout/main-layout/main-layout.component';
import { NoLayoutComponent } from './Layout/no-layout/no-layout.component';
import { UserListComponent } from './Pages/user/user-list/user-list.component';
import { UserAddComponent } from './Pages/user/user-add/user-add.component';
import { UserEditComponent } from './Pages/user/user-edit/user-edit.component';
import { ProductListComponent } from './Pages/product/product-list/product-list.component';
import { ProductAddComponent } from './Pages/product/product-add/product-add.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: DashboardComponent, data: { title: 'Home' } },

      // user //
      { path: 'user/list', component: UserListComponent, data: { title: 'User list' } },
      { path: 'user/add', component: UserAddComponent, data: { title: 'Add user' } },
      { path: 'user/edit/:id', component: UserEditComponent, data: { title: 'Edit user' } },

      // product //
      { path: 'product/list', component: ProductListComponent, data: { title: 'Product list' } },
      { path: 'product/add', component: ProductAddComponent, data: { title: 'Add product' } },
      { path: 'product/edit/:id', component: ProductEditComponent, data: { title: 'Edit product' } },

      // category //
      { path: 'category/list', component: CategoryListComponent, data: { title: 'Category list' } }
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
