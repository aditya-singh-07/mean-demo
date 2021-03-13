import { AuthserviceService } from './../authservice.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private Authservice:AuthserviceService) { }
  date=new Date();

  ngOnInit() {
  }
  addlogin(form:NgForm){
    if(form.invalid){
      return;
    }
    console.log(form.value)
   this.Authservice.loginuser(form.value.Email,form.value.Password);
  }
}
