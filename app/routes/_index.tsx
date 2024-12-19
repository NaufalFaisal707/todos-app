import {
  Form,
  MetaFunction,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import { ClipboardList, Plus, Trash2 } from "lucide-react";
import { useRef } from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { ScrollArea } from "~/components/ui/scroll-area";
import { db } from "~/db/db.server";
import { Todos } from "~/db/db.todos";

export const meta: MetaFunction = () => {
  return [{ title: "Todos App" }];
};

export const loader = async () => {
  return await db.todos.findMany();
};

export default function IndexTodos() {
  const loaderData = useLoaderData<Todos[]>();
  const navigation = useNavigation();

  const formRef = useRef<HTMLFormElement>(null);

  if (navigation.state === "idle") {
    formRef.current?.reset();
  }

  const RenderTodos = () => {
    if (loaderData.length === 0) {
      return (
        <div className="select-none opacity-60 grow flex flex-col items-center justify-center gap-4">
          <ClipboardList className="size-12" />
          <h1>Belum ada todo di sini</h1>
        </div>
      );
    }

    return (
      <ScrollArea>
        <div className="grid flex-wrap gap-4 p-4 overflow-auto">
          {loaderData.map((m, key) => {
            return <TodoCard todo_data={m} key={key} />;
          })}
        </div>
      </ScrollArea>
    );
  };

  const TodoCard = ({ todo_data }: { todo_data: Todos }) => {
    return (
      <div
        className={twMerge(
          todo_data.is_checked ? "bg-neutral-100" : "shadow",
          "rounded-md p-4 flex items-center gap-2 border"
        )}
      >
        <Form action={"/update/" + todo_data.todo_id} method="POST">
          <Checkbox
            name="todo_id"
            checked={todo_data.is_checked}
            type="submit"
            title="Tandai selesai"
          />
        </Form>
        <span
          className={twMerge(
            todo_data.is_checked ? "italic line-through" : "",
            "grow text-lg"
          )}
        >
          {todo_data.todo}
        </span>
        <Form action={"/delete/" + todo_data.todo_id} method="POST">
          <Button
            name="todo_id"
            type="submit"
            variant="destructive"
            title="Hapus todo"
          >
            <Trash2 />
          </Button>
        </Form>
      </div>
    );
  };

  return (
    <div className="w-svw h-svh max-w-screen-sm mx-auto flex flex-col relative overflow-auto">
      <div className="sticky top-0 px-4 pt-4 md:flex hidden items-center gap-4 justify-between bg-white">
        <div className="flex gap-2 truncate select-none items-center">
          <ClipboardList className="min-w-fit" />
          <h1 className="text-lg">Todos App</h1>
        </div>
      </div>

      <Form
        ref={formRef}
        className="p-4 flex gap-4"
        method="POST"
        action="/create"
      >
        <Input name="todo" required placeholder="Apa yang kamu todo kan?" />

        <Button type="submit">
          <Plus />
        </Button>
      </Form>

      <RenderTodos />
    </div>
  );
}
