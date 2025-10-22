import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { HeroComponent } from "./components/hero/hero.component";
import { ServicesGridComponent } from './components/services-grid/services-grid.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { PricingTableComponent } from './components/pricing-table/pricing-table.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { BookingFormComponent } from './components/booking-form/booking-form.component';
import { FooterComponent } from './components/footer/footer.component';
import { GaleryComponent } from './components/galery/galery.component';
import { GalleryComponent } from './components/gallery/gallery.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, HeroComponent, ServicesGridComponent, AboutUsComponent, PricingTableComponent, TestimonialsComponent, BookingFormComponent, FooterComponent, GalleryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'keykoLanding';
}
