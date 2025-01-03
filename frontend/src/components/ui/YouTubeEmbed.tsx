import DefaultEmbed from "./DefaultEmbed";

interface youtubeEmbedProps {
    link: string | any
}

const YouTubeEmbed = ({link}: youtubeEmbedProps) => {

    const getVideoId = (url: string) => {
        const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/.*(?:v=|\/v\/|\/embed\/|\/shorts\/|\/watch\?v=|youtu\.be\/)([^&\n?#]+)/;
        const match = url.match(regex);
        return match ? match[1] : null
    };

    const videoId = getVideoId(link);

    if(!videoId) {
        return <DefaultEmbed />
    }

    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div>
         <iframe
        className="max-w-full"
        src={embedUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  )
}

export default YouTubeEmbed