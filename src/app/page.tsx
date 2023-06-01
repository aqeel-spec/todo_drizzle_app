
import AddTodo from '@/app/components/AddTodo';
import TodoList from '@/app/components/TodoList';
import { ToastContainer } from 'react-toastify';


export default async function Home() {
  
 // const res: Todo[]  = await getData();
 const res = await fetch(`${process.env.URL}/api/todo`,{
  cache : "no-store"
 });
  const data = await res.json();


  return (
    <main className=" bg-gradient-to-tr from-primary to-secondry flex min-h-screen  items-center justify-center ">
      
      <div className=" rounded-xl px-6 py-8   relative  w-full max-w-md min-w-[280px] h-[520px] -mt-16
     shadow-2xl bg-gradient-to-br from-[#D9D9D9]/50 to-[#D9D9D9]/60   backdropFilter ">
      
        {/** @ts-ignore */}
        <TodoList todos={data} />
         {/** Add todo */}
        <AddTodo />
        <div className="w-1/2 mx-auto h-1.5 bg-black/80 rounded mt-6"></div>
      </div>
    </main>
  )
}
