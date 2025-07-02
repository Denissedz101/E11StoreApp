import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection, JsonSQLite } from '@capacitor-community/sqlite';
import { Platform } from '@ionic/angular';
import dbJson from '../assets/db.json';

@Injectable({
  providedIn: 'root'
})
export class SqliteDbService {
  private sqlite = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;
  isReady = false;

  constructor(private platform: Platform) {
    this.platform.ready().then(() => {
      this.initDB();
    });
  }

  async initDB() {
  try {
    const ret = await this.sqlite.checkConnectionsConsistency();
    const isConn = ret.result;
    if (isConn) {
      await this.sqlite.closeAllConnections();
    }

    const jsonData: JsonSQLite = dbJson as JsonSQLite;

    // Convertir jsonData a una cadena JSON
    const jsonString = JSON.stringify(jsonData);

    const retImport = await this.sqlite.importFromJson(jsonString);  // Pasa jsonString en lugar de jsonData
    if (retImport.changes && retImport.changes.changes) {
      this.db = await this.sqlite.createConnection("e11evenDB", false, "no-encryption", 1, false);
      await this.db.open();
      this.isReady = true;
      console.log("✔️ DB lista desde JSON");
    }
  } catch (err) {
    console.error("❌ Error inicializando la DB:", err);
  }
}

  async getUsuarios(): Promise<any[]> {
    const res = await this.db.query("SELECT * FROM usuarios");
    return res.values || [];
  }

  async addUsuario(nombre: string, correo: string, contrasena: string) {
    const stmt = `INSERT INTO usuarios (nombre, correo, contrasena) VALUES (?, ?, ?)`;
    await this.db.run(stmt, [nombre, correo, contrasena]);
  }

  async saveUser(nombre: string, correo: string, contrasena: string): Promise<void> {
  try {

    const stmt = `INSERT INTO usuarios (nombre, correo, contrasena) VALUES (?, ?, ?)`;

  
    await this.db.run(stmt, [nombre, correo, contrasena]);

    console.log("✔️ Usuario guardado correctamente");
  } catch (err) {
    console.error("❌ Error al guardar usuario:", err);
  }
}

}
