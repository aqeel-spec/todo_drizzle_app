"use client"
import React, { useEffect, useState } from 'react';
import { Todo } from '@/lib/drizzle';
import { useRouter } from 'next/navigation';
import { MdOutlineDeleteForever } from "react-icons/md";
import { toast } from 'react-toastify';

const DelTodo = ({ todo }: { todo: Todo }) => {
  const { refresh } = useRouter();
  const data = todo;
  const [loading, setLoading] = useState(false);

  console.log("data from del todo: ", data);

  useEffect(() => {
    const deleteUser = async () => {
      if (data) {
        try {
          setLoading(true);
          const res = await fetch(`/api/todo/${data.id}`, {
            method: "DELETE",
          });

          if (!res.ok) {
            throw new Error("Failed to delete data");
          } else {
            console.log("Data successfully deleted from the database");
            toast.success("Todo deleted successfully", {
              position: toast.POSITION.TOP_RIGHT,
              className: "text-red-500",
            });
          }

          const result = await res.json();
          console.log("Result:", result);
        } catch (error) {
          console.log("Error:", error);
          toast.error("Failed to delete todo");
        } finally {
          setLoading(false);
        }
      }
    };
    refresh();
    deleteUser();
  }, [data]);

  return (
    <div className='hover:text-secondry justify-items-center cursor-pointer rounded-full shrink-0 justify-end text-end ml-auto text-primary'>
      {loading ? (
        <div className="flex ml-2 items-center h-7 w-7">
          <div className="animate-spin rounded-full h-3 w-3 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <MdOutlineDeleteForever className='h-7 w-7' />
      )}
    </div>
  );
};

export default DelTodo;


// import React, { useEffect } from 'react';
// import { Todo } from '@/lib/drizzle';
// import { useRouter } from 'next/navigation';
// import { MdOutlineDeleteForever } from "react-icons/md";
// import { toast } from 'react-toastify';

// const DelTodo = ({ todo }: { todo: Todo }) => {
//   const { refresh } = useRouter();
//   const data = todo;
//   console.log("data from del todo: ", data);

//   useEffect(() => {
//     const deleteUser = async () => {
//       if (data) {
//         try {
//           const res = await fetch(`/api/todo/${data.id}`, {
//             method: "DELETE",
//           });

//           if (!res.ok) {
//             throw new Error("Failed to delete data");
//           } else {
//             console.log("Data successfully deleted from the database");
//             toast.success("Todo deleted successfully", {
//               position: toast.POSITION.TOP_RIGHT,
//               className: "text-red-500",
//             });
//           }

//           const result = await res.json();
//           console.log("Result:", result);
//         } catch (error) {
//           console.log("Error:", error);
//           toast.error("Failed to delete todo");
//         }
//       }
//     };
//     refresh();
//     deleteUser();
//   }, [data]);

//   return (
//     <div className='hover:text-secondry justify-items-center cursor-pointer rounded-full shrink-0 justify-end text-end ml-auto text-primary'>
//       <MdOutlineDeleteForever className='h-7 w-7' />
//     </div>
//   );
// };

// export default DelTodo;

// import React, { useEffect } from 'react';
// import { Todo } from '@/lib/drizzle';
// import { useRouter } from 'next/navigation';
// import { MdOutlineDeleteForever } from "react-icons/md"



// const DelTodo = ({ todo }: { todo: Todo }) => {
//   const { refresh } = useRouter();
//   const data = todo;
//   console.log("data from del todo: ", data);

//   useEffect(() => {
//     const deleteUser = async () => {
//       if (data) {
//         try {
//           const res = await fetch(`/api/todo/${data.id}`, {
//             method: "DELETE",
//           });

//           if (!res.ok) {
//             throw new Error("Failed to delete data");
//           } else {
//             console.log("Data successfully deleted from the database");
//           }

//           const result = await res.json();
//           console.log("Result:", result);
//         } catch (error) {
//           console.log("Error:", error);
//         }
//       }
//     };
//     refresh();
//     deleteUser();
//   }, [data]);

//   return (
//     <div  className=' hover:text-secondry   justify-items-center cursor-pointer  rounded-full shrink-0 justify-end text-end ml-auto text-primary'>
//      <MdOutlineDeleteForever className='h-7 w-7  '/>
//     </div>
//   );
// };

// export default DelTodo;


