import { Routes } from '@angular/router';
import { AppRoutesEnum } from './enums/routes.enum';

export const routes: Routes = [
    
    {
        path: AppRoutesEnum.DEFAULT,
        loadComponent: () =>
            import('./components/home/home.component').then((c) => c.HomeComponent),
    },
    {
        path: AppRoutesEnum.CONTACT_US,
        loadComponent: () =>
            import('./components/contact-us/contact-us.component').then((c) => c.ContactUsComponent),
    },
    {
        path: AppRoutesEnum.ABOUT_US,
        loadComponent: () =>
            import('./components/about-us/about-us.component').then((c) => c.AboutUsComponent),
    },
    {
        path: AppRoutesEnum.JOIN_US,
        loadComponent: () =>
            import('./components/join-us/join-us.component').then((c) => c.JoinUsComponent),
    },
    {
        path: '',
        redirectTo: AppRoutesEnum.DEFAULT,
        pathMatch: 'full',
    },
    {
        path: '**',
        redirectTo: AppRoutesEnum.DEFAULT,
    },
   
];
