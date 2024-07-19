export class Task {
  constructor(
    public id: number,
    public name: string,
    public status: string,
    public priority: string,
    public assignedTo: string,
    public deadline: Date
  ) {}
}
