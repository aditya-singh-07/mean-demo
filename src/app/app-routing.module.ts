import { login } from './auth/login/login.model';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { ContactusComponent } from './posts/contactus/contactus.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostCreateComponent } from './posts/post-create/Post-Create.component';
import { PostlistComponent } from './posts/posts-list/post-list.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  {path:'postcreate', component: PostCreateComponent},
  {path:'login', component: LoginComponent},
  {path:'signup', component: SignupComponent},
  {path:'postlist', component:PostlistComponent,canActivate:[AuthGuard]},
  {path:'edit/:postid', component:PostCreateComponent,canActivate:[AuthGuard]},
  {path:'contact', component:ContactusComponent},
  {path:'**',redirectTo:'login', pathMatch: 'full'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
