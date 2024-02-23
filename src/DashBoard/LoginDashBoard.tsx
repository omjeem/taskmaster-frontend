import { AppBar0 } from "../Components/AppBar0";
import { Introduction } from "../Components/Introduction";

export function LoginDashBoard() {
    return <div className="bg-gray-200 h-full " >
        <div>
            <AppBar0 />
        </div>
        <div className=" justify-center h-screen">
            <Introduction />
        </div>

    </div>
}