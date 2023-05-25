
import AddTodo from '@/components/AddTodo';
import TodoList from '@/components/TodoList';
import { Todo } from '@/lib/drizzle';

const getData = async () => {
  try {
      const res = await fetch("http://localhost:3000/api/todo", {
          method: "GET",
          cache:"no-store",
          headers: {
              "Content-Type": "application/json"
          }
      });
      if (!res.ok) {
          throw new Error("Failed to fetch the data")
      };
      const result = await res.json()
      return result
  } catch (err) {
      console.log(err)
  }
}

export default async function Home() {
  
  const res: Todo[]  = await getData();


  return (
    <main className=" bg-gradient-to-tr from-primary to-secondry flex min-h-screen  items-center justify-center ">
      <div className="px-6 py-8 rounded-xl bg-gradient-to-br from-[#D9D9D9]/50 to-[#D9D9D9]/60  backdrop-blur-xl w-full max-w-md">
        {/** @ts-ignore */}
        <TodoList todos={res} />
         {/** Add todo */}
        <AddTodo />
        <div className="w-1/2 mx-auto h-1.5 bg-black/80 rounded mt-6"></div>
      </div>
    </main>
  )
}
