import { useState } from "react";
import { TagCircle } from "../SVG/Icon";
import { Backlog, Cancelled, Done, InProgress, Todo } from "../SVG/Progress";
import { Priority, Progress } from "../TodoStatus";
import UpdateTodoSample from "../Models/UpdateTodo";


interface TodoInfo {
    id: String,
    title: String,
    tag: String,
    progress: Progress,
    priority: Priority,
    todoId: String
}

export function Card(props: TodoInfo) {
    const [showModal, setShowModal] = useState(false); 

    const handelerClick = () => {
        setShowModal(!showModal); 
    }

    return <div onClick={()=>{
        handelerClick()
    }}  className="rounded-md bg-white my-2 p-2 text-xs hover:bg-gray-100 cursor-pointer ">
        <div className="mx-1">
            <div className="flex justify-between text-gray-400">
                <div className="">Todo-{props.id}</div>

            </div>
            <div className="flex my-1 items-center">
                <div>
                    {
                        (props.progress == Progress.Todo && <div> <Todo /> </div>) ||
                        (props.progress == Progress.InProgress && <div> <InProgress /> </div>) ||
                        (props.progress == Progress.Done && <div> <Done /> </div>) ||
                        (props.progress == Progress.Cancelled && <div> <Cancelled /> </div>) ||
                        (props.progress == Progress.Backlog && <div> <Backlog /> </div>)
                    }
                </div>
                <div className="ms-3">{props.title} </div>
            </div>

            <div className="my-1.5 border-solid border-2 rounded-lg p-1 flex inline-block items-center" style={{ maxWidth: '200px' }}>
                <div><TagCircle /></div>
                <div className="ms-2 text-gray-400">{props.tag}</div>
            </div>
        </div>
       
            {showModal && (
                <UpdateTodoSample
                    isShow={showModal}
                    id={props.todoId}
                    title={props.title}
                    tag={props.tag}
                    progress={props.progress}
                    priority={props.priority}
                    onClose={() => setShowModal(false)} 
                />
            )}
    </div>
}

