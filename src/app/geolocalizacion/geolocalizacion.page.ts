import { Component, AfterViewInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import * as L from 'leaflet';

@Component({
  selector: 'app-geolocalizacion',
  templateUrl: './geolocalizacion.page.html',
  styleUrls: ['./geolocalizacion.page.scss'],
  standalone: false
})
export class GeolocalizacionPage implements AfterViewInit {

  private map!: L.Map;

  async ngAfterViewInit() {
    const coordinates = await Geolocation.getCurrentPosition();
    const lat = coordinates.coords.latitude;
    const lon = coordinates.coords.longitude;

    // Crear el mapa centrado en tu ubicación
    this.map = L.map('map', {
      center: [lat, lon],
      zoom: 13,
      zoomControl: true,
    });

    // Cargar los tiles de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Redibuja el mapa si no se muestra bien
    setTimeout(() => {
      this.map.invalidateSize();
    }, 200);

    // Tu icono personalizado
    const iconoLogo = L.icon({
      iconUrl: 'assets/logo-tiendaRLL.png',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40]
    });

    // Marcador actual
    L.marker([lat, lon])
      .addTo(this.map)
      .bindPopup('Tu ubicación actual')
      .openPopup();

    // Tiendas con marcadores
    const tiendas = [
      { nombre: 'Tienda Centro', direccion: 'Av. Independencia 565', lat: -33.415, lon: -70.641 },
      { nombre: 'Tienda La Reina', direccion: 'Av. Larraín 5862', lat: -33.451, lon: -70.548 },
      { nombre: 'Tienda Providencia', direccion: 'Av. Andrés Bello 2425', lat: -33.417, lon: -70.605 },
      { nombre: 'Tienda Las Condes', direccion: 'Av. Pdte. Kennedy 5413', lat: -33.396, lon: -70.567 },
      { nombre: 'Tienda La Florida', direccion: 'Av. Vicuña Mackenna 6100', lat: -33.522, lon: -70.609 },
      { nombre: 'Tienda Maipú', direccion: 'Av. Américo Vespucio 399', lat: -33.516, lon: -70.765 },
      { nombre: 'Tienda Cerrillos', direccion: 'Av. Américo Vespucio 1501', lat: -33.489, lon: -70.716 },
    ];

    tiendas.forEach(t => {
      L.marker([t.lat, t.lon], { icon: iconoLogo })
        .addTo(this.map)
        .bindPopup(`<strong>${t.nombre}</strong><br>${t.direccion}`);
    });
  }
}
