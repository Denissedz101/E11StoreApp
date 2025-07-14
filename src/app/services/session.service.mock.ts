import { Injectable } from '@angular/core';

@Injectable()
export class MockSessionService {
  async getSession() {
    return {
      id: 1,
      nombre: 'Admin',
      correo: 'admin@admin.cl'
    };
  }

  async clearSession() {
    return Promise.resolve();
  }
}
