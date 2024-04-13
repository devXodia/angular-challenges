import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Todo } from './interfaces/todo.interface';
import { CrudHttpService } from './services/crud-http.service';
@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-root',
  template: `
    <div *ngFor="let todo of todos">
      {{ todo.title }}
      <button (click)="this.update(todo)">Update</button>
    </div>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  todos!: Todo[];

  constructor(private http: CrudHttpService) {}

  ngOnInit(): void {
    this.http.getRequest();
    this.http.todos = this.todos;
  }

  update(todo: Todo) {
    this.http.update(todo);
  }
}
