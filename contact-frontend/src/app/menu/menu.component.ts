import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isLoggedin:boolean=false;

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    if(this.userService.isUserLoggedIn())
    {
      this.isLoggedin=true;
    }
  }

  handleLogout()
  {
    this.userService.logout();
  }

}
