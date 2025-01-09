import { atom } from "recoil";

const contentState = atom<any>({
    key: "content",
    default: []
})

const contentTypeState = atom<string | undefined>({
    key: "contentType",
    default: 'home'
})

export {contentState, contentTypeState};