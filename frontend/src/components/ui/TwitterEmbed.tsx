import { TwitterTweetEmbed } from "react-twitter-embed"
import DefaultEmbed from "./DefaultEmbed";

interface twitterEmbed {
    link: string | any
}

const TwitterEmbed = ({link}: twitterEmbed) => {
    const extractTweetId = (url: string) => {
        const regex = /x\.com\/(?:#!\/)?\w+\/status(es)?\/(\d+)/;
        const match = url.match(regex);
        return match ? match[2] : null;
      };

    const tweetId = extractTweetId(link);

    if(!tweetId) {
        return <DefaultEmbed />
    }
  return (
    <span className="overflow-hiddenl">
    <TwitterTweetEmbed tweetId={tweetId} />
    </span>
  )
}

export default TwitterEmbed