import { Routes } from "@angular/router";
import { GarageAdminDashboard } from "./garage-admin-dashboard/garage-admin-dashboard";
import { GarageAdminRegistration } from "./garage-admin-registration/garage-admin-registration";
import { Layout } from "./layout/layout";
import { authGuard } from "../core/guards/auth-guard";

export const Garage_Admin_Routes: Routes = [
    {path: '', 
        component: Layout, 
        canActivateChild: [authGuard], 
        data: {role: 'GARAGE_ADMIN'},
        children: [
    {path: 'setup', component: GarageAdminRegistration},
    {path: 'dashboard', component: GarageAdminDashboard},
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'}
]
    }

]