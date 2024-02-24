import { useState } from "react";
import { CustomButton } from "../Components/Introduction";
import { Heading, SubHeading } from "../Components/SubComponents";
import { Button } from "../Components/Button";
import Datepicker from "react-tailwindcss-datepicker";
import { toast } from "react-toastify";
import axios from "axios";
import { useRecoilState } from "recoil";
import { todoListState } from "../recoil/atom";

const API = import.meta.env.VITE_API_URL;

interface DateType {
    startDate: any,
    endDate: any
}


export default function DatePickerModel() {
    const [showModal, setShowModal] = useState(false);
    const [date, setDate] = useState<DateType>(); 
    const [, setTodo] = useRecoilState(todoListState)
    const currDate = new Date().toISOString().slice(0, 10).split('-').join('-');

    const handleDateChange = (newDate: DateType) => {
        setDate(newDate);
    }


    return (
        <>
            <Button label={date ? date.startDate : currDate} onClick={() => setShowModal(true)} />
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">

                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className=" border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">


                                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                                    <Heading label={"Explore Past Todos"} />
                                    <SubHeading label={"Discover your past tasks by selecting a date"} />

                                    <div>
                                        <DatePickerComponent setDate={handleDateChange} />
                                    </div>

                                    <div className="pt-4">
                                        <CustomButton onClick={async () => {
                                            if (date == null) {
                                                toast.warn("Please select the date")
                                                return;
                                            }
                                            try {
                                                if (date) {
                                                    const response: any = await toast.promise(
                                                        axios.post(API + "api/todo/date", {
                                                            specificDate: date
                                                        }, {
                                                            headers: {
                                                                "Authorization": localStorage.getItem("token"),
                                                                "Content-Type": "application/json"
                                                            }
                                                        })
                                                        , {
                                                            success: `Todos fetched successfully for ${date.startDate}! 🎉`,
                                                            pending: "Fetching Todos...", 
                                                        }, { autoClose: 2000 })

                                                    setTodo(response.data)
                                                }
                                            } catch (err: any) {
                                                try {
                                                    const status = err.response.status;
                                                    if (status === 404) {
                                                        toast.error(<div>
                                                            No todos available for <br />
                                                            {date.startDate} Create one now!
                                                        </div>)
                                                    }
                                                    else {
                                                        toast.error("Bad Request! Please try again.")
                                                    }
                                                } catch (error) {
                                                    toast.error("Oops! Server is down. Please try again.")
                                                }
                                            } finally {
                                                setShowModal(false)
                                            }


                                        }} label={"Search"} />
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


function DatePickerComponent({ setDate }: any) {
    const [value, setValue] = useState({
        startDate: null,
        endDate: null
    });

    const handleValueChange = (newValue: any) => {
        setValue(newValue);
        setDate(newValue)
    }

    return (
        <Datepicker
            useRange={false}
            asSingle={true}
            value={value}
            onChange={handleValueChange}
        />
    );
};


