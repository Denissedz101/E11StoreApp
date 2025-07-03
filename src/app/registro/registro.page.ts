import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { UserDataService } from '../services/user-data.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: false
})
export class RegistroPage implements OnInit {
  registroForm!: FormGroup;

  @ViewChild('formContainer') formContainer!: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private userDataService: UserDataService,
    private alertCtrl: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.registroForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
      fecha_nacimiento: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      comuna: ['', Validators.required],
      ciudad: ['', Validators.required],
    });
  }

  esMayorDeEdad(fecha: string): boolean {
    const hoy = new Date();
    const nacimiento = new Date(fecha);
    const edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    return edad > 18 || (edad === 18 && mes >= 0);
  }

  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertCtrl.create({
      header: 'Atención',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  async registrar() {
    if (this.registroForm.valid) {
      const usuario = this.registroForm.value;

      if (!this.esMayorDeEdad(usuario.fecha_nacimiento)) {
        this.mostrarAlerta('Debes ser mayor de edad para registrarte.');
        return;
      }

      const datosFinales = {
        id: Date.now(),
        ...usuario,
        nombre: usuario.nombre.toUpperCase(),
        apellidos: usuario.apellidos.toUpperCase(),
        direccion: usuario.direccion.toUpperCase(),
        telefono: usuario.telefono.toUpperCase(),
        comuna: usuario.comuna.toUpperCase(),
        ciudad: usuario.ciudad.toUpperCase(),
        correo: usuario.correo.toLowerCase()
      };

      try {
        await this.userDataService.saveUser(datosFinales);
        const alerta = await this.alertCtrl.create({
          header: '🎉 ¡Felicidades!',
          message: `
            <p>🎮 ¡Te has registrado exitosamente en E11evenStore! 🎮</p>
            <p>Serás redirigido al login...</p>
          `,
          buttons: ['OK']
        });
        await alerta.present();

        setTimeout(() => this.router.navigate(['/login']), 2000);
      } catch (error) {
        console.error('Error al registrar usuario', error);
        this.mostrarAlerta('Error al registrar usuario. Intenta nuevamente.');
      }
    } else {
      this.mostrarAlerta('Completa todos los campos correctamente.');
    }
  }

  volver() {
    this.router.navigateByUrl('/login');
  }

  limpiar() {
    if (!this.formContainer) return;

    this.formContainer.nativeElement.classList.add('animar-limpiar');

    setTimeout(() => {
      this.registroForm.reset();
      this.formContainer.nativeElement.classList.remove('animar-limpiar');
    }, 1000);
  }
}
