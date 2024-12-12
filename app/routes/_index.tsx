import { Link, MetaFunction, useLoaderData } from "@remix-run/react";
import { ClipboardList, Plus, SearchX } from "lucide-react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Todos } from "~/db/db.todos";
import { getAllTodos } from "~/utils/todo.function";

export const meta: MetaFunction = () => {
  return [{ title: "Todos App" }];
};

export const loader = () => {
  return Response.json(getAllTodos());
};

export default function IndexTodos() {
  const loaderData = useLoaderData<Todos[]>();

  const [cariJudulTodo, setCariJudulTodo] = useState("");

  function filterTodos() {
    return loaderData.filter((f) => {
      return f.title.toLowerCase().includes(cariJudulTodo.toLowerCase());
    });
  }

  const RenderTodos = () => {
    if (filterTodos().length === 0 && cariJudulTodo) {
      return (
        <div className="select-none opacity-60 grow flex flex-col items-center justify-center gap-4">
          <SearchX className="size-12" />
          <h1>Tidak di temukan hasil dari pencarian</h1>
        </div>
      );
    }

    if (filterTodos().length === 0) {
      return (
        <div className="select-none opacity-60 grow flex flex-col items-center justify-center gap-4">
          <ClipboardList className="size-12" />
          <h1>Belum ada todo di sini</h1>
        </div>
      );
    }

    return (
      <ScrollArea>
        <div className="grid sm:grid-cols-3 grid-cols-2 flex-wrap gap-4 p-4 overflow-auto">
          {filterTodos().map((m, key) => {
            return <TodoCard todo_data={m} key={key} />;
          })}
        </div>
      </ScrollArea>
    );
  };

  const TodoCard = ({ todo_data }: { todo_data: Todos }) => {
    // const { text_color, bg_color } = noteThemes[notes_data.theme];

    return (
      <Link
        to={"/" + todo_data.todo_id}
        className={twMerge(
          // text_color,
          // bg_color,
          "rounded-md p-4 grid gap-2 shadow"
        )}
      >
        <h1
          title={todo_data.title.split(/\s+/).slice(0, 6).join(" ") + "..."}
          className="capitalize font-semibold truncate"
        >
          {todo_data.title}
        </h1>
        {/* <p
          title={notes_data.content.split(/\s+/).slice(0, 15).join(" ") + "..."}
          className="text-sm whitespace-pre-wrap overflow-hidden"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {notes_data.content}
        </p> */}
      </Link>
    );
  };

  return (
    <div className="w-svw h-svh max-w-screen-sm mx-auto flex flex-col relative">
      <div className="sticky top-0 p-4 flex items-center gap-4 justify-between bg-white">
        <div className="md:flex gap-2 truncate hidden select-none items-center">
          <ClipboardList className="min-w-fit" />
          <h1 className="text-lg">Todos App</h1>
        </div>

        <div className="flex gap-2 md:w-fit w-full">
          <Input
            onChange={({ target }) => setCariJudulTodo(target.value)}
            title="cari todo"
            placeholder="Cari todo"
            type="search"
          />

          <Link to="/create" className="hidden md:block">
            <Button title="buat todo baru">
              <Plus />
            </Button>
          </Link>
        </div>
      </div>

      <RenderTodos />

      <Link
        to="/create"
        className="md:hidden block absolute bottom-10 right-10 shadow-lg"
      >
        <Button title="buat todo baru">
          <Plus />
        </Button>
      </Link>
    </div>
  );
}
