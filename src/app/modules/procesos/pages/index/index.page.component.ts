import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-index.page',
  standalone: true,
  imports: [],
  template: `<p>index.page works!</p>`,
  styleUrl: './index.page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexPageComponent { }
