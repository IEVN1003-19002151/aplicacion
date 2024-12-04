import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-ubicacion',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ubicacion.component.html'
})
export class UbicacionComponent {
  mapUrl: SafeResourceUrl;
  private readonly LAT = 21.121436583845313;
  private readonly LNG = -101.68445492394567;

  constructor(private sanitizer: DomSanitizer) {
    // Crear URL de OpenStreetMap
    const osmUrl = `https://www.openstreetmap.org/export/embed.html?` + 
                  `bbox=${this.LNG-0.002},${this.LAT-0.002},${this.LNG+0.002},${this.LAT+0.002}` +
                  `&layer=mapnik` +
                  `&marker=${this.LAT},${this.LNG}`;
    
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(osmUrl);
  }
}