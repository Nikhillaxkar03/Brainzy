import { ReactElement } from "react";
import { useSetRecoilState } from "recoil";
import { contentTypeState } from "../../atoms/atom";

interface sideMenuProps {
    itemIcon: ReactElement,
    title: string
    type?: string
}

const SideMenuItem = ({itemIcon, title, type} :sideMenuProps) => {

    const setType = useSetRecoilState(contentTypeState);


    return <div
    onClick = {()=> setType(type)}
     className="p-4 px-2 mx-10 my-4 gap-6 text-gray-700 text-xl cursor-pointer flex items-center transition-all duration-200
    hover:text-main-dark hover:scale-125">
        <span>{itemIcon}</span>
         <div>{title}</div>
    </div>
}


export default SideMenuItem;