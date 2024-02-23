import { useState } from "react";
import { CustomButton } from "../Components/Introduction";
import axios from "axios";

import { useRecoilState } from "recoil";
import { todoListState } from "../recoil/atom";
import { Heading, InputBox, RadioVerticalList, SubHeading } from "../Components/SubComponents";
import { Button } from "../Components/Button";
import { toast } from "react-toastify";

const API = import.meta.env.VITE_API_URL;
export default function AddNewTodo() {
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState();
    const [tag, setTag] = useState("")
    const [, setTodoList] = useRecoilState(todoListState);


    const handleRadioChange = (selectedOption: any) => {
        setPriority(selectedOption);
    };

    return (
        <>
            <Button label="Add Todo" onClick={() => setShowModal(true)} />
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">

                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className=" border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">


                                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                                    <Heading label={"Add new Todo"} />
                                    <SubHeading label={"Inspire Your Journey: Add New Milestones!"} />
                                    <InputBox onChange={(e: any) => {
                                        setTitle(e.target.value)
                                    }} placeholder="ex : Coding" label={"Title"} />

                                    <InputBox onChange={(e: any) => {
                                        setTag(e.target.value)
                                    }} placeholder="ex : Web Dev" label={"Tag"} />


                                    <div className="text-sm font-medium text-left py-2">
                                        Priority
                                    </div>
                                    <RadioVerticalList onRadioChange={handleRadioChange} />
                                    <div className="pt-4 m-5 justify-center">
                                        <CustomButton onClick={async () => {
                                            if (title == "" || tag == "" || priority == null) {
                                                alert("Please choose all details")
                                                return
                                            }
                                            try {
                                                const response: any = await toast.promise(
                                                    axios.post(API + "api/todo/add", {
                                                        title: title,
                                                        tag: tag,
                                                        priority: priority,
                                                    }, {
                                                        headers: {
                                                            "Authorization": localStorage.getItem("token"),
                                                            "Content-Type": "application/json"
                                                        }
                                                    }),
                                                    {
                                                        pending: 'Adding a new todo...',
                                                        success: 'Todo added successfully! Best of luck 🌟'
                                                    }
                                                    , { autoClose: 2000, pauseOnHover: false, });
                                                setTodoList(response.data)

                                            } catch (err: any) {
                                                try {
                                                    const status = err.response.status;
                                                    if (status === 400) {
                                                        toast.error("Invalid Body")
                                                    }
                                                    else if (status === 403) {
                                                        toast.error("Unauthorized")
                                                    }
                                                    else if (status === 500) {
                                                        toast.error("Todo not added. Please try again later.")
                                                    }
                                                    else {
                                                        toast.error("Oops! Some internal error occurred. Please try again later.")
                                                    }
                                                } catch (e) {
                                                    toast.error("Oops! Some internal error occurred. Please try again later.")

                                                }
                                            } finally {
                                                setShowModal(false)
                                            }


                                        }}
                                            label={"Add Todo"} />

                                        <CustomButton onClick={() => {
                                            setShowModal(false)
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

