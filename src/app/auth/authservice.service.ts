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
public isloading:boolean;
tokenTimer: any;
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
  this.isloading=true;
    this.http.post<{token:string, expireIn:number}>('http://localhost:3000/users/login' , authlogin).subscribe(res =>{
    const authtoken=res.token;
    this.token=authtoken;
    this.isloading=false;
    if(authtoken){
      const expireDuration=res.expireIn;
      this.isauth=true;
      this.Authlistner.next(true);
      const date=new Date();
      const expire= new Date(date.getTime() + expireDuration * 1000);
      this.saveAuth(this.token,expire)
      this.SetAuthTimer(expireDuration);
      // console.log(expire)
      setTimeout(() => {
        this.router.navigate(['/postlist']);
       },2000)
    }
    });

  }

logout(){
  this.token=null;
  this.isauth=false;
  this.Authlistner.next(false);
  this.removeSaveAuth();
  this.router.navigate(['/login']);
  clearTimeout(this.tokenTimer);
}
private SetAuthTimer(expireDuration:number){
  this.tokenTimer= setTimeout(() =>{
    this.logout();
  }, expireDuration *1000)
}
Autologin(){
const authinfo=this.getauth();
if(!authinfo){
  return;
}
const expireTimer=authinfo.expireIn.getTime() - new Date().getTime();
if(expireTimer >0){
  this.token=authinfo.token;
  this.isauth=true;
  this.Authlistner.next(true);
  this.SetAuthTimer(expireTimer/1000);
}
}
private saveAuth(token:string,expiredate: Date){
localStorage.setItem('token',token );
localStorage.setItem('expireDate',expiredate.toISOString())
}
private removeSaveAuth(){
  localStorage.removeItem('token');
  localStorage.removeItem('expireDate');
}
private getauth(){
const token=localStorage.getItem('token');
const expireIn=localStorage.getItem('expireDate');
if(!token || !expireIn){
return;
}
return {
  token: token,
  expireIn:new Date(expireIn)
  }

}

}
