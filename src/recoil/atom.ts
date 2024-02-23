
import { atom } from "recoil";
import { Priority, Progress } from "../TodoStatus";

interface TodoInfo {
    id: String,
    title: String,
    tag: String,
    progress: Progress,
    priority: Priority

}

interface UserDetail {
    email : string,
    firstName : string,
    lastName : string
}
export const todoListState = atom<TodoInfo[]>({
 key : "todoListState",
 default : []
});

export const isPriority = atom<Boolean>({
    key : "isPriority",
    default : false
});

export const userDetail = atom<UserDetail>({
    key : "userDetail",
    default : {
        email : "",
        firstName : "",
        lastName : ""
    }
});

