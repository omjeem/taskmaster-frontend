import { useState } from "react";
import { CustomButton } from "../Components/Introduction";
import axios from "axios";
import { API } from "../API";
import { useRecoilState } from "recoil";
import { userDetail } from "../recoil/atom";
import { Heading, InputBox, SubHeading } from "../Components/SubComponents";
import { UserIcon } from "../SVG/Icon";
import { toast } from "react-toastify";

export default function UpdateProfile() {
    const [showModal, setShowModal] = useState(false);
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [userInfo, setuserInfo] = useRecoilState(userDetail)


    return (
        <div className="hover:cursor-pointer	">
            <UserIcon onClick={() => {
                setShowModal(true)
            }} name={userInfo.firstName[0]} />
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">

                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className=" border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">


                                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                                    <Heading label={"Enhance Your Profile"} />
                                    <SubHeading label={"Review and Update Your Profile Information"} />
                                    <CustomInputBox placeholder={userInfo.email} label={"Email"} />

                                    <InputBox onChange={(e: any) => {
                                        setFirstName(e.target.value)
                                    }} placeholder={userInfo.firstName} label={"FirstName"} />

                                    <InputBox onChange={(e: any) => {
                                        setLastName(e.target.value)
                                    }} placeholder={userInfo.lastName} label={"LastName"} />
                                    <InputBox onChange={(e: any) => {
                                        setPassword(e.target.value)
                                    }} placeholder="Enter New Password" label={"Password"} />

                                    <div className="pt-4 pb-3">
                                        <CustomButton onClick={async () => {
                                            if (firstName === "" && password === "" && lastName === "") {
                                                toast.warn("Please fill in at least one field for the update.");
                                                return
                                            }
                                            try {
                                                const response = await toast.promise(
                                                    axios.post(API + "api/user/update", {
                                                        ...(firstName && { firstName }),
                                                        ...(lastName && { lastName }),
                                                        ...(password && { password })
                                                    }, {
                                                        headers: {
                                                            "Authorization": localStorage.getItem("token"),
                                                            "Content-Type": "application/json"
                                                        }
                                                    }), {
                                                    pending: "Updating your profile",
                                                    success: "Profile Updated Successfully!",
                                                    error: "Profile not updated! Please try again later"
                                                }, {
                                                    autoClose: 2000, pauseOnHover: false,
                                                });
                                                setuserInfo(response.data)
                                            } catch (err) {

                                            } finally {
                                                setShowModal(false)
                                            }



                                        }}
                                            label={"Update"} />
                                        <CustomButton onClick={async () => {
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
        </div>
    );
}

function CustomInputBox({ label, placeholder, onChange: onChange }: any) {
    return <div>
        <div className="text-sm font-medium text-left py-2 ">
            {label}
        </div>
        <input readOnly onChange={onChange} placeholder={placeholder} className=" w-full px-2 py-1 border rounded border-slate-200" />
    </div>
}
