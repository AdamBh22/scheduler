// services/recents.service.ts
import { Injectable } from '@angular/core';
import { Recent } from '../models/recents.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecentsService {
  private recents: Recent[] = [];
  private nextId = 1;
  private storageKey = 'recentActivities';

  constructor() {
    this.loadRecentsFromStorage();
  }

  getRecents(): Observable<Recent[]> {
    return of(this.recents);
  }

  addRecent(name: string, type: 'task' | 'project' | 'dashboard' | 'calendar'): Observable<void> {
    const recent: Recent = {
      id: this.nextId++,
      name: name,
      date: new Date(),
      type: type
    };
    this.recents.push(recent);
    this.saveRecentsToStorage();
    return of();
  }

  private loadRecentsFromStorage(): void {
    const storedRecents = localStorage.getItem(this.storageKey);
    if (storedRecents) {
      this.recents = JSON.parse(storedRecents);
      this.nextId = this.recents.length > 0 ? Math.max(...this.recents.map(r => r.id)) + 1 : 1;
    }
  }

  private saveRecentsToStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.recents));
  }
}
