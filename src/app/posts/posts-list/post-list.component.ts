import { PostService } from './../post.service';
import { Component, OnDestroy, OnInit } from "@angular/core";
import {Post } from '../post.model'
import { Subscription } from 'rxjs';
import { expand, flyInOut } from 'src/app/animations/app.animation';
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
  panelOpenState=false;
  isloading:boolean=false;
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
constructor(public postservice:PostService){

}
  ngOnDestroy(){
   this.sub.unsubscribe();
  }
ngOnInit(){
  this.isloading=true;
 this.postservice.getposts();
  this.sub=this.postservice.getpostupdate().subscribe((Posts:Post[])=> {
    this.isloading=false;
    this.post=Posts;
  });

}

deletepostbyid(postid: string){
  this.postservice.deletepost(postid);
}

}
