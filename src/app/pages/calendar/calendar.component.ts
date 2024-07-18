import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  calendar: any[] = [];
  monthName!: string;
  year!: number;
  today: Date = new Date();

  tasks = [
    { date: new Date(2023, 6, 2), task: 'Task 1' },
    { date: new Date(2023, 6, 3), task: 'Task 2' },
    { date: new Date(2023, 6, 4), task: 'Task 3' }
  ];

  ngOnInit() {
    const now = new Date();
    this.generateCalendar(now.getFullYear(), now.getMonth());
  }

  generateCalendar(year: number, month: number) {
    this.year = year;
    this.monthName = new Date(year, month).toLocaleString('default', { month: 'long' });

    const firstDay = new Date(year, month).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let dayCounter = 1;

    this.calendar = [];

    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < firstDay) || dayCounter > daysInMonth) {
          week.push({ date: '', tasks: [] });
        } else {
          const tasksForDay = this.tasks
            .filter(task => task.date.getDate() === dayCounter && task.date.getMonth() === month)
            .map(task => task.task);
          const isToday = this.isToday(dayCounter, month, year);
          week.push({ date: dayCounter, tasks: tasksForDay, isToday });
          dayCounter++;
        }
      }
      this.calendar.push(week);
    }
  }

  isToday(day: number, month: number, year: number): boolean {
    const today = new Date();
    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
  }
}
