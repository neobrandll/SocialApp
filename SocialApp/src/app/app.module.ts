import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {NewPostComponent} from './components/new-post/new-post.component';
import {Keyboard} from '@ionic-native/keyboard/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import {HttpClientModule} from '@angular/common/http';
import {UserMenuInfoComponent} from './components/user-menu-info/user-menu-info.component';

@NgModule({
  declarations: [AppComponent, NewPostComponent, UserMenuInfoComponent ],
  entryComponents: [NewPostComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Keyboard,
      Vibration
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
