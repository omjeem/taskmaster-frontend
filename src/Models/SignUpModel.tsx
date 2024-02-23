import { useState } from "react";
import { CustomButton } from "../Components/Introduction";
import axios from "axios";
import { API } from "../API";
import {  Heading, InputBox, SubHeading } from "../Components/SubComponents";
import { Button } from "../Components/Button";
import { useRecoilState } from "recoil";
import { userDetail } from "../recoil/atom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SignUpModel({ label }: any) {
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [, setUserInfo] = useRecoilState(userDetail)
    const navigate = useNavigate()


    return (
        <>
            <Button label={label} onClick={() => setShowModal(true)} />
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">

                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className=" border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">


                                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                                    <Heading label={"Sign Up"} />
                                    <SubHeading label={"Enter your information to create an account"} />
                                    <InputBox onChange={(e: any) => {
                                        setEmail(e.target.value)
                                    }} placeholder="ex : om@gmail.com" label={"Email"} />
                                    <InputBox onChange={(e: any) => {
                                        setFirstName(e.target.value)
                                    }} placeholder="ex : Om" label={"First Name"} />
                                    <InputBox onChange={(e: any) => {
                                        setLastName(e.target.value)
                                    }} placeholder="ex : Mishra" label={"Last Name"} />
                                    <InputBox onChange={(e: any) => {
                                        setPassword(e.target.value)
                                    }} placeholder="ex : omjee@123" label={"Password"} />

                                    <div className="pt-4 p-2">
                                        <CustomButton onClick={async () => {
                                            if (email === "" || password === "" || firstName === "" || lastName === "") {
                                                alert("Please fill in all the fields")
                                                return
                                            }
                                            try {
                                                const response: any = await toast.promise(
                                                    axios.post(API + "api/user/signup", {
                                                        email: email,
                                                        password: password,
                                                        firstName: firstName,
                                                        lastName: lastName
                                                    }),
                                                    {
                                                        pending: "Loading... ⏳ This may take a while, approximately 50 seconds.",
                                                        success: 'Signed Up Successfull! 🎉',
                                                    }
                                                    , { autoClose: 2000, pauseOnHover: false, });
                                                localStorage.setItem("token", response.data.token)
                                                setUserInfo(response.data.userInfo)
                                                setShowModal(false);
                                                navigate("/dashboard")
                                            } catch (e: any) {
                                                try {
                                                    const status = e.response.status;
                                                    if (status == 500)toast.error("Email already exists. Please use a different email.");
                                                    else toast.error("User could not be created. Please try again later.");
                                                } catch (err) {
                                                    toast.warn("Server is down! Please try again later.");
                                                }
                                            }
                                        }} label={"Sign Up"} />
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
        </>
    );
}