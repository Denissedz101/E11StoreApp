import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection, JsonSQLite } from '@capacitor-community/sqlite';
import { Platform } from '@ionic/angular';
import dbJson from 'src/assets/db.json';

@Injectable({
  providedIn: 'root'
})
export class SqliteDbService {
  private sqlite = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;
  isReady = false;

  constructor(private platform: Platform) {
  this.platform.ready().then(() => {
    if (this.platform.is('android') || this.platform.is('ios')) {
      this.initDB(); // ✅ Solo en móvil
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

    const jsonData: JsonSQLite = dbJson as JsonSQLite;
    const jsonString = JSON.stringify(jsonData);
    const retImport = await this.sqlite.importFromJson(jsonString);

    if (retImport.changes?.changes) {
      this.db = await this.sqlite.createConnection("e11evenDB", false, "no-encryption", 1, false);
      await this.db.open();
      await this.verificarUsuarios();
      this.isReady = true;
      console.log("✔️ DB lista desde JSON");
    } else {
      console.error("❌ Error al importar la base de datos desde el JSON");
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

    // Puedes guardar juegos de la compra si tienes tabla detalle_compras
  }

  // Verificación inicial
  async verificarUsuarios() {
    try {
      const res = await this.db.query("SELECT * FROM usuarios");
      console.log("✔️ Usuarios encontrados:", res.values ?? []);
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


}
