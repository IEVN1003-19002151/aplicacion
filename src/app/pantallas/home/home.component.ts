import { Component, OnInit, OnDestroy } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { CarritoService } from '../../services/carrito.service';
import { NotificacionService } from '../../services/notificacion.service';
import { Producto } from '../../services/producto.model';

interface Categoria {
  nombre: string;
  icono: string;
  cantidad: number;
  ruta: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [CommonModule, CurrencyPipe, RouterModule],
  standalone: true
})
export class HomeComponent implements OnInit, OnDestroy {
  productos: Producto[] = [];
  categoriaSeleccionada: string | null = 'Bebidas';
  private intervalSubscription: Subscription = new Subscription();
  menuAbierto = false;
  productosDestacados: Producto[] = [];
  titleKey = 1;
  rutaActual: string = '';

  categorias: Categoria[] = [
    { 
      nombre: 'Especialidades', 
      icono: 'fas fa-coffee',
      cantidad: 0,
      ruta: '/especialidades'
    },
    { 
      nombre: 'Café Frío', 
      icono: 'fas fa-glass-whiskey',
      cantidad: 0,
      ruta: '/bebidas-frias'
    },
    { 
      nombre: 'Postres', 
      icono: 'fas fa-cookie',
      cantidad: 0,
      ruta: '/postres'
    },
    { 
      nombre: 'Bebidas', 
      icono: 'fas fa-mug-hot',
      cantidad: 0,
      ruta: '/bebidas'
    }
  ];

  constructor(
    private router: Router,
    private productoService: ProductoService,
    private carritoService: CarritoService,
    private notificacionService: NotificacionService
  ) {
    // Track current route for button highlighting
    this.rutaActual = this.router.url;
  }

  ngOnInit() {
    this.cargarProductosDestacados();
    this.actualizarContadoresCategorias();
    this.resetTitleAnimation();
  }

  ngOnDestroy() {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }

  cargarProductosDestacados() {
    this.productoService.getProductos().subscribe({
      next: (productos) => {
        const idsDestacados = ['1', '5', '7', '8', '14', '13'];
        this.productosDestacados = productos
          .filter(p => idsDestacados.includes(p.id))
          .sort((a, b) => b.rating - a.rating);
      },
      error: (error) => {
        console.error('Error al cargar productos destacados:', error);
        this.notificacionService.mostrarNotificacion('Error al cargar productos', 'error');
      }
    });
  }

  filtrarPorCategoria(categoria: string) {
    this.categoriaSeleccionada = categoria;
    this.productoService.getProductos().subscribe({
      next: (productos) => {
        this.productos = productos.filter(p => p.categoria === categoria);
      },
      error: (error) => {
        console.error('Error al filtrar productos:', error);
        this.notificacionService.mostrarNotificacion('Error al filtrar productos', 'error');
      }
    });
  }

  verDetalleProducto(producto: Producto) {
    this.router.navigate(['/detalle-producto', producto.id]);
  }

  agregarAlCarrito(producto: Producto) {
    this.carritoService.agregarItem({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      tipo: 'producto',
      imagenUrl: producto.imagenUrl,
      cantidad: 1
    });
    this.notificacionService.mostrarNotificacion('Producto agregado al carrito', 'success');
  }

  verDetalle(producto: any) {
    const productoCompleto = {
      ...producto,
      rating: 4.5,
      categoria: 'Bebidas',
      descripcion: producto.descripcion || 'Delicioso producto de nuestra cafetería'
    };
    this.productoService.setProductoSeleccionado(productoCompleto);
    this.router.navigate(['/producto', productoCompleto.id]);
  }

  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
  }

  seleccionarCategoria(categoria: string) {
    this.categoriaSeleccionada = this.categoriaSeleccionada === categoria ? null : categoria;
  }

  actualizarContadoresCategorias() {
    this.productoService.getProductos().subscribe({
      next: (productos) => {
        this.categorias.forEach(categoria => {
          categoria.cantidad = productos.filter(p => p.categoria === categoria.nombre).length;
        });
      },
      error: (error) => {
        console.error('Error al actualizar contadores:', error);
      }
    });
  }

  resetTitleAnimation() {
    this.titleKey = 0;
    setTimeout(() => {
      this.titleKey = 1;
    }, 100);
  }

}
