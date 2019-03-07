import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './pages/auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'discover', loadChildren: './pages/discover/discover.module#DiscoverPageModule', canLoad: [AuthGuard] },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule', canLoad: [AuthGuard] },
  { path: 'auth', loadChildren: './pages/auth/auth.module#AuthPageModule' },
  { path: 'detail', loadChildren: './pages/detail/detail.module#DetailPageModule' , canLoad: [AuthGuard]},
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule', canLoad: [AuthGuard] },
  { path: 'edit-profile', loadChildren: './pages/profile/edit-profile/edit-profile.module#EditProfilePageModule' , canLoad: [AuthGuard]},
  { path: 'timeline', loadChildren: './pages/timeline/timeline.module#TimelinePageModule', canLoad: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
