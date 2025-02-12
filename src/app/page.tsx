
import { prisma } from "@/db";
import Link from "next/link";
import { TodoItem } from "./components/TodoItem";

function getTodos() {
  return prisma.todo.findMany()
}

async function toggleTodo(id: string, complete: boolean) {
  "use server"

  await prisma.todo.update({ where: { id }, data: { complete} })
  
}

export default async function Home() {
  const todos = await getTodos();

  return (
    <>
      <header className="mx-auto w-full p-4 flex flex-col gap-2 items-start">
        <h1 className="font-extrabold text-5xl">TODO</h1>
        <Link href="/new" className="text-2xl font-semibold bg-sky-400 px-9 rounded-md shadow-lg hover:bg-orange-500 focus-within:bg-orange-500">New</Link>
      </header>
      <ul>
        {todos.map(todo => (
          <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
          ))}
      </ul>
    </>
  );
}
