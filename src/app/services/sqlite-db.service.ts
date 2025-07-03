import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection, JsonSQLite } from '@capacitor-community/sqlite';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SqliteDbService {
  private sqlite = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;
  isReady = false;

  constructor(private platform: Platform, private http: HttpClient) {
  this.platform.ready().then(() => {
    if (this.platform.is('android') || this.platform.is('ios')) {
      this.initDB(); //Solo en móvil
      console.log('📱 Plataforma móvil detectada. Inicializando SQLite...');
    } else {
      console.log('⚠️ Plataforma web detectada. No se inicializa SQLite.');
    }
  });
}


  // Inicializa la base de datos desde el JSON
    async initDB() {
      try {
        const ret = await this.sqlite.checkConnectionsConsistency();
        if (ret.result) {
          await this.sqlite.closeAllConnections();
        }

        this.db = await this.sqlite.createConnection("e11evenDB", false, "no-encryption", 1, false);
        await this.db.open();

        const jsonData = await this.http.get<JsonSQLite>('assets/db.json').toPromise();
        if (!jsonData) {
          throw new Error("No se pudo cargar db.json");
        }

        const jsonString = JSON.stringify(jsonData);
        const retImport = await this.sqlite.importFromJson(jsonString);

        if (retImport.changes?.changes) {
          const existingConn = await this.sqlite.isConnection("e11evenDB", false);
          if (existingConn.result) {
            await this.sqlite.closeConnection("e11evenDB", false);
          }

          this.db = await this.sqlite.createConnection("e11evenDB", false, "no-encryption", 1, false);
          await this.db.open();
          await this.verificarUsuarios();
          await this.insertarUsuarioDePrueba();
          this.isReady = true;
  console.log("✔️ DB lista desde JSON");
        } else {
          console.warn("⚠️ No hubo cambios al importar la base");
        }

      } catch (err) {
        console.error("❌ Error inicializando la DB:", err);
      }
    }



  // Guardar nuevo usuario
  async saveUser(nombre: string, correo: string, contrasena: string): Promise<void> {
    if (!nombre || !correo || !contrasena) {
      console.warn("❗ Todos los campos son obligatorios");
      return;
    }

    try {
      const result = await this.db.query("SELECT * FROM usuarios WHERE correo = ?", [correo]);
      if (result.values?.length) {
        console.warn("❗ El correo ya está registrado");
        return;
      }

      const stmt = `INSERT INTO usuarios (nombre, correo, contrasena) VALUES (?, ?, ?)`;
      await this.db.run(stmt, [nombre, correo, contrasena]);
      console.log("✔️ Usuario guardado correctamente");

    } catch (err) {
      console.error("❌ Error al guardar usuario:", err);
    }
  }

  // Obtener usuarios
  async getUsuarios(): Promise<any[]> {
    const res = await this.db.query("SELECT * FROM usuarios");
    return res.values ?? [];
  }

  // Agregar juego al carrito
  async addToCart(usuarioId: number, juego: any): Promise<void> {
    const stmt = `INSERT INTO carrito (usuario_id, juego_id, titulo, precio, cantidad) VALUES (?, ?, ?, ?, ?)`;
    await this.db.run(stmt, [
      usuarioId,
      juego.id,
      juego.titulo,
      juego.precio,
      juego.cantidad || 1
    ]);
    console.log("🛒 Juego agregado al carrito");
  }

  // Obtener carrito de un usuario
  async getCart(usuarioId: number): Promise<any[]> {
    const res = await this.db.query("SELECT * FROM carrito WHERE usuario_id = ?", [usuarioId]);
    return res.values ?? [];
  }

  // Eliminar un juego del carrito
  async removeFromCart(itemId: number): Promise<void> {
    await this.db.run("DELETE FROM carrito WHERE id = ?", [itemId]);
    console.log("🗑️ Juego eliminado del carrito");
  }

  // Vaciar el carrito del usuario
  async clearCart(usuarioId: number): Promise<void> {
    await this.db.run("DELETE FROM carrito WHERE usuario_id = ?", [usuarioId]);
    console.log("🧹 Carrito vaciado");
  }

  // Guardar transacción (compra de juegos)
  async saveTransaction(usuarioId: number, codigo: string, juegos: any[]): Promise<void> {
    const fecha = new Date().toISOString();
    const stmtCompra = `INSERT INTO compras (usuario_id, codigo, fecha) VALUES (?, ?, ?)`;
    const res = await this.db.run(stmtCompra, [usuarioId, codigo, fecha]);
    console.log("💳 Compra registrada con código:", codigo);

    
  }

  // Verificación inicial
  async verificarUsuarios() {
    try {
      const res = await this.db.query("SELECT * FROM usuarios");
      console.log("✔️ Usuarios encontrados:", res.values ?? []);
      console.table(res.values);
    } catch (err) {
      console.error("❌ Error verificando usuarios:", err);
    }
  }

  
  async getTransactions(usuarioId: number): Promise<any[]> {
    try {
      const res = await this.db.query("SELECT * FROM compras WHERE usuario_id = ?", [usuarioId]);
      return res.values ?? [];
    } catch (err) {
      console.error("❌ Error al obtener transacciones:", err);
      return [];
    }
  }

      // Buscar usuario por correo y contraseña (para login)
    async getUserByCredentials(correo: string, contrasena: string): Promise<any | null> {
      try {
        const res = await this.db.query(
          "SELECT * FROM usuarios WHERE correo = ? AND contrasena = ?",
          [correo, contrasena]
        );

        if (res.values?.length) {
          return res.values[0]; 
        } else {
          return null;
        }

      } catch (err) {
        console.error("❌ Error al buscar usuario por credenciales:", err);
        return null;
      }
    }

        // Guardar sesión de usuario 
    async saveSessionUser(user: any): Promise<void> {
      try {
        // Limpiar sesiones anteriores
        await this.db.run("DELETE FROM session_user");

        const stmt = `INSERT INTO session_user (usuario_id, nombre, correo) VALUES (?, ?, ?)`;
        await this.db.run(stmt, [user.id, user.nombre, user.correo]);

        console.log("🔐 Sesión guardada");
      } catch (err) {
        console.error("❌ Error guardando sesión:", err);
      }
    }

    // Obtener usuario de sesión
    async getSessionUser(): Promise<any | null> {
      try {
        const res = await this.db.query("SELECT * FROM session_user LIMIT 1");
        return res.values?.length ? res.values[0] : null;
      } catch (err) {
        console.error("❌ Error obteniendo sesión:", err);
        return null;
      }
    }

    // Cerrar sesión (eliminar)
    async clearSessionUser(): Promise<void> {
      try {
        await this.db.run("DELETE FROM session_user");
        console.log("🚪 Sesión cerrada");
      } catch (err) {
        console.error("❌ Error cerrando sesión:", err);
      }
    }
    
  //carrito
  async setCart(usuarioId: number, carrito: any[]): Promise<void> {
  try {
    // Eliminar carrito anterior
   await this.db.run('DELETE FROM carrito WHERE usuario_id = ?', [usuarioId]);

    // Insertar ítem nuevo
    for (const item of carrito) {
      await this.db.run(
        `INSERT INTO carrito (usuario_id, juego_id, titulo, precio, imagen)
         VALUES (?, ?, ?, ?, ?)`,
        [usuarioId, item.juego_id, item.titulo, item.precio, item.imagen]
      );
    }
  } catch (error) {
    console.error('❌ Error en setCart SQLite:', error);
    throw error;
  }
}

    // Método para listar todas las tablas existentes en la base de datos
  
    async listarTablas(): Promise<void> {
      if (!this.isReady || !this.db) {
        console.warn('⚠️ La base de datos aún no está lista. Espera a que se inicialice.');
        return;
      }

      try {
        const res = await this.db.query(`SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'`);
        const tablas = res.values?.map(t => t.name) ?? [];
        console.log('📋 Tablas en la base de datos:', tablas);
      } catch (err) {
        console.error('❌ Error al listar tablas:', err);
      }
    }

  private async insertarUsuarioDePrueba() {
  try {
    const res = await this.db.query("SELECT * FROM usuarios WHERE correo = ?", ['admin@admin.com']);

    if (!res.values || res.values.length === 0) {
      await this.db.run(
        `INSERT INTO usuarios (nombre, correo, contrasena) VALUES (?, ?, ?)`,
        ['Usuario admin', 'admin@admin.com', '1234']
      );
      console.log('👤 Usuario demo insertado: admin@admin.com / 1234');
    } else {
      console.log('👤 Usuario demo ya existe, no se inserta nuevamente');
    }
  } catch (err) {
    console.error('❌ Error insertando usuario demo:', err);
  }
}



}
