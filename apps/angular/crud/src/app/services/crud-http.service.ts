import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { randText } from '@ngneat/falso';
import { Todo } from '../interfaces/todo.interface';

@Injectable({
  providedIn: 'root',
})
export class CrudHttpService {
  constructor(private http: HttpClient) {}
  todos: Todo[] = [];

  getRequest() {
    this.http
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
      .subscribe((todos) => {
        this.todos = todos;
        console.log('these are my todos', todos);
      });
  }

  update(todo: any) {
    this.http
      .put<any>(
        `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
        JSON.stringify({
          todo: todo.id,
          title: randText(),
          body: todo.body,
          userId: todo.userId,
        }),
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        },
      )
      .subscribe((todoUpdated: any) => {
        this.todos[todoUpdated.id - 1] = todoUpdated;
      });
  }
}
