# Naologic Work Order Scheduler

A manufacturing work order scheduling interface built using **Angular**.
The application visualizes production schedules across multiple **work centers** using a **timeline (Gantt-style) planner**.

Users can create, edit, and reschedule work orders while the system prevents scheduling conflicts.


# Features

* Timeline-based scheduling interface
* Multiple work centers
* Work order bars displayed across time
* Drag-and-drop scheduling
* Conflict detection
* Editable work order panel
* Timeline zoom levels (Hour / Day / Week / Month)
* Local storage persistence


# Technologies Used

* Angular 21
* TypeScript
* SCSS
* ng-select (dropdown component)
* Angular standalone components

# Installation

Clone the repository:

bash
git clone <repository-url>
cd naologic-timeline


Install dependencies:

bash
npm install


Install additional UI dependencies used in the project:

bash
npm install @ng-select/ng-select
npm install @ng-bootstrap/ng-bootstrap


# Running the Application

Start the development server:

bash
ng serve


Open the browser at:

http://localhost:4200


The application automatically reloads when source files are modified.

# Project Structure

text
src/app/
 ├── timeline/
 │    ├── timeline.component.ts
 │
 ├── panel/
 │    ├── work-order-panel.component.ts
 │
 ├── services/
 │    ├── work-order.service.ts
 │    ├── timeline.service.ts
 │
 ├── models/
 │    ├── work-order.model.ts
 │    ├── work-center.model.ts


# Example Work Centers

The scheduler includes several manufacturing work centers:

* Extrusion Line A
* Extrusion Line B
* CNC Machine 1
* CNC Machine 2
* Assembly Station
* Quality Control
* Packaging Line
* Laser Cutting
* Paint Booth
* Final Inspection


# Work Order Data Model

Each work order contains the following fields:

* `id`
* `workCenter`
* `name`
* `startDate`
* `endDate`
* `status`


# Timeline Behavior

The timeline supports multiple zoom levels:

* Hour
* Day
* Week
* Month

Each zoom level adjusts the **pixels representing time units**, allowing users to visualize schedules at different granularities.


# Conflict Detection

The scheduler prevents overlapping work orders in the same work center.

Conflict rule:
newStart < existingEnd && newEnd > existingStart

If a conflict occurs, the system alerts the user and reverts the scheduling change.


# Local Storage

Work orders are stored in browser local storage.

Storage key:
workOrders


To reset schedules during development, clear browser local storage.

# AI Usage

Large Language Models were used during development to assist with:

* Understanding ERP scheduling concepts
* Designing timeline layout logic
* Implementing drag-and-drop behavior
* Debugging CSS layout issues
* Implementing scheduling conflict detection

Prompts used during development are documented in:

docs/llm_prompts.md


# Angular CLI

This project was generated using **Angular CLI v21.2.0**.

Useful commands:

Run development server:
ng serve


Build the project:
ng build

Run tests:
ng test


![alt text](<docs/scheduler-preview.png>)