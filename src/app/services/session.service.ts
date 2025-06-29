import { Injectable } from '@angular/core';
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  constructor(private userDataService: UserDataService) {}

  async setActiveUser(user: any) {
    await this.userDataService.saveSessionUser(user);
  }

  async getActiveUser() {
    return await this.userDataService.getSessionUser();
  }

  async clearSession() {
    await this.userDataService.clearSessionUser();
  }
}
