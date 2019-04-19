import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/signin/signin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './service/authguardService'
import { NoAuthGuard } from './service/noauthguardService'

const routes: Routes = [
    {
        path: '',
        component: SigninComponent,
        pathMatch: 'full',
        canActivate: [NoAuthGuard]
    },
    {
        path: 'home',
        component: HomeComponent,
        pathMatch: 'full', 
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
