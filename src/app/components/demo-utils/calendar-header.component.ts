import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CalendarView } from 'angular-calendar';


@Component({
  selector: 'mwl-demo-utils-calendar-header',
  template: `
    <div class="row text-center mt-3">
       <!--<div class="col-md-4">
       <div class="btn-group">
          <div
            class="btn bg-gradient-indigo btn-fñat btn-sm"
            mwlCalendarPreviousView
            [view]="view"
            [(viewDate)]="viewDate"
            (viewDateChange)="viewDateChange.next(viewDate)"

          >
            Previous
          </div>
          <div
          class="btn bg-gradient-purple btn-fñat btn-sm"
            mwlCalendarToday
            [(viewDate)]="viewDate"
            (viewDateChange)="viewDateChange.next(viewDate)"
          >
            Today
          </div>
          <div
          class="btn bg-gradient-indigo btn-fñat btn-sm"
            mwlCalendarNextView
            [view]="view"
            [(viewDate)]="viewDate"
            (viewDateChange)="viewDateChange.next(viewDate)"
          >
            Next
          </div>
        </div>

      </div>-->
      <div class="col-md-8">
        <h3>{{ viewDate | calendarDate: view + 'ViewTitle':locale }}</h3>
      </div>
      <div class="col-md-4">
        <div class="btn-group">
          <div
          class="btn bg-gradient-indigo btn-fñat btn-sm"
            (click)="viewChange.emit(CalendarView.Month)"
            [class.active]="view === CalendarView.Month"
          >
            Month
          </div>
          <div
          class="btn bg-gradient-indigo btn-fñat btn-sm"
            (click)="viewChange.emit(CalendarView.Week)"
            [class.active]="view === CalendarView.Week"
          >
            Week
          </div>
          <div
          class="btn bg-gradient-indigo btn-fñat btn-sm"
            (click)="viewChange.emit(CalendarView.Day)"
            [class.active]="view === CalendarView.Day"
          >
            Day
          </div>
        </div>
      </div>
    </div>
    <br />
  `,
})
export class CalendarHeaderComponent {
  @Input() view!: CalendarView;

  @Input() viewDate!: Date;

  @Input() locale: string = 'es-PR';

  @Output() viewChange = new EventEmitter<CalendarView>();

  @Output() viewDateChange = new EventEmitter<Date>();



  CalendarView = CalendarView;


}