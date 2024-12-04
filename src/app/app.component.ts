import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { NotificacionService, Notificacion } from './services/notificacion.service';
import { CarritoService } from './services/carrito.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [NotificacionService, CarritoService]
})
export class AppComponent implements OnInit {
  title = 'App';
  searchTerm: string = '';
  notificacion$: Observable<Notificacion | null>;
  cantidadItems$: Observable<number>;
  loading: boolean = true;
  showSplash: boolean = true;
  showWelcome: boolean = false;
  splashFading = false;
  tiposCafe: string[] = ['Espresso', 'Cappuccino', 'Americano', 'Latte'];
  private lastScrollPosition = 0;
  ocultarNav = false;
  public isDarkMode = false;
  isExiting: boolean = false;
  startTransition: boolean = false;
  showTransitionText: boolean = false;
  isInitialLoad: boolean = true;

  constructor(
    public router: Router,
    private location: Location,
    private notificacionService: NotificacionService,
    private carritoService: CarritoService
  ) {
    this.notificacion$ = this.notificacionService.getNotificacion();
    this.cantidadItems$ = this.carritoService.getCantidadItems();
  }

  ngOnInit() {
    // Esperar a que termine la animación de llenado (5 segundos)
    setTimeout(() => {
      this.showSplash = false;
      this.showWelcome = true;
    }, 5000); // Solo esperamos a que termine el llenado

    // Detectar preferencia del sistema
    this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.actualizarTema();

    // Escuchar cambios en la preferencia del sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      this.isDarkMode = e.matches;
      this.actualizarTema();
    });
  }

  isDetallesRoute(): boolean {
    return this.router.url.includes('/detalle-producto/') || 
           this.router.url.includes('/producto/') ||
           this.router.url.includes('/detalle-promocion/');
  }

  search() {
    console.log('Buscando:', this.searchTerm);
  }

  showBackButton(): boolean {
    return !this.router.url.includes('/home');
  }

  goBack(): void {
    this.location.back();
  }

  navegarAUbicacion() {
    this.router.navigate(['/ubicacion']).catch(error => {
      console.error('Error al navegar a ubicación:', error);
    });
  }

  navegarA(ruta: string): void {
    if (this.router.url === ruta) return;

    this.isInitialLoad = false;

    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }

    this.router.navigate([ruta], { skipLocationChange: false }).then(() => {
      window.scrollTo(0, 0);
    }).catch(error => {
      console.error('Error al navegar:', error);
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const currentScroll = window.pageYOffset;
    this.ocultarNav = currentScroll > this.lastScrollPosition && currentScroll > 50;
    this.lastScrollPosition = currentScroll;
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    this.actualizarTema();
  }

  private actualizarTema() {
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  // Cambio directo al iniciar la app
  startApp() {
    this.isExiting = true;
    
    // Mostramos el texto de transición más rápido
    setTimeout(() => {
      this.showTransitionText = true;
      
      // Reducimos el tiempo de espera a 1 segundo
      setTimeout(() => {
        this.startTransition = true;
        
        // Transición más rápida al home
        setTimeout(() => {
          this.showWelcome = false;
          this.isExiting = false;
          this.startTransition = false;
          this.showTransitionText = false;
        }, 300); // 300ms para la transición final
      }, 1000); // 1 segundo de espera
    }, 300); // 300ms para mostrar el texto
  }
}
