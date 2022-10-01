import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password : string;
  errorMessage = 'Invalid Credentials';
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;
  user:User;

  constructor(private router:Router,private userService:UserService) { }

  ngOnInit(): void {
  }

  handleLogin(){
    this.userService.authenticationService(this.username,this.password)
    .subscribe((result)=>{
      this.invalidLogin = false;
      this.loginSuccess = true;
      this.successMessage = 'Login Successful.';
      const name=this.userService.getLoggedInUserName();
      localStorage.setItem('name',name);
      this.router.navigate(["/dashboard"]);
    },()=>{
      this.invalidLogin = true;
      this.loginSuccess = false;
    });
  }

}
