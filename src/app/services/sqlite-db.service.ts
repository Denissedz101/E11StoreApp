import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root',
})
export class SqliteService {
  private sqlite: SQLiteConnection;
  private db!: SQLiteDBConnection;
  public dbReady = new BehaviorSubject<boolean>(false);

  constructor(private platform: Platform) {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
  }

 async init() {
  await this.platform.ready();

  try {
    if (Capacitor.getPlatform() === 'web') {
      console.log('🌐 Ejecutando en plataforma web');
      // Necesario para inicializar jeep-sqlite en navegador
      await this.sqlite.initWebStore();
    } else {
      console.log('📱 Ejecutando en plataforma nativa');
    }

    this.db = await this.sqlite.createConnection(
      'users.db',
      false,
      'no-encryption',
      1,
      false
    );
    await this.db.open();
    console.log('✅ SQLite conectado');

    await this.initDatabase();
    this.dbReady.next(true);
  } catch (err) {
    console.error('❌ Error al inicializar SQLite:', err);
  }
}

  private async initDatabase() {
    // Crear tabla de usuarios
    await this.db.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        apellidos TEXT,
        correo TEXT UNIQUE,
        contrasena TEXT,
        fecha_nacimiento TEXT,
        direccion TEXT,
        telefono TEXT,
        comuna TEXT,
        ciudad TEXT
      );
    `);
    console.log('✅ Tabla users lista');

    // Tabla carrito
    await this.db.execute(`
      CREATE TABLE IF NOT EXISTS carrito (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER,
        juego_id TEXT,
        titulo TEXT,
        precio INTEGER,
        fecha_agregado TEXT,
        FOREIGN KEY (usuario_id) REFERENCES users(id)
      );
    `);
    console.log('✅ Tabla carrito lista');

    // Tabla transacciones
    await this.db.execute(`
      CREATE TABLE IF NOT EXISTS transacciones (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        codigo TEXT UNIQUE,
        usuario_id INTEGER,
        fecha TEXT,
        FOREIGN KEY (usuario_id) REFERENCES users(id)
      );
    `);
    console.log('✅ Tabla transacciones lista');

    // Tabla detalles_transaccion
    await this.db.execute(`
      CREATE TABLE IF NOT EXISTS detalles_transaccion (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        transaccion_id INTEGER,
        juego_id TEXT,
        titulo TEXT,
        precio INTEGER,
        FOREIGN KEY (transaccion_id) REFERENCES transacciones(id)
      );
    `);
    console.log('✅ Tabla detalles_transaccion lista');

    // Crear usuario admin solo si no existe
    const adminExists = await this.getUserByCredentials('admin@admin.com', '1234');
    if (!adminExists) {
      await this.saveUser({
        nombre: 'Admin',
        apellidos: 'Admin',
        correo: 'admin@admin.com',
        contrasena: '1234',
        fecha_nacimiento: '1990-01-01',
        direccion: 'Direccion Admin',
        telefono: '123456789',
        comuna: 'Comuna Admin',
        ciudad: 'Ciudad Admin',
      });
      console.log('✅ Usuario admin creado');
    } else {
      console.log('ℹ️ Usuario admin ya existía');
    }
  }

  // Guardar nuevo usuario
  async saveUser(usuario: any) {
    const query = `
      INSERT INTO users 
      (nombre, apellidos, correo, contrasena, fecha_nacimiento, direccion, telefono, comuna, ciudad)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    await this.db.run(query, [
      usuario.nombre,
      usuario.apellidos,
      usuario.correo,
      usuario.contrasena,
      usuario.fecha_nacimiento,
      usuario.direccion,
      usuario.telefono,
      usuario.comuna,
      usuario.ciudad,
    ]);
  }

  // Obtener usuario por credenciales
  async getUserByCredentials(correo: string, contrasena: string) {
    const result = await this.db.query(
      'SELECT * FROM users WHERE correo = ? AND contrasena = ?',
      [correo, contrasena]
    );
    if (result.values && result.values.length > 0) {
      return result.values[0];
    }
    return null;
  }
}
