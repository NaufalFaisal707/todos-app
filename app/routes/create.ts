import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { db } from "~/db/db.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const { todo } = Object.fromEntries(await request.formData()) as {
    todo: string;
  };

  await db.todos.create({
    data: {
      todo,
    },
  });

  return redirect("/");
};

export const loader = () => {
  return redirect("/");
};
