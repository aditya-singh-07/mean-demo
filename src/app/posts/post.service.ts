import {  Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs';
import {map} from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
@Injectable({providedIn:'root'})
export class PostService{
  private posts: Post[]=[];
  private postupdate=new Subject<Post[]>();

  constructor(private http:HttpClient){}

getposts(){
  this.http.get<{message: string, All_Posts: any}>('http://localhost:3000/posts')
  .pipe(map((postchange) =>{
    return postchange.All_Posts.map(newpost =>{
      return {
        id:newpost._id,
        title:newpost.title,
        description:newpost.description,
        comment:newpost.comment
      };
    });
  }))
  .subscribe((postdata)=>
  {
    this.posts=postdata;
    this.postupdate.next([...this.posts]);
  });
//return [...this.posts];
}
getpostupdate(){
  return this.postupdate.asObservable();

}

addpost(title:string,content:string,comment:string){
const post :Post={
  id:null,
  title:title,
  description:content,
  comment:comment,

};
//console.log(post)
this.http.post<{message: string,pid:string}>('http://localhost:3000/posts', post).subscribe((res)=>{
  console.log(res.message);
  const id=res.pid;
  post.id=id;
  this.posts.push(post);
  this.postupdate.next([...this.posts]);
});
}

deletepost(id:string){
  this.http.delete('http://localhost:3000/posts/'+ id).subscribe(res =>{
    console.log("deleted!");
    const postupdates=this.posts.filter(postdb =>postdb.id !== id );
    this.posts=postupdates;
    this.postupdate.next([...this.posts]);
  });
}

getpostid(id:string){
  //console.log(this.posts.find(p =>p.id== id))
  return this.http.get<{_id:string,title:string,description:string,comment:string}>('http://localhost:3000/posts/'+ id);
}

updatepost(id:string,title:string,content:string,comment:string){
  const post :Post={
    id:id,
    title:title,
    description:content,
    comment:comment,

  };
  this.http.put('http://localhost:3000/posts/'+ id,post).subscribe(res =>{
    console.log(res);
    const update= [...this.posts];
    const oldpost=update.findIndex(p =>{p.id == post.id});
    update[oldpost]=post;
    this.posts=update;
    this.postupdate.next([...this.posts]);
  });

}
}
