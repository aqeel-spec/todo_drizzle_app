"use client"
import React, { useEffect } from 'react';
import { Todo } from '@/lib/drizzle';
import { useRouter } from 'next/navigation';
import { MdOutlineDeleteForever } from "react-icons/md"



const DelTodo = ({ todo }: { todo: Todo }) => {
  const { refresh } = useRouter();
  const data = todo;
  console.log("data from del todo: ", data);

  useEffect(() => {
    const deleteUser = async () => {
      if (data) {
        try {
          const res = await fetch(`http://localhost:3000/api/todo/${data.id}`, {
            method: "DELETE",
          });

          if (!res.ok) {
            throw new Error("Failed to delete data");
          } else {
            console.log("Data successfully deleted from the database");
          }

          const result = await res.json();
          console.log("Result:", result);
        } catch (error) {
          console.log("Error:", error);
        }
      }
    };
    refresh();
    deleteUser();
  }, [data]);

  return (
    <div  className=' hover:text-secondry   justify-items-center cursor-pointer  rounded-full shrink-0 justify-end text-end ml-auto text-primary'>
     <MdOutlineDeleteForever className='h-7 w-7  '/>
    </div>
  );
};

export default DelTodo;


