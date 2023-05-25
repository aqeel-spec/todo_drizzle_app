"use client";
import { useState } from "react";
import { Todo , NewTodo } from '@/lib/drizzle';
import { serial } from "drizzle-orm/pg-core";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BsCursor } from "react-icons/bs";
import { BiEdit } from "react-icons/bi"



const AddTodo = () => {
  const { refresh } = useRouter();
  const [todo, setTodo] = useState<NewTodo>({
    task: "",
  });

  const onChange = (e: any) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const onClickAdd = async () => {
    if (todo) {
      const response = await fetch("/api/todo", {
        method: "POST",
        body: JSON.stringify(todo),
      });
      console.log(response);

      refresh();
      console.log("todo added ",todo)
      setTodo({ task: "" });
      
    }
  };

  return (
    <div className="w-full flex space-x-3 px-4">
      <input
        className="rounded-full w-full py-3.5 px-5 border focus:outline-secondry"
        name="task"
        placeholder="Enter your task ..."
        value={todo.task as any}
        onChange={onChange}
      />
    
      <button type="button" className="shrink-0 bg-gradient-to-b from-primary to-secondry  rounded-full p-4" onClick={onClickAdd}>
        <BsCursor className="h-7 text-white/90 w-7"/>
      </button>
    </div>
  );
};

export default AddTodo;