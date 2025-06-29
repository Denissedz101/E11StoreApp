import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { SessionService } from '../services/session.service';
import { UserDataService } from '../services/user-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
  standalone: false
})
export class ContactoPage {
  mensaje: string = '';

  constructor(
    private alertCtrl: AlertController,
    private alertController: AlertController,
    private sessionService: SessionService,
    private userDataService: UserDataService,
    private router: Router,
    private navCtrl: NavController,
  ) { }

  async enviar() {
    const alert = await this.alertCtrl.create({
      header: 'Mensaje enviado',
      message: 'Gracias por contactarnos. Te responderemos pronto.',
      buttons: ['OK']
    });
    await alert.present();
    this.mensaje = '';
    this.router.navigate(['/home']);
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