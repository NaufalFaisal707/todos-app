import { db_todo } from "~/db/db.todos";

export function createTodo(todo: string) {
  db_todo.push({ todo_id: new Date().getTime() + "", todo, is_checked: false });

  return true;
}

export function getAllTodos() {
  return db_todo;
}

export function updateTodoById(todo_id: string) {
  const targetTodo = db_todo.findIndex((f) => f.todo_id === todo_id);

  if (targetTodo !== -1) {
    const todo = db_todo[targetTodo];

    db_todo[targetTodo] = {
      ...todo,
      is_checked: !todo.is_checked,
    };

    return true;
  }

  throw "error update todo id";
}

export function deleteTodoById(todo_id: string) {
  const targetTodo = db_todo.findIndex((f) => f.todo_id === todo_id);

  if (targetTodo !== -1) {
    db_todo.splice(targetTodo, 1);
  }

  return true;
}
