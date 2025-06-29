import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
  
export class StorageService {
  constructor(private storage: Storage) {}

  // Inicializar el almacenamiento
  async init() {
    await this.storage.create();
  }

  // Guardar un elemento en localStorage
  async setItem(key: string, value: any) {
    await this.storage.set(key, value);
  }

  // Obtener un elemento de localStorage
  async getItem(key: string) {
    return await this.storage.get(key);
  }

  async removeItem(key: string) {
  await this.storage.remove(key);
  }
  
  // Limpiar todo el almacenamiento
  async clear() {
    await this.storage.clear();
  }
}

