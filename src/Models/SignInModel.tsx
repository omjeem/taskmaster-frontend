import { useState } from "react";
import { CustomButton } from "../Components/Introduction";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userDetail } from "../recoil/atom";
import { Heading, InputBox, SubHeading } from "../Components/SubComponents";
import { Button } from "../Components/Button";
import { toast } from "react-toastify";

const API = import.meta.env.VITE_API_URL;


export default function SigInModel() {
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const [, setuserInfo] = useRecoilState(userDetail)


    return (
        <>
            <Button label="Sign In" onClick={() => setShowModal(true)} />
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">

                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className=" border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">


                                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                                    <Heading label={"Sign In"} />
                                    <SubHeading label={"Enter your credentials to access your account"} />
                                    <InputBox onChange={(e: any) => {
                                        setEmail(e.target.value)
                                    }} placeholder="ex : om@gmail.com" label={"Email"} />

                                    <InputBox onChange={(e: any) => {
                                        setPassword(e.target.value)
                                    }} placeholder="ex: omjee@123" label={"Password"} />

                                    <div className="pt-4 pb-2">
                                        <CustomButton onClick={async () => {
                                            if (email === "" || password === "") {
                                                toast.warn("Please fill in all the fields")
                                                return
                                            }
                                            try {
                                                const response: any = await toast.promise(
                                                    axios.post(API + "api/user/signin", {
                                                        email: email,
                                                        password: password
                                                    }),
                                                    {
                                                        pending: "Loading... ⏳ Please be patient as we process your request. It may take a few moments.",
                                                        success: 'Logged In Successfully! 🎉'
                                                    }
                                                    , { autoClose: 2000, pauseOnHover: false, });
                                                localStorage.setItem("token", response.data.token)
                                                setuserInfo(response.data.userInfo)
                                                navigate("/dashboard")
                                            } catch (e: any) {
                                                try {
                                                    const status = e.response.status
                                                    if (status == 401) {
                                                        toast.error("User not found or invalid email/password combination.");

                                                    }
                                                    else {
                                                        toast.error("Oops! Some internal error occurred. Please try again later.");
                                                    }
                                                } catch (err) {
                                                    toast.error("Server is down! Please try again later 🥺");
                                                }
                                            }
                                        }}
                                            label={"Sign In"} />
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