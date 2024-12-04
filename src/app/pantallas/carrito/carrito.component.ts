import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CarritoService, ItemCarrito } from '../../services/carrito.service';
import { NotificacionService } from '../../services/notificacion.service';
import { ProductoService } from '../../services/producto.service';
import { PromocionService } from '../../services/promocion.service';
import { Subscription, forkJoin } from 'rxjs';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
    selector: 'app-carrito',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './carrito.component.html',
    encapsulation: ViewEncapsulation.None
})
export class CarritoComponent implements OnInit, OnDestroy {
  items: ItemCarrito[] = [];
  total: number = 0;
  private subscriptions: Subscription[] = [];
  private defaultImage = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085';
  mostrarTicket: boolean = false;
  ticketMinimizado: boolean = false;
  fechaCompra: string = '';
  numeroTicket: string = '';
  ticketItems: ItemCarrito[] = [];
  ticketTotal: number = 0;

  constructor(
    private carritoService: CarritoService,
    private notificacionService: NotificacionService,
    private productoService: ProductoService,
    private promocionService: PromocionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.carritoService.getItems().subscribe({
        next: async (items) => {
          const itemsConImagen = await Promise.all(
            items.map(async (item) => {
              let imagenUrl = this.defaultImage;
              
              if (item.tipo === 'producto') {
                const producto = await this.productoService.getProductoPorId(item.id).toPromise();
                imagenUrl = producto?.imagenUrl || this.defaultImage;
              } else {
                const promocion = await this.promocionService.getPromocionPorId(item.id).toPromise();
                imagenUrl = promocion?.imagenUrl || this.defaultImage;
              }

              return {
                ...item,
                imagenUrl
              };
            })
          );
          this.items = itemsConImagen;
        },
        error: (error) => {
          console.error('Error al obtener items:', error);
          this.notificacionService.mostrarNotificacion('Error al cargar los items', 'error');
        }
      })
    );

    // Suscripción al total
    this.subscriptions.push(
      this.carritoService.getTotal().subscribe({
        next: (total) => {
          this.total = total;
        },
        error: (error) => {
          console.error('Error al obtener total:', error);
          this.notificacionService.mostrarNotificacion('Error al calcular el total', 'error');
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  eliminarItem(id: string, tipo: 'producto' | 'promocion') {
    this.carritoService.eliminarItem(id, tipo);
    this.notificacionService.mostrarNotificacion('Item eliminado del carrito', 'info');
  }

  actualizarCantidad(id: string, tipo: 'producto' | 'promocion', cantidad: number) {
    if (cantidad < 1) {
      this.notificacionService.mostrarNotificacion('La cantidad mínima es 1', 'warning');
      return;
    }
    this.carritoService.actualizarCantidad(id, tipo, cantidad);
  }

async procederAlPago() {
    try {
        if (this.items.length === 0) {
            this.notificacionService.mostrarNotificacion('El carrito está vacío', 'error');
            return;
        }
        
        this.notificacionService.mostrarNotificacion('Procesando tu pedido...', 'info');
        
        // Store ticket data
        this.ticketItems = [...this.items];
        this.ticketTotal = this.total;
        this.fechaCompra = new Date().toLocaleString();
        this.numeroTicket = Math.random().toString(36).substr(2, 9).toUpperCase();
        
        // Mostrar el ticket
        this.mostrarTicket = true;
        this.ticketMinimizado = false;
        
        // Ya no limpiamos el carrito automáticamente
        // await this.carritoService.limpiarCarrito();
        
        this.notificacionService.mostrarNotificacion('¡Pedido realizado con éxito!', 'success');
    } catch (error) {
        console.error('Error al proceder al pago:', error);
        this.notificacionService.mostrarNotificacion('Error al procesar el pago', 'error');
    }
}


  getImagenUrl(item: ItemCarrito): string {
    return item.imagenUrl || this.defaultImage;
  }

  handleImageError(event: any) {
    event.target.src = this.defaultImage;
  }

  irAlMenu() {
    this.router.navigate(['/productos']).catch(err => {
      console.error('Error al navegar al menú:', err);
      this.notificacionService.mostrarNotificacion('Error al redirigir al menú', 'error');
    });
  }

  minimizarTicket() {
    this.ticketMinimizado = true;
  }

  maximizarTicket() {
    this.ticketMinimizado = false;
  }

cerrarTicket() {
    this.mostrarTicket = false;
    this.ticketMinimizado = false;
}


  async enviarMensaje(mensaje: string, numero: string) {
    // Log the attempt
    console.log('Intentando enviar mensaje:', { numero, mensaje });
    
    const url = 'https://textbelt.com/text';
    const formattedNumber = numero.startsWith('+') ? numero.substring(1) : numero;
    
    const data = {
        phone: `52${formattedNumber}`, // Ensure Mexican country code is added
        message: mensaje,
        key: 'textbelt_test',
    };

    try {
        console.log('Enviando solicitud a TextBelt:', data);
        const response = await axios.post(url, data);
        console.log('Respuesta de TextBelt:', response.data);

        if (response.data.success) {
            console.log('Mensaje enviado exitosamente. ID:', response.data.textId);
            return true;
        } else {
            const errorMessage = response.data.error || 'Error desconocido al enviar mensaje';
            console.error('Error de TextBelt:', errorMessage);
            throw new Error(errorMessage);
        }
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || error.message || 'Error al enviar el mensaje';
        console.error('Error detallado:', errorMessage);
        throw new Error(errorMessage);
    }
  }

  async enviarMensajePrueba() {
    try {
        const mensaje = "Hola, este es un mensaje de prueba desde la aplicación.";
        const numero = "4778923729"; // Solo números, sin + ni código de país
        await this.enviarMensaje(mensaje, numero);
        this.notificacionService.mostrarNotificacion('Mensaje de prueba enviado con éxito', 'success');
    } catch (error: any) {
        console.error('Error en mensaje de prueba:', error);
        this.notificacionService.mostrarNotificacion(
            `Error al enviar mensaje: ${error.message}`,
            'error'
        );
    }
  }

  async descargarTicket() {
    try {
      const ticketElement = document.querySelector('#ticket-container');
      if (!ticketElement) {
        this.notificacionService.mostrarNotificacion('No se pudo encontrar el ticket', 'error');
        return;
      }

      const canvas = await html2canvas(ticketElement as HTMLDivElement);
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
      pdf.save(`ticket-${this.numeroTicket}.pdf`);
      
      this.notificacionService.mostrarNotificacion('Ticket descargado correctamente', 'success');
    } catch (error) {
      console.error('Error al descargar el ticket:', error);
      this.notificacionService.mostrarNotificacion('Error al descargar el ticket', 'error');
    }
  }

  async compartirTicket() {
    try {
      if (!navigator.share) {
        this.notificacionService.mostrarNotificacion('Tu dispositivo no soporta la función de compartir', 'error');
        return;
      }

      const ticketData = {
        title: `Ticket de Compra #${this.numeroTicket}`,
        text: `Fecha: ${this.fechaCompra}\nTotal: $${this.total.toFixed(2)}\nGracias por tu compra!`,
        url: window.location.href
      };

      await navigator.share(ticketData);
      this.notificacionService.mostrarNotificacion('Ticket compartido correctamente', 'success');
    } catch (error) {
      console.error('Error al compartir:', error);
      this.notificacionService.mostrarNotificacion('Error al compartir el ticket', 'error');
    }
  }

async enviarTicketPorWhatsApp(esAutomatico: boolean = false) {
    try {
        const mensaje = this.crearMensajeTicket();
        const numeroWhatsApp = "4778923729"; // Número fijo del negocio
        
        // Usar WhatsApp Web API con número específico
        const whatsappUrl = `https://wa.me/52${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
        
        // Abrir WhatsApp Web en una nueva ventana
        window.open(whatsappUrl, '_blank');
        
        if (!esAutomatico) {
            this.notificacionService.mostrarNotificacion(
                'Abriendo WhatsApp para enviar el ticket...',
                'success'
            );
        }
    } catch (error) {
        console.error('Error al abrir WhatsApp:', error);
        if (!esAutomatico) {
            this.notificacionService.mostrarNotificacion(
                'No se pudo abrir WhatsApp. Por favor, intente más tarde.',
                'error'
            );
        }
    }
}



private crearMensajeTicket(): string {
    // Crear un mensaje formateado con los detalles del ticket
    let mensaje = `🧾 Ticket #${this.numeroTicket}\n`;
    mensaje += `📅 ${this.fechaCompra}\n\n`;
    
    // Agregar items
    this.ticketItems.forEach(item => {
        mensaje += `${item.nombre} x${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}\n`;
    });
    
    mensaje += `\n💰 Total: $${this.ticketTotal.toFixed(2)}\n`;
    mensaje += `\n¡Gracias por tu compra!`;
    
    return mensaje;
}
}
