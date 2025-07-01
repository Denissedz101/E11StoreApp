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
        await customElements.whenDefined('jeep-sqlite');
        const jeepSqliteEl = document.querySelector('jeep-sqlite');
        if (jeepSqliteEl) {
          await this.sqlite.initWebStore();
          console.log('🌐 WebStore SQLite inicializado');
        }
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
    // Crear tablas
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

    await this.db.execute(`
      CREATE TABLE IF NOT EXISTS transacciones (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        codigo TEXT UNIQUE,
        usuario_id INTEGER,
        fecha TEXT,
        FOREIGN KEY (usuario_id) REFERENCES users(id)
      );
    `);

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

    await this.db.execute(`
      CREATE TABLE IF NOT EXISTS session (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER,
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

    // Crear admin de prueba
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

  // GUARDAR Usuarios
  async saveUser(usuario: any) {
  // Verificar si el correo ya existe
  const existe = await this.db.query(
    'SELECT id FROM users WHERE correo = ?',
    [usuario.correo]
  );

  if (existe.values && existe.values.length > 0) {
    throw new Error('UsuarioDuplicado'); // revisado desde user-data.service.ts
  }

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


  async getUserByCredentials(correo: string, contrasena: string) {
    const result = await this.db.query(
      'SELECT * FROM users WHERE correo = ? AND contrasena = ?',
      [correo, contrasena]
    );
    return result.values && result.values.length > 0 ? result.values[0] : null;
  }


  // Agregar juego al carrito
      async addToCart(usuarioId: number, juego: any) {
        const query = `INSERT INTO carrito (usuario_id, juego_id, titulo, precio, fecha_agregado) VALUES (?, ?, ?, ?, ?)`;
        const fecha = new Date().toISOString();
        await this.db.run(query, [usuarioId, juego.id || '', juego.titulo, juego.precio, fecha]);
      }

      // Obtener carrito de usuario
      async getCart(usuarioId: number): Promise<any[]> {
        const res = await this.db.query(`SELECT * FROM carrito WHERE usuario_id = ?`, [usuarioId]);
        return res.values || [];
      }

      // Vaciar carrito de usuario
      async clearCart(itemId: number) {
        await this.db.run(`DELETE FROM carrito WHERE usuario_id = ?`, [itemId]);
      }

      // Eliminar un ítem del carrito por su id (id de carrito)
      async removeFromCart(itemId: number) {
        await this.db.run(`DELETE FROM carrito WHERE id = ?`, [itemId]);
      }


  // Transacciones

      async saveTransaction(usuarioId: number, codigo: string, juegos: any[]) {
        const fecha = new Date().toISOString();
        // Insertar en transacciones
        await this.db.run(`INSERT INTO transacciones (codigo, usuario_id, fecha) VALUES (?, ?, ?)`, [codigo, usuarioId, fecha]);

        // Obtener el id generado de la transacción
        const res = await this.db.query(`SELECT id FROM transacciones WHERE codigo = ?`, [codigo]);
        const transaccionId = res.values && res.values.length > 0 ? res.values[0].id : null;
        if (!transaccionId) throw new Error('No se pudo obtener id de la transacción');

        // Insertar detalles por cada juego comprado
        for (const juego of juegos) {
          await this.db.run(
            `INSERT INTO detalles_transaccion (transaccion_id, juego_id, titulo, precio) VALUES (?, ?, ?, ?)`,
            [transaccionId, juego.id || '', juego.titulo, juego.precio]
          );
        }

        // Limpiar carrito después de guardar transacción
        await this.clearCart(usuarioId);
      }

      // Obtener transacciones del usuario
      async getTransactions(usuarioId: number) {
        const res = await this.db.query(`SELECT * FROM transacciones WHERE usuario_id = ? ORDER BY fecha DESC`, [usuarioId]);
        return res.values || [];
      }

  // Sesión
  async saveSessionUser(user: any) {
    await this.db.run('DELETE FROM session');
    const query = `
      INSERT INTO session (usuario_id, nombre, apellidos, correo, contrasena, fecha_nacimiento, direccion, telefono, comuna, ciudad)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    await this.db.run(query, [
      user.id,
      user.nombre,
      user.apellidos,
      user.correo,
      user.contrasena,
      user.fecha_nacimiento,
      user.direccion,
      user.telefono,
      user.comuna,
      user.ciudad,
    ]);
  }

  async getSessionUser() {
    const res = await this.db.query('SELECT * FROM session LIMIT 1');
    return res.values && res.values.length > 0 ? res.values[0] : null;
  }

  async clearSessionUser() {
    await this.db.run('DELETE FROM session');
  }

  

}
