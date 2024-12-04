import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PromocionService } from '../../services/promocion.service';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../services/carrito.service';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detalle-promocion',
  templateUrl: './detalle-promocion.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class DetallePromocionComponent implements OnInit, OnDestroy {
  promocion: any;
  loading = true;
  cantidad = 1;
  private subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private promocionService: PromocionService,
    private carritoService: CarritoService,
    private location: Location
  ) {}

  ngOnInit() {
    this.loading = true;

    // Cargar la promoción seleccionada
    const sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.promocionService.getPromocionPorId(id).subscribe({
          next: (promocionCargada) => {
            this.promocion = promocionCargada;
            this.loading = false;
            console.log('Promoción cargada:', promocionCargada); // Para debug
          },
          error: (error) => {
            console.error('Error al cargar la promoción:', error);
            this.loading = false;
            this.router.navigate(['/']);
          }
        });
      }
    });

    this.subscriptions.push(sub);
  }

  ngOnDestroy() {
    // Limpiar suscripciones al destruir el componente
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  volver() {
    this.location.back();
  }

  cambiarCantidad(delta: number) {
    const nuevaCantidad = this.cantidad + delta;
    if (nuevaCantidad >= 1) {
      this.cantidad = nuevaCantidad;
    }
  }

  agregarAlCarrito() {
    if (this.promocion) {
      console.log('Agregando al carrito:', this.promocion); // Para debug
      this.carritoService.agregarItem({
        id: this.promocion.promocionId,
        nombre: this.promocion.nombre,
        precio: this.promocion.precioPromocional,
        tipo: 'promocion',
        imagenUrl: this.promocion.imagenUrl,
        cantidad: this.cantidad
      });
      
      console.log('Item agregado al carrito'); // Para confirmar que se agregó
      this.router.navigate(['/carrito']);
    } else {
      console.error('No hay promoción seleccionada para agregar al carrito'); // Mensaje de error
    }
  }

  calcularDescuento(precioOriginal: number, precioPromocional: number): number {
    if (precioOriginal > 0) {
        return Math.round(((precioOriginal - precioPromocional) / precioOriginal) * 100);
    }
    return 0;
  }
}
