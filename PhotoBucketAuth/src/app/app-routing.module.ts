import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from "./+main/main.component";
import { SignInComponent } from "./+sign-in/sign-in.component";
import { PhotoDetailComponent } from "./+photo-detail/photo-detail.component";
import { AuthGuard } from "./services/auth.guard";

const routes: Routes = [
  { path: '', component: MainComponent, canActivate: [AuthGuard] },
  { path: 'signin', component: SignInComponent },
  { path: 'photoKey', component: PhotoDetailComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
