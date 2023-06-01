"use client";


import React, { useState } from "react";
import { BsCursor } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const AddTodo = () => {
  const  { refresh }  = useRouter();
  const [todo, setTodo] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e : any) => {
    setTodo(e.target.value);
  };

  const onClickAdd = async () => {
    setLoading(true);

    if (todo) {
      try {
        const response = await fetch("/api/todo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ task: todo }),
        });

        if (response.ok) {
          toast.success(`Successfully added task : ${todo}`, {
            position: toast.POSITION.TOP_RIGHT,
            className: "text-red-500",
          });

          setLoading(false);
          setTodo("");
          refresh();
        } else {
          toast.error("Failed to add todo");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    } else {
      setLoading(false)
      toast.error("Please enter a task");
    }
  };

  return (
    <>
     
      <div className="space-x-3  flex absolute bottom-10 left-0 w-full  px-6 lg:px-12  ">
        <input
          className="rounded-full focus:ring-2  ring-primary duration-300 py-2.5 px-6 bg-white focus:outline-none w-full flex-1 shrink"
          name="task"
          placeholder="Enter your task ..."
          value={todo}
          onChange={onChange}
        />

        <button
          type="button"
          className="bg-gradient-to-tr from-primary to-secondary h-12 w-12 p-1 flex-none  
          rounded-full flex justify-center items-center hover:scale-105 duration-300
           disabled:hover:scale-100 disabled:cursor-not-allowed "
          onClick={onClickAdd}
          disabled={loading}
        >
          {!loading ? (
            <BsCursor className="h-7 text-white/90 w-7" />
          ) : (
            <div
              className="animate-spin flex shrink   items-center text-center h-6 w-6 shrink-auto border-[3px] border-current border-t-transparent text-white rounded-full"
              role="status"
              aria-label="loading"
            >
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </button>
      </div>
      
    </>
  );
};

export default AddTodo;

