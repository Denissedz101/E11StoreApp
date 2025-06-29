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
      contrasena: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      comuna: ['', Validators.required],
      ciudad: ['', Validators.required],
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

  async registrar() {
    if (this.registroForm.valid) {
      const usuario = this.registroForm.value;

      try {
        await this.userDataService.saveUser(usuario);
        this.mostrarAlerta('Usuario registrado con éxito!');
        this.router.navigate(['/login']);
      } catch (error) {
        console.error('Error al registrar usuario', error);
        this.mostrarAlerta('Error al registrar usuario. Intenta nuevamente.');
      }
    } else {
      this.mostrarAlerta('Completa todos los campos.');
    }
  }

  volver() {
  this.router.navigateByUrl('/login');
  }
  
  limpiar() {
    if (!this.formContainer) return;

    // Agrega clase para activar la animación
    this.formContainer.nativeElement.classList.add('animar-limpiar');

    // Al terminar la animación, limpia el formulario
    setTimeout(() => {
      this.registroForm.reset();
      this.formContainer.nativeElement.classList.remove('animar-limpiar');
    }, 1000); // duración 1 segundo
  }

}
