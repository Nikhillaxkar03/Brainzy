import { FaRegTrashCan } from "react-icons/fa6";
import { iconProps, iconSizeVariants } from ".";

const TrashIcon = ({size, onClick}: iconProps) => {
    return <FaRegTrashCan onClick={onClick} className = {iconSizeVariants[size]} />
}

export default TrashIcon