import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-project-gantt',
  templateUrl: './project-gantt.component.html',
  styleUrls: ['./project-gantt.component.scss']
})
export class ProjectGanttComponent implements OnInit {
  days: string[] = [];
  project =new Project(1,"",[],[]);
  tasksByUser: { [userId: number]: Task[] } = {};

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.generateDays();
    this.loadProjectData();
  }

  generateDays() {
    const daysInMonth = 31; // You can modify this according to the month
    for (let i = 1; i <= daysInMonth; i++) {
      this.days.push(i.toString());
    }
  }

  loadProjectData(): void {
    this.projectService.getProjectById(this.project.id).subscribe((project) => {
      if (project) {
        this.project = project;
        project.users.forEach(user => {
          this.tasksByUser[user.id] = project.tasks.filter(task => task.appUserId === user.id);
        });
      }
    });
  }

  getTaskGridPosition(task: Task): string {
    // Calculate grid position based on task's start and end date
    return `${task.starting}/${task.ending}`;
  }
}
