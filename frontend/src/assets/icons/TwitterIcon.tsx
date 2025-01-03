import { FiTwitter } from "react-icons/fi"
import { iconProps, iconSizeVariants } from ".";

const TwitterIcon = ({size}: iconProps) => {
  return ( <FiTwitter className = {iconSizeVariants[size]} />
  )
}

export default TwitterIcon