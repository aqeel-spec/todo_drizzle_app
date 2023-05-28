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
     <ToastContainer className="right-5 left-5 ml-auto absolute" />
      <div className="w-full flex space-x-3 px-4">
        <input
          className="rounded-full w-full py-3.5 px-5 border focus:outline-secondry"
          name="task"
          placeholder="Enter your task ..."
          value={todo}
          onChange={onChange}
        />

        <button
          type="button"
          className="shrink-0 bg-gradient-to-b from-primary to-secondry  rounded-full p-4"
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

