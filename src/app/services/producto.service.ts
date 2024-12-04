import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Producto } from './producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private productoSeleccionado: any = null;
  private productos: Producto[] = [
    { 
      id: '1', 
      nombre: 'Café Latte', 
      precio: 25.00, 
      imagenUrl: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?auto=format&fit=crop&w=800&h=800&q=80',
      rating: 4.5,
      descripcion: 'Suave y cremoso café con leche perfectamente equilibrado.',
      categoria: 'Bebidas',
      tiempoPreparacion: '10-15 min',
      ingredientes: ['Café espresso', 'Leche vaporizada', 'Espuma de leche'],
      detalles: 'Nuestro Café Latte está preparado con granos selectos y leche fresca local.'
    },
    { 
      id: '2', 
      nombre: 'Muffin de Arándanos', 
      precio: 30.00, 
      imagenUrl: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&w=800&h=800&q=80',
      rating: 4.2,
      descripcion: 'Delicioso muffin casero repleto de arándanos jugosos.',
      categoria: 'Postres',
      tiempoPreparacion: '20-25 min',
      ingredientes: ['Harina', 'Arándanos frescos', 'Azúcar', 'Mantequilla', 'Huevos'],
      detalles: 'Horneado fresco cada mañana con arándanos de temporada.'
    },
    { 
      id: '3', 
      nombre: 'Cheesecake', 
      precio: 40.00, 
      imagenUrl: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&h=800&q=80',
      rating: 4.8,
      descripcion: 'Cremoso cheesecake con una base crujiente de galleta.',
      categoria: 'Postres',
      tiempoPreparacion: '30-35 min',
      ingredientes: ['Queso crema', 'Galletas', 'Azúcar', 'Mantequilla', 'Frutos rojos'],
      detalles: 'Receta tradicional de Nueva York con un toque especial.'
    },
    { 
      id: '4', 
      nombre: 'Wrap de Vegetales', 
      precio: 42.00, 
      imagenUrl: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&h=800&q=80',
      rating: 4.3,
      descripcion: 'Wrap saludable lleno de vegetales frescos y crujientes.',
      categoria: 'Comidas',
      tiempoPreparacion: '15-20 min',
      ingredientes: ['Tortilla integral', 'Lechuga', 'Tomate', 'Aguacate', 'Aderezo especial'],
      detalles: 'Preparado con vegetales orgánicos locales.'
    },
    { 
      id: '5', 
      nombre: 'Capuchino', 
      precio: 38.00, 
      imagenUrl: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&h=800&q=80',
      rating: 4.6,
      descripcion: 'Capuchino aromático con espuma de leche perfecta.',
      categoria: 'Bebidas',
      tiempoPreparacion: '8-10 min',
      ingredientes: ['Café espresso', 'Leche vaporizada', 'Cacao en polvo'],
      detalles: 'Elaborado con granos de café premium tostados artesanalmente.'
    },
    { 
      id: '6', 
      nombre: 'Té Verde', 
      precio: 20.00, 
      imagenUrl: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&w=800&h=800&q=80',
      rating: 4.1,
      descripcion: 'Refrescante té verde con propiedades antioxidantes.',
      categoria: 'Bebidas',
      tiempoPreparacion: '5-7 min',
      ingredientes: ['Hojas de té verde', 'Agua filtrada', 'Miel (opcional)'],
      detalles: 'Té verde orgánico importado directamente de Japón.'
    },
    { 
      id: '7', 
      nombre: 'Mocha Especial', 
      precio: 45.00, 
      imagenUrl: 'https://images.unsplash.com/photo-1579888071069-c107a6f79d82?auto=format&fit=crop&w=800&h=800&q=80',
      rating: 4.7,
      descripcion: 'Deliciosa mezcla de espresso, chocolate belga y leche cremosa.',
      categoria: 'Bebidas',
      tiempoPreparacion: '10-12 min',
      ingredientes: ['Caf espresso', 'Chocolate belga', 'Leche vaporizada', 'Crema batida'],
      detalles: 'Preparado con chocolate belga de primera calidad y café premium.'
    },
    { 
      id: '8', 
      nombre: 'Frappuccino Caramelo', 
      precio: 48.00, 
      imagenUrl: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&h=800&q=80',
      rating: 4.9,
      descripcion: 'Bebida helada con café, caramelo y crema batida.',
      categoria: 'Bebidas',
      tiempoPreparacion: '8-10 min',
      ingredientes: ['Café', 'Caramelo', 'Leche', 'Hielo', 'Crema batida'],
      detalles: 'Refrescante bebida perfecta para días calurosos.'
    },
    { 
      id: '9', 
      nombre: 'Chai Latte Especiado', 
      precio: 35.00, 
      imagenUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&h=800&q=80',
      rating: 4.6,
      descripcion: 'Té chai con leche y mezcla única de especias aromáticas.',
      categoria: 'Bebidas',
      tiempoPreparacion: '7-9 min',
      ingredientes: ['Té negro', 'Especias', 'Leche vaporizada', 'Miel'],
      detalles: 'Mezcla especial de especias importadas de la India.'
    },
    { 
      id: '10', 
      nombre: 'Croissant de Almendras', 
      precio: 32.00, 
      imagenUrl: 'https://images.unsplash.com/photo-1623334044303-241021148842?auto=format&fit=crop&w=800&h=800&q=80',
      rating: 4.8,
      descripcion: 'Croissant horneado con almendras caramelizadas.',
      categoria: 'Postres',
      tiempoPreparacion: '5-7 min',
      ingredientes: ['Masa de hojaldre', 'Almendras', 'Azúcar glass', 'Mantequilla'],
      detalles: 'Horneado fresco cada mañana con mantequilla francesa.'
    },
    { 
      id: '11', 
      nombre: 'Bowl de Açaí', 
      precio: 52.00, 
      imagenUrl: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=800&h=800&q=80',
      rating: 4.5,
      descripcion: 'Bowl refrescante de açaí con frutas frescas y granola.',
      categoria: 'Desayunos',
      tiempoPreparacion: '10-12 min',
      ingredientes: ['Açaí', 'Plátano', 'Fresa', 'Granola', 'Miel'],
      detalles: 'Preparado con açaí orgánico y frutas de temporada.'
    },
    { 
      id: '12', 
      nombre: 'Sandwich Club', 
      precio: 58.00, 
      imagenUrl: 'https://images.unsplash.com/photo-1567234669003-dce7a7a88821?auto=format&fit=crop&w=800&h=800&q=80',
      rating: 4.4,
      descripcion: 'Sandwich triple con pavo, tocino y aguacate.',
      categoria: 'Comidas',
      tiempoPreparacion: '12-15 min',
      ingredientes: ['Pan integral', 'Pavo', 'Tocino', 'Aguacate', 'Lechuga'],
      detalles: 'Pan recién horneado y ingredientes premium.'
    },
    { 
      id: '13', 
      nombre: 'Tarta de Chocolate', 
      precio: 45.00, 
      imagenUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&h=800&q=80',
      rating: 4.9,
      descripcion: 'Tarta de chocolate belga con ganache.',
      categoria: 'Postres',
      tiempoPreparacion: '5-7 min',
      ingredientes: ['Chocolate belga', 'Crema', 'Cacao en polvo', 'Frambuesas'],
      detalles: 'Receta exclusiva con chocolate belga 70% cacao.'
    },
    { 
      id: '14', 
      nombre: 'Brownie de Chocolate', 
      precio: 42.00, 
      imagenUrl: 'https://images.pexels.com/photos/3026804/pexels-photo-3026804.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.3,
      descripcion: 'Delicioso brownie de chocolate negro, húmedo por dentro y crujiente por fuera.',
      categoria: 'Postres',
      tiempoPreparacion: '5-7 min',
      ingredientes: ['Chocolate negro 70%', 'Mantequilla', 'Huevos', 'Nueces', 'Cacao en polvo'],
      detalles: 'Horneado diariamente con chocolate premium y nueces seleccionadas.'
    },
    { 
      id: '15', 
      nombre: 'Ensalada César', 
      precio: 48.00, 
      imagenUrl: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=800&h=800&q=80',
      rating: 4.4,
      descripcion: 'Ensalada fresca con pollo a la parrilla y aderezo césar.',
      categoria: 'Comidas',
      tiempoPreparacion: '10-12 min',
      ingredientes: ['Lechuga romana', 'Pollo', 'Crutones', 'Queso parmesano'],
      detalles: 'Aderezo césar preparado en casa.'
    }
  ];

  setProductoSeleccionado(producto: any) {
    this.productoSeleccionado = producto;
  }

  getProductoSeleccionado() {
    return this.productoSeleccionado;
  }

  getProductoPorId(id: string): Observable<Producto | undefined> {
    const producto = this.productos.find(p => p.id === id);
    if (!producto) {
      return of(this.productoSeleccionado);
    }
    return of(producto);
  }

  getProductos(): Observable<Producto[]> {
    return of(this.productos);
  }

  agregarProducto(producto: Producto): Promise<Producto> {
    return new Promise((resolve, reject) => {
        // Verificar si el producto ya existe
        const existe = this.productos.some(p => p.id === producto.id);
        if (existe) {
            return reject('El producto ya existe'); // Manejo de error si el producto ya existe
        }
        this.productos.push(producto); // Agregar el producto a la lista
        resolve(producto); // Devuelve el producto agregado
    });
  }

  actualizarPromocion(id: string, datosActualizados: Partial<Producto>): Promise<Producto | string> {
    const index = this.productos.findIndex(p => p.id === id);
    if (index === -1) {
        return Promise.reject('Promoción no encontrada'); // Manejo de error
    }
    this.productos[index] = { ...this.productos[index], ...datosActualizados };
    return Promise.resolve(this.productos[index]);
  }
}
