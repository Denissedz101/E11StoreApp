import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class MockUserDataService {
  carrito = [
    { juego_id: '1', titulo: 'Juego 1', precio: 1000 },
    { juego_id: '2', titulo: 'Juego 2', precio: 2000 }
  ];

  private carritoSubject = new BehaviorSubject<boolean>(true);
  carritoActualizado$ = this.carritoSubject.asObservable(); // 💥 requerido para evitar el error de subscribe

  getCart(usuarioId: number) {
    return Promise.resolve(this.carrito);
  }

  addToCart(usuarioId: number, juego: any) {
    this.carrito.push(juego);
    this.carritoSubject.next(true); // notifica
    return Promise.resolve();
  }

  removeFromCart(usuarioId: number, itemId: number) {
    this.carrito = this.carrito.filter(j => j.juego_id !== itemId.toString());
    this.carritoSubject.next(true);
    return Promise.resolve();
  }

  setCart(usuarioId: number, nuevoCarrito: any[]) {
    this.carrito = nuevoCarrito;
    this.carritoSubject.next(true);
    return Promise.resolve();
  }

  actualizarContadorCarrito(nuevoValor: number) {}
}
