import { Component } from '@angular/core';
import { TimelineComponent } from './timeline/timeline';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TimelineComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {}