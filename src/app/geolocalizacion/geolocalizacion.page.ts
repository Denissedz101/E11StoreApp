import { Component, AfterViewInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-geolocalizacion',
  templateUrl: './geolocalizacion.page.html',
  styleUrls: ['./geolocalizacion.page.scss'],
  standalone: false
})
export class GeolocalizacionPage implements AfterViewInit {
  mapaUrl: string = '';

  async ngAfterViewInit() {
    const coordinates = await Geolocation.getCurrentPosition();
    const lat = coordinates.coords.latitude;
    const lon = coordinates.coords.longitude;

    const tiendas = [
      { nombre: 'Tienda Centro', lat: lat + 0.05, lon: lon + 0.01 },
      { nombre: 'Tienda Norte', lat: lat + 0.1, lon: lon },
      { nombre: 'Tienda Sur', lat: lat - 0.1, lon: lon },
      { nombre: 'Tienda Oriente', lat: lat, lon: lon + 0.1 },
    ];

    const markers = tiendas.map(t =>
      `&markers=color:red%7Clabel:${t.nombre.charAt(0)}%7C${t.lat},${t.lon}`
    ).join('');

    this.mapaUrl = `https://maps.google.com/maps?q=${lat},${lon}&z=12&output=embed${markers}`;
  }
}
