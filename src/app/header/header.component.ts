import { Subscription } from 'rxjs';
import { AuthserviceService } from './../auth/authservice.service';
import { Component, OnDestroy, OnInit } from "@angular/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls:['./header.component.css']

})

export class HeaderComponent implements OnDestroy,OnInit{
  private Authlistner:Subscription;
  public islogin:boolean=false;
  constructor(private Authservice:AuthserviceService){}

ngOnInit(){
this.Authlistner=this.Authservice.getauthstatus().subscribe(isauth =>{
  this.islogin=isauth;
});
}
ngOnDestroy(){
this.Authlistner.unsubscribe();
}
}
