import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';//consumo de api noticias

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  usuarioActivo: any = null;
  saludo: string = '';

  juegos = [
    {
      titulo: 'Call of Duty: Black Ops 6 PS4 Digital',
      imagen: 'https://cjmdigitales.cl/wp-content/uploads/2024/08/Call-of-Duty-Black-Ops-6-Digital-PS4-700x881.png',
      descripcion: 'Thriller de acción y espionaje en los 90',
      precio: 18990
    },
    {
      titulo: 'The Last of Us Part II Remastered',
      imagen: 'https://cjmdigitales.cl/wp-content/uploads/2024/01/The-Last-of-Us-Part-II-Remastered-PS5-scaled-700x900.jpg',
      descripcion: 'Edición definitiva con mejoras técnicas',
      precio: 28990
    }
  ];

    noticias: any[] = [];

  constructor(
    private alertController: AlertController,
    private storageService: StorageService,
    private router: Router,
    private http: HttpClient
  ) { }

  async ngOnInit() {
    console.log('🏠 HomePage cargada correctamente');

    this.usuarioActivo = await this.storageService.getItem('usuarioActivo');
    console.log('🧾 Usuario leído desde Storage:', this.usuarioActivo);


    if (!this.usuarioActivo) {
      console.warn('🚫 No hay sesión activa, redirigiendo al login...');
      this.router.navigate(['/login']);
      return;
    }

    const nombre = this.usuarioActivo.nombre || this.usuarioActivo.username || this.usuarioActivo.correo;
    this.saludo = `Hola, ${nombre} 👋`;
    console.log('🔐 Sesión iniciada como:', nombre);

    this.cargarNoticias();
  }

  // ============== METODOS ================== //
  
  async verDescripcion(juego: any) {
    const alert = await this.alertController.create({
      header: juego.titulo,
      message: juego.descripcion,
      buttons: ['Cerrar']
    });
    await alert.present();
  }

  async agregarAlCarrito(juego: any) {
    // Simulación de agregado
    const alert = await this.alertController.create({
      header: 'Carrito',
      message: `El juego <strong>${juego.titulo}</strong> fue agregado al carrito.`,
      buttons: ['OK']
    });
    await alert.present();
  }

    async cerrarSesion() {
        const alert = await this.alertController.create({
          header: 'Cerrar sesión',
          message: '¿Estás segura/o de que quieres cerrar sesión?',
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel'
            },
            {
              text: 'Cerrar',
              handler: async () => {
                await this.storageService.removeItem('usuarioActivo');
                this.router.navigate(['/login']);
              }
            }
          ]
        });

        await alert.present();
    }
  
      cargarNoticias() {
      const apiKey = 'pub_4324a24eb98a4bf2baa78a3bd0cf5c28';
      const url = `https://newsdata.io/api/1/latest?apikey=${apiKey}&q=videogames&language=es`;

      this.http.get<any>(url).subscribe({
        next: (data) => {
          console.log('📰 Datos crudos:', data);
          const resultados = data.results || [];
          console.log('🔍 Resultados raw:', resultados);
          this.noticias = resultados.slice(0, 4).map((item: any) => ({
            title: item.title,
            body: item.description || item.content || 'Sin contenido'
          }));
          console.log('✅ Noticias cargadas:', this.noticias);
        },
        error: (error) => {
          console.error('❌ Error al cargar noticias:', error);
          this.noticias = [];
        }
      });
    }

}
