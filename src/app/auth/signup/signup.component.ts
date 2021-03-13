import { NgForm } from '@angular/forms';
import { AuthserviceService } from './../authservice.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private Authservice:AuthserviceService) { }

  ngOnInit() {
  }
  addsignup(form:NgForm){
    if(form.invalid){
      return;
    }
    console.log(form.value)
   this.Authservice.adduser(form.value.Email,form.value.username,form.value.Password);
  }
}
