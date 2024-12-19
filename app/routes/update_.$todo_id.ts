import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { db } from "~/db/db.server";

export const action = async ({ params }: ActionFunctionArgs) => {
  const { todo_id } = params as {
    todo_id: string;
  };

  const getStateChecked = await db.todos.findUnique({
    where: { todo_id },
    select: { is_checked: true },
  });

  await db.todos.update({
    where: {
      todo_id,
    },
    data: {
      is_checked: !getStateChecked?.is_checked,
    },
  });

  return redirect("/");
};

export const loader = () => {
  return redirect("/");
};
