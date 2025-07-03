import { Injectable } from '@angular/core';
import { SqliteDbService } from './sqlite-db.service';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TEST_USER_KEY = 'usuario_test';

  constructor(
    private sqliteService: SqliteDbService,
    private storage: Storage
  ) {
    this.initTestUser();
  }

  // Inicializar usuario de prueba si no existe en localStorage
  async initTestUser() {
    await this.storage.create();
    const exists = await this.storage.get(this.TEST_USER_KEY);
    if (!exists) {
      await this.storage.set(this.TEST_USER_KEY, {
        id: 999,
        nombre: 'Usuario Demo',
        correo: 'denissedz@gmail.com',
        contrasena: '1234'
      });
    }
  }

  // Centraliza el login (SQLite primero, luego fallback)
  async login(correo: string, contrasena: string): Promise<any | null> {
    // Intenta buscar usuario en SQLite
    let user = await this.sqliteService.getUserByCredentials(correo, contrasena);

    // Si no lo encuentra, intenta con usuario de prueba desde localStorage
    if (!user) {
      const testUser = await this.storage.get(this.TEST_USER_KEY);
      if (testUser && testUser.correo === correo && testUser.contrasena === contrasena) {
        user = testUser;
      }
    }

    return user;
  }
}
