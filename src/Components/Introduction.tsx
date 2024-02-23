import SignUpModel from "../Models/SignUpModel";

 export function Introduction() {
    return (
        <div className="flex justify-center items-center text-center my-32">
            <div>
                <h1 className="m-4 text-4xl font-bold leading-tight tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black">
                    Organize your work <br/> and life, finally.
                </h1>
                <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-600 m-7">
                    Become focused, organized, and calm with TaskMaster. Your ultimate <br></br>  task manager and to-do list app..
                </p>
                <SignUpModel label={"Get Started"}/>
            </div>
        </div>
    );
}

export function CustomButton(props:any) {
    return <button onClick={props.onClick} type="button" className="  text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 me-2 ">{props.label}</button>
}
