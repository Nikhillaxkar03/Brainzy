import { HiOutlineDocumentText } from "react-icons/hi"
import { iconSizeVariants, iconProps } from "."

const DocumentIcon = ({size}: iconProps) => {
  return (
   <HiOutlineDocumentText className = {iconSizeVariants[size]}/>
  )
}

export default DocumentIcon