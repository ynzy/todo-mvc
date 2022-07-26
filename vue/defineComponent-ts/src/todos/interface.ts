import type { ComputedRef, Ref, WritableComputedRef } from 'vue';

export interface Todo {
  id: symbol;
  text: string;
  completed: boolean;
}

export type Todos = Todo[];

export type RefTodos = Ref<Todo[]>;

export type VisibleType = 'all' | 'active' | 'completed';

export interface Filters {
  all: (todos: Todo[]) => Todo[];
  active: (todos: Todo[]) => Todo[];
  completed: (todos: Todo[]) => Todo[];
}

export interface TodosStore {
  todos: RefTodos;
  filteredTodos: ComputedRef<Todo[]>;
  remaining: ComputedRef<number>;
  visibility: Ref<VisibleType>;
  allDone: WritableComputedRef<boolean>;
}

export interface AddTodo {
  input: Ref<string>;
  addTodo: () => void;
}

export interface RemoveTodo {
  removeTodo: (todo: Todo) => void;
}

export interface EditTodo {
  editingTodo: Ref<Todo | null>;
  editTodo: (todo: Todo) => void;
  doneEdit: (todo: Todo) => void;
  cancelEdit: (todo: Todo) => void;
}
