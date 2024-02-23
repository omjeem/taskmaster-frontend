export function UserIcon(props: any) {
    return <div onClick={props.onClick} className="items-center rounded-full h-8 w-8 bg-slate-300 flex justify-center mt-1 mr-2">
        <div className="flex flex-col justify-center h-full text-xl">
            {props.name}
        </div>
    </div>
}

export function Plus() {
    return <div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 rounded-2xl hover:bg-gray-100 focus:outline-none focus:ring-3 focus:ring-gray-100">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
    </div>
}

export function ProgressBar() {
    return <div>
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    </div>
}

export function TagCircle() {
    return <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="#c8c1c1"
            d="M232 128A104 104 0 1 1 128 24a104.13 104.13 0 0 1 104 104" />
        </svg>
    </div>
}

export function ThreeDots() {
    return <div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 rounded-2xl  focus:outline-none focus:ring-3 focus:ring-gray-100">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
        </svg>
    </div>
}

