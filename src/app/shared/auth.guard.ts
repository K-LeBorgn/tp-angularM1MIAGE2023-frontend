import {inject, Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";

export const AuthGuard : CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  let router = inject(Router);

  return authService.isAdmin().then(
    (auth) => {
      if(auth){
        console.log("Vous êtes admin, navigation authorisée !");
        return true;
      } else {
        console.log("Vous n'êtes pas admin ! Navigation refusée !");
        router.navigate(['/home']);
        return false;
      }
    }
  );

}
