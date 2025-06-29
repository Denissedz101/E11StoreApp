import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { SessionService } from '../services/session.service';
import { UserDataService } from '../services/user-data.service';

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
    private userDataService: UserDataService,
    private sessionService: SessionService,
    public router: Router,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
    });
  }

  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertCtrl.create({
      header: 'Atención',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  goToRegistro() {
    if (this.router.url !== '/registro') {
      this.router.navigateByUrl('/registro');
    }
  }

  async onLogin() {
    if (this.loginForm.valid) {
      const { correo, contrasena } = this.loginForm.value;

      try {
        const user = await this.userDataService.getUserByCredentials(correo, contrasena);

        if (user) {
          await this.sessionService.setActiveUser(user);
          console.log('✅ Inicio de sesión exitoso:', user);
          this.router.navigate(['/home']);
        } else {
          this.mostrarAlerta('Credenciales incorrectas ❌');
        }
      } catch (error) {
        console.error('❌ Error al iniciar sesión:', error);
        this.mostrarAlerta('Ocurrió un error al iniciar sesión. Intenta nuevamente.');
      }
    } else {
      this.mostrarAlerta('Completa todos los campos requeridos.');
    }
  }
}
