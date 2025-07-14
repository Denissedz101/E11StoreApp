// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;

  constructor(private userDataService: UserDataService) {
    this.loadSessionStatus();
  }

  async loadSessionStatus(): Promise<void> {
    const sessionUser = await this.userDataService.getSessionUser();
    this.isLoggedIn = !!sessionUser;
    localStorage.setItem('session_active', this.isLoggedIn ? 'true' : 'false');
  }

  async signIn(user: any): Promise<void> {
    this.isLoggedIn = true;
    await this.userDataService.saveSessionUser(user);
    localStorage.setItem('session_active', 'true');
  }

  async signOut(): Promise<void> {
    this.isLoggedIn = false;
    await this.userDataService.clearSessionUser();
    localStorage.removeItem('session_active');
  }

  checkStatus(): boolean {
    return this.isLoggedIn;
  }
}
