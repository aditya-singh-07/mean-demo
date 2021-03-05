import { Post } from './../post.model';
import { PostService } from './../post.service';
import { Component, EventEmitter, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { flyInOut, expand } from '../../animations/app.animation';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { OnInit } from '@angular/core';
import {mimeType} from './mime-type.validator'
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
  form:FormGroup;
  isloading:boolean=false;
  post:Post;
  imagepreview;
constructor(public postservice:PostService,public router:Router,public routeractivate:ActivatedRoute){

}
  ngOnInit() {
    this.form=new FormGroup({
      'title': new FormControl(null,{validators: [Validators.required, Validators.minLength(3)]}),
      'content': new FormControl(null,{validators: [Validators.required, Validators.maxLength(255)]}),
      'image': new FormControl(null,{validators: [Validators.required],asyncValidators: [mimeType]}),
      'comment': new FormControl(null,{validators: [Validators.required]}),
    });
    this.routeractivate.paramMap.subscribe((paramMap: ParamMap) =>{
      if(paramMap.has('postid')){
        this.postid=paramMap.get('postid');
        this.mode='edit';
        this.isloading=true;
        this.postservice.getpostid(this.postid).subscribe(postdata =>{
          this.isloading=false;
          this.post={id:postdata._id,title:postdata.title,description:postdata.description,comment:postdata.comment,imagepath:postdata.imagepath};
          this.form.setValue({
            'title': this.post.title,
            'content':this.post.description,
            'comment':this.post.comment,
            'image':this.post.imagepath
          });
        });
      }else{
        this.mode='create';
        this.postid=null;
      }
    });
  }
  savepost(){
    if(this.form.invalid){
      return;
    }
    this.isloading=true;
    if(this.mode== 'create'){
      this.postservice.addpost(this.form.value.title,this.form.value.content,this.form.value.image,this.form.value.comment);
      this.router.navigate(['/postlist']);
    }else{
      this.postservice.updatepost(this.postid,this.form.value.title,this.form.value.content,this.form.value.comment,this.form.value.image);
      this.router.navigate(['/postlist']);
    }

    this.form.reset();
  }

  //image picker
  imagepicker(event:Event){
    const file=(event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader=new FileReader();
    reader.onload = () =>{
      this.imagepreview=reader.result;
    }
    reader.readAsDataURL(file);
    console.log(file);
    console.log(this.form);

  }

}
