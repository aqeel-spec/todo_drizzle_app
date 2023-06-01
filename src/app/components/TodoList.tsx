"use client"
import { Todo } from '@/lib/drizzle';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AddTodo from './AddTodo';
import UpdateTodo from './UpdateTodo';
import { ToastContainer, toast } from 'react-toastify';
import { MdOutlineDeleteForever } from "react-icons/md";




const TodoList =  ({todos} : {todos : Todo[]} ) => {
  const { refresh } = useRouter();
  const data = todos;
  const [selectedTodo, setSelectedTodo] = useState<Todo | undefined>(undefined);
  const [updateTodo, setUpdateTodo] = useState<Todo | undefined>(undefined);
  
  const handleTodoClick = (item: Todo) => {
    setSelectedTodo(item);
    refresh();
  };
  const handleUpdate = (item : Todo) => {
    setUpdateTodo(item);
    refresh();
  }
 
  const deleteTodo = async (id : any) => {
    try {
      const res = await fetch(`/api/todo/${id}`, {
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
    } 
  };

  return (
    <div className='max-h-[360px] overflow-auto mb-4 px-4'>
      {data && data.length > 0 ? (
        data.map((item) => (
          <div
            key={item.id}
            className={`my-3  bg-gray-300 items-center gap-4 py-4 px-4 shadow rounded-lg flex ${
              item === selectedTodo ? 'bg-green-300' : ''
            }`}
          >
            {/* Circle */}
            <div className='h-3 w-3 bg-secondry rounded-full'></div>
            {/* Task title here */}
            <p className='text-lg font-medium'> {item.task} </p>
            {/** Icons to add and delete */}
           <div className="ml-auto flex gap-2">
             {/* update todo */}
             <div className=' relative  ' onClick={() => handleUpdate(item)}>
              {/** @ts-ignore */}
              <UpdateTodo todo={item === updateTodo ? item : undefined}/>
              {/* <DelTodo todo={item === selectedTodo ? item : undefined} /> */}
            </div>
            {/* delete todo is here */}
            <div className=' relative border-l-2 border-primary  ml-auto right-0 bg-red-200 ' onClick={() => handleTodoClick(item)}>
              {/** @ts-ignore */}
              {
                data.length > 3 && (
                  <button className="group"  onClick={() => deleteTodo (item.id)}>
                    <MdOutlineDeleteForever className='h-7 w-7 hover:text-red-500' />
                  </button>
                )
              }
            </div>
           </div>
            
            
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
     <ToastContainer  />
    </div>
  );
};

export default TodoList;




//             ****************************

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch(`http://localhost:3000/api/todo`, {
  //         method: "GET",
  //         cache: "no-store",
  //         headers: {
  //           "Content-Type": "application/json"
  //         }
  //       });

  //       if (!res.ok) {
  //         throw new Error("Failed to fetch data");
  //       }

  //       const result = await res.json();
  //       console.log("result is : ",result)
  //       setData(result);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchData();
  // }, [refresh]);
/********************* */



// "use client"
// import { Todo } from '@/lib/drizzle';
// import React, { useEffect, useState } from 'react'
// import DelTodo from './DelTodo';

// const getData = async () => {
    
//     try {
//         const res = await fetch(`http://localhost:3000/api/todo`,{
//             method : "GET",
//             cache:"no-store",
//             headers : {
//                 "Content-Type":"application/json"
//             }
//         });
//         if(!res.ok){
//             throw new Error("Failed to fetch data")
//         };
//         const result = await res.json()

//         return result
//     } catch (error) {
//         console.log(error)
//     }
// };

// const TodoList = async () => {

//    const data : Todo[] = await getData();
//    const [task, setTask] = useState<Todo>();

//    const addTodo = async (item : Todo) => {
//     setTask(item)
//    }

//    useEffect(() => {
//     const fetchTodo = async () => {
//       if (data) {
//         data.forEach(item => addTodo(item));
//       }
//     };
  
//     fetchTodo();
//   }, [data]); // Add 'data' as a dependency
    

//   return (
//     <div className='max-h-[360px] overflow-auto mb-4 px-4'>
//       {
//         data && 
//            data.map((item) => (
//             <div key={item.id} className='my-3 bg-gray-300 items-center gap-4 py-4 px-4 shadow rounded-lg flex'>
//                 {/** Circle  */}
//                 <div className="h-3 w-3 bg-secondry rounded-full"></div>
//                 {/** Task title here */}
//                 <p className='text-lg font-medium'> {item.task} </p>
//                 {/** delete todo is here */}
                
//                 <div className="" onClick={() => addTodo(item)}>
//                   {/* @ts-ignore */}
//                   <DelTodo todo={task} />
//                 </div>
                
//                 {/** update todo */}
//            </div>
//         ))
//       }
//     </div>
//   )
// }

// export default TodoList
