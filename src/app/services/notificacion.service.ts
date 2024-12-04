import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type TipoNotificacion = 'success' | 'error' | 'info' | 'warning';

export interface Notificacion {
  mensaje: string;
  tipo: TipoNotificacion;
  visible: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  private notificacionSubject = new BehaviorSubject<Notificacion | null>(null);

  constructor() {}

  getNotificacion(): Observable<Notificacion | null> {
    return this.notificacionSubject.asObservable();
  }

  mostrar(mensaje: string) {
    this.mostrarNotificacion(mensaje, 'info');
  }

  mostrarNotificacion(mensaje: string, tipo: TipoNotificacion) {
    this.notificacionSubject.next({
      mensaje,
      tipo,
      visible: true
    });

    // Auto ocultar después de 3 segundos
    setTimeout(() => {
      this.notificacionSubject.next(null);
    }, 3000);
  }
}
