import { Routes } from '@angular/router';
import { Landing } from './landing/landing/landing';
import { Dashbboard } from './mechanic/dashbboard/dashbboard';
import { Layout } from './garage-admin/layout/layout';
import { Dashboard } from './system-admin/dashboard/dashboard';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { CarOwnerRegistration } from './car-owner/car-owner-registration/car-owner-registration';
import { MechanicRegistration } from './mechanic/mechanic-registration/mechanic-registration';
import { GarageAdminRegistration } from './garage-admin/garage-admin-registration/garage-admin-registration';


export const routes: Routes = [
    //landing page route
    {path:'', component: Landing},
    //log in route
    {path: 'login', component: Login},
    //register route
    {path: 'register', component: Register},  
    //lazy load the car-owner component

    {path: 'car-owner',
        loadChildren: () =>
            import('./car-owner/car-owner.routes').then(m=> m.Car_Owner_Routes), 
        },
    //lazy load mechanic component
    { path: 'mechanic', component: CarOwnerRegistration},

    //mechanic registration
    {path: 'mechanic-reg', component: MechanicRegistration},

    //lazy load garage component
    {path: 'garage-admin', component: GarageAdminRegistration},

    //lazy load system admin
    {path: 'system-admin', component: Dashboard}

];