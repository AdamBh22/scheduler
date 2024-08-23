import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { Task } from '../../models/task.model';
import { Dependency } from '../../models/dependency.model';
import {AppUserProjectService} from "../../services/app-user-project.service";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user.model";
import {catchError, Observable, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-project-gantt',
  templateUrl: './project-gantt.component.html',
  styleUrls: ['./project-gantt.component.scss']
})
export class ProjectGanttComponent implements OnInit {
  daysInCurrentMonth: Date[] = [];
  currentMonth: number = 1;
  project: Project = new Project('', [], []);
  tasksByUser: { [userId: number]: Task[] } = {};
  monthName!: string;
  year!: number;
  users!:User[];

  constructor(
    protected projectService: ProjectService,
    protected route: ActivatedRoute,
    protected userService: UserService,
    protected router: Router
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

    if (this.project.id !== undefined) {
      this.userService.getUsersByProject(this.project.id).subscribe(users => {
        this.users = users;
        users.forEach(user => {
          if (user.id !== undefined) {
            this.tasksByUser[user.id] = this.project.tasks.filter(task => task.userId === user.id);
          }
        });
      });
    }
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
    const targetTask = this.project.tasks.find(t => t.id === dependency.relatedTaskId);
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
  private errorHandl(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
