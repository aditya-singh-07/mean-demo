import { Component, Input, OnInit } from '@angular/core';
import { AuthserviceService } from './auth/authservice.service';
import {Post } from './posts/post.model'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit{
  constructor(private Authservice:AuthserviceService){

  }
  ngOnInit() {
    this.Authservice.Autologin();
  }
}
