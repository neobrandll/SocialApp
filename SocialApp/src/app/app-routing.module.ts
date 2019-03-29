import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './pages/auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'discover', loadChildren: './pages/discover/discover.module#DiscoverPageModule', canLoad: [AuthGuard] },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule', canLoad: [AuthGuard] },
  { path: 'auth', loadChildren: './pages/auth/auth.module#AuthPageModule' },
  { path: 'timeline', loadChildren: './pages/timeline/timeline.module#TimelinePageModule', canLoad: [AuthGuard] },
  { path: 'chat', loadChildren: './pages/chat/chat.module#ChatPageModule'},
  { path: 'new-chat', loadChildren: './pages/chat/new-chat/new-chat.module#NewChatPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'edit-profile', loadChildren: './pages/edit-profile/edit-profile.module#EditProfilePageModule' },
  { path: 'user-profile', loadChildren: './pages/user-profile/user-profile.module#UserProfilePageModule' },
  { path: 'individual-tuit', loadChildren: './pages/individual-tuit/individual-tuit.module#IndividualTuitPageModule' },  { path: 'update-picture', loadChildren: './pages/edit-profile/update-picture/update-picture.module#UpdatePicturePageModule' },
  { path: 'following-page', loadChildren: './pages/following-page/following-page.module#FollowingPagePageModule' },
  { path: 'followers-page', loadChildren: './pages/followers-page/followers-page.module#FollowersPagePageModule' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
