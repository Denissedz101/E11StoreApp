import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private readonly SESSION_KEY = 'sessionUser'; // Unificado con StorageService
  private readonly SESSION_FLAG = 'session_active'; // Unificado con AuthService

  constructor(private storage: Storage) {
    this.initStorage();
  }

  private async initStorage() {
    await this.storage.create();
  }

  async saveSession(user: any): Promise<void> {
    if (!user || !user.id) {
      console.error('No se puede guardar la sesión sin un usuario válido.');
      return;
    }
    await this.storage.set(this.SESSION_KEY, user);
    await this.storage.set(this.SESSION_FLAG, 'true');
  }

  async getSession(): Promise<any | null> {
    const sessionActive = await this.storage.get(this.SESSION_FLAG);
    const user = await this.storage.get(this.SESSION_KEY);
    return sessionActive === 'true' && user && user.id ? user : null;
  }

  async clearSession(): Promise<void> {
    await this.storage.remove(this.SESSION_KEY);
    await this.storage.remove(this.SESSION_FLAG);
  }

  async isAuthenticated(): Promise<boolean> {
    const user = await this.getSession();
    return !!user;
  }
}
