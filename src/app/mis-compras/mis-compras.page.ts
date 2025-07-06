import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';
import { AlertController, NavController } from '@ionic/angular';
import { UserDataService } from '../services/user-data.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mis-compras',
  templateUrl: './mis-compras.page.html',
  styleUrls: ['./mis-compras.page.scss'],
  standalone: false
})
export class MisComprasPage implements OnInit {
  carrito: any[] = [];
  total: number = 0;
  medioPago: string = 'debito';
  usuarioActivo: any = null;

  usuario = {
    direccion: 'Calle Ficticia 123, Santiago',
    telefono: '987654321',
    correo: 'cliente@email.com',
  };

  constructor(
    private alertCtrl: AlertController,
    private alertController: AlertController,
    private sessionService: SessionService,
    private userDataService: UserDataService,
    private router: Router,
    private navCtrl: NavController
  ) {}

  async ngOnInit() {
    this.usuarioActivo = await this.sessionService.getSession();

    if (!this.usuarioActivo) {
      console.warn('🚫 No hay sesión activa, redirigiendo al login...');
      this.router.navigate(['/login']);
      return;
    }

    this.usuario.correo = this.usuarioActivo.correo || this.usuario.correo;
    await this.cargarCarrito();
  }

  async cargarCarrito() {
    try {
      const carrito = await this.userDataService.getCart(this.usuarioActivo.id.toString());
      this.carrito = carrito;
      this.total = this.carrito.reduce((sum, item) => sum + item.precio, 0);
    } catch (error) {
      console.error('❌ Error al cargar carrito:', error);
      this.carrito = [];
      this.total = 0;
    }
  }

 async eliminarItem(item_id: string) {
  try {
    this.carrito = this.carrito.filter(item => item.id !== item_id);
    await this.userDataService.setCart(this.usuarioActivo.id.toString(), this.carrito);
    this.total = this.carrito.reduce((sum, item) => sum + item.precio, 0);
  } catch (error) {
    console.error('❌ Error al eliminar del carrito:', error);
  }
}


  async finalizarCompra() {
    const alert = await this.alertCtrl.create({
      header: '¡Felicidades por tu compra!',
      message: `Los detalles de la boleta llegarán a tu correo: <strong>${this.usuario.correo}</strong>.`,
      buttons: ['OK'],
    });

    await alert.present();

    // Limpiar carrito después de la compra
    await this.userDataService.setCart(this.usuarioActivo.id.toString(), []);
    this.carrito = [];
    this.total = 0;
  }

  async cerrarSesion() {
    const alert = await this.alertController.create({
      header: 'Cerrar sesión',
      message: '¿Estás segura/o de que quieres cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Cerrar',
          handler: async () => {
            await this.sessionService.clearSession();
            this.router.navigate(['/login']);
          },
        },
      ],
    });

    await alert.present();
  }
}
