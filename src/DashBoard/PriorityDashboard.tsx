import { ThreeDots } from "../SVG/Icon";
import { HighPriority, LowPriority, MediumPriority, UrgentPriority } from "../SVG/Priority";
import { Progress, Priority } from "../TodoStatus"
import { Card } from "../Components/Card";

interface TodoInfo {
    id: String,
    title: String,
    tag: String,
    progress: Progress,
    priority: Priority

}

export function PriorityDashboard({ todoList }: { todoList: TodoInfo[] }) {

    const urgentList = todoList.filter(todo => todo.priority == Priority.Urgent);
    const highList = todoList.filter(todo => todo.priority == Priority.High)
    const mediumList = todoList.filter(todo => todo.priority == Priority.Medium)
    const lowList = todoList.filter(todo => todo.priority == Priority.Low)
    const noPriorityList = todoList.filter(todo => todo.priority == Priority.NoPriority)

    return (
        <>
            {todoList.length != 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 justify-between p-3">
                    <PriorityColumn priority={Priority.Urgent} count={urgentList.length} todo={urgentList} />
                    <PriorityColumn priority={Priority.High} count={highList.length} todo={highList} />
                    <PriorityColumn priority={Priority.Medium} count={mediumList.length} todo={mediumList} />
                    <PriorityColumn priority={Priority.Low} count={lowList.length} todo={lowList} />
                    <PriorityColumn priority={Priority.NoPriority} count={noPriorityList.length} todo={noPriorityList} />
                </div>
            ) : (
                <div className="flex justify-center items-center h-full pb-40">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-2">No Tasks Assigned Yet!</h2>
                        <p className="text-gray-600">Seize the day! It's a new opportunity to achieve great things. Let's make today count! 🚀</p>
                    </div>
                </div>
            )}
        </>
    );

}

 function PriorityColumn(props: any) {

    const list = props.todo
    return <div className="mx-3">
        <div className="flex justify-between my-5">
            <div className="flex items-center text-xs ms-1 ">
                {
                    (props.priority == Priority.Urgent) && (<div>
                        <UrgentPriority />
                    </div>) ||
                    (props.priority == Priority.High) && (<div>
                        <HighPriority />
                    </div>) ||
                    (props.priority == Priority.Medium) && (<div>
                        <MediumPriority />
                    </div>) ||
                    (props.priority == Priority.Low) && (<div>
                        <LowPriority />
                    </div>) ||
                    (props.priority == Priority.NoPriority) && (<div>
                        <ThreeDots />
                    </div>)
                }
                <div className="ms-2 font-normal ">{props.priority}</div>
                <div className="ms-2 font-thin ">{props.count}</div>

            </div>
            <div className="flex">
              
            </div>
        </div>
        {
            list.map((res: TodoInfo ,index:number) => (<Card todoId={res.id}  id={(index+1).toString()} title={res.title} tag={res.tag}
                progress={res.progress} priority={res.priority} />))
        }

    </div>
}

