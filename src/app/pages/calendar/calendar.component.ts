import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task.model'
import {TaskService} from "../../services/task.service";

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

  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getUserTasks().subscribe(tasks => {
      this.tasks = tasks;
      console.log('Tasks loaded:', this.tasks); // Add this line
      const now = new Date();
      this.generateCalendar(now.getFullYear(), now.getMonth());
    });
  }

  generateCalendar(year: number, month: number) {
    this.year = year;
    this.monthName = new Date(year, month).toLocaleString('default', { month: 'long' });

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Correct days in month calculation
    let dayCounter = 1;

    this.calendar = [];

    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < firstDay) || dayCounter > daysInMonth) {
          week.push({ date: '', tasks: [] });
        } else {
          const currentDate = new Date(year, month, dayCounter);
          const tasksForDay = this.tasks
            .filter(task => this.isDateInRange(new Date(task.starting), new Date(task.ending), currentDate))
            .map(task => task.name);
          const isToday = this.isToday(dayCounter, month, year);
          week.push({ date: dayCounter, tasks: tasksForDay, isToday });
          dayCounter++;
        }
      }
      this.calendar.push(week);
    }
  }

  isDateInRange(startDate: Date, endDate: Date, date: Date): boolean {
    console.log(`Checking range: ${startDate} - ${endDate}, Date: ${date}`); // Add this line
    return date >= startDate && date <= endDate;
  }

  isToday(day: number, month: number, year: number): boolean {
    const today = new Date();
    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
  }
}
