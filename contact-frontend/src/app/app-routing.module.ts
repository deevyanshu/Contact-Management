import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddContactComponent } from './add-contact/add-contact.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  {path:"register",component:RegisterComponent},
  {path:"login",component:LoginComponent},
  {path:"dashboard",component:DashboardComponent},
  {path:"logout",component:LoginComponent},
  {path:"",component:RegisterComponent},
  {path:'dashboard/:name',component:DashboardComponent},
  {path:"add-contact",component:AddContactComponent},
  {path:"update-contact/:cid",component:UpdateComponent},
  {path:"contact-details/:cid",component:ContactDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
