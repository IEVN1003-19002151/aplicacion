import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../services/carrito.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class DetalleProductoComponent implements OnInit {
  producto: any;
  loading = true;
  cantidad = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService,
    private carritoService: CarritoService,
    private location: Location
  ) {}

  ngOnInit() {
    this.producto = this.productoService.getProductoSeleccionado();
    
    if (!this.producto) {
      this.route.params.subscribe(params => {
        const id = params['id'];
        this.productoService.getProductoPorId(id).subscribe({
          next: (producto) => {
            this.producto = producto;
            this.loading = false;
          },
          error: (error) => {
            console.error('Error al cargar el producto:', error);
            this.loading = false;
          }
        });
      });
    } else {
      this.loading = false;
    }
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
    if (this.producto) {
      this.carritoService.agregarItem({
        id: this.producto.id,
        nombre: this.producto.nombre,
        precio: this.producto.precio,
        tipo: 'producto',
        imagenUrl: this.producto.imagenUrl,
        cantidad: this.cantidad
      });
      
      this.router.navigate(['/carrito']);
    }
  }
}
