import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChildFn } from '@angular/router';
import { AuthService} from '../auth/auth.service';


export const DASHBOARD_ROUTES: Record<string, string> = {
  CAR_OWNER: '/car-owner/dashboard',
  MECHANIC: '/mechanic/dashboard',
  GARAGE_ADMIN: '/garage-admin/dashboard',
  SYSTEM_ADMIN: '/system-admin/dashboard',
};

export const SETUP_ROUTES: Record<string, string> = {
  CAR_OWNER: '/car-owner/setup',
  MECHANIC: '/mechanic/setup',
  GARAGE_ADMIN: '/garage-admin/setup',
};

export const authGuard: CanActivateFn = 
(route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  //1. Must be logged in

  if (!authService.isLoggedIn()){
    router.navigate(['/login']);
    return false;
  }

  const role = authService.getRole();

  //If already logged in do not go back to login..if does not work check here baki tu state.url part
  if (authService.isLoggedIn() && state.url === '/login') {
  
  if (authService.hasCompletedDetails()) {
    router.navigate([DASHBOARD_ROUTES[role!]]);
  } else {
    router.navigate([SETUP_ROUTES[role!]]);
  }
  return false; // stop them from seeing login page
}


  //2.Check role (if route requires it)
  const expectedRole = route.data['role']
  const userRole = authService.getRole();

  //not authorized
  if (!userRole || (expectedRole && userRole !== expectedRole)) {
    router.navigate(['/login']); // not authorized..check if should go back to landing
    return false;
  }

// If role matches → decide based on setup
//  If user is trying to hit /dashboard or /setup directly, redirect correctly
  if (state.url.includes('/dashboard') || state.url.includes('/setup')) {
    if (authService.hasCompletedDetails()) {
      router.navigate([DASHBOARD_ROUTES[userRole!]]);
    } else {
      router.navigate([SETUP_ROUTES[userRole!]]);
    }
    return false;
  }

  // 5. Otherwise allow access
  return true;
};

export const authGuardChild: CanActivateChildFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => authGuard(route, state);





