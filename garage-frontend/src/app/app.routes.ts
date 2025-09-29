import { Routes } from '@angular/router';
import { Landing } from './landing/landing/landing';
import { SystemAdminDashboard } from './system-admin/system-admin-dashboard/system-admin-dashboard';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { authGuard } from './core/guards/auth-guard';
import { Redirect } from './auth/redirect';


export const routes: Routes = [
    //landing page route
    {path:'', component: Landing},
    //log in route
    {path: 'login', component: Login},
    //register route
    {path: 'register', component: Register},  
    //lazy load the car-owner component

    {path:'redirect',canActivate:[authGuard], component: Redirect},

     //lazy load the car-owner
    {path: 'car-owner',
        loadChildren: () =>
            import('./car-owner/car-owner.routes').then(m=> m.Car_Owner_Routes), 
        },

     //lazy load garage-admin

    {path: 'garage-admin',
        loadChildren: ()=>
            import('./garage-admin/garage-admin.routes').then(m=> m.Garage_Admin_Routes)
    },


    {path: 'mechanic',
        loadChildren: ()=>
            import('./mechanic/mechanic.routes').then(m=> m.Mechanic_Routes)

    },

    {path:'system-admin-dashboard', component: SystemAdminDashboard, canActivate: [authGuard], data: { role: 'SYSTEM_ADMIN' }},
        
];