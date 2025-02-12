import { prisma } from "@/db";
import { redirect } from "next/navigation";
import Link from "next/link";

async function createToDo(data: FormData) {
  "use server"

  const title = data.get("title")?.valueOf();
  if (typeof title !== "string" || title.length === 0) {
    throw new Error("Invalid title");
  }

  await prisma.todo.create({ data: { title, complete: false } });

  redirect("/")
}

export default function New() {
  return (
    <>
      <header>New</header>
      <form action={createToDo}>
        <input
          type="text"
          name="title"
          id=""
          className="border bg-transparent border-slate-200"
        />
      </form>
      <div>
        <Link
          href="/"
          className="text-2xl font-semibold bg-red-500 px-9 rounded-md shadow-lg hover:bg-red-300 focus-within:bg-red-300"
        >
          Cancel
        </Link>
        <button
          type='submit'
          className="text-2xl font-semibold bg-sky-400 px-9 rounded-md shadow-lg hover:bg-orange-500 focus-within:bg-orange-500"
        >
          Create
        </button>
      </div>
    </>
  );
}
