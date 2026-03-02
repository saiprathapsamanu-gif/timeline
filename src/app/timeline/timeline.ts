import { Component } from '@angular/core';
import { NgFor, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [NgFor, NgStyle, FormsModule, NgSelectModule],
  templateUrl: './timeline.html',
  styleUrls: ['./timeline.scss'],
})
export class TimelineComponent {
  selectedZoom = 'Month';

  workCenters = [
    'Extrusion Line A',
    'CNC Machine 1',
    'Assembly Station',
    'Quality Control',
    'Packaging Line'
  ];

  months = [
    'Aug 2024',
    'Sep 2024',
    'Oct 2024',
    'Nov 2024',
    'Dec 2024',
    'Jan 2025',
    'Feb 2025',
    'Mar 2025'
  ];

  workOrders = [
  {
    workCenter: 'Extrusion Line A',
    name: 'Genesis Hardware',
    startMonthIndex: 1,
    duration: 2
  },
  {
    workCenter: 'CNC Machine 1',
    name: 'Rodrigues Electrics',
    startMonthIndex: 2,
    duration: 2
  },
  {
    workCenter: 'Assembly Station',
    name: 'McMarrow Distribution',
    startMonthIndex: 3,
    duration: 3
  }
];

getBarStyle(order: any, wc: string) {
  if (order.workCenter !== wc) {
    return { display: 'none' };
  }

  return {
    left: `${order.startMonthIndex * 200}px`,
    width: `${order.duration * 200}px`
  };
}

}