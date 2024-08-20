import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { Task } from '../../models/task.model';
import { Dependency } from '../../models/dependency.model';

@Component({
  selector: 'app-project-gantt',
  templateUrl: './project-gantt.component.html',
  styleUrls: ['./project-gantt.component.scss']
})
export class ProjectGanttComponent implements OnInit {
  daysInCurrentMonth: Date[] = [];
  currentMonth: number = 1;
  project: Project = new Project(0, '', [], []);
  tasksByUser: { [userId: number]: Task[] } = {};
  monthName!: string;
  year!: number;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

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
      if (project) {
        this.project = project;
        this.updateTasksByUser();
      }
    });
  }

  updateTasksByUser(): void {
    this.tasksByUser = {};
    this.project.users.forEach(user => {
      this.tasksByUser[user.id] = this.project.tasks.filter(task => task.appUserId === user.id);
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

  getTaskGridPosition(task: Task): string | null {
    const taskStartDate = new Date(task.starting).getTime();
    const taskEndDate = new Date(task.ending).getTime();
    const firstDate = this.daysInCurrentMonth[0].getTime();
    const lastDate = this.daysInCurrentMonth[this.daysInCurrentMonth.length - 1].getTime();

    let startDiffDays = Math.floor((taskStartDate - firstDate) / (1000 * 3600 * 24));
    let endDiffDays = Math.floor((taskEndDate - firstDate) / (1000 * 3600 * 24)) + 1;

    if (taskStartDate < firstDate) startDiffDays = -1;
    if (taskEndDate > lastDate) endDiffDays = this.daysInCurrentMonth.length;

    return `${startDiffDays +2} / span ${endDiffDays - startDiffDays}`;
  }

  getDependencyLineStyle(task: Task, dependency: Dependency): any {
    const targetTask = this.project.tasks.find(t => t.id === dependency.taskId);
    if (!targetTask) return {};

    const taskStartDate = new Date(task.starting).getTime();
    const targetTaskEndDate = new Date(targetTask.ending).getTime();
    const firstDate = this.daysInCurrentMonth[0].getTime();

    const startDiffDays = Math.floor((taskStartDate - firstDate) / (1000 * 3600 * 24));
    const endDiffDays = Math.floor((targetTaskEndDate - firstDate) / (1000 * 3600 * 24)) + 1;

    const left = startDiffDays * (100 / this.daysInCurrentMonth.length);
    const width = (endDiffDays - startDiffDays) * (100 / this.daysInCurrentMonth.length);

    return {
      left: `${left}%`,
      width: `${width}%`,
      backgroundColor: dependency.status === 'blocking' ? 'red' : 'yellow'
    };
  }

  navigateToTable(): void {
    this.router.navigate([`/projectTable/${this.project.id}`]);
  }
}
