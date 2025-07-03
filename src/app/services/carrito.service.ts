import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carritoCount = new BehaviorSubject<number>(0);
  carritoCount$ = this.carritoCount.asObservable();

  constructor() {}

  // Actualiza el contador
  setCount(count: number) {
    this.carritoCount.next(count);
  }

  // Obtiene el valor actual
  getCount(): number {
    return this.carritoCount.getValue();
  }
}
