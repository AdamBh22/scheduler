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
  project: Project | undefined;
  currentMonth: number = 1;
  daysInCurrentMonth: Date[] = [];

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const projectId = Number(params.get('id'));
      this.loadProject(projectId);
    });

    this.currentMonth = new Date().getMonth();
    this.generateDaysInCurrentMonth();
  }

  loadProject(id: number): void {
    this.projectService.getProjectById(id).subscribe(project => {
      this.project = project;
    });
  }

  generateDaysInCurrentMonth(): void {
    const date = new Date();
    date.setDate(1);
    date.setMonth(this.currentMonth);

    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    for (let i = 0; i < daysInMonth; i++) {
      this.daysInCurrentMonth.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
  }

  calculateTaskLeft(task: Task): string {
    const taskStartDate = new Date(task.starting).getTime();
    const firstDate = this.daysInCurrentMonth[0].getTime();
    const diffDays = (taskStartDate - firstDate) / (1000 * 3600 * 24);
    return `${(diffDays * 100) / this.daysInCurrentMonth.length}%`;
  }

  calculateTaskWidth(task: Task): string {
    const taskStartDate = new Date(task.starting).getTime();
    const taskEndDate = new Date(task.ending).getTime();
    const diffDays = (taskEndDate - taskStartDate) / (1000 * 3600 * 24);
    return `${(diffDays * 100) / this.daysInCurrentMonth.length}%`;
  }

  openTaskModal(task: Task): void {
    // Logic to open the task modal
  }
}
