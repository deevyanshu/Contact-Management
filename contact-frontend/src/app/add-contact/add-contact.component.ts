import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from '../contact';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  contact:Contact=new Contact();

  constructor(private userService:UserService,private router:Router) { }

  ngOnInit(): void {
    if(this.userService.isUserLoggedIn()==false) 
    {
      this.router.navigate(['login']);
    }
  }

  onSubmit(){
    
    this.userService.addContact(this.contact).subscribe(data=>{
      console.log(data);
      this.router.navigate(['/dashboard']);
    })
  }

}
