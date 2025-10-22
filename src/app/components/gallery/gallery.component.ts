import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  imports: [],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
  }

  // AfterViewInit es necesario para asegurar que el DOM esté completamente renderizado
  // antes de intentar adjuntar listeners de eventos a los elementos de Bootstrap.
  ngAfterViewInit(): void {
    // Escucha el evento 'show.bs.modal' cuando el modal de la galería se va a mostrar
    const galleryModalElement = document.getElementById('galleryModal');
    if (galleryModalElement) {
      galleryModalElement.addEventListener('show.bs.modal', (event: any) => {
        // Obtiene el elemento que activó el modal (la imagen clickeada)
        const button = event.relatedTarget;
        // Extrae la ruta de la imagen del atributo 'data-img-src'
        const imageUrl = button.getAttribute('data-img-src');

        // Encuentra el elemento <img> dentro del modal y establece su 'src'
        const modalImage = document.getElementById('modalImage') as HTMLImageElement;
        if (modalImage) {
          modalImage.src = imageUrl;
          modalImage.alt = button.querySelector('img').alt; // Copia el alt de la imagen original
        }
      });
    }
  }
}