import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ItemCarrito {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
  tipo: 'producto' | 'promocion';
  imagenUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private items = new BehaviorSubject<ItemCarrito[]>([]);

  constructor() {
    // Recuperar carrito del localStorage si existe
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      try {
        const items = JSON.parse(carritoGuardado);
        // Verificar que cada item tenga una URL de imagen
        const itemsValidos = items.filter((item: ItemCarrito) => item.imagenUrl);
        this.items.next(itemsValidos);
      } catch (error) {
        console.error('Error al cargar el carrito:', error);
        this.items.next([]);
      }
    }
  }

  agregarItem(item: ItemCarrito): void {
    if (!item.imagenUrl) {
      console.error('Intentando agregar item sin imagen:', item);
      return;
    }

    // Asegúrate de que el precio y la cantidad sean números
    if (typeof item.precio !== 'number' || typeof item.cantidad !== 'number') {
      console.error('Precio o cantidad no válidos:', item);
      return;
    }

    const itemsActuales = this.items.getValue();
    const itemExistente = itemsActuales.find(
      i => i.id === item.id && i.tipo === item.tipo
    );

    if (itemExistente) {
      // Si el item ya existe, incrementar cantidad
      itemExistente.cantidad += item.cantidad;
      this.items.next([...itemsActuales]);
    } else {
      // Si es nuevo, agregarlo con la cantidad especificada
      this.items.next([...itemsActuales, { 
        ...item, 
        cantidad: item.cantidad
      }]);
    }
    
    this.guardarEnLocalStorage();
  }

  getItems(): Observable<ItemCarrito[]> {
    return this.items.asObservable();
  }

  getCantidadItems(): Observable<number> {
    return this.items.pipe(
      map(items => items.reduce((total, item) => total + item.cantidad, 0))
    );
  }

  getTotal(): Observable<number> {
    return this.items.pipe(
      map(items => items.reduce((total, item) => {
        if (typeof item.precio === 'number' && typeof item.cantidad === 'number') {
          return total + (item.precio * item.cantidad);
        }
        return total; // Asegúrate de manejar casos donde el precio o cantidad no sean válidos
      }, 0))
    );
  }

  actualizarCantidad(id: string, tipo: 'producto' | 'promocion', cantidad: number): void {
    const items = this.items.getValue();
    const index = items.findIndex(item => item.id === id && item.tipo === tipo);
    
    if (index !== -1) {
      items[index].cantidad = cantidad;
      this.items.next([...items]);
      this.guardarEnLocalStorage();
    }
  }

  eliminarItem(id: string, tipo: 'producto' | 'promocion'): void {
    const items = this.items.getValue().filter(
      item => !(item.id === id && item.tipo === tipo)
    );
    this.items.next(items);
    this.guardarEnLocalStorage();
  }

  limpiarCarrito(): void {
    this.items.next([]);
    localStorage.removeItem('carrito');
  }

  private guardarEnLocalStorage(): void {
    const itemsParaGuardar = this.items.getValue().map(item => ({
      ...item,
      imagenUrl: item.imagenUrl || '' // Asegurar que siempre haya una URL
    }));
    localStorage.setItem('carrito', JSON.stringify(itemsParaGuardar));
  }
} 