import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'discover', loadChildren: './pages/discover/discover.module#DiscoverPageModule' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'auth', loadChildren: './pages/auth/auth.module#AuthPageModule' },
  { path: 'detail', loadChildren: './pages/detail/detail.module#DetailPageModule' },
  { path: 'new-post', loadChildren: './pages/new-post/new-post.module#NewPostPageModule' },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
  { path: 'edit-profile', loadChildren: './pages/profile/edit-profile/edit-profile.module#EditProfilePageModule' },
  { path: 'timeline', loadChildren: './pages/timeline/timeline.module#TimelinePageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
