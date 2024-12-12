export type Todos = {
  todo_id: string;
  title: string;
  items: TodoItems[];
};

export type TodoItems = {
  item_id: string;
  title: string;
  checked: boolean;
};

export const db_todo: Todos[] = [];
