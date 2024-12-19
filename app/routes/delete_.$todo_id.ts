import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { db } from "~/db/db.server";

export const action = async ({ params }: ActionFunctionArgs) => {
  const { todo_id } = params as {
    todo_id: string;
  };

  await db.todos.delete({
    where: {
      todo_id,
    },
  });

  return redirect("/");
};

export const loader = () => {
  return redirect("/");
};
