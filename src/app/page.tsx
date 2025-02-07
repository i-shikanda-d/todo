import { prisma } from "@/db";
import Link from "next/link";

export default async function Home() {
  const todos = await prisma.todo.findmany();

  return (
    <>
      <header className="mx-auto w-full p-4 flex flex-col gap-2 items-start">
        <h1 className="font-extrabold text-5xl">TODO</h1>
        <Link href="/new" className="text-2xl font-semibold bg-sky-400 px-9 rounded-md shadow-lg hover:bg-orange-500 focus-within:bg-orange-500">New</Link>
      </header>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.title}
          </li>
        ) )}
      </ul>
    </>
  );
}
