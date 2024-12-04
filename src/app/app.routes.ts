import { Routes } from '@angular/router';
import { DetalleProductoComponent } from './pantallas/detalle-producto/detalle-producto.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./pantallas/home/home.component').then(m => m.HomeComponent) },
  { path: 'productos', loadComponent: () => import('./pantallas/productos/productos.component').then(m => m.ProductosComponent) },
  { path: 'promociones', loadComponent: () => import('./pantallas/promociones/promociones.component').then(m => m.PromocionesComponent) },
  { path: 'promocion/:id', loadComponent: () => import('./pantallas/detalle-promocion/detalle-promocion.component').then(m => m.DetallePromocionComponent) },
  { path: 'ubicacion', loadComponent: () => import('./pantallas/ubicacion/ubicacion.component').then(m => m.UbicacionComponent) },
  { path: 'carrito', loadComponent: () => import('./pantallas/carrito/carrito.component').then(m => m.CarritoComponent) },
  { path: 'detalle-producto/:id', loadComponent: () => import('./pantallas/detalle-producto/detalle-producto.component').then(m => m.DetalleProductoComponent) },
  { path: '**', redirectTo: '/home' }
];
