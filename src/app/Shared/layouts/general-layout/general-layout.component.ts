import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-general-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
  ],
  templateUrl: './general-layout.component.html',
  styleUrl: './general-layout.component.scss'
})
export default class GeneralLayoutComponent {

}
