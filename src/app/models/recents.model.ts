export interface Recent {
  id: number;
  name: string;
  date: Date;
  type: 'task' | 'project' | 'dashboard' | 'calendar';
}
