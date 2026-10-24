import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isAuthenticated() {
    return localStorage.getItem('auth_token');
  }
  
  logout() {    
    localStorage.removeItem('auth_token');
  }
}
