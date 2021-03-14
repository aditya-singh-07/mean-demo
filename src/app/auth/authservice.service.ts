import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { login } from './login/login.model';
import { Signup } from './signup/signup.model';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
private token:string;
private isauth:boolean=false;
private Authlistner=new Subject<boolean>();

constructor(private http:HttpClient, private router:Router) { }
getToken(){
  return this.token;
}

getisauth(){
  return this.isauth;
}

getauthstatus(){
  return this.Authlistner.asObservable();
}
adduser(email:string,username:string,password:string){
const authsignup :Signup={
  email:email,
  username:username,
  password:password
};
  this.http.post<{message: string,result:Signup}>('http://localhost:3000/users/signup' , authsignup).subscribe(res =>{
  console.log(res);
  });
}

loginuser(email:string,password:string){
  const authlogin :login={
    email:email,
    password:password
  };
    this.http.post<{token:string}>('http://localhost:3000/users/login' , authlogin).subscribe(res =>{
    const authtoken=res.token;
    this.token=authtoken;
    if(authtoken){
      this.isauth=true;
      this.Authlistner.next(true);
    }

    });
    this.router.navigate(['/postlist']);
  }

logout(){
  this.token=null;
  this.isauth=false;
  this.Authlistner.next(false);
}

}
