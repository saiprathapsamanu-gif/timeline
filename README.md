# Naologic Work Order Scheduler

A manufacturing work order scheduling interface built using **Angular**.
The application visualizes production schedules across multiple **work centers** using a **timeline (Gantt-style) planner**.

Users can create work orders by clicking on a timeline row, adjust schedules using drag-and-drop, and edit details in the side panel while the system prevents scheduling conflicts.


# Features

* Timeline-based scheduling interface
* Multiple work centers
* Work order bars displayed across time
* Drag-and-drop scheduling
* Conflict detection
* Editable work order panel
* Timeline zoom levels (Hour / Day / Week / Month)
* Local storage persistence

# User Interaction

The scheduler supports the following interactions:

• **Create Work Order**  
Click anywhere on a timeline row to create a new work order for that work center.

• **Edit Work Order**  
Drag a work order bar horizontally to reschedule it.

• **Update Details**  
Click the menu icon (⋯) on a work order to open the edit panel.

• **Change Timeline Zoom**  
Use the Timescale dropdown to switch between Hour, Day, Week, and Month views.


# Technologies Used

* Angular 21
* TypeScript
* SCSS
* ng-select (dropdown component)
* Angular standalone components

## Prerequisites

Make sure the following are installed:

* Node.js (version 18 or higher)
* npm
Check versions:
```
node -v
npm -v
```

# Quick Start

Clone the repository and start the application in a few steps.
```
git clone https://github.com/saiprathapsamanu-gif/timeline.git
cd timeline
npm install
npx ng serve
```

Open your browser:
```
http://localhost:4200
```

# Installation

Clone the repository:
```
bash
git clone <https://github.com/saiprathapsamanu-gif/timeline.git>
cd naologic-timeline
```

Install dependencies:
```
bash
npm install
```

Install additional UI dependencies used in the project:
```
bash
npm install @ng-select/ng-select
npm install @ng-bootstrap/ng-bootstrap
```

# Running the Application

Start the development server:

bash
```
npx ng serve
```

Open the browser at:
```
http://localhost:4200
```

The application automatically reloads when source files are modified.

# Project Structure
```
src/
 ├── app/
 │    ├── timeline/
 │    │    └── timeline.component.ts
 │    │
 │    ├── panel/
 │    │    └── work-order-panel.component.ts
 │    │
 │    ├── services/
 │    │    ├── work-order.service.ts
 │    │    └── timeline.service.ts
 │    │
 │    └── models/
 │         ├── work-order.model.ts
 │         └── work-center.model.ts
 │
 ├── styles.scss
 ├── main.ts
 └── index.html
```

# Example Work Centers

The scheduler includes several manufacturing work centers:

* Extrusion Line A
* Extrusion Line B
* CNC Machine 1
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
```
newStart < existingEnd && newEnd > existingStart
```

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
```
docs/llm_prompts.md
```

# Angular CLI

This project was generated using **Angular CLI v21.2.0**.

Useful commands:

Run development server:
```
ng serve
```

Build the project:
```
ng build
```

Run tests:
```
ng test
```


![alt text](<docs/scheduler-preview.png>)