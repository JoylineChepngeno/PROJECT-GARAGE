import { Routes} from "@angular/router"
import { Dashboard } from "./dashboard/dashboard"
import { Profile } from "./profile/profile"
import { Layout } from "./layout/layout"
import { History } from "./history/history"
import { CarOwnerRegistration } from "./car-owner-registration/car-owner-registration"
import { authGuard } from "../core/guards/auth-guard"

export const Car_Owner_Routes: Routes = [
    {
        path: '',
        component: Layout,
        canActivateChild:[authGuard],
        data: {role: 'CAR_OWNER'},
        children:[        
    //route for registration page of car owner
    {path: 'setup', component: CarOwnerRegistration },
    //route for landing page of car owner
    {path: 'dashboard', component:Dashboard},
    //route for profile of car owner
    {path: 'profile', component:Profile},
    //route for history of car owner
    {path:'history', component: History},
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'}

       ]
    }
    
]