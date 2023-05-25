import { Todo } from '@/lib/drizzle';
import React, { useEffect, useState } from 'react';
import DelTodo from './DelTodo';
import { useRouter } from 'next/navigation';
import AddTodo from './AddTodo';
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

const BackupList =  () => {
  const { refresh } = useRouter();
  
  const [data, setData] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | undefined>(undefined);
   useEffect(() => {

    async function fetchTodo() {
      const res: Todo[]  = await getData();
      setData(res);
      console.log("resuult todolist is :",res)
    }
    fetchTodo();
   },[])
  
   

  const handleTodoClick = (item: Todo) => {
    setSelectedTodo(item);
    refresh();
  };

  return (
    <div className='max-h-[360px] overflow-auto mb-4 px-4'>
      {data.length > 0 ? (
        data.map((item) => (
          <div
            key={item.id}
            className={`my-3 bg-gray-300 items-center gap-4 py-4 px-4 shadow rounded-lg flex ${
              item === selectedTodo ? 'bg-green-300' : ''
            }`}
          >
            {/* Circle */}
            <div className='h-3 w-3 bg-secondry rounded-full'></div>
            {/* Task title here */}
            <p className='text-lg font-medium'> {item.task} </p>
            {/* delete todo is here */}
            <div className='' onClick={() => handleTodoClick(item)}>
              {/** @ts-ignore */}
              <DelTodo todo={item === selectedTodo ? item : undefined} />
            </div>
            {/* update todo */}
            
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
     
    </div>
  );
};

export default BackupList;