import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

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

  usuario = {
    direccion: 'Calle Ficticia 123, Santiago',
    telefono: '987654321',
    correo: 'cliente@email.com',
  };

  constructor(private alertCtrl: AlertController) {}

  ngOnInit() {
    this.cargarCarrito();
  }

  cargarCarrito() {
    const datos = localStorage.getItem('carrito');
    this.carrito = datos ? JSON.parse(datos) : [];
    this.total = this.carrito.reduce((sum, item) => sum + item.precio, 0);
  }

  eliminarItem(id: number) {
    this.carrito = this.carrito.filter(item => item.id !== id);
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
    this.total = this.carrito.reduce((sum, item) => sum + item.precio, 0);
  }

  async finalizarCompra() {
    const alert = await this.alertCtrl.create({
      header: '¡Felicidades por tu compra!',
      message: `Los detalles de la boleta llegarán a tu correo: <strong>${this.usuario.correo}</strong>.`,
      buttons: ['OK'],
    });

    await alert.present();
   
  }
}
