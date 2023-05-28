"use client"
import React, { useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import { RiAtLine } from 'react-icons/ri';
import { toast } from 'react-toastify';

// Import your custom styles for the toast
import 'react-toastify/dist/ReactToastify.css';

// shade_cn ui
import { Button } from "@/app/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label";
import { DialogClose } from '@radix-ui/react-dialog';

interface Todo {
  id: string;
  task: string;
}

interface UpdateTodoProps {
  todo: Todo;
}

function UpdateTodo({ todo }: UpdateTodoProps) {
  const [updateTodo, setUpdateTodo] = useState<Todo | undefined>(todo);
  const [loading, setLoading] = useState(false);

  if (todo && !updateTodo) {
    setUpdateTodo(todo);
    console.log("Data received in update", todo);
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateTodo({ ...updateTodo!, task: e.target.value });
  };

  const onClickUpdate = async () => {
    if (updateTodo) {
      setLoading(true);

      try {
        const response = await fetch(`/api/todo`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: updateTodo.id, task: updateTodo.task }),
        });

        if (!response.ok) {
          throw new Error('There is an issue with updating');
        }

        console.log(response);
        console.log("Todo updated:", updateTodo);
        toast.success("Todo updated successfully");
      } catch (error) {
        console.error(error);
        toast.error("Failed to update todo");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="hover:text-gray-600 text-black/60  font-medium cursor-pointer rounded-full shrink-0 justify-end items-center justify-items-center text-center">

      {updateTodo ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              {loading ? (
                <div className="animate-spin">
                  <RiAtLine className="h-7 w-7" />
                </div>
              ) : (
                <BiEdit className="h-7 w-7" />
              )}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit task</DialogTitle>
              <DialogDescription>
                Make changes to your task. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Task
                </Label>
                <Input name="task" value={updateTodo.task} onChange={onChange} className="col-span-3" />
              </div>
            </div>
            <DialogClose asChild>
              <Button type="button" onClick={onClickUpdate}>
                Save changes
              </Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              {loading ? (
                <div className="animate-spin">
                  <RiAtLine className="h-7 w-7" />
                </div>
              ) : (
                <BiEdit className="h-7 w-7" />
              )}
            </Button>
          </DialogTrigger>
        </Dialog>
      )}
    </div>
  );
}

export default UpdateTodo;

// import React, { useState } from 'react';
// import { BiEdit } from 'react-icons/bi';
// import { RiAtLine } from 'react-icons/ri';

// //  shade_cn ui
// import { Button } from "@/app/components/ui/button"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/app/components/ui/dialog"
// import { Input } from "@/app/components/ui/input"
// import { Label } from "@/app/components/ui/label";
// import { DialogClose } from '@radix-ui/react-dialog';

// interface Todo {
//   id: string;
//   task: string;
// }

// interface UpdateTodoProps {
//   todo: Todo;
// }

// function UpdateTodo({ todo }: UpdateTodoProps) {
 
//   const [updateTodo, setUpdateTodo] = useState<Todo | undefined>(todo);

//   if (todo && !updateTodo) {
//     setUpdateTodo(todo);
//     console.log("Data received in update", todo);
//   }

//   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setUpdateTodo({ ...updateTodo!, task: e.target.value });
//   };

//   const onClickUpdate = async () => {
//     if (updateTodo) {
//       try {
//         const response = await fetch(`/api/todo`, {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ id : updateTodo.id , task: updateTodo.task }),
//         });

//         if (!response.ok) {
//           throw new Error('There is an issue with updating');
//         }
//         console.log(response);
//         console.log("Todo updated:", updateTodo);
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   };

//   return (
//     <div className="hover:text-gray-600 text-black/60  font-medium cursor-pointer rounded-full shrink-0 justify-end items-center justify-items-center text-center">
      
//       {
//         updateTodo ? (
//           <Dialog  >
//           <DialogTrigger asChild>
//             <Button variant="outline"><BiEdit className="h-7 w-7" /></Button>
//           </DialogTrigger>
//           <DialogContent className="sm:max-w-[425px]">
//             <DialogHeader>
//               <DialogTitle>Edit task</DialogTitle>
//               <DialogDescription>
//                 Make changes to your task. Click save when you&aposre done.
//               </DialogDescription>
//             </DialogHeader>
//             <div className="grid gap-4 py-4">
              
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="username" className="text-right">
//                   Task
//                 </Label>
//                 <Input name="task" value={updateTodo.task} onChange={onChange}  className="col-span-3" />
//               </div>
//             </div>
//             <DialogClose asChild>
//               <Button type="button" onClick={onClickUpdate} >Save changes</Button>
//             </DialogClose>
//           </DialogContent>
//         </Dialog>
//         ) : (
//           <Dialog>
//             <DialogTrigger asChild>
//               <Button variant="outline"><BiEdit className="h-7 w-7" /></Button>
//             </DialogTrigger>
//           </Dialog>
//         )
//       }

//     </div>
//   );
// }

// export default UpdateTodo;

// import { Todo } from '@/lib/drizzle';
// import React, { useState } from 'react'
// import { BiEdit } from 'react-icons/bi';
// import { RxUpdate } from 'react-icons/rx';

// function UpdateTodo({ todo }: { todo: Todo }) {
//   const data = todo;
//   const [Updatetodo, setUpdateTodo] = useState<Todo | undefined>(data);
//   if(data){
//     setUpdateTodo(data)
//     console.log("data recieved in update",data)
//   }
//   const onChange = (e: any) => {
//     setUpdateTodo({ ...todo, task : "my updated task here" });
//   };
//   const onClickAdd = async () => {
//     if (data) {
//       const response = await fetch("/api/todo", {
//         method: "PUT",
//         body: JSON.stringify({ id : data.id , task : "updated task is here wow" }),
//       });
//       if(!response.ok) {
//         console.log("There is an issue with updated")
//       }
//       console.log(response);
//       console.log("todo updated ",Updatetodo)
      
//     }
//   };
//   return (
//     <div className='hover:text-gray-600 text-black/60 font-medium cursor-pointer  rounded-full shrink-0 justify-end items-center justify-items-center text-center '>
//        {/* <input
//         className="rounded-full w-full py-3.5 px-5 border focus:outline-secondry"
//         name="task"
//         placeholder="Enter your task ..."
//         value={todo.task as any}
//         onChange={onChange}
//       />
//      <BiEdit className='h-7 w-7' onClick={onClickAdd}/> */}
//       {
//         !Updatetodo ? (<BiEdit className='h-7 w-7'  />) : (<RxUpdate className='h-7 w-7' onClick={onClickAdd}/>)
//       }
//     </div>
//   )
// }

// export default UpdateTodo
