import axios from "axios";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { todoListState } from "../recoil/atom";
import { Priority, Progress } from "../TodoStatus";
import { CustomButton } from "../Components/Introduction";
import { toast } from "react-toastify";
import { Heading,InputBox, RadioVerticalProgressList, SubHeading } from "../Components/SubComponents";

const API = import.meta.env.VITE_API_URL;
interface TodoInfo {
    id: String,
    title: String,
    tag: String,
    progress: Progress,
    priority: Priority,
    isShow: boolean,
    onClose: () => void

}
export default function UpdateTodo(props: TodoInfo) {
    const [showModal, setShowModal] = useState(props.isShow);
    const [title, setTitle] = useState("");
    const [tag, setTag] = useState("");
    const [, setTodoList] = useRecoilState(todoListState);
    const [progress, setProgress] = useState("");

    const handleRadioChange = (selectedOption: any) => {
        setProgress(selectedOption);
    };


    const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation(); // Prevent click event from bubbling up to parent
    };

    return (
        <>

            {showModal ? (
                <>
                    <div onClick={handleModalClick}
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className=" border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">


                                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                                    <Heading label={"Schedule Task Renewal"} />
                                    <SubHeading label={"Polish Your Agenda: Perfect Your Schedule!"} />
                                    <InputBox onChange={(e: any) => {
                                        setTitle(e.target.value)
                                    }} placeholder={props.title} label={"Title"} />

                                    <InputBox onChange={(e: any) => {
                                        setTag(e.target.value)
                                    }} placeholder={props.tag} label={"Tag"} />


                                    <div className="text-sm font-medium text-left py-2">
                                        Progress
                                    </div>
                                    <RadioVerticalProgressList defaultProgress={props.progress} onRadioChange={handleRadioChange} />
                                    <div className=" flex m-5 justify-center">
                                        <CustomButton onClick={async () => {
                                            if (title == "" && tag == "" && progress == null) {
                                                toast.warn("Please fill in at least one field for the update.");
                                                return
                                            }
                                            try {
                                                const response: any = await toast.promise(
                                                    axios.post(API + "api/todo/update", {
                                                        id: props.id,
                                                        ...(title && { title }),
                                                        ...(tag && { tag }),
                                                        ...(progress && { progress })
                                                    }, {
                                                        headers: {
                                                            "Authorization": localStorage.getItem("token"),
                                                            "Content-Type": "application/json"
                                                        }
                                                    }), {
                                                    pending: "Updating your todo...",
                                                    success: "Todo Updated Successfully!",
                                                    error: "Oops! You cannot update todos for previous dates."

                                                }, {
                                                    autoClose: 2000, pauseOnHover: false,
                                                });
                                                setTodoList(response.data)
                                            } catch (err) {

                                            } finally {
                                                setShowModal(false)
                                                props.onClose()
                                            }

                                        }}
                                            label={"Update"} />

                                        <CustomButton onClick={async () => {
                                            const isDelete = window.confirm("Are you sure you want to delete this todo?");
                                            if (isDelete) {
                                                try {
                                                    const response: any = await toast.promise(
                                                        axios.post(API + "api/todo/delete", {
                                                            id: props.id
                                                        }, {
                                                            headers: {
                                                                "Authorization": localStorage.getItem("token"),
                                                                "Content-Type": "application/json"
                                                            }
                                                        })
                                                        , {
                                                            pending: "Deleting your todo...",
                                                            success: "Todo deleted successfully!",
                                                            error: "Oops! You cannot delete todos for previous dates."

                                                        }, {
                                                        autoClose: 2000
                                                    }
                                                    )
                                                    setTodoList(response.data)
                                                } catch (err) {

                                                } finally {
                                                    setShowModal(false)
                                                    props.onClose()
                                                }


                                            }


                                        }} label={"Delete"} />

                                        <CustomButton onClick={() => {
                                            setShowModal(false)
                                            props.onClose()
                                        }} label={"Cancel"} />
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}