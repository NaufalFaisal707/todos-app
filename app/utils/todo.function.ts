import { db_todo, TodoItems } from "~/db/db.todos";

export function createTodo({
  title,
  todo_items,
}: {
  title: string;
  todo_items: TodoItems[];
}) {
  const newTodoItem = todo_items.map((m) => {
    m.item_id = new Date() + "";

    return m;
  });

  db_todo.push({ todo_id: new Date() + "", title, items: newTodoItem });

  return true;
}

export function getAllTodos() {
  return db_todo;
}

export function getTodoById(todo_id: string) {
  return db_todo.find((f) => f.todo_id === todo_id);
}
