import { Backlog, Cancelled, Done, InProgress, Todo } from "../SVG/Progress";
import { Progress, Priority } from "../TodoStatus"
import { Card } from "../Components/Card";


interface TodoInfo {
    id: String,
    title: String,
    tag: String,
    progress: Progress,
    priority: Priority

}

export function ProgressDashboard({ todoList }: { todoList: TodoInfo[] }) {

    const todoListTodo = todoList.filter(todo => todo.progress === Progress.Todo);
    const todoListInProgress = todoList.filter(todo => todo.progress === Progress.InProgress);
    const todoListDone = todoList.filter(todo => todo.progress === Progress.Done);
    const todoListCancelled = todoList.filter(todo => todo.progress === Progress.Cancelled);
    const todoListBacklog = todoList.filter(todo => todo.progress === Progress.Backlog);


    return <>
        {
            todoList.length != 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 justify-between p-3">
                    <ProgressColumn progress={Progress.Todo} count={todoListTodo.length} todo={todoListTodo} />
                    <ProgressColumn progress={Progress.InProgress} count={todoListInProgress.length} todo={todoListInProgress} />
                    <ProgressColumn progress={Progress.Done} count={todoListDone.length} todo={todoListDone} />
                    <ProgressColumn progress={Progress.Cancelled} count={todoListCancelled.length} todo={todoListCancelled} />
                    <ProgressColumn progress={Progress.Backlog} count={todoListBacklog.length} todo={todoListBacklog} />
                </div>
            ) : (
                <div className="flex justify-center items-center h-full pb-40">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-2">No Tasks Assigned Yet!</h2>
                        <p className="text-gray-600">Seize the day! It's a new opportunity to achieve great things. Let's make today count! 🚀</p>
                    </div>
                </div>
            )
        }

    </>
}



export function ProgressColumn(props: any) {

    const list = props.todo
    return <div className="mx-3">
        <div className="flex justify-between my-5">
            <div className="flex items-center text-xs ms-1 ">
                {
                    (props.progress == Progress.InProgress) && (<div>
                        <InProgress />
                    </div>) ||
                    (props.progress == Progress.Cancelled) && (<div>
                        <Cancelled />
                    </div>) ||
                    (props.progress == Progress.Done) && (<div>
                        <Done />
                    </div>) ||
                    (props.progress == Progress.Todo) && (<div>
                        <Todo />  
                    </div>) ||
                    (props.progress == Progress.Backlog) && (<div>
                        <Backlog />  
                    </div>)

                }
                <div className="ms-2 font-normal ">{props.progress}</div>
                <div className="ms-2 font-thin ">{props.count}</div>

            </div>
            <div className="flex">
                
            </div>
        </div>
        {
            list.map((res: TodoInfo, index: number) => (<Card todoId={res.id} id={(index + 1).toString()} title={res.title} tag={res.tag}
                progress={res.progress} priority={res.priority} />))
        }

    </div>
}