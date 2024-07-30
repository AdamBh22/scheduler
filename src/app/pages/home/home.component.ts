import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { RecentsService } from '../../services/recents.service';
import { Task } from '../../models/task.model';
import { Recent } from '../../models/recents.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  today = new Date();
  recents: Recent[] = [];
  agenda: Task[] = [];
  workItems = {
    today: [] as Task[],
    next: [] as Task[],
    late: [] as Task[],
    unplanned: [] as Task[]
  };
  attributedItems: Task[] = [];
  isWorkListVisible: {
    today: boolean,
    next: boolean,
    late: boolean,
    unplanned: boolean
  } = {
    today: false,
    next: false,
    late: false,
    unplanned: false
  };

  constructor(
    private taskService: TaskService,
    private recentsService: RecentsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTasks();
    this.loadRecents();
  }

  loadTasks(): void {
    this.taskService.getUserTasks().subscribe(tasks => {
      this.attributedItems = tasks;
    });

    this.taskService.getTasksByStatus('In Progress').subscribe(tasks => {
      this.workItems.today = tasks;
    });

    this.taskService.getTasksByStatus('Next').subscribe(tasks => {
      this.workItems.next = tasks;
    });

    this.taskService.getTasksByStatus('Late').subscribe(tasks => {
      this.workItems.late = tasks;
    });

    this.taskService.getTasksByStatus('Unplanned').subscribe(tasks => {
      this.workItems.unplanned = tasks;
    });

    this.taskService.getTasksForToday().subscribe(tasks => {
      this.agenda = tasks;
    });
  }

  loadRecents(): void {
    this.recentsService.getRecents().subscribe(recents => {
      this.recents = recents;
    });
  }

  toggleWorkList(list: 'today' | 'next' | 'late' | 'unplanned') {
    this.isWorkListVisible[list] = !this.isWorkListVisible[list];
  }

  navigateToTask(taskId: number): void {
    this.router.navigate([`/task/${taskId}`]);
  }

  navigateToProject(projectId: number): void {
    this.router.navigate([`/projectTable/${projectId}`]);
  }

  navigateToRecent(recent: Recent): void {
    switch (recent.type) {
      case 'task':
        this.navigateToTask(parseInt(recent.name.split(' ')[1]));
        break;
      case 'project':
        this.navigateToProject(parseInt(recent.name.split(' ')[1]));
        break;
      case 'dashboard':
        this.router.navigate(['/dashboard']);
        break;
      case 'calendar':
        this.router.navigate(['/calendar']);
        break;
    }
  }
}
