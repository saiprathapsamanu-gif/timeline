# LLM Prompts Used During Development

## 1. Understanding ERP Scheduling

Explain how manufacturing ERP systems schedule work orders across multiple work centers.
Include how start date, end date, machine availability, and scheduling conflicts are typically handled.

## 2. Work Center Examples

Provide realistic examples of manufacturing work centers that might exist in a production facility.
Examples should include machining, assembly, finishing, and quality control operations.


## 3. Work Order Data Structure

Design a simple data structure for representing work orders in a scheduling application.
Each work order should include id, work center, order name, start date, end date, and status.

## 4. Timeline Scheduler Layout

How should a Gantt-style timeline scheduler be structured in a web application where rows represent work centers and horizontal bars represent work orders across time?

## 5. Calculating Timeline Positions

Given a start date and end date for a work order, how can I calculate the horizontal position and width of a bar in a timeline using pixels per day?

## 6. Drag and Drop Scheduling

How can drag-and-drop be implemented for timeline scheduling so that when a user drags a work order bar horizontally, the start and end dates update correctly?

## 7. Detecting Scheduling Conflicts

Write logic to detect scheduling conflicts when two work orders overlap in the same work center.
The system should prevent saving the schedule if a conflict exists.

## 8. Timeline Zoom Levels

Explain how timeline zoom levels (hour, day, week, month) can be implemented in a scheduling interface by adjusting the number of pixels representing a unit of time.

# Debugging Prompts Used During Development

## 9. Timeline Bar Position Bug

My timeline bars are not aligning correctly with the month grid when zoom levels change.
How can I debug calculations for left position and width when using pixels-per-day in a timeline scheduler?

## 10. Dragging Not Updating Dates

I implemented drag functionality for timeline bars using mouse events, but the start and end dates are not updating correctly while dragging.
How can I debug mouse movement calculations and date shifting logic?

## 11. Month Width Misalignment

When switching between Day, Week, and Month zoom levels, the month header width does not match the grid below it.
What is the correct approach to dynamically calculate month width based on days in the month?

## 12. Conflict Detection Logic

My scheduling system should prevent overlapping work orders in the same work center, but sometimes overlapping bars still appear.
How can I debug the overlap detection logic for start date and end date comparisons?

## 13. Local Storage Overriding Data

My updated dataset is not appearing in the UI because the previous work orders are still loaded.
How can I debug and manage localStorage when testing new default datasets?

## 14. Dropdown Styling Issue

The ng-select dropdown inside the edit panel does not take the full width like the other input fields.
How can I debug CSS overrides and Angular component styling for ng-select?


