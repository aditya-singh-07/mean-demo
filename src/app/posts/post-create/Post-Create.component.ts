import { Post } from './../post.model';
import { PostService } from './../post.service';
import { Component, EventEmitter, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { flyInOut, expand } from '../../animations/app.animation';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-post-create',
  templateUrl: './Post-Create.component.html',
  styleUrls: ['./Post-Create.component.css'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})

export class PostCreateComponent implements OnInit{
  mode="create";
  postid:string;
  isloading:boolean=false;
  post:Post;
constructor(public postservice:PostService,public router:Router,public routeractivate:ActivatedRoute){

}
  ngOnInit() {
    this.routeractivate.paramMap.subscribe((paramMap: ParamMap) =>{
      if(paramMap.has('postid')){
        this.postid=paramMap.get('postid');
        this.mode='edit';
        this.isloading=true;
        this.postservice.getpostid(this.postid).subscribe(postdata =>{
          this.isloading=false;
          this.post={id:postdata._id,title:postdata.title,description:postdata.description,comment:postdata.comment};
        });
      }else{
        this.mode='create';
        this.postid=null;
      }
    });
  }
  savepost(form:NgForm){
    if(form.invalid){
      return;
    }
    this.isloading=true;
    if(this.mode== 'create'){
      this.postservice.addpost(form.value.title,form.value.content,form.value.comment);
      this.router.navigate(['/postlist']);
    }else{
      this.postservice.updatepost(this.postid,form.value.title,form.value.content,form.value.comment);
      this.router.navigate(['/postlist']);
    }

      form.resetForm();
  }


}
