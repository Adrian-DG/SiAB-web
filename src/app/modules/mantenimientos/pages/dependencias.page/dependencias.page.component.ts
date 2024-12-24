import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dependencias.page',
  standalone: true,
  imports: [],
  template: `<p>dependencias.page works!</p>`,
  styleUrl: './dependencias.page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DependenciasPageComponent { }
