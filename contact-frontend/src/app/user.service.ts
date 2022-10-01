import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';
import { map } from 'rxjs/operators';
import { Contact } from './contact';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 private baseurl="http://localhost:8080/api/v1";

 USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';

  username:string;
  password:string;

  constructor(private httpclient:HttpClient) { }

  registerUser(user:User):Observable<Object>
  {
    return this.httpclient.post(`${this.baseurl}/register`,user);
  }

  authenticationService(username:string,password:string)
  {
    
    return this.httpclient.get(`${this.baseurl}/auth`,
      { headers: { authorization: this.createBasicAuthToken(username, password) } }).pipe(map((res) => {
        this.username = username;
        this.password = password;
        
        this.registerSuccessfulLogin(username, password);
      }));
  }

  createBasicAuthToken(username: String, password: String) {
    sessionStorage.setItem('token','Basic '+window.btoa(username+":"+password));
    return 'Basic '+window.btoa(username+":"+password)
  }

  registerSuccessfulLogin(username, password) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username)
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    this.username = null;
    this.password = null;
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return false
    return true
  }

  getLoggedInUserName() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) return '';
    return user;
  }

  getUserByName(name:string):Observable<User>
  {
    return this.httpclient.get<User>(`${this.baseurl}/${name}`);
  }

  addContact(contact:Contact):Observable<Object>{
    const name=this.getLoggedInUserName();
    return this.httpclient.post(`${this.baseurl}/add?name=${name}`,contact);
  }

  getContacts():Observable<Contact[]>{
    const name=this.getLoggedInUserName();
    return this.httpclient.get<Contact[]>(`${this.baseurl}/contacts?name=${name}`);
  }

  deleteContact(cid:number):Observable<Object>{
    return this.httpclient.delete(`${this.baseurl}/contacts/${cid}`);
  }

  getContactById(cid:number):Observable<Contact>{
    return this.httpclient.get<Contact>(`${this.baseurl}/contacts/${cid}`)
  }
  
  updateContact(id:number,contact:Contact):Observable<Object>{
    const name=this.getLoggedInUserName();
    return this.httpclient.put(`${this.baseurl}/update/${id}?name=${name}`,contact);
  }
}
