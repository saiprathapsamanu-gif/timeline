import { Component } from '@angular/core';
import { NgFor, NgStyle, NgClass, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [NgFor, NgStyle, NgClass, NgIf, FormsModule, NgSelectModule],
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
    duration: 2,
    status: 'complete'
  },
  {
    workCenter: 'CNC Machine 1',
    name: 'Rodrigues Electrics',
    startMonthIndex: 2,
    duration: 2,
    status: 'in-progress'
  },
  {
    workCenter: 'Assembly Station',
    name: 'McMarrow Distribution',
    startMonthIndex: 3,
    duration: 3,
    status: 'blocked'
  }
];

activeMenuId: string | null = null;

toggleMenu(orderName: string) {
  this.activeMenuId =
    this.activeMenuId === orderName ? null : orderName;
}

@HostListener('document:click')
handleClickOutside() {
  this.activeMenuId = null;
}

statusOptions = [
  { label: 'Complete', value: 'complete' },
  { label: 'In-Progress', value: 'in-progress' },
  { label: 'Blocked', value: 'blocked' }
];

isPanelOpen = false;
selectedOrder: any = null;

openEditPanel(order: any) {
  this.selectedOrder = order;
  this.isPanelOpen = true;
  this.activeMenuId = null;
}

closePanel() {
  this.isPanelOpen = false;
  this.selectedOrder = null;
}

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