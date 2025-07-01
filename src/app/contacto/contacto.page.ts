import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { SessionService } from '../services/session.service';
import { UserDataService } from '../services/user-data.service';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
  standalone: false
})
export class ContactoPage {
  mensaje: string = '';
  fotoBase64: string | null = null;

  constructor(
    private alertCtrl: AlertController,
    private alertController: AlertController,
    private sessionService: SessionService,
    private userDataService: UserDataService,
    private router: Router,
    private navCtrl: NavController,
  ) { }

// ********* METODOS **************** //
  async tomarFoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 80,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
      });
      this.fotoBase64 = image.base64String!;
      const alert = await this.alertCtrl.create({
        header: 'Foto capturada',
        message: 'Imagen añadida al mensaje correctamente.',
        buttons: ['OK']
      });
      await alert.present();
    } catch (error) {
      console.error('Error al capturar foto', error);
    }
  }

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