import { Contact } from "./contact";

export class User {
    id:number;
    name:string;
    email:string;
    password:string;
    role:string;
    contacts:Array<Contact>;
}
