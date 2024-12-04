import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PromocionService } from '../../services/promocion.service';
import { CarritoService } from '../../services/carrito.service';
import { NotificacionService } from '../../services/notificacion.service';
import { Promocion } from '../../services/promocion.model';

@Component({
  selector: 'app-promociones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './promociones.component.html'
})
export class PromocionesComponent implements OnInit {
  promociones: Promocion[] = [];

  constructor(
    private router: Router,
    private promocionService: PromocionService,
    private carritoService: CarritoService,
    private notificacionService: NotificacionService
  ) {}

  ngOnInit() {
    this.promocionService.getPromociones().subscribe(
      promociones => {
        this.promociones = promociones;
      }
    );
  }

  verDetalle(promocionId: string) {
    this.router.navigate(['/promocion', promocionId]);
  }

  agregarAlCarrito(promocion: Promocion, event: Event) {
    event.stopPropagation();
    event.preventDefault();
    
    this.carritoService.agregarItem({
      id: promocion.promocionId,
      nombre: promocion.nombre,
      precio: promocion.precioPromocional,
      tipo: 'promocion',
      imagenUrl: promocion.imagenUrl,
      cantidad: 1
    });
    
    this.notificacionService.mostrarNotificacion(
      `${promocion.nombre} agregado al carrito`,
      'success'
    );
  }
}
