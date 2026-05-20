import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  profile = {
    name: 'Tu Nombre',
    title: 'Ingeniero de Software',
    email: 'tu.email@example.com',
    phone: '+1 (555) 123-4567',
    location: 'Tu Ciudad, País',
    bio: 'Desarrollador apasionado por las nuevas tecnologías, especializado en Angular y desarrollo web moderno. Comprometido con crear soluciones innovadoras y escalables.',
    social: [
      { name: 'LinkedIn', url: '#', icon: '💼' },
      { name: 'GitHub', url: '#', icon: '🐙' },
      { name: 'Twitter', url: '#', icon: '🐦' },
      { name: 'Instagram', url: '#', icon: '📸' }
    ]
  };
}
