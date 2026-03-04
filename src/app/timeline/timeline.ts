import { Component } from '@angular/core';
import { NgFor, NgStyle, NgClass, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { HostListener } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [NgFor, NgStyle, NgClass, NgIf, FormsModule, NgSelectModule, DatePipe],
  templateUrl: './timeline.html',
  styleUrls: ['./timeline.scss'],
})

export class TimelineComponent {
  selectedZoom = 'Month';

  timelineStart = new Date(2024, 7, 1); // Aug 1 2024
  monthWidth = 200;

  workCenters = [
    'Extrusion Line A',
    'CNC Machine 1',
    'Assembly Station',
    'Quality Control',
    'Packaging Line'
  ];

  months = [
    { label: 'Aug 2024', value: 0 },
    { label: 'Sep 2024', value: 1 },
    { label: 'Oct 2024', value: 2 },
    { label: 'Nov 2024', value: 3 },
    { label: 'Dec 2024', value: 4 },
    { label: 'Jan 2025', value: 5 },
    { label: 'Feb 2025', value: 6 },
    { label: 'Mar 2025', value: 7 }
  ];

  workOrders = [
{
  workCenter: 'Extrusion Line A',
  name: 'Genesis Hardware',
  startDate: new Date(2024, 8, 1),   // Sep 2024
  endDate: new Date(2024, 9, 31),    // Oct 2024
  status: 'complete'
},
{
  workCenter: 'CNC Machine 1',
  name: 'Rodrigues Electrics',
  startDate: new Date(2024, 9, 1),
  endDate: new Date(2024, 10, 30),
  status: 'in-progress'
},
{
  workCenter: 'Assembly Station',
  name: 'McMarrow Distribution',
  startDate: new Date(2024, 10, 1),
  endDate: new Date(2025, 0, 31),
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

onStartDateChange(value: string) {
  const newDate = new Date(value);

  if (newDate > this.selectedOrder.endDate) {
    alert('Start date cannot be after end date');
    return;
  }

  this.selectedOrder.startDate = newDate;
}

onEndDateChange(value: string) {
  const newDate = new Date(value);

  if (newDate < this.selectedOrder.startDate) {
    alert('End date cannot be before start date');
    return;
  }

  this.selectedOrder.endDate = newDate;
}

getMonthIndex(date: Date) {

  const startYear = this.timelineStart.getFullYear();
  const startMonth = this.timelineStart.getMonth();

  const yearDiff = date.getFullYear() - startYear;
  const monthDiff = date.getMonth() - startMonth;

  return yearDiff * 12 + monthDiff;
}

getBarStyle(order: any, wc: string) {

  if (order.workCenter !== wc) {
    return { display: 'none' };
  }

  const startIndex = this.getMonthIndex(order.startDate);
  const endIndex = this.getMonthIndex(order.endDate);

  const left = startIndex * this.monthWidth;
  const width = (endIndex - startIndex + 1) * this.monthWidth;

  return {
    left: `${left}px`,
    width: `${width}px`
  };
}

}