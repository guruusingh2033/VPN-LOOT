import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ElectronService } from './providers/electron.service';

import { WebviewDirective } from './directives/webview.directive';

import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { HeaderComponent } from './components/header/header.component';

import { HomeComponent } from './components/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';

import {ApiService} from './service/apiservice';
import {AuthService} from './service/authService';
import {CurrentUserService} from './service/currentUserService';
import { AuthGuard} from './service/authguardService'
import {NoAuthGuard} from './service/noauthguardService';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { JwtService } from './service/jwtService';

import { HttpModule } from '@angular/http';
import { ModalModule } from 'ngx-bootstrap';

import { ToastrModule } from 'ngx-toastr';


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SigninComponent,
    WebviewDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],
  providers: [ElectronService, ApiService, AuthService, CurrentUserService, AuthGuard, NoAuthGuard, JwtService],
  bootstrap: [AppComponent]
})
export class AppModule { }
