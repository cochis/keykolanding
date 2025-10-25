import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // <-- Importa módulos de formularios
import { HttpClient, HttpClientModule } from '@angular/common/http'; // <-- Importa HttpClient
import { CommonModule, NgClass, NgIf } from '@angular/common'; // <-- Importa CommonModule para *ngIf, [ngClass]

@Component({
  selector: 'app-booking-form',
  // ¡IMPORTANTE! Añade los módulos que tu componente necesita
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule, NgIf, NgClass
  ],
  standalone: true, // <-- Asegúrate que 'standalone' esté en true
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.scss'
})
export class BookingFormComponent {

  citaForm: FormGroup;
  estaEnviando = false;
  mensajeFormulario: any;
  // Ya no necesitamos las variables de mensaje, porque redirigimos a WhatsApp
  // mensajeFormulario = '';
  // errorFormulario = false;

  constructor(private fb: FormBuilder) {
    // Inicializa el formulario en el constructor
    this.citaForm = this.fb.group({
      nombre: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9\\+\\s\\-]{10,}$')]],
      servicio: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['Mañana', Validators.required]
    });
  }

  // ngOnInit puede estar vacío
  ngOnInit(): void {
  }

  onSubmit(): void {
    // 1. Validar el formulario
    if (this.citaForm.invalid) {
      this.citaForm.markAllAsTouched();
      return;
    }

    this.estaEnviando = true;

    // 2. Obtener los datos
    const formData = this.citaForm.value;

    // --- ¡AQUÍ LA NUEVA LÓGICA DE WHATSAPP! ---

    // 3. Define tu número de WhatsApp (en formato internacional, ej: 521...)
    const numeroWhatsApp = '5520022666'; // <-- ¡VERIFICA QUE SEA TU NÚMERO!

    // 4. Formatear la fecha (opcional, pero se ve mejor)
    // El input 'date' da 'YYYY-MM-DD'. Vamos a convertirlo a 'DD/MM/YYYY'
    const fechaParts = formData.fecha.split('-');
    const fechaFormateada = `${fechaParts[2]}/${fechaParts[1]}/${fechaParts[0]}`;

    // 5. Crear el mensaje
    // Usamos saltos de línea (%0A) y negritas (*) para formato de WhatsApp
    let mensaje = `¡Hola Auto Servicio Keiko! 👋%0A%0A`;
    mensaje += `Quisiera agendar una cita con los siguientes datos:%0A%0A`;
    mensaje += `👤 *Nombre:* ${formData.nombre}%0A`;
    mensaje += `📞 *Teléfono:* ${formData.telefono}%0A`;
    mensaje += `🚗 *Servicio:* ${formData.servicio}%0A`;
    mensaje += `🗓️ *Fecha:* ${fechaFormateada}%0A`;
    mensaje += `⏰ *Hora:* ${formData.hora}%0A%0A`;
    mensaje += `¡Espero su confirmación!`;

    // 6. Construir la URL final
    // No es necesario encodeURIComponent si construimos el mensaje con %0A
    const url = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;

    // 7. Abrir WhatsApp en una nueva pestaña
    window.open(url, '_blank');

    // 8. Resetear el formulario
    this.estaEnviando = false;
    this.citaForm.reset();
    this.citaForm.patchValue({ servicio: '', hora: 'Mañana' });
  }

  // Función de ayuda para validar en el HTML
  get f() { return this.citaForm.controls; }
}

