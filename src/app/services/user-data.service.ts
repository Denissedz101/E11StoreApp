import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Platform, AlertController } from '@ionic/angular';
import { SqliteDbService } from './sqlite-db.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  isWeb: boolean;

  constructor(
    private platform: Platform,
    public SqliteDbService: SqliteDbService,
    public storageService: StorageService,
    private alertController: AlertController
  ) {
    this.isWeb = Capacitor.getPlatform() === 'web';
  }

  async presentErrorAlert(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  async init() {
    try {
      if (this.isWeb) {
        await this.storageService.init();
      } else {
        await this.SqliteDbService.initDB();
      }
    } catch (error) {
      console.error('Error al inicializar:', error);
      this.presentErrorAlert('Ocurrió un error al iniciar los servicios.');
    }
  }

  private normalizarUsuario(usuario: any): any {
    return {
      ...usuario,
      nombre: usuario.nombre?.toUpperCase(),
      apellidos: usuario.apellidos?.toUpperCase(),
      direccion: usuario.direccion?.toUpperCase(),
      telefono: usuario.telefono?.toUpperCase(),
      comuna: usuario.comuna?.toUpperCase(),
      ciudad: usuario.ciudad?.toUpperCase(),
      correo: usuario.correo?.toLowerCase()
    };
  }

  async saveUser(usuario: any) {
    try {
      const usuarioNormalizado = this.normalizarUsuario(usuario);
      if (this.isWeb) {
        await this.storageService.saveUser(usuarioNormalizado);
      } else {
        await this.SqliteDbService.saveUser(usuarioNormalizado);
      }
    } catch (error) {
      console.error('Error al guardar usuario:', error);
      this.presentErrorAlert('No se pudo guardar el usuario.');
    }
  }

  async getUserByCredentials(correo: string, contrasena: string) {
    try {
      if (this.isWeb) {
        return await this.storageService.getUserByCredentials(correo, contrasena);
      } else {
        return await this.sqliteService.getUserByCredentials(correo, contrasena);
      }
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      this.presentErrorAlert('Error al validar las credenciales.');
      return null;
    }
  }

  async addToCart(usuarioId: number, juego: any) {
    try {
      if (this.isWeb) {
        await this.storageService.addToCart(usuarioId, juego);
      } else {
        await this.sqliteService.addToCart(usuarioId, juego);
      }
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
      this.presentErrorAlert('No se pudo agregar el juego al carrito.');
    }
  }

  async getCart(usuarioId: number) {
    try {
      if (this.isWeb) {
        return await this.storageService.getCart(usuarioId);
      } else {
        return await this.sqliteService.getCart(usuarioId);
      }
    } catch (error) {
      console.error('Error al obtener carrito:', error);
      this.presentErrorAlert('No se pudo cargar el carrito.');
      return [];
    }
  }

  async clearCart(usuarioId: number) {
    try {
      if (this.isWeb) {
        await this.storageService.clearCart(usuarioId);
      } else {
        await this.sqliteService.clearCart(usuarioId);
      }
    } catch (error) {
      console.error('Error al limpiar carrito:', error);
      this.presentErrorAlert('No se pudo vaciar el carrito.');
    }
  }

  async removeFromCart(usuarioId: number, itemId: number) {
    try {
      if (this.isWeb) {
        await this.storageService.removeFromCart(usuarioId, itemId);
      } else {
        await this.sqliteService.removeFromCart(itemId);
      }
    } catch (error) {
      console.error('Error al eliminar del carrito:', error);
      this.presentErrorAlert('No se pudo eliminar el juego del carrito.');
    }
  }

  async saveTransaction(usuarioId: number, codigo: string, juegos: any[]) {
    try {
      if (this.isWeb) {
        await this.storageService.saveTransaction(usuarioId, codigo, juegos);
      } else {
        await this.sqliteService.saveTransaction(usuarioId, codigo, juegos);
      }
    } catch (error) {
      console.error('Error al guardar transacción:', error);
      this.presentErrorAlert('No se pudo guardar la transacción.');
    }
  }

  async getTransactions(usuarioId: number) {
    try {
      if (this.isWeb) {
        return await this.storageService.getTransactions(usuarioId);
      } else {
        return await this.sqliteService.getTransactions(usuarioId);
      }
    } catch (error) {
      console.error('Error al obtener transacciones:', error);
      this.presentErrorAlert('No se pudieron obtener las transacciones.');
      return [];
    }
  }

  async saveSessionUser(user: any) {
    try {
      if (this.isWeb) {
        await this.storageService.saveSessionUser(user);
      } else {
        await this.sqliteService.saveSessionUser(user);
      }
    } catch (error) {
      console.error('Error al guardar sesión:', error);
      this.presentErrorAlert('No se pudo guardar la sesión del usuario.');
    }
  }

  async getSessionUser() {
    try {
      if (this.isWeb) {
        return await this.storageService.getSessionUser();
      } else {
        return await this.sqliteService.getSessionUser();
      }
    } catch (error) {
      console.error('Error al obtener sesión:', error);
      this.presentErrorAlert('No se pudo recuperar la sesión del usuario.');
      return null;
    }
  }

  async clearSessionUser() {
    try {
      if (this.isWeb) {
        await this.storageService.clearSessionUser();
      } else {
        await this.sqliteService.clearSessionUser();
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      this.presentErrorAlert('No se pudo cerrar la sesión del usuario.');
    }
  }
}
