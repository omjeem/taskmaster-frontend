import { useRecoilState } from "recoil";
import { Button } from "./Button";

import { isPriority, todoListState, userDetail } from "../recoil/atom";
import { useNavigate } from "react-router-dom";
import AddTodoSample from "../Models/AddNewTodo";
import { toast } from "react-toastify";
import UpdateProfile from "../Models/UpdateProfile";
import DatePickerModel from "../Models/DatePickerModel";

export function AppBar() {
    const [isPriorityScreen, setPriorityScreen] = useRecoilState(isPriority);
    const [userInfo,setuserInfo] = useRecoilState(userDetail);
    const [, setTodo] = useRecoilState(todoListState)
    const navigate = useNavigate()

    return <div className="rounded-lg bg-white  p-1 ">
        <div className="flex justify-between items-center">
            <div className="text-xl font-bold ms-2">TaskMaster</div>
            <div className="flex items-center">
                <div className="text-sm mx-3">Hello, {userInfo.firstName}</div>
                <UpdateProfile/>
                {
                    isPriorityScreen ? (
                        <div>
                            <Button onClick={() => {
                                if (isPriorityScreen) setPriorityScreen(false)
                                else setPriorityScreen(true)
                            }} label={"Priority"} />
                        </div>
                    ) : (
                        <div>
                            <Button onClick={() => {
                                if (isPriorityScreen) setPriorityScreen(false)
                                else setPriorityScreen(true)
                            }} label={"Progress"} />
                        </div>
                    )
                }

                <div>
                    <AddTodoSample />
                </div>
                <div>
                    <DatePickerModel/>
                </div>
                <div>
                    <Button onClick={() => {
                        const confirmLogout = window.confirm("Are you sure you want to logout?");
                        if (confirmLogout) {
                            toast.success("Logout Successfully")
                            localStorage.removeItem("token");
                            setuserInfo({email:"",firstName:"",lastName:""})
                            setTodo([])
                            
                            navigate("/");
                        }
                    }} label={"LogOut"} />
                </div>
            </div>
        </div>
    </div>
}