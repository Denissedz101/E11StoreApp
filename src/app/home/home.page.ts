import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { SessionService } from '../services/session.service';
import { UserDataService } from '../services/user-data.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';


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
      juego_id: '0001123445',
      titulo: 'Call of Duty: Black Ops 6 PS4 Digital',
      imagen:
        'https://cjmdigitales.cl/wp-content/uploads/2024/08/Call-of-Duty-Black-Ops-6-Digital-PS4-700x881.png',
      descripcion: 'Call of Duty: Black Ops 6 te sumerge en un thriller de acción y espionaje ambientado en los turbulentos años 90, después de la Guerra Fría. Desarrollado por Treyarch y Raven, este título ofrece una narrativa elaborada y un enfoque lleno de intriga y adrenalina.',
      precio: 18990,
    },
    {
      juego_id: '0001188736',
      titulo: 'The Last of Us Part II Remastered',
      imagen:
        'https://cjmdigitales.cl/wp-content/uploads/2024/01/The-Last-of-Us-Part-II-Remastered-PS5-scaled-700x900.jpg',
      descripcion: 'Ciudades abandonadas reclamadas por la naturaleza. Una población diezmada por una plaga moderna. Los supervivientes se matan entre sí para tener comida, armas y todo aquello que pueda caer en sus manos. Joel, un superviviente brutal, y Ellie, una adolescente increíblemente lista para su edad, tendrán que trabajar juntos si desean sobrevivir a su travesía a través de los EE. UU.',
      precio: 28990,
    },
	{
      juego_id: '0004958380',
      titulo: '8-Bit Invaders',
      imagen:
        'https://www.todojuegos.cl/Productos/_mediaProd/28599/8_bist_invaders.png',
      descripcion: '8-Bit Invaders es un juego de estrategia en tiempo real desarrollado y publicado por Petroglyph Games. Es parte de la serie "8-Bit" que se caracteriza por su estilo retro y sus gráficos en píxeles. En "8-Bit Invaders", los jugadores deben construir y administrar su base, recolectar recursos y entrenar unidades para enfrentarse a las fuerzas enemigas. El juego presenta dos facciones: los invasores alienígenas y los humanos. Cada facción tiene sus propias unidades, tecnologías y estrategias de juego.',
      precio: 14990,
    },
	{
      juego_id: '0006928791',
      titulo: '13 Sentinels: Aegis Rim',
      imagen:
        'https://www.todojuegos.cl/Productos/_mediaProd/28593/13_Centinels_usa_ps4.jpg',
      descripcion: 'El juego se desarrolla en un escenario de ciencia ficción y sigue la historia de trece estudiantes de secundaria que se encuentran involucrados en una guerra contra invasores extraterrestres. Los jugadores explorarán una narrativa no lineal que se desarrolla a través de múltiples líneas argumentales entrelazadas.',
      precio: 24990,
    },
	{
      juego_id: '0002129542',
      titulo: 'Ace Attorney Investigations Collection',
      imagen:
        'https://www.todojuegos.cl/Productos/_mediaProd/32681/aceattorps4chico.png',
      descripcion: '¡Experimenta ambos juegos de Ace Attorney Investigations en una gloriosa colección! Ponte en los zapatos de Miles Edgeworth, el fiscal de fiscales de la serie principal de juegos de Ace Attorney. Deja atrás la corte y acompaña a Edgeworth a recorrer la escena del crimen mientras reúne evidencia, pistas, y habla con los involucrados. Usa tu ingenio y lo que descubras para resolver casos intrigantes y difíciles mediante la lógica y la deducción.',
      precio: 26990,
    },
	{
      juego_id: '0004006953 ',
      titulo: 'Alfred Hitchcock - Vertigo',
      imagen:
        'https://www.todojuegos.cl/Productos/_mediaProd/31986/alfredchico.png',
      descripcion: 'El escritor Ed Miller sale ileso del despeñamiento de su coche por el cañón de Brody, en California. No se ha encontrado a nadie entre los restos del automóvil, pese a que Ed asegura que viajaba con su esposa y su hija. Traumatizado por este suceso, Ed comienza a sufrir graves mareos. Mientras comienza una terapia, Ed va a intentar descubrir lo que realmente sucedió aquel trágico día.Prepárate para una inquietante investigación por el interior de la mente humana: Hay veces en que la verdad es peor que la locura.',
      precio: 15990,
    },
	{
      juego_id: '0008372454 ',
      titulo: 'Assassins Creed III Remastered',
      imagen:
        'https://www.todojuegos.cl/Productos/_mediaProd/25139/AC3PS4CH.png',
      descripcion: 'Assassins Creed III Remastered es una versión mejorada y actualizada del aclamado juego de acción y aventuras Assassins Creed III. El juego está ambientado en la época de la Revolución Americana y sigue la historia de Connor Kenway, un asesino mitad nativo americano y mitad británico que lucha por la libertad en medio de la guerra entre templarios y asesinos.',
      precio: 17990,
    },
	{
      juego_id: '0002888745 ',
      titulo: 'Batman: Arkham Collection',
      imagen:
        'https://www.todojuegos.cl/Productos/_mediaProd/28285/batmanps4ch.png',
      descripcion: 'Batman: Arkham Collection es un paquete que incluye tres aclamados juegos de la serie Batman Arkham: Batman: Arkham Asylum, Batman: Arkham City y Batman: Arkham Knight. Desarrollados por Rocksteady Studios, estos juegos te sumergen en el papel del icónico superhéroe Batman y te llevan a luchar contra los villanos más peligrosos de Gotham City.',
      precio: 22990,
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

  this.usuarioActivo = await this.sessionService.getSession();
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
