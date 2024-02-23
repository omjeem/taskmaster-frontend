import SignInModel from "../Models/SignInModel"
import SignUpModel from "../Models/SignUpModel"

export function AppBar0() {
     return <div className="rounded-lg bg-white   p-2">
    <div className="flex justify-between items-center">
        <div className="text-xl font-bold ms-2">TaskMaster</div>
        <div className="flex justify-center items-center">
            
            <div>
                <SignInModel/>
            </div>
            <div>
                <SignUpModel label={"Sign Up"}/>
            </div>
           
           
        </div>
    </div>
</div>
}

