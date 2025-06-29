import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';


@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.page.html',
  styleUrls: ['./mi-perfil.page.scss'],
  standalone: false
})
export class MiPerfilPage implements OnInit {

  usuario: any = {};
  editando: boolean = false;

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private router: Router,
    private sessionService: SessionService
  ) {}

  async ngOnInit() {
    this.usuario = await this.sessionService.getActiveUser();
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

  editar() {
    this.editando = true;
  }

    async guardarCambios() {
      const camposObligatorios = ['nombre', 'apellidos', 'correo', 'telefono', 'direccion'];
      const camposFaltantes = camposObligatorios.filter(campo => !this.usuario[campo]?.trim());

      if (camposFaltantes.length > 0) {
        const mensaje = `Completa los siguientes campos: ${camposFaltantes.join(', ')}`;
        const alert = await this.alertController.create({
          header: 'Campos obligatorios',
          message: mensaje,
          buttons: ['OK'],
        });
        await alert.present();
        return;
      }

      await this.sessionService.setActiveUser(this.usuario);
      this.editando = false;

      const toast = await this.toastController.create({
        message: 'Datos actualizados correctamente.',
        duration: 2000,
        color: 'success',
      });
      await toast.present();
    }


  cancelarEdicion() {
    this.ngOnInit(); // vuelve a cargar los datos originales
    this.editando = false;
  }
}



