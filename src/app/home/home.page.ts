import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { SessionService } from '../services/session.service';
import { UserDataService } from '../services/user-data.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  usuarioActivo: any = null;
  saludo: string = '';
  cantidadCarrito: number = 0;
  loading: boolean = true;

  juegos = [
    {
      juego_id: 'codbo6_ps4',
      titulo: 'Call of Duty: Black Ops 6 PS4 Digital',
      imagen:
        'https://cjmdigitales.cl/wp-content/uploads/2024/08/Call-of-Duty-Black-Ops-6-Digital-PS4-700x881.png',
      descripcion: 'Thriller de acción y espionaje en los 90',
      precio: 18990,
    },
    {
      juego_id: 'tlou2_remastered',
      titulo: 'The Last of Us Part II Remastered',
      imagen:
        'https://cjmdigitales.cl/wp-content/uploads/2024/01/The-Last-of-Us-Part-II-Remastered-PS5-scaled-700x900.jpg',
      descripcion: 'Edición definitiva con mejoras técnicas',
      precio: 28990,
    },
  ];

  noticias: any[] = [];

  constructor(
    private alertController: AlertController,
    private sessionService: SessionService,
    private userDataService: UserDataService,
    private router: Router,
    private navCtrl: NavController,
    private http: HttpClient
  ) {}

  async ngOnInit() {
  console.log('🏠 HomePage cargada correctamente');

  this.usuarioActivo = await this.sessionService.getActiveUser();
  console.log('🧾 Usuario leído desde sesión:', this.usuarioActivo);  // Verifica que tenga 'id'

  if (!this.usuarioActivo || !this.usuarioActivo.id) {
    console.warn('🚫 No hay sesión activa, redirigiendo al login...');
    this.router.navigate(['/login']);
    return;
  }

  const nombre =
    this.usuarioActivo.nombre ||
    this.usuarioActivo.username ||
    this.usuarioActivo.correo;
  this.saludo = `Hola, ${nombre} 👋`;
  console.log('🔐 Sesión iniciada como:', nombre);

  await this.contarCarrito(); // Agrega el carrito después de cargar el usuario
  this.cargarNoticias();
}


  // ============== MÉTODOS ================== //

  async verDescripcion(juego: any) {
    const alert = await this.alertController.create({
      header: juego.titulo,
      message: juego.descripcion,
      buttons: ['Cerrar'],
    });
    await alert.present();
  }

  //simulamos compra en app
 async agregarAlCarrito(juego: any) {
  if (!this.usuarioActivo || !this.usuarioActivo.id) return;

  try {
    await this.userDataService.addToCart(this.usuarioActivo.id.toString(), juego);
    this.cantidadCarrito++;
    const alert = await this.alertController.create({
      header: 'Carrito',
      message: `Juego <strong>${juego.titulo}</strong> agregado.`,
      buttons: ['OK'],
    });
    await alert.present();
  } catch (error) {
    console.error('Error al agregar al carrito:', error);
  }
}

async contarCarrito() {
  try {
    if (!this.usuarioActivo || !this.usuarioActivo.id) {
      console.warn('Usuario no definido al contar el carrito');
      return;
    }

    const carrito = await this.userDataService.getCart(this.usuarioActivo.id.toString());
    this.cantidadCarrito = carrito.length;
  } catch (error) {
    console.error('Error al contar el carrito:', error);
  }
}


irAlCarrito() {
  this.router.navigate(['/mis-compras'], { replaceUrl: true });//actualizamos contador al pasar
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

    cargarNoticias() {
    const url = 'https://newsdata.io/api/1/latest?apikey=pub_4324a24eb98a4bf2baa78a3bd0cf5c28&q=esport';

    this.http.get(url).subscribe({
      next: (res: any) => {
        console.log('📰 Noticias recibidas:', res);
        if (res.results?.length > 0) {
          this.noticias = res.results.slice(0, 4);
        } else {
          this.noticias = [];
          console.warn('⚠️ No se encontraron noticias de esports.');
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Error al obtener noticias:', err);
        this.loading = false;
      }
    });
  }


    abrirNoticia(url: string) {
      window.open(url, '_system'); // navegador del sistema
    }
  
  private extraerResumen(texto: string, cantidadPalabras: number): string {
      const palabras = texto.split(/\s+/).slice(0, cantidadPalabras);
      return palabras.join(' ') + (palabras.length === cantidadPalabras ? '...' : '');
    }
    
}
