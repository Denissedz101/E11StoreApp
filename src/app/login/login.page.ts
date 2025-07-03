import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { SessionService } from '../services/session.service';
import { UserDataService } from '../services/user-data.service';
import { AuthService } from '../services/auth.service';

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
    private authService: AuthService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
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
    this.router.navigateByUrl('/registro');
  }

  async onLogin() {
  if (!this.loginForm.valid) {
    this.mostrarAlerta('Por favor completa todos los campos correctamente.');
    return;
  }

  const loading = await this.loadingCtrl.create({
    message: 'Verificando...',
    spinner: 'circles'
  });
  await loading.present();

  const { correo, contrasena } = this.loginForm.value;

  try {
    const user = await this.authService.login(correo, contrasena);
    await loading.dismiss();

    if (user && user.id) {
      await this.sessionService.setActiveUser(user);
      console.log('✅ Sesión iniciada:', user);
      this.router.navigate(['/home']);
    } else {
      this.mostrarAlerta('Credenciales incorrectas ❌');
    }
  } catch (error) {
    await loading.dismiss();
    console.error('❌ Error en login:', error);
    this.mostrarAlerta('Ocurrió un error. Intenta nuevamente más tarde.');
  }
}



}
