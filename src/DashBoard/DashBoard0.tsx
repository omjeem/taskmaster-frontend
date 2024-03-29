import { useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

export function DashBoard0() {
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            navigate("/main")
        }
        else {
            axios.get(API + "api/user/", {
                headers: {
                    "Authorization": token,
                    "Content-Type": "application/json"
                }
            }).then(() => {
                navigate("/dashboard")
            }).catch(() => {
                navigate("/main")

            })
        }

    }, [navigate])
    return <div className="flex justify-center items-center h-full pb-40">
        <div className="text-center items-center pt-48">
            <h2 className="text-3xl font-bold mb-2">Thank you for your patience as we retrieve your details.<br></br> Our backend operates on a serverless cloud provider,<br></br> which may require additional time for the initial server activation.</h2>
        </div>
    </div>


}

