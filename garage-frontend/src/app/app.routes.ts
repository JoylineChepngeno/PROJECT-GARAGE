import { Routes } from '@angular/router';
import { Landing } from './landing/landing/landing';
import { Dashbboard } from './mechanic/dashbboard/dashbboard';

export const routes: Routes = [
    //landing page route
    {path:'', component: Landing},
    //lazy load the car-owner component
    {path: 'car-owner',
        loadChildren: () =>
            import('./car-owner/car-owner.routes').then(m=> m.Car_Owner_Routes), 
        },
    //lazy load mechanic component
    { path: 'mechanic', component: Dashbboard}
];