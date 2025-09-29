import { Routes } from "@angular/router";
import { MechanicDashboard } from "./mechanic-dashboard/mechanic-dashboard";
import { authGuard } from "../core/guards/auth-guard";
import { MechanicRegistration } from "./mechanic-registration/mechanic-registration";

export const Mechanic_Routes: Routes = [

    {
        path:'dashboard',
        component: MechanicDashboard,
        canActivate: [authGuard],
        data: {role: 'MECHANIC'}
    },

    {
        path:'setup',
        component: MechanicRegistration,
        canActivate: [authGuard],
        data: {role: 'MECHANIC'}
    },

     { path: '', redirectTo: 'dashboard', pathMatch: 'full' }


        
    
]