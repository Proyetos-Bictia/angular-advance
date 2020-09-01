import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

import { UsuarioService } from "../services/usuario.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private usuarioService: UsuarioService,
      private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      
      if(this.usuarioService.role === 'ADMIN_ROLE') {
        return true
      } else {
        this.router.navigate(['/dashboard'])
        return false
      }

  }
  
}
