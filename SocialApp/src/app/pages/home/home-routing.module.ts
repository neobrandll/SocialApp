import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePage} from './home.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: HomePage,
        children: [
            {
                path: 'discover',
                loadChildren: '../discover/discover.module#DiscoverPageModule'

            },
            {
                path: 'timeline',
                loadChildren: '../timeline/timeline.module#TimelinePageModule'
            },
            {
                path: 'chat',
                children: [
                    {
                        path: '',
                        loadChildren: '../chat/chat.module#ChatPageModule'
                    },
                    {
                        path: 'new-chat',
                        loadChildren: '../chat/new-chat/new-chat.module#NewChatPageModule'
                    }
                ]

            },
            {
                path: '',
                redirectTo: '/home/tabs/timeline',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: 'edit',
        loadChildren: '../edit-profile/edit-profile.module#EditProfilePageModule'
    },
    {
        path: 'edit/updatePicture',
        loadChildren: '../edit-profile/update-picture/update-picture.module#UpdatePicturePageModule'
    },
    {
        path: 'userProfile/:id',
        loadChildren: '../user-profile/user-profile.module#UserProfilePageModule'
    },
    {
        path: 'tweet',
        loadChildren: '../individual-tuit/individual-tuit.module#IndividualTuitPageModule'
    },
    {
       path: '',
        redirectTo: '/home/tabs/timeline',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class HomeRoutingModule {}
