import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpInterceptorService } from './http-interceptor.service';
import { AddContactComponent } from './add-contact/add-contact.component';
import { UpdateComponent } from './update/update.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    AddContactComponent,
    UpdateComponent,
    ContactDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
