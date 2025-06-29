import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { SqliteService } from '../services/sqlite-db.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private sqliteService: SqliteService, 
    private storageService: StorageService,
    public router: Router,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
    });
  }

  // Mostrar alerta
  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertCtrl.create({
      header: 'Atención',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  // Método para redirigir al formulario de registro
  goToRegistro() {
  if (this.router.url !== '/registro') {
    this.router.navigateByUrl('/registro');

  }
}


  // Iniciar sesión
  async onLogin() {
    if (this.loginForm.valid) {
      const { correo, contrasena } = this.loginForm.value;

      // 🔐 Esperar a que la base de datos esté lista
      const dbEstaLista = await this.sqliteService.dbReady.toPromise();
      if (!dbEstaLista) {
        await this.mostrarAlerta('La base de datos aún no está lista. Intenta en unos segundos.');
        return;
      }

      try {
        const user = await this.sqliteService.getUserByCredentials(correo, contrasena);

        if (user) {
          await this.storageService.setItem('usuarioActivo', user);
          console.log('✅ Inicio de sesión exitoso:', user);
          this.router.navigate(['/home']);
        } else {
          this.mostrarAlerta('Credenciales incorrectas ❌');
        }

      } catch (error) {
        console.error('❌ Error al intentar iniciar sesión:', error);
        this.mostrarAlerta('Ocurrió un error al iniciar sesión. Intenta nuevamente.');
      }
    } else {
      this.mostrarAlerta('Completa todos los campos requeridos.');
    }
  }

}
