import { Component } from '@angular/core';

@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.scss']
})
export class ProjectTableComponent {
  project = {
    name: 'Project2'
  };

  tasks = [
    { name: 'Task 1', assignedTo: 'User1', status: 'In Progress', deadline: new Date('2024-07-15'), priority: 'High' },
    { name: 'Task 2', assignedTo: 'User2', status: 'Late', deadline: new Date('2024-07-20'), priority: 'Middle' },
    { name: 'Task 3', assignedTo: 'User3', status: 'Next', deadline: new Date('2024-07-21'), priority: 'Low' }
  ];

  constructor() { }

  ngOnInit(): void { }
}
