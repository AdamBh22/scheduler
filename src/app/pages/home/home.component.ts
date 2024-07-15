import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  username = 'User199';
  today = new Date();
  recents = [
    { name: 'Project 1' },
    { name: 'Task 1' },
    { name: 'Task 2' },
    { name: 'Project 2' }
  ];
  agenda = [
    { name: 'Task 1', project: 'Project1' },
    { name: 'Task', project: 'Project' }
  ];
  workItems = {
    today: [
      { name: 'Task 1' },
      { name: 'Task 2' }
    ],
    next: [
      { name: 'Task 3' }
    ],
    late: [
      { name: 'Task 4' }
    ],
    unplanned: [
      { name: 'Task 5' }
    ]
  };
  attributedItems = [
    { name: 'Task 1', project: 'Project1' },
    { name: 'Task', project: 'Project' },
    { name: 'Task 2', project: 'Project2' },
    { name: 'Task 3', project: 'Project2' }
  ];

  constructor() { }

  ngOnInit(): void { }
}
