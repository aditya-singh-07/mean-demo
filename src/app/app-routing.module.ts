import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { ContactusComponent } from './posts/contactus/contactus.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostCreateComponent } from './posts/post-create/Post-Create.component';
import { PostlistComponent } from './posts/posts-list/post-list.component';


const routes: Routes = [
  {path:'postcreate', component: PostCreateComponent},
  {path:'login', component: LoginComponent},
  {path:'signup', component: SignupComponent},
  {path:'postlist', component:PostlistComponent},
  {path:'edit/:postid', component:PostCreateComponent},
  {path:'contact', component:ContactusComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
