import { FiYoutube } from "react-icons/fi";
import { iconProps, iconSizeVariants } from ".";

const YouTubeIcon = ({size}: iconProps) => {
    return <FiYoutube className={iconSizeVariants[size]} />
}

export default YouTubeIcon