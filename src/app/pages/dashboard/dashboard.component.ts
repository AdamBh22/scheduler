import {Component, OnInit} from '@angular/core';

interface ProjectStat{
  name: string;
  progress: number;
  deadline: Date;
  tasksCount: number;
  completed:number;
  Inprogress:number;
  lateTasks: number;
  unplannedTasks: number;
  nextTasks: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  stats: ProjectStat[] = [
    {
      name: 'Project 1',
      progress: 70,
      deadline: new Date('2024-07-27'),
      tasksCount: 14,
      completed:7,
      Inprogress:4,
      lateTasks: 1,
      unplannedTasks: 0,
      nextTasks: 2
    },
    {
      name: 'Project 2',
      progress: 60,
      deadline: new Date('2024-07-30'),
      tasksCount: 17,
      completed:8,
      Inprogress:4,
      lateTasks: 3,
      unplannedTasks: 1,
      nextTasks: 1
    },
    {
      name: 'Project 3',
      progress: 80,
      deadline: new Date('2024-07-30'),
      tasksCount: 16,
      completed:7,
      Inprogress:4,
      lateTasks: 3,
      unplannedTasks: 1,
      nextTasks: 1
    }
  ];
  constructor() {}

  ngOnInit(): void {}
}
