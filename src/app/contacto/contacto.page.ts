import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { SessionService } from '../services/session.service';
import { UserDataService } from '../services/user-data.service';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';


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


  async tomarFoto() {
  const platform = Capacitor.getPlatform();

  try {
    const image = await Camera.getPhoto({
      quality: 80,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: platform === 'web' ? CameraSource.Photos : CameraSource.Camera,  // Web --> galería
    });

    const base64 = image.base64String!;
    const imageSizeKB = (base64.length * 0.75) / 1024;

    if (imageSizeKB > 200) {
      const alert = await this.alertCtrl.create({
        header: 'Imagen demasiado grande',
        message: `La imagen supera el límite de 200 KB (${Math.round(imageSizeKB)} KB). Intenta con otra.`,
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    this.fotoBase64 = base64;

    const alert = await this.alertCtrl.create({
      header: 'Imagen seleccionada',
      message: 'La imagen fue añadida correctamente.',
      buttons: ['OK']
    });
    await alert.present();
    console.log('📷 Imagen añadida desde ' + (platform === 'web' ? 'galería' : 'cámara'));

  } catch (error) {
    console.error('❌ Error al obtener imagen:', error);

    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: 'No se pudo acceder a la cámara o seleccionar imagen.',
      buttons: ['OK']
    });
    await alert.present();
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
  this.fotoBase64 = null; //Limpiar imagen

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