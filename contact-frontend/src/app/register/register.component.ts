import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user:User=new User();

  constructor(private userService:UserService,private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.userService.registerUser(this.user).subscribe(data=>{
      console.log(data);
      this.router.navigate(["/login"]);
    },error=>console.log(error));
  }

}
