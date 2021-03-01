import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostCreateComponent } from './posts/post-create/Post-Create.component';
import { PostlistComponent } from './posts/posts-list/post-list.component';


const routes: Routes = [
  {path:'', component: PostCreateComponent},
  {path:'postlist', component:PostlistComponent},
  {path:'edit/:postid', component:PostCreateComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
