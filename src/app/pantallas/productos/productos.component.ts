import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { CarritoService } from '../../services/carrito.service';
import { NotificacionService } from '../../services/notificacion.service';
import { Location } from '@angular/common';

interface Producto {
  id: string;
  nombre: string;
  categoria: string;
  precio: number;
  imagenUrl: string;
  rating: number;
  descripcion: string;
}

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './productos.component.html'
})
export class ProductosComponent {
  productos: Producto[] = [];

  constructor(
    private router: Router, 
    private productoService: ProductoService,
    private carritoService: CarritoService,
    private notificacionService: NotificacionService,
    private location: Location
  ) {}

  ngOnInit() {
    this.productoService.getProductos().subscribe(productos => {
      this.productos = productos;
    });
  }

  verDetalleProducto(producto: Producto, event: Event) {
    event.stopPropagation();
    this.router.navigate(['/detalle-producto', producto.id]);
  }

  agregarAlCarrito(producto: Producto, event: Event) {
    event.stopPropagation();
    event.preventDefault();
    
    this.carritoService.agregarItem({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      tipo: 'producto',
      imagenUrl: producto.imagenUrl,
      cantidad: 1
    });
    
    this.notificacionService.mostrarNotificacion(
      `${producto.nombre} agregado al carrito`,
      'success'
    );
  }

  handleImageError(event: any) {
    event.target.src = 'https://via.placeholder.com/400x300?text=Imagen+no+disponible';
  }

  verDetalle(productoId: string) {
    this.router.navigate(['/producto', productoId]);
  }

  volver() {
    this.location.back();
  }
}
