import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../contact';
import { UserService } from '../user.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  cid:number;
  contact:Contact=new Contact();
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

  onSubmit(){
    this.userService.updateContact(this.cid,this.contact).subscribe(data=>{
      this.router.navigate(['/dashboard']);
    })
  }

}
