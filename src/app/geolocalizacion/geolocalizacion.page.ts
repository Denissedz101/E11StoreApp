import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { TopMenuModule } from '../components/top-menu/top-menu.module';

@Component({
  selector: 'app-geolocalizacion',
  templateUrl: './geolocalizacion.page.html',
  styleUrls: ['./geolocalizacion.page.scss'],
  standalone: false
})
export class GeolocalizacionPage implements OnInit {
  tiendas = [
    { nombre: 'Tienda Centro', direccion: 'Av. Independencia 565', lat: -33.415, lon: -70.641 },
    { nombre: 'Tienda La Reina', direccion: 'Av. Larraín 5862', lat: -33.451, lon: -70.548 },
    { nombre: 'Tienda Providencia', direccion: 'Av. Andrés Bello 2425', lat: -33.417, lon: -70.605 },
    { nombre: 'Tienda Las Condes', direccion: 'Av. Pdte. Kennedy 5413', lat: -33.396, lon: -70.567 },
    { nombre: 'Tienda La Florida', direccion: 'Av. Vicuña Mackenna 6100', lat: -33.522, lon: -70.609 },
    { nombre: 'Tienda Maipú', direccion: 'Av. Américo Vespucio 399', lat: -33.516, lon: -70.765 },
    { nombre: 'Tienda Cerrillos', direccion: 'Av. Américo Vespucio 1501', lat: -33.489, lon: -70.716 },
  ];

  latitud!: number;
  longitud!: number;

  constructor(
      private sessionService: SessionService,
    private router: Router,
      private alertController: AlertController,
 
    ) {}

  ngOnInit() {
    this.obtenerUbicacion();
  }

  async obtenerUbicacion() {
    try {
      const position = await Geolocation.getCurrentPosition();
      this.latitud = position.coords.latitude;
      this.longitud = position.coords.longitude;
      console.log('Ubicación actual:', this.latitud, this.longitud);
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
    }
  }

  abrirEnGoogleMaps(lat: number, lon: number) {
    const url = `https://www.google.com/maps/dir/?api=1&origin=${this.latitud},${this.longitud}&destination=${lat},${lon}&travelmode=driving`;
    window.open(url, '_blank');
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
