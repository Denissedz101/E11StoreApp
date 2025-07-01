import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { SqliteService } from '../services/sqlite-db.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-mis-compras',
  templateUrl: './mis-compras.page.html',
  styleUrls: ['./mis-compras.page.scss'],
  standalone: false,
})
export class MisComprasPage implements OnInit {
  usuarioActivo: any = null;
  carrito: any[] = [];
  total: number = 0;

  constructor(
    private sessionService: SessionService,
    private sqliteService: SqliteService,
    private alertCtrl: AlertController,
    private navCtrl: NavController
  ) {}

  async ngOnInit() {
    this.usuarioActivo = await this.sessionService.getActiveUser();

    if (!this.usuarioActivo) {
      this.navCtrl.navigateRoot('/login');
      return;
    }

    await this.cargarCarrito();
  }

  async cargarCarrito() {
    try {
      this.carrito = await this.sqliteService.getCart(this.usuarioActivo.id);
      this.total = this.carrito.reduce((sum, item) => sum + item.precio, 0);
    } catch (error) {
      console.error('Error al cargar carrito:', error);
    }
  }

  async eliminarItem(itemId: number) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar ítem',
      message: '¿Quieres eliminar este juego del carrito?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          handler: async () => {
            await this.sqliteService.removeFromCart(itemId);
            await this.cargarCarrito();
          },
        },
      ],
    });

    await alert.present();
  }

  async finalizarCompra() {
    if (this.carrito.length === 0) {
      const alert = await this.alertCtrl.create({
        header: 'Carrito vacío',
        message: 'No hay juegos en el carrito para comprar.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    const codigo = 'ORD-' + Date.now();

    try {
      await this.sqliteService.saveTransaction(
        this.usuarioActivo.id,
        codigo,
        this.carrito
      );

      const alert = await this.alertCtrl.create({
        header: 'Compra simulada',
        message: `Compra registrada por $${this.total}. Código: ${codigo}`,
        buttons: ['OK'],
      });
      await alert.present();

      await this.cargarCarrito();
    } catch (error) {
      console.error('Error al guardar transacción:', error);
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'No se pudo completar la compra.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}
