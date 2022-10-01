import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../contact';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  user:User;
  name:string;
  contacts:Contact[];
  cid:number;
  constructor(private userService:UserService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    if(this.userService.isUserLoggedIn()==false) 
    {
      this.router.navigate(['login']);
    }
    this.handleUser();
  }

  handleUser()
    {
      this.name=this.userService.getLoggedInUserName();
      this.user=new User();
      
      this.userService.getUserByName(this.name).subscribe(data=>{
        this.user=data;
        console.log(this.user)
      }); 
      
    }

    showContacts(){
      this.userService.getContacts().subscribe(data=>{
        this.contacts=data;
      })

    }

    addContact(){
      this.router.navigate(['/add-contact']);
    }

    update(cid:number){
      this.router.navigate(['/update-contact',cid]);
    }

    delete(cid:number){
      this.userService.deleteContact(cid).subscribe(data=>{
        this.showContacts();
      });
    }

    contactDetails(cid:number){
      console.log(cid);
      this.router.navigate(['contact-details',cid]);
    }

}
