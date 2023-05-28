'use client'
import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type MessageType = "added" | "updated" | "deleted";

interface MsgToastProps {
  task: any;
  isLoading?: boolean;
  type: MessageType;
}

const MsgToast: React.FC<MsgToastProps> = ({ task, isLoading, type }) => {
  useEffect(() => {
    const notify = () => {
      if (isLoading) {
        toast("Processing ...");
      } else {
        toast.success(`Successfully ${type} ${task}`, {
          position: toast.POSITION.TOP_RIGHT,
          className: "text-red-500",
        });
      }
    };

    notify();
  }, [task, isLoading, type]);

  return <></>;
};

export default MsgToast;


// "use client"
// import React, { useEffect } from 'react';

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// export default function MsgToast( {task , isLoading , type} : {task : any, isLoading? : boolean, type : 'added' | 'updated' | 'deleted' } ){
  
    
//   const notify = () => {
//     if( isLoading ) {
//         toast('Processing ...');
//     }else {
//         toast.success(`Successfully ${type} ${task} `, {
//         position: toast.POSITION.TOP_RIGHT,
//         className: 'text-red-500'
//       })
//     }
//   }

//   useEffect(() => {
//     notify();
//   }, [task]);


//   return (
//     <ToastContainer />
//   )
// }
