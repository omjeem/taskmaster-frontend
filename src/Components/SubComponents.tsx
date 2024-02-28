export function Heading({ label }: any) {
    return <div className="font-bold text-4xl pt-6">
        {label}
    </div>
}

export function SubHeading({ label }: any) {
    return <div className="text-slate-500 text-md pt-1 px-4 pb-4">
        {label}
    </div>
}

export function InputBox({ label, placeholder, onChange: onChange, value }: any) {
    return <div>
        <div className="text-sm font-medium text-left py-2 ">
            {label}
        </div>
        <input onChange={onChange} value={value} placeholder={placeholder} className=" w-full px-2 py-1 border rounded border-slate-200" />
    </div>
}

import { Link } from "react-router-dom"

export function BottomWarning({ label, buttonText, to, onClick }: any) {
    return <div onClick={onClick} className="py-2 text-sm flex justify-center">
        <div>
            {label}
        </div>
        <Link className="pointer underline pl-1 cursor-pointer" to={to}>
            {buttonText}
        </Link>
    </div>
}





import {
    Radio,
    Card,
    List,
    ListItem,
    ListItemPrefix,
    Typography,
} from "@material-tailwind/react";
import { Priority, Progress } from "../TodoStatus"
import { useState } from "react"

export function RadioVerticalList({ onRadioChange }: any) {

    // Handler function to update the selected option
    const handleOptionChange = (event: any) => {
        onRadioChange(event.target.id)
    };
    return (
        <Card>
            <List>
                <div className="flex">


                    <ListItem className="p-1">
                        <label
                            htmlFor="vertical-list-react"
                            className="flex w-full cursor-pointer items-center  py-1"
                        >
                            <ListItemPrefix className="mr-1">
                                <Radio
                                    name="vertical-list"
                                    id="Urgent"
                                    onChange={handleOptionChange}
                                    ripple={false}
                                    className="hover:before:opacity-0"
                                    containerProps={{
                                        className: "p-0",
                                    }}
                                />
                            </ListItemPrefix>
                            <Typography
                                color="blue-gray"
                                className="font-medium text-blue-gray-400"
                            >
                                {Priority.Urgent}
                            </Typography>
                        </label>
                    </ListItem>
                    <ListItem className="p-0">
                        <label
                            htmlFor="vertical-list-vue"
                            className="flex w-full cursor-pointer items-center  py-2"
                        >
                            <ListItemPrefix className="mr-1">
                                <Radio
                                    name="vertical-list"
                                    id="High"
                                    onChange={handleOptionChange}
                                    ripple={false}
                                    className="hover:before:opacity-0"
                                    containerProps={{
                                        className: "p-0",
                                    }}
                                />
                            </ListItemPrefix>
                            <Typography
                                color="blue-gray"
                                className="font-medium text-blue-gray-400"
                            >
                                {Priority.High}
                            </Typography>
                        </label>
                    </ListItem>
                    <ListItem className="p-0">
                        <label
                            htmlFor="vertical-list-svelte"
                            className="flex w-full cursor-pointer items-center  py-2"
                        >
                            <ListItemPrefix className="mr-1">
                                <Radio
                                    name="vertical-list"
                                    id="Medium"
                                    onChange={handleOptionChange}
                                    ripple={false}
                                    className="hover:before:opacity-0"
                                    containerProps={{
                                        className: "p-0",
                                    }}
                                />
                            </ListItemPrefix>
                            <Typography
                                color="blue-gray"
                                className="font-medium text-blue-gray-400"
                            >
                                {Priority.Medium}
                            </Typography>
                        </label>
                    </ListItem>
                </div>
                <div className="flex mx-7">


                    <ListItem className="p-0 items-center">
                        <label
                            htmlFor="vertical-list-react"
                            className="flex w-full cursor-pointer items-center  py-2"
                        >
                            <ListItemPrefix className="mr-1">
                                <Radio
                                    name="vertical-list"
                                    id="Low"
                                    onChange={handleOptionChange}
                                    ripple={false}
                                    className="hover:before:opacity-0"
                                    containerProps={{
                                        className: "p-0",
                                    }}
                                />
                            </ListItemPrefix>
                            <Typography
                                color="blue-gray"
                                className="font-medium text-blue-gray-400"
                            >
                                {Priority.Low}
                            </Typography>
                        </label>
                    </ListItem>
                    <ListItem className="p-0">
                        <label
                            htmlFor="vertical-list-vue"
                            className="flex w-full cursor-pointer items-center py-2"
                        >
                            <ListItemPrefix className="mr-1">
                                <Radio
                                    name="vertical-list"
                                    id="NoPriority"
                                    onChange={handleOptionChange}
                                    ripple={false}
                                    className="hover:before:opacity-0"
                                    containerProps={{
                                        className: "p-0",
                                    }}
                                />
                            </ListItemPrefix>
                            <Typography
                                color="blue-gray"
                                className="font-medium text-blue-gray-400"
                            >
                                {Priority.NoPriority}
                            </Typography>
                        </label>
                    </ListItem>

                </div>
            </List>
        </Card>
    );
}


interface RadioVerticalProgressListProps {
    onRadioChange: (selectedOption: string) => void;
    defaultProgress: Progress;
}


export function RadioVerticalProgressList({ onRadioChange, defaultProgress }: RadioVerticalProgressListProps) {

    const [progress, setProgress] = useState(defaultProgress)
    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedOption = event.target.id;
        if (event.target.id === "Todo") setProgress(Progress.Todo)
        else if (event.target.id === "InProgress") setProgress(Progress.InProgress)
        else if (event.target.id === "Done") setProgress(Progress.Done)
        else if (event.target.id === "Cancelled") setProgress(Progress.Cancelled)
        else setProgress(Progress.Backlog)
        onRadioChange(selectedOption);
    };
    return (
        <Card>
            <List>
                <div className="flex justify-between">


                    <ListItem className="p-1">
                        <label
                            htmlFor="vertical-list-react"
                            className="flex w-full cursor-pointer items-center  py-1"
                        >
                            <ListItemPrefix className="mr-1">
                                <Radio
                                    name="vertical-list"
                                    id="Todo"
                                    checked={progress === Progress.Todo}
                                    onChange={handleOptionChange}
                                    ripple={false}
                                    className="hover:before:opacity-0"
                                    containerProps={{
                                        className: "p-0",
                                    }}
                                />
                            </ListItemPrefix>
                            <Typography
                                color="blue-gray"
                                className="font-medium text-blue-gray-400"
                            >
                                {Progress.Todo}
                            </Typography>
                        </label>
                    </ListItem>
                    <ListItem className="p-0">
                        <label
                            htmlFor="vertical-list-vue"
                            className="flex w-full cursor-pointer items-center  py-2"
                        >
                            <ListItemPrefix className="mr-1">
                                <Radio
                                    name="vertical-list"
                                    id="InProgress"
                                    checked={progress === Progress.InProgress}

                                    onChange={handleOptionChange}
                                    ripple={false}
                                    className="hover:before:opacity-0"
                                    containerProps={{
                                        className: "p-0",
                                    }}
                                />
                            </ListItemPrefix>
                            <Typography
                                color="blue-gray"
                                className="font-medium text-blue-gray-400"
                            >
                                {Progress.InProgress}
                            </Typography>
                        </label>
                    </ListItem>
                    <ListItem className="p-0">
                        <label
                            htmlFor="vertical-list-svelte"
                            className="flex w-full cursor-pointer items-center  py-2"
                        >
                            <ListItemPrefix className="mr-1">
                                <Radio
                                    name="vertical-list"
                                    id="Done"
                                    checked={progress === Progress.Done}

                                    onChange={handleOptionChange}
                                    ripple={false}
                                    className="hover:before:opacity-0"
                                    containerProps={{
                                        className: "p-0",
                                    }}
                                />
                            </ListItemPrefix>
                            <Typography
                                color="blue-gray"
                                className="font-medium text-blue-gray-400"
                            >
                                {Progress.Done}
                            </Typography>
                        </label>
                    </ListItem>
                </div>
                <div className="flex mx-7">


                    <ListItem className="p-0 items-center">
                        <label
                            htmlFor="vertical-list-react"
                            className="flex w-full cursor-pointer items-center  py-2"
                        >
                            <ListItemPrefix className="mr-1">
                                <Radio
                                    name="vertical-list"
                                    id="Cancelled"
                                    checked={progress === Progress.Cancelled}

                                    onChange={handleOptionChange}
                                    ripple={false}
                                    className="hover:before:opacity-0"
                                    containerProps={{
                                        className: "p-0",
                                    }}
                                />
                            </ListItemPrefix>
                            <Typography
                                color="blue-gray"
                                className="font-medium text-blue-gray-400"
                            >
                                {Progress.Cancelled}
                            </Typography>
                        </label>
                    </ListItem>
                    <ListItem className="p-0">
                        <label
                            htmlFor="vertical-list-vue"
                            className="flex w-full cursor-pointer items-center py-2"
                        >
                            <ListItemPrefix className="mr-1">
                                <Radio
                                    name="vertical-list"
                                    id="Backlog"
                                    checked={progress === Progress.Backlog}

                                    onChange={handleOptionChange}
                                    ripple={false}
                                    className="hover:before:opacity-0"
                                    containerProps={{
                                        className: "p-0",
                                    }}
                                />
                            </ListItemPrefix>
                            <Typography
                                color="blue-gray"
                                className="font-medium text-blue-gray-400"
                            >
                                {Progress.Backlog}
                            </Typography>
                        </label>
                    </ListItem>

                </div>
            </List>
        </Card>
    );
}