import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.scss']
})
export class ProjectTableComponent implements OnInit, OnDestroy {
  project!: Project;
  tasks: Task[] = [];
  private routeSub: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.routeSub.add(
      this.route.paramMap.subscribe(params => {
        const projectId = +params.get('id')!;
        this.loadProject(projectId);
      })
    );

    // Subscribe to task updates
    this.projectService.taskAdded.subscribe(() => {
      this.loadProject(this.project.id);
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  loadProject(projectId: number): void {
    this.projectService.getProjectById(projectId).subscribe(project => {
      if (project) {
        this.project = project;
        this.tasks = project.tasks;
      } else {
        console.error('Project not found');
      }
    });
  }

  navigateToGantt(): void {
    this.router.navigate([`/projectGantt/${this.project.id}`]);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'To Do':
        return 'status-to-do';
      case 'In Progress':
        return 'status-in-progress';
      case 'Complete':
        return 'status-complete';
      default:
        return '';
    }
  }

  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'High':
        return 'priority-high';
      case 'Medium':
        return 'priority-medium';
      case 'Low':
        return 'priority-low';
      default:
        return '';
    }
  }

  getPriorityIconClass(priority: string): string {
    switch (priority) {
      case 'High':
        return 'fa-exclamation-circle';
      case 'Medium':
        return 'fa-exclamation-triangle';
      case 'Low':
        return 'fa-exclamation';
      default:
        return '';
    }
  }
}
