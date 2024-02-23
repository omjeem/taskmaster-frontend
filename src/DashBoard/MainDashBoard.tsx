import { AppBar0 } from "../Components/AppBar0";
import { Introduction } from "../Components/Introduction";

export function MaindashBoard(){
    return (
        <div className="bg-gray-200 h-screen">
            <div>
                <AppBar0 />
            </div>
            <div className="bg-gray-200 justify-center h-screen">
                <Introduction />
            </div>
        </div>
    );
}