import { IoCloseSharp } from "react-icons/io5"
import Input from "./ui/Input";
import Button from "./ui/Button";
import { useState, useRef} from "react";
import axios from "axios";
import { SERVER_URL } from "../config";
import { contentState } from "../atoms/atom";
import { useSetRecoilState } from "recoil";
import { fetchData } from "../api/content";
import toast from "react-hot-toast";


enum contentTypes {
  Youtube = 'youtube',
  Twitter = 'twitter',
  Article = 'article'
}

const AddContent = ({isOpen ,updateMenu}: {isOpen: boolean, updateMenu: ()=> void}) => {

  const setPostContent = useSetRecoilState(contentState);

  const titleRef = useRef();
  const linkRef = useRef();
  const [type, setType] = useState(contentTypes.Youtube)
  const [err, setErr] = useState('');

  async function handleSubmit (e: any) {
    e.preventDefault();

    const title = titleRef.current;
    const link = linkRef.current;

    console.log(title)
    console.log(link)
    console.log(type)

    if(!title || !link || !type) {
      setErr("Fill all the fields");
    }

    else{
      setErr('');
    }
    
   const data = {
    title: title,
    link: link,
    type: type
   }

    try{
      const response = await axios.post(`${SERVER_URL}/add-content`, data, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      if(response.status === 200) {
        toast.success("Content Added");
        ;(async ()=> {
          const data = await fetchData(`${SERVER_URL}/content`);
          if(data) {
            setPostContent(data);
          }
          else{
            console.log("cannot fetch data");
          }
        })();
        
        updateMenu();
      }
    }
    catch(e: any) {
      setErr(e.response.data.message)
    }
  }

  return (
    <div>
      {
        isOpen &&
        <div className="fixed ease-in-out h-screen flex w-screen justify-center items-center top-0 z-10 left-0 bg-black/80">
          <div className="h-screen w-screen flex justify-center items-center">
          <div className="bg-white min-w-96 w-[40%] relative rounded-lg">
          <span className="absolute text-gray-700 text-3xl top-4 right-4" onClick={()=> {
            updateMenu();
          }}><IoCloseSharp /></span>

          <form onSubmit = {handleSubmit} className="mt-10 mb-8 mx-6 gap-5 flex flex-col">
            <Input refer={titleRef} title = "Content Title" type="text" />
            <Input refer={linkRef} title = "Link" type="text" />
            <span className="content-start">
              <div className="flex mb-4 gap-2">
                <Button type = 'button' variant={(type === 'youtube') ? "primary" : "secondary"} size="md" text={'Youtube'} onClick={()=> setType(contentTypes.Youtube)}/>
                <Button type = 'button' variant={(type === 'twitter') ? "primary" : "secondary"} size="md" text={'Twitter'} 
                onClick={()=> setType(contentTypes.Twitter)}/>
                <Button type = 'button' variant={(type === 'article') ? "primary" : "secondary"} size="md" text={'Article'} onClick={()=> setType(contentTypes.Article)}/>
              </div>
              {err && <p className="text-red-600 text-sm my-2">{err}</p>}
            <Button text="Submit" type = "submit" variant = "primary" size="md"/>
            </span>
          </form>

          </div>
        </div>
        </div>
}
    </div>
  )
}

export default AddContent