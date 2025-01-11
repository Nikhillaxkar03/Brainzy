import { ReactElement, useEffect, useState } from "react"
import ShareIcon from "../../assets/icons/ShareIcon.tsx"
import TrashIcon from "../../assets/icons/TrashIcon.tsx"
import YouTubeIcon from "../../assets/icons/YouTubeIcon.tsx"
import TwitterIcon from "../../assets/icons/TwitterIcon"
import DocumentIcon from "../../assets/icons/DocumentIcon"
import YouTubeEmbed from "./YouTubeEmbed.tsx"
import TwitterEmbed from "./TwitterEmbed.tsx"
import DefaultEmbed from "./DefaultEmbed.tsx"
import axios from "axios"
import { SERVER_URL } from "../../config.ts"
import toast from "react-hot-toast"

interface cardProps {
  titleIcon: string,
  titleHead: string,
  cardbody?: string,
  type?: 'youtube' | 'twitter' | 'article',
  tags?: ReactElement, 
  setContent?: (item: any) => void
  id?: string
}

const iconVariants: any = {
  youtube: <YouTubeIcon size="lg" />,
  twitter: <TwitterIcon size="lg" />,
  article: <DocumentIcon size="lg" />,
}


const Card = ({titleIcon, titleHead, cardbody, type, id, setContent}: cardProps) => {

  async function handleDelete() {
if(setContent) {
  setContent((prevItem : any) => {
 const filterArr = prevItem.filter((item: any)=> {
      return item._id !== id
    })
    toast.success("Post Removed")
    return filterArr;
  })
}
    
    try {
    const response = await axios.delete(`${SERVER_URL}/delete-content`, {
      headers: {
        token: localStorage.getItem('token'),
        contentId: id
    }});

    if(response.status === 200) {
      console.log(response)
    }
  }
  catch(err) {
    console.log(err)
  }
  }

  const [contentType, setContentType] = useState(<></>);

  useEffect(()=> {
    switch (type) {
      case 'youtube': {
        setContentType(<YouTubeEmbed link={cardbody}/>)
        break;
      }
      case 'twitter': {
        setContentType(<TwitterEmbed link={cardbody}/>)
        break;
      }
      default: {
        setContentType(<DefaultEmbed />)
        console.log("hd");
        break;
      }
    }
  }, [type])

 

  return (
    <div className="max-w-[20rem] m-5 border-[1px] border-gray-300 rounded-lg">
        <div className="flex mt-3 justify-between items-center">
        <div className="flex gap-3 pl-4 items-center">
        <span className="text-gray-500">{iconVariants[titleIcon]}</span>
        <h3 className="text-xl text-slate-800 font-semibold">{titleHead}</h3>
        </div>
        <div className="pr-4 gap-4 text-gray-500 flex">
            <span> <ShareIcon size = "md"/> </span>
            <span> <TrashIcon onClick = {handleDelete} size = "md"/> </span>
        </div>
        </div>
        <div className="py-4 px-2" >
          { contentType }
        </div>
    </div>
  )
}

export default Card