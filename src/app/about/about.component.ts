import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  profile = {
    name: 'Luis Neftali Vargas Vargas',
    title: 'Ingeniero de Software',
    email: 'luis-neftali@hotmail.com',
    phone: '+52 272 162 9578',
    location: 'Orizaba, México',
    bio: 'Desarrollador apasionado por las nuevas tecnologías, especializado en Angular y desarrollo web moderno. Comprometido con crear soluciones innovadoras y escalables.',
    social: []
  };
}
