import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../contact';
import { UserService } from '../user.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {

  cid:number;
  contact:Contact;
  constructor(private userService:UserService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    if(this.userService.isUserLoggedIn()==false) 
    {
      this.router.navigate(['login']);
    }
    this.cid=this.route.snapshot.params['cid'];
    this.userService.getContactById(this.cid).subscribe(data=>{
      this.contact=data;
    })
  }

}
