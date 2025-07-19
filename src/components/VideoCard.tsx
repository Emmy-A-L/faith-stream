
import type { YouTubeVideo } from '../types/Youtube';

interface Props {
  video: YouTubeVideo;
  onClick: () => void;
}

const VideoCard = ({ video, onClick }: Props) => {
  return (
    <div
      className="cursor-pointer hover:shadow-lg transition p-2 rounded-lg"
      onClick={onClick}
    >
      <img
        src={video.snippet.thumbnails.medium.url}
        alt={video.snippet.title}
        className="rounded-lg w-full"
      />
      <h2 className="text-lg font-semibold mt-2 line-clamp-2">
        {video.snippet.title}
      </h2>
      <p className="text-sm text-gray-500">
        {new Date(video.snippet.publishedAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default VideoCard;
