import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { UserDataService } from '../services/user-data.service';
import { AlertController, NavController } from '@ionic/angular';

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
    private userDataService: UserDataService,
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
    this.carrito = await this.userDataService.getCart(this.usuarioActivo.id.toString());
    this.total = this.carrito.reduce((sum, item) => sum + item.precio, 0);
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
            // Aquí removemos solo el item indicado del carrito del usuario
            await this.userDataService.removeFromCart(this.usuarioActivo.id.toString(), itemId);
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

    const alert = await this.alertCtrl.create({
      header: 'Compra simulada',
      message: `Compra simulada por $${this.total}. ¡Gracias por su compra!`,
      buttons: ['OK'],
    });
    await alert.present();

    // Limpiamos el carrito después de la compra simulada
    await this.userDataService.clearCart(this.usuarioActivo.id.toString());
    await this.cargarCarrito();
  }
}
