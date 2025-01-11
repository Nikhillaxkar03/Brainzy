import Card from "./ui/Card";
import useContent from "../hooks/useContent";
import { SERVER_URL } from "../config";
import { useEffect} from "react";
import Loader from "./ui/Loader";
import Share from "./Share";
import { contentState, contentTypeState } from "../atoms/atom";
import { useRecoilState, useRecoilValue } from "recoil";
const Container = ({isShare}: {isShare: Boolean}) => {
  const { error, content, isLoading } = useContent(`${SERVER_URL}/content`);

  const [postContent, setPostContent] = useRecoilState(contentState);

  const value = useRecoilValue(contentTypeState);

  useEffect(() => {
    setPostContent([...content]);
  }, [content, setPostContent]);

  if (isLoading) {
    return <Loader />;
  }

  if (postContent.length === 0 && error) {
    return (
      <h1 className="text-2xl text-center my-10 text-gray-600">
        {error || "Data is not available"}
      </h1>
    );
  }

  return (
    <div className="flex flex-wrap relative items-start">
      {isShare && <Share />}
      {(() => {
        const filteredContent =
          value === "home"
            ? postContent
            : postContent.filter((item: any) => item.type === value);

        if (filteredContent.length === 0) {
          console.log("Filtered array is empty.");
          return (
            <p className="text-xl text-center my-10 text-gray-600">
              No posts available for the selected filter.
            </p>
          );
        }

        return filteredContent.map((item: any) => (
          <Card
            key={item._id}
            setContent={setPostContent}
            id={item._id}
            titleIcon={item.type}
            type={item.type}
            titleHead={item.title}
            cardbody={item.link}
          />
        ));
      })()}
    </div>
  );
};

export default Container;
