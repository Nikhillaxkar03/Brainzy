import { GiBrain } from "react-icons/gi"

const Loader = () => {
  return (
    <div className="w-full h-full absolute flex justify-center backdrop-blur-md items-center top-0 left-0">
        <div className="flex flex-col justify-center items-center animate-spin">< GiBrain className="size-16 text-main-dark" /> 
            </div>
            </div>
  )
}

export default Loader