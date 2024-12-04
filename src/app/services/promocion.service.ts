import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

export interface Promocion {
  promocionId: string;
  nombre: string;
  descripcion: string;
  precioOriginal: number;
  precioPromocional: number;
  imagenUrl: string;
  categoria: string;
  rating: number;
  fechaInicio: Date;
  fechaFin: Date;
}

@Injectable({
  providedIn: 'root'
})
export class PromocionService {
  private promocionSeleccionada = new BehaviorSubject<Promocion | null>(null);
  
  private promociones: Promocion[] = [
    {
      promocionId: '1',
      nombre: 'Desayuno Completo',
      descripcion: 'Café americano + Sandwich de jamón y queso + Jugo de naranja',
      precioOriginal: 85.00,
      precioPromocional: 65.00,
      imagenUrl: 'https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?auto=format&fit=crop&w=800&h=800&q=80',
      categoria: 'Desayunos',
      rating: 4.8,
      fechaInicio: new Date('2024-03-01'),
      fechaFin: new Date('2024-03-31')
    },
    {
      promocionId: '2',
      nombre: 'Combo Tarde de Café',
      descripcion: 'Capuchino + Porción de cheesecake',
      precioOriginal: 78.00,
      precioPromocional: 60.00,
      imagenUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&h=800&q=80',
      categoria: 'Postres',
      rating: 4.5,
      fechaInicio: new Date('2024-03-01'),
      fechaFin: new Date('2024-03-31')
    },
    {
      promocionId: '3',
      nombre: 'Pack Familiar',
      descripcion: '4 Wraps de pollo + 4 Bebidas + 2 Postres',
      precioOriginal: 220.00,
      precioPromocional: 180.00,
      imagenUrl: 'https://images.unsplash.com/photo-1513442542250-854d436a73f2?auto=format&fit=crop&w=800&h=800&q=80',
      categoria: 'Familiar',
      rating: 4.7,
      fechaInicio: new Date('2024-03-01'),
      fechaFin: new Date('2024-03-31')
    },
    {
      promocionId: '4',
      nombre: 'Combo Merienda',
      descripcion: 'Brownie de chocolate + Café latte + Helado de vainilla',
      precioOriginal: 95.00,
      precioPromocional: 75.00,
      imagenUrl: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&h=800&q=80',
      categoria: 'Postres',
      rating: 4.9,
      fechaInicio: new Date('2024-03-01'),
      fechaFin: new Date('2024-03-31')
    },
    {
      promocionId: '5',
      nombre: 'Dúo Saludable',
      descripcion: 'Bowl de açaí + Smoothie verde + Granola extra',
      precioOriginal: 110.00,
      precioPromocional: 89.00,
      imagenUrl: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=800&h=800&q=80',
      categoria: 'Desayunos',
      rating: 4.6,
      fechaInicio: new Date('2024-03-01'),
      fechaFin: new Date('2024-03-31')
    },
    {
      promocionId: '6',
      nombre: 'Pack Reunión',
      descripcion: '6 Cappuccinos + 2 Tartas a elección',
      precioOriginal: 280.00,
      precioPromocional: 230.00,
      imagenUrl: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&h=800&q=80',
      categoria: 'Grupal',
      rating: 4.8,
      fechaInicio: new Date('2024-03-01'),
      fechaFin: new Date('2024-03-31')
    },
    {
      promocionId: '7',
      nombre: 'Combo Dulce',
      descripcion: '2 Muffins + 2 Frappuccinos + 2 Brownies',
      precioOriginal: 165.00,
      precioPromocional: 135.00,
      imagenUrl: 'https://images.unsplash.com/photo-1579888071069-c107a6f79d82?auto=format&fit=crop&w=800&h=800&q=80',
      categoria: 'Postres',
      rating: 4.7,
      fechaInicio: new Date('2024-03-01'),
      fechaFin: new Date('2024-03-31')
    },
    {
      promocionId: '8',
      nombre: 'Brunch Especial',
      descripcion: 'Huevos benedictinos + Café + Jugo + Croissant',
      precioOriginal: 130.00,
      precioPromocional: 99.00,
      imagenUrl: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=800&h=800&q=80',
      categoria: 'Desayunos',
      rating: 4.9,
      fechaInicio: new Date('2024-03-01'),
      fechaFin: new Date('2024-03-31')
    },
    {
      promocionId: '9',
      nombre: 'Pack Estudiantes',
      descripcion: 'Sandwich club + Café americano + Muffin',
      precioOriginal: 89.00,
      precioPromocional: 69.00,
      imagenUrl: 'https://images.unsplash.com/photo-1619096252214-ef06c45683e3?auto=format&fit=crop&w=800&h=800&q=80',
      categoria: 'Especial',
      rating: 4.5,
      fechaInicio: new Date('2024-03-01'),
      fechaFin: new Date('2024-03-31')
    },
    {
      promocionId: '10',
      nombre: 'Combo Mexicano',
      descripcion: 'Chilaquiles verdes + Café de olla + Pan dulce',
      precioOriginal: 120.00,
      precioPromocional: 95.00,
      imagenUrl: 'https://images.unsplash.com/photo-1534352956036-cd81e27dd615?auto=format&fit=crop&w=800&h=800&q=80',
      categoria: 'Desayunos',
      rating: 4.8,
      fechaInicio: new Date('2024-03-01'),
      fechaFin: new Date('2024-03-31')
    },
    {
      promocionId: '11',
      nombre: 'Combo Italiano',
      descripcion: 'Panini caprese + Espresso doble + Tiramisú',
      precioOriginal: 145.00,
      precioPromocional: 115.00,
      imagenUrl: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=800&h=800&q=80',
      categoria: 'Comidas',
      rating: 4.7,
      fechaInicio: new Date('2024-03-01'),
      fechaFin: new Date('2024-03-31')
    },
    {
      promocionId: '12',
      nombre: 'Desayuno Fit',
      descripcion: 'Avocado toast + Smoothie verde + Yogurt con granola',
      precioOriginal: 135.00,
      precioPromocional: 110.00,
      imagenUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&h=800&q=80',
      categoria: 'Desayunos',
      rating: 4.6,
      fechaInicio: new Date('2024-03-01'),
      fechaFin: new Date('2024-03-31')
    },
    {
      promocionId: '13',
      nombre: 'Tarde de Té',
      descripcion: 'Té chai + Scones + Galletas de mantequilla',
      precioOriginal: 98.00,
      precioPromocional: 75.00,
      imagenUrl: 'https://images.unsplash.com/photo-1587080413959-06b859fb107d?auto=format&fit=crop&w=800&h=800&q=80',
      categoria: 'Meriendas',
      rating: 4.5,
      fechaInicio: new Date('2024-03-01'),
      fechaFin: new Date('2024-03-31')
    },
    {
      promocionId: '14',
      nombre: 'Combo Mediterráneo',
      descripcion: 'Ensalada griega + Focaccia + Limonada de menta',
      precioOriginal: 155.00,
      precioPromocional: 125.00,
      imagenUrl: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=800&h=800&q=80',
      categoria: 'Comidas',
      rating: 4.7,
      fechaInicio: new Date('2024-03-01'),
      fechaFin: new Date('2024-03-31')
    },
    {
      promocionId: '15',
      nombre: 'Brunch Premium',
      descripcion: 'Bagel de salmón + Mimosa + Parfait de frutas',
      precioOriginal: 175.00,
      precioPromocional: 145.00,
      imagenUrl: 'https://images.unsplash.com/photo-1513442542250-854d436a73f2?auto=format&fit=crop&w=800&h=800&q=80',
      categoria: 'Brunch',
      rating: 4.9,
      fechaInicio: new Date('2024-03-01'),
      fechaFin: new Date('2024-03-31')
    }
  ];

  constructor() {}

  getPromociones(): Observable<Promocion[]> {
    return of(this.promociones);
  }

  getPromocionPorId(id: string): Observable<Promocion | undefined> {
    const promocion = this.promociones.find(p => p.promocionId === id);
    if (promocion) {
      this.setPromocionSeleccionada(promocion); // Actualizamos la promoción seleccionada
    }
    return of(promocion);
  }

  setPromocionSeleccionada(promocion: Promocion) {
    this.promocionSeleccionada.next(promocion);
  }

  getPromocionSeleccionada(): Observable<Promocion | null> {
    return this.promocionSeleccionada.asObservable();
  }

  clearPromocionSeleccionada() {
    this.promocionSeleccionada.next(null);
  }
}
