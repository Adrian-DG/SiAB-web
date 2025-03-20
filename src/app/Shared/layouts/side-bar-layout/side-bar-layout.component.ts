import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { SideBarService } from '../../Services/SideBar.service';
import { NgClass } from '@angular/common';
import { inject } from '@angular/core';

@Component({
  selector: 'app-side-bar-layout',
  standalone: true,
  imports: [
    SidebarComponent,
    RouterOutlet,
    NgClass
  ],
  templateUrl: './side-bar-layout.component.html',
  styleUrl: './side-bar-layout.component.scss'
})
export default class SideBarLayoutComponent {

  sideBarService = inject(SideBarService);
}
