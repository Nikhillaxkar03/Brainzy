import { ReactElement } from "react";
import { contentState } from "../../atoms/atom";
import { useRecoilState } from "recoil";

interface sideMenuProps {
    itemIcon: ReactElement,
    title: string
}

const SideMenuItem = ({itemIcon, title} :sideMenuProps) => {

    const itemType: any = {
        Tweets: 'twitter',
        Videos: 'youtube',
        Documents: 'article'
    }

    const [content, setContent] = useRecoilState(contentState);

    return <div
    onClick = {()=> setContent(content.filter((item: any)=> {
            return item.type === itemType[title];
        } ))
    }
     className="p-4 px-2 mx-10 my-4 gap-6 text-gray-700 text-xl cursor-pointer flex items-center transition-all duration-200
    hover:text-main-dark hover:scale-125">
        <span>{itemIcon}</span>
         <div>{title}</div>
    </div>
}


export default SideMenuItem;