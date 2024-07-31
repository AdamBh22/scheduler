import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { RecentsService } from '../../services/recents.service';
import { Task } from '../../models/task.model';
import { Recent } from '../../models/recents.model';
import { Router } from '@angular/router';
import { TaskModalComponent } from '../task-modal/task-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('taskModal') taskModal!: TaskModalComponent;

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
      this.recents = recents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });
  }

  toggleWorkList(list: 'today' | 'next' | 'late' | 'unplanned') {
    this.isWorkListVisible[list] = !this.isWorkListVisible[list];
  }

  openTaskModal(task: Task): void {
    this.taskModal.task = task;
    this.taskModal.tasks = [task];  // You might want to set this to the correct task list
    this.taskModal.openModal();
  }

  navigateToTask(taskId: number): void {
    this.taskService.getTaskById(taskId).subscribe((task: Task) => {
      this.openTaskModal(task);
    });
  }

  navigateToProject(projectId: number): void {
    this.router.navigate([`/projectTable/${projectId}`]);
    this.logRecentActivity(`Project ${projectId}`, 'project');
  }

  navigateToRecent(recent: Recent): void {
    console.log(recent.type);
    switch (recent.type) {
      case 'task':
        const taskId = parseInt(recent.name.split(' ')[1], 10);
        this.navigateToTask(taskId);
        break;
      case 'project':
        this.navigateToProject(parseInt(recent.name.split(' ')[1], 10));
        break;
      case 'dashboard':
        this.navigateTo('dashboard');
        this.logRecentActivity(`dashboard`, 'dashboard');
        break;
      case 'calendar':
        this.navigateTo('calendar');
        this.logRecentActivity(`calendar`, 'calendar');
        break;
    }
  }
  navigateTo(view: string): void {
    this.router.navigate([`/${view}`]);
    console.log("worked function!");
  }
  private logRecentActivity(name: string, type: 'task' | 'project' | 'dashboard' | 'calendar'): void {
    this.recentsService.addRecent(name, type).subscribe(() => {
      this.loadRecents();
    });
  }
}
