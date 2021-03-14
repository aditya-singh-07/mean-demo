import { AuthserviceService } from './../../auth/authservice.service';
import { PostService } from './../post.service';
import { Component, OnDestroy, OnInit } from "@angular/core";
import {Post } from '../post.model'
import { Subscription } from 'rxjs';
import { expand, flyInOut } from 'src/app/animations/app.animation';
import { PageEvent } from '@angular/material';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class PostlistComponent implements OnInit, OnDestroy{
  private Authlistner:Subscription;
  public islogin:boolean=false;
  panelOpenState=false;
  isloading:boolean=false;
  length = 0;
  pageSize = 2;
  currentpage=1;
  pageSizeOptions: number[] = [1, 2, 5, 10];
 private sub:Subscription;
//  post=[
// { title: "Android 10",
//   content: "New os"
// },
// { title: "Android 11",
//   content: "New os for A11"
// },

//  ]
post: Post[]=[];
constructor(public postservice:PostService, private authservice:AuthserviceService){

}
  ngOnDestroy(){
   this.sub.unsubscribe();
   this.Authlistner.unsubscribe();
  }
ngOnInit(){
  this.isloading=true;
 this.postservice.getposts(this.pageSize,this.currentpage);
  this.sub=this.postservice.getpostupdate().subscribe((postdata:{Posts:Post[], postcount:number})=> {
    this.isloading=false;
    this.length=postdata.postcount;
    this.post=postdata.Posts;
  });
  this.islogin=this.authservice.getisauth();
  this.Authlistner=this.authservice.getauthstatus().subscribe(isauth =>{
    this.islogin=isauth;
  });

}

deletepostbyid(postid: string){
  this.isloading=true;
  this.postservice.deletepost(postid).subscribe(res =>{
    console.log("deleted!");
    this.postservice.getposts(this.pageSize,this.currentpage);
  });
}

onPageChange(pageinfo:PageEvent){
this.isloading=true;
console.log(pageinfo)
this.currentpage=pageinfo.pageIndex +1;
this.pageSize=pageinfo.pageSize;
this.postservice.getposts(this.pageSize,this.currentpage);
}

}
