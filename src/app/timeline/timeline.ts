import { Component } from '@angular/core';
import { NgFor, NgStyle, NgClass, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { HostListener, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [NgFor, NgStyle, NgClass, NgIf, FormsModule, NgSelectModule, DatePipe],
  templateUrl: './timeline.html',
  styleUrls: ['./timeline.scss'],
})

// @upgrade
// Improve timeline scaling logic to support dynamic zoom levels
// with smoother transitions between Hour, Day, Week, and Month views.
// Currently the scaling uses approximate pixel-per-day values.

export class TimelineComponent implements OnInit {
  selectedZoom = 'Month';
  orderCounter = 1;

  timelineStart = new Date('2024-08-01');
  monthWidth = 200;

  isDragging = false;
  dragOrder: any = null;
  dragStartX = 0;
  originalStartDate!: Date;
  originalEndDate!: Date;

  pxPerDay = 32;
  pxPerWeek = 126;
  pxPerMonth = 114;

  getPxPerDay(): number {

  if (this.selectedZoom === 'Hour') return this.pxPerDay * 2;

  if (this.selectedZoom === 'Day') return this.pxPerDay;

  if (this.selectedZoom === 'Week') return this.pxPerWeek / 7;

  return this.pxPerMonth / 30;
}

  ngOnInit(): void {
  
  // @upgrade
  // Replace localStorage persistence with API-based storage
  // to support multi-user scheduling and real-time updates.

  const saved = localStorage.getItem('workOrders');

  if (saved) {
    const parsed = JSON.parse(saved);

    this.workOrders = parsed.map((o: any) => ({
      ...o,
      startDate: new Date(o.startDate),
      endDate: new Date(o.endDate)
    }));
    // restore counter
    this.orderCounter = this.workOrders.length + 1;
  }

}

  workCenters = [
  'Extrusion Line A',
  'Extrusion Line B',
  'CNC Machine 1',
  'Assembly Station',
  'Quality Control',
  'Packaging Line',
  'Laser Cutting',
  'Paint Booth',
  'Final Inspection'
];

  months = [
    { label: 'Aug 2024', value: 0 },
    { label: 'Sep 2024', value: 1 },
    { label: 'Oct 2024', value: 2 },
    { label: 'Nov 2024', value: 3 },
    { label: 'Dec 2024', value: 4 },
    { label: 'Jan 2025', value: 5 },
    { label: 'Feb 2025', value: 6 },
    { label: 'Mar 2025', value: 7 },
    { label: 'Apr 2025', value: 8 }
  ];

workOrders = [

{
id: 1,
workCenter: 'Extrusion Line A',
name: 'Genesis Hardware',
startDate: new Date('2024-09-10'),
endDate: new Date('2024-11-05'),
status: 'Complete'
},

{
id: 2,
workCenter: 'Extrusion Line B',
name: 'Spartan Manufacturing',
startDate: new Date('2024-10-01'),
endDate: new Date('2025-03-15'),
status: 'In progress'
},

{
id: 3,
workCenter: 'CNC Machine 1',
name: 'Rodrigues Electrics',
startDate: new Date('2024-08-20'),
endDate: new Date('2024-11-20'),
status: 'Open'
},

{
id: 4,
workCenter: 'CNC Machine 1',
name: 'Complex Systems',
startDate: new Date('2024-12-13'),
endDate: new Date('2025-02-10'),
status: 'Complete'
},

{
id: 5,
workCenter: 'Assembly Station',
name: 'McMarrow Distribution',
startDate: new Date('2024-09-01'),
endDate: new Date('2025-01-15'),
status: 'Blocked'
},

{
id: 6,
workCenter: 'Quality Control',
name: 'Quality Tests',
startDate: new Date('2024-09-15'),
endDate: new Date('2024-12-01'),
status: 'Open'
},

{
id: 7,
workCenter: 'Packaging Line',
name: 'Orion Packaging',
startDate: new Date('2025-01-05'),
endDate: new Date('2025-03-20'),
status: 'Blocked'
},

{
id: 8,
workCenter: 'Final Inspection',
name: 'Helios Manufacturing',
startDate: new Date('2025-01-01'),
endDate: new Date('2025-03-15'),
status: 'Open'
},

{
id: 9,
workCenter: 'Paint Booth',
name: 'Nova Components',
startDate: new Date('2025-01-05'),
endDate: new Date('2025-03-20'),
status: 'In progress'
},

{
id: 10,
workCenter: 'Final Inspection',
name: 'Helios Manufacturing',
startDate: new Date('2025-01-01'),
endDate: new Date('2025-03-15'),
status: 'Open'
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
  { label: 'In progress', value: 'in-progress' },
  { label: 'Blocked', value: 'blocked' },
  { label: 'Open', value: 'open' }
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

getTimelineWidth(): number {

  const pxPerDay = this.getPxPerDay();

  const timelineEnd = new Date('2025-04-30');

  const msPerDay = 1000 * 60 * 60 * 24;

  const days =
    (timelineEnd.getTime() - this.timelineStart.getTime()) / msPerDay;

  return days * pxPerDay;
}

onStartDateChange(value: string) {

  const [year, month, day] = value.split('-').map(Number);

  const newDate = new Date(year, month - 1, day);

  if (newDate > this.selectedOrder.endDate) {
    alert('Start date cannot be after end date');
    return;
  }

  this.selectedOrder.startDate = newDate;

}

onEndDateChange(value: string) {

  const [year, month, day] = value.split('-').map(Number);

  const newDate = new Date(year, month - 1, day);

  if (newDate < this.selectedOrder.startDate) {
    alert('End date cannot be before start date');
    return;
  }

  this.selectedOrder.endDate = newDate;

}

getMonthWidth(index: number): number {

  const pxPerDay = this.getPxPerDay();

  if (this.selectedZoom === 'Month') {
    return this.pxPerMonth;
  }

  const date = new Date(this.timelineStart);
  date.setMonth(date.getMonth() + index);

  const year = date.getFullYear();
  const month = date.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return daysInMonth * pxPerDay;
}

// @upgrade
// Add resize handles on both ends of the work order bar
// so users can adjust start and end dates directly
// instead of editing through the side panel.

startDrag(event: MouseEvent, order: any) {

  this.isDragging = true;
  this.dragOrder = order;

  this.dragStartX = event.clientX;

  this.originalStartDate = new Date(order.startDate);
  this.originalEndDate = new Date(order.endDate);

}

@HostListener('document:mousemove', ['$event'])
onMouseMove(event: MouseEvent) {

  if (!this.isDragging || !this.dragOrder) return;

  const deltaX = event.clientX - this.dragStartX;

  const pxPerDay = this.getPxPerDay();

  const dayShift = deltaX / pxPerDay;

  const newStart = new Date(this.originalStartDate);
  const newEnd = new Date(this.originalEndDate);

  newStart.setDate(newStart.getDate() + dayShift);
  newEnd.setDate(newEnd.getDate() + dayShift);

  this.dragOrder.startDate = newStart;
  this.dragOrder.endDate = newEnd;

}

@HostListener('document:mouseup')
onMouseUp() {

  if (!this.isDragging) return;

  this.isDragging = false;

  if (this.detectConflict(this.dragOrder)) {

    alert('Schedule conflict detected for this work center');

    // revert back to original dates
    this.dragOrder.startDate = this.originalStartDate;
    this.dragOrder.endDate = this.originalEndDate;

  } else {

    localStorage.setItem(
      'workOrders',
      JSON.stringify(this.workOrders)
    );

  }

  this.dragOrder = null;

}

deleteOrder(order: any) {

  const confirmDelete = confirm(
    `Delete "${order.name}"?`
  );

  if (!confirmDelete) return;

  this.workOrders = this.workOrders.filter(
    o => o !== order
  );

  localStorage.setItem(
    'workOrders',
    JSON.stringify(this.workOrders)
  );

  this.activeMenuId = null;

}

saveOrder() {

  if (this.detectConflict(this.selectedOrder)) {
    alert('Schedule conflict detected for this work center');
    return;
  }

  localStorage.setItem(
    'workOrders',
    JSON.stringify(this.workOrders)
  );

  this.closePanel();

}

onTimelineClick(event: MouseEvent, workCenter: string) {

  const timelineRect =
    (event.currentTarget as HTMLElement).getBoundingClientRect();

  const clickX = event.clientX - timelineRect.left;

  const pxPerDay = this.getPxPerDay();

  const daysFromStart = clickX / pxPerDay;

  const newDate = new Date(this.timelineStart);
  newDate.setDate(this.timelineStart.getDate() + Math.floor(daysFromStart));

  const endDate = new Date(newDate);
  endDate.setDate(newDate.getDate() + 7); // default 1 week order

  const newOrder = {
    id: Date.now(),
    workCenter: workCenter,
    name: `New Work Order ${this.orderCounter++}`,
    startDate: newDate,
    endDate: endDate,
    status: 'in-progress'
  };

  this.workOrders.push(newOrder);

  this.openEditPanel(newOrder);
}

getOrdersForWorkCenter(wc: string) {
  return this.workOrders.filter(order => order.workCenter === wc);
}

trackByOrder(index: number, order: any) {
  return order.id;
}

// @upgrade
// Instead of only showing an alert, visually highlight
// conflicting work orders in the timeline for better UX.

detectConflict(orderToCheck: any): boolean {

  return this.workOrders.some(existing => {

    if (existing === orderToCheck) return false;

    if (existing.workCenter !== orderToCheck.workCenter) return false;

    const newStart = orderToCheck.startDate;
    const newEnd = orderToCheck.endDate;

    const existingStart = existing.startDate;
    const existingEnd = existing.endDate;

    return newStart < existingEnd && newEnd > existingStart;
  });

}

getBarStyle(order: any, wc: string) {

  if (order.workCenter !== wc) {
    return { display: 'none' };
  }

  const start = new Date(order.startDate);
  const end = new Date(order.endDate);

  const msPerDay = 1000 * 60 * 60 * 24;

  const daysFromStart =
    (start.getTime() - this.timelineStart.getTime()) / msPerDay;

  const durationDays =
    (end.getTime() - start.getTime()) / msPerDay;

  const pxPerDay = this.getPxPerDay(); // approximate

  const left = daysFromStart * pxPerDay;
  const width = (durationDays + 1) * pxPerDay;

  return {
    left: `${left}px`,
    width: `${width}px`
  };
}

}