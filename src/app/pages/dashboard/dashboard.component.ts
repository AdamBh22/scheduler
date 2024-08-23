import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';
import { Project } from '../../models/project.model';
import {User} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

interface ProjectStat {
  id: number;
  name: string;
  progress: number;
  deadline: Date;
  tasksCount: number;
  completed: number;
  inProgress: number;
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
  stats: ProjectStat[] = [];
  user=new User(1,'','','','',[],[]);
  constructor(
    private projectService: ProjectService,
    private router: Router,
    protected userService: UserService,
  ) {
    this.userService.getUserById(1).subscribe({
      next: (user: User) => {
        this.user = user;
      },
      error: (error: any) => {
        console.error('Error fetching user', error);
      },
      complete: () => {
        this.loadProjectStats();
      }
    });
  }

  ngOnInit(): void {
    this.loadProjectStats();
  }

  loadProjectStats(): void {
    this.projectService.getProjectByUserId(this.user.id).subscribe((projects: Project[]) => {
      this.stats = projects.map(project => {
        const completed = project.tasks.filter(task => task.status === 'Complete').length;
        const inProgress = project.tasks.filter(task => task.status === 'In Progress').length;
        const lateTasks = project.tasks.filter(task => task.status === 'Late').length;
        const unplannedTasks = project.tasks.filter(task => task.status === 'Unplanned').length;
        const nextTasks = project.tasks.filter(task => task.status === 'Next').length;
        const tasksCount = project.tasks.length;
        const progress = tasksCount > 0 ? Math.round((completed / tasksCount) * 100) : 0;

        return {
          id: project.id ?? 0, // Provide a default value if project.id is undefined
          name: project.name,
          progress: progress,
          deadline: new Date(), // Ensure you provide a meaningful date
          tasksCount: tasksCount,
          completed: completed,
          inProgress: inProgress,
          lateTasks: lateTasks,
          unplannedTasks: unplannedTasks,
          nextTasks: nextTasks
        };
      });
    });
  }

  navigateToProject(projectId: number): void {
    this.router.navigate([`/projectTable/${projectId}`]);
  }
}
