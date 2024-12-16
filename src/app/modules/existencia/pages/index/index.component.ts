import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [],
  template: `<p>index works!</p>`,
  styleUrl: './index.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexComponent { }
