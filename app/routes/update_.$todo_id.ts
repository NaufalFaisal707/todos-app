import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { updateTodoById } from "~/utils/todo.function";

export const action = ({ params }: ActionFunctionArgs) => {
  const { todo_id } = params as {
    todo_id: string;
  };

  if (updateTodoById(todo_id)) {
    return redirect("/");
  }
};

export const loader = () => {
  return redirect("/");
};
