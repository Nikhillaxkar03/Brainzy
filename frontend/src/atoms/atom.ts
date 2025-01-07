import { atom } from "recoil";

const contentState = atom<any>({
    key: "content",
    default: []
})

export {contentState};