import { AuthserviceService } from './../authservice.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public isloading:boolean;
  constructor(private Authservice:AuthserviceService) { }
  date=new Date();

  ngOnInit() {
  }
  addlogin(form:NgForm){
    if(form.invalid){
      return;
    }
    console.log(form.value)
    this.isloading=true;
   this.Authservice.loginuser(form.value.Email,form.value.Password);
   this.isloading=this.Authservice.isloading;

  }
}
