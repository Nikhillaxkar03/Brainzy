import Card from "./ui/Card"
import useContent from "../hooks/useContent"
import { SERVER_URL } from "../config";
import { useEffect, useState } from "react";
import Loader from "./ui/Loader";
const Container = () => {

  const {error, content, isLoading} = useContent(`${SERVER_URL}/content`);

  const [postContent, setPostContent] = useState([]);


  useEffect(()=> {
    setPostContent([...content])
}, [content, setPostContent]);

if(isLoading) {
  return <Loader />
}

  if(error || postContent.length === 0) {
    return <h1 className="text-2xl text-center my-10 text-gray-600">{error || "Data is not available"}</h1>
  }

  if(content.length === 0) {
    return <h1 className="text-2xl text-center my-10 text-gray-600">No data available!</h1>
  } 
  
  return (
    <div className="flex flex-wrap items-start">
      {
        postContent.map((item: any)=> {
          return (
          <Card key={item._id} setContent = {setPostContent} id = {item._id} titleIcon = {item.type} 
          type = {item.type} 
          titleHead = {item.title}
           cardbody = {item.link} />
          )
        })
      }
  </div>
  )
}

export default Container