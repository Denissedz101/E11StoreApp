import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { UserDataService } from '../services/user-data.service';
import { CarritoService } from '../services/carrito.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mis-compras',
  templateUrl: './mis-compras.page.html',
  styleUrls: ['./mis-compras.page.scss'],
  standalone: false
})
export class MisComprasPage implements OnInit, OnDestroy {
  carrito: any[] = [];
  total: number = 0;
  medioPago: string = 'debito';
  usuarioActivo: any = null;
  carritoSub!: Subscription;

  usuario = {
    direccion: 'Calle Ficticia 123',
    telefono: '987654321',
    correo: 'cliente@email.com',
  };

  constructor(
    private alertController: AlertController,
    private sessionService: SessionService,
    private userDataService: UserDataService,
    private carritoService: CarritoService,
    private router: Router,
    private toastController: ToastController,
    private navCtrl: NavController
  ) {}

  async ngOnInit() {
    this.usuarioActivo = await this.sessionService.getSession();

    if (!this.usuarioActivo) {
      this.router.navigate(['/login']);
      return;
    }

    this.usuario = {
      direccion: this.usuarioActivo.direccion || 'Calle Ficticia 123',
      telefono: this.usuarioActivo.telefono || '987654321',
      correo: this.usuarioActivo.correo || 'cliente@email.com'
    };

    await this.cargarCarrito();

    // Suscripción al cambio del carrito para actualizar la vista
    this.carritoSub = this.userDataService.carritoActualizado$.subscribe(() => {
      this.cargarCarrito();
    });
  }

  ngOnDestroy() {
    this.carritoSub?.unsubscribe();
  }

  async ionViewWillEnter() {
    await this.cargarCarrito();
  }

  async cargarCarrito() {
    try {
      const carrito = await this.userDataService.getCart(this.usuarioActivo.id.toString());
      this.carrito = carrito;
      this.total = this.carrito.reduce((sum, item) => sum + item.precio, 0);
      this.carritoService.setCount(this.carrito.length);  // Actualiza el contador del carrito
    } catch (error) {
      this.carrito = [];
      this.total = 0;
    }
  }

  // Elimina un item del carrito y actualiza la vista
  async eliminarItem(itemId: number) {
    try {
      console.log('🗑 Eliminando item con ID:', itemId);

      // Elimina el item del carrito
      await this.userDataService.removeFromCart(this.usuarioActivo.id, itemId);

      // Actualiza el carrito llamando a cargarCarrito nuevamente para reflejar los cambios en la vista
      await this.cargarCarrito();

      // Actualiza el contador de productos en el carrito
      const carritoLength = this.carrito.length;
      this.carritoService.setCount(carritoLength);  // Actualiza el contador de carrito
    } catch (error) {
      console.error('❌ Error al eliminar del carrito:', error);
    }
  }

  // Finaliza la compra y limpia el carrito
  async finalizarCompra() {
    console.log('Compra realizada con éxito');
    const toast = await this.toastController.create({
      message: `🎉 ¡Felicidades por tu compra! Los detalles llegarán a: ${this.usuario.correo}`,
      duration: 3000,
      position: 'bottom',
      color: 'success',
      cssClass: 'toast-compra',
      
    });

    await toast.present();

    // Limpiar carrito
    await this.userDataService.setCart(this.usuarioActivo.id.toString(), []);

    // Actualiza vista local
    this.carrito = [];
    this.total = 0;

    // ACTUALIZAR contador y notificar a otras vistas
   this.userDataService.actualizarContadorCarrito(0);


    this.router.navigate(['/home'], { replaceUrl: true });
  }


  // Cierra la sesión del usuario
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
