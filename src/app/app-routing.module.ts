import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomePageComponent } from './home-page/home-page.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  { path: 'signup', component: SignupComponent},
  { path:'home', component: HomePageComponent , canActivate:[authGuard] },
  { path: '', component:LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
