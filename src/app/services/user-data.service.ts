import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { SqliteService } from './sqlite-db.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  isWeb: boolean;

  constructor(
    private platform: Platform,
    public sqliteService: SqliteService,
    public storageService: StorageService
  ) {
    this.isWeb = Capacitor.getPlatform() === 'web';
  }

  async init() {
    if (this.isWeb) {
      await this.storageService.init();
    } else {
      await this.sqliteService.init();
    }
  }

  // Usuarios
  async saveUser(usuario: any) {
    if (this.isWeb) {
      await this.storageService.saveUser(usuario);
    } else {
      await this.sqliteService.saveUser(usuario);
    }
  }

  async getUserByCredentials(correo: string, contrasena: string) {
    if (this.isWeb) {
      return await this.storageService.getUserByCredentials(correo, contrasena);
    } else {
      return await this.sqliteService.getUserByCredentials(correo, contrasena);
    }
  }

  // Carrito
  async addToCart(usuarioId: number, juego: any) {
    if (this.isWeb) {
      await this.storageService.addToCart(usuarioId, juego);
    } else {
      await this.sqliteService.addToCart(usuarioId, juego);
    }
  }

  async getCart(usuarioId: number) {
    if (this.isWeb) {
      return await this.storageService.getCart(usuarioId);
    } else {
      return await this.sqliteService.getCart(usuarioId);
    }
  }

  async clearCart(usuarioId: number) {
    if (this.isWeb) {
      await this.storageService.clearCart(usuarioId);
    } else {
      await this.sqliteService.clearCart(usuarioId);
    }
  }

  async removeFromCart(usuarioId: number, itemId: number) {
    if (this.isWeb) {
      await this.storageService.removeFromCart(usuarioId, itemId);
    } else {
      await this.sqliteService.removeFromCart(itemId);
    }
  }

  // Transacciones
  async saveTransaction(usuarioId: number, codigo: string, juegos: any[]) {
    if (this.isWeb) {
      await this.storageService.saveTransaction(usuarioId, codigo, juegos);
    } else {
      await this.sqliteService.saveTransaction(usuarioId, codigo, juegos);
    }
  }

  async getTransactions(usuarioId: number) {
    if (this.isWeb) {
      return await this.storageService.getTransactions(usuarioId);
    } else {
      return await this.sqliteService.getTransactions(usuarioId);
    }
  }

  // Sesión
  async saveSessionUser(user: any) {
    if (this.isWeb) {
      await this.storageService.saveSessionUser(user);
    } else {
      await this.sqliteService.saveSessionUser(user);
    }
  }

  async getSessionUser() {
    if (this.isWeb) {
      return await this.storageService.getSessionUser();
    } else {
      return await this.sqliteService.getSessionUser();
    }
  }

  async clearSessionUser() {
    if (this.isWeb) {
      await this.storageService.clearSessionUser();
    } else {
      await this.sqliteService.clearSessionUser();
    }
  }
}
