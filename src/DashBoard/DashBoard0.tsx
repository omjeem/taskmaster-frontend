import { useEffect } from "react";
import axios from "axios";
import { API } from "../API";
import { useNavigate } from "react-router-dom";


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
    return <div>
        Loading...
    </div>;

}

