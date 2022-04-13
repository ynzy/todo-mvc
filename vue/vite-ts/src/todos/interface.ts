import type { Ref } from 'vue';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export type Todos = Todo[];

export type RefTodos = Ref<Todo[]>;

// export interface Todos {
//   Todos: Todo[];
// }
// export interface Todos Todos[]

export type VisibleType = 'all' | 'active' | 'completed';

// export enum VisibleEnum =  'all' | 'active' | 'completed';

export interface Filters {
  all: (todos: Todo[]) => Todo[];
  active: (todos: Todo[]) => Todo[];
  completed: (todos: Todo[]) => Todo[];
}
