import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { createTodo } from "~/utils/todo.function";

export const action = async ({ request }: ActionFunctionArgs) => {
  const { todo } = Object.fromEntries(await request.formData()) as {
    todo: string;
  };

  if (createTodo(todo)) {
    return redirect("/");
  }
};

export const loader = () => {
  return redirect("/");
};
