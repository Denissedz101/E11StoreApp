import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {}

  async init() {
    this._storage = await this.storage.create();
  }

  async setItem(key: string, value: any) {
    await this._storage?.set(key, value);
  }

  async getItem(key: string) {
    return await this._storage?.get(key);
  }

  async removeItem(key: string) {
    await this._storage?.remove(key);
  }

  async clear() {
    await this._storage?.clear();
  }

  // Usuarios
  async saveUser(usuario: any) {
    await this.setItem(`usuario:${usuario.correo}`, usuario);
  }

  async getUserByCredentials(correo: string, contrasena: string) {
    const user = await this.getItem(`usuario:${correo}`);
    return user && user.contrasena === contrasena ? user : null;
  }


  // Carrito
  async addToCart(usuarioId: number, juego: any) {
    const key = `cart_${usuarioId}`;
    let cart = (await this.storage.get(key)) || [];
    // asignar id temporal único si no tiene
    if (!juego.id) juego.id = Date.now() + Math.floor(Math.random() * 1000);
    cart.push(juego);
    await this.storage.set(key, cart);
  }

  async getCart(usuarioId: number) {
    const key = `cart_${usuarioId}`;
    return (await this.storage.get(key)) || [];
  }

  async clearCart(usuarioId: number) {
    const key = `cart_${usuarioId}`;
    await this.storage.remove(key);
  }

  async removeFromCart(usuarioId: number, itemId: number) {
    const key = `cart_${usuarioId}`;
    let cart = (await this.storage.get(key)) || [];
    cart = cart.filter((item: any) => item.id !== itemId);
    await this.storage.set(key, cart);
  }

  // Transacciones
  async saveTransaction(usuarioId: number, codigo: string, juegos: any[]) {
    const key = `transacciones:${usuarioId}`;
    const transacciones = (await this.getItem(key)) || [];
    const nuevaTransaccion = {
      id: Date.now(),
      codigo,
      usuario_id: usuarioId,
      fecha: new Date().toISOString(),
      detalles: juegos,
    };
    transacciones.push(nuevaTransaccion);
    await this.setItem(key, transacciones);
  }

  async getTransactions(usuarioId: number) {
    return (await this.getItem(`transacciones:${usuarioId}`)) || [];
  }


  // Sesión
  async saveSessionUser(user: any) {
    await this.storage.set('sessionUser', user);
  }

  async getSessionUser() {
    return await this.storage.get('sessionUser');
  }

  async clearSessionUser() {
    await this.storage.remove('sessionUser');
  }
}
