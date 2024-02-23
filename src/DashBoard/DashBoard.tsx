import { useRecoilState, useRecoilValue } from "recoil";
import { isPriority, todoListState, userDetail } from "../recoil/atom";
import { useEffect } from "react";
import axios from "axios";
import { API } from "../API";
import { AppBar } from "../Components/AppBar";
import { PriorityDashboard } from "./PriorityDashboard";
import { ProgressDashboard } from "./ProgressDashBoard";

export function Dashboard() {
   const [todoList, setTodoList] = useRecoilState(todoListState);
   const [, setUserInfo] = useRecoilState(userDetail)
   const isPriorityScreen = useRecoilValue(isPriority);

   useEffect(() => {
       axios.get(API+"api/todo/", {
           headers: {
               "Authorization": localStorage.getItem("token"),
               "Content-Type": "application/json"
           }
       }).then((response) => {
           setTodoList(response.data.todo)
           setUserInfo(response.data.userInfo)
       }).catch((error) => {
           console.error("Error is " + error);
       });
   }, []);


   return (
       <div className="bg-gray-200 h-screen">
           <AppBar />
           <div className='bg-gray-200 h-screen'>
               {
                   isPriorityScreen ? <PriorityDashboard todoList={todoList} /> : <ProgressDashboard todoList={todoList} />
               }
           </div>
       </div>
   )
}