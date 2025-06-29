import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { SqliteService } from '../services/sqlite-db.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: false
})
  
export class RegistroPage implements OnInit {
  registroForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private sqliteService: SqliteService, 
    public router: Router,
    private storageService: StorageService
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

  // Limpiar los campos del formulario
  limpiar() {
    this.registroForm.reset();
  }

  // Registrar el usuario y guardar los datos en localStorage
  async registrar() {
    if (this.registroForm.valid) {
      const usuario = this.registroForm.value;

      // Guardar el usuario en localStorage
      await this.storageService.setItem('usuarioActivo', usuario);
	    console.log('Usuario guardado en LocalStorage ☑️', usuario);

      // Guardar el usuario en SQLite (base de datos)
      await this.sqliteService.saveUser(usuario);
	    console.log('Usuario guardado ✅');

      // Redirigir al login
      this.navCtrl.navigateRoot(['/login']);
    }
  }
}