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
  { path: 'chat', loadChildren: './pages/chat/chat.module#ChatPageModule'},
  { path: 'new-chat', loadChildren: './pages/chat/new-chat/new-chat.module#NewChatPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'edit-profile', loadChildren: './pages/edit-profile/edit-profile.module#EditProfilePageModule' },
  { path: 'user-profile', loadChildren: './pages/user-profile/user-profile.module#UserProfilePageModule' },
  { path: 'individual-tuit', loadChildren: './pages/individual-tuit/individual-tuit.module#IndividualTuitPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
