import { ContactusComponent } from './posts/contactus/contactus.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostCreateComponent } from './posts/post-create/Post-Create.component';
import { PostlistComponent } from './posts/posts-list/post-list.component';


const routes: Routes = [
  {path:'', component: PostCreateComponent},
  {path:'postlist', component:PostlistComponent},
  {path:'edit/:postid', component:PostCreateComponent},
  {path:'contact', component:ContactusComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
