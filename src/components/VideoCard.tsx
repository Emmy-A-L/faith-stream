import type { YouTubeVideo } from '../types/Youtube';

interface Props {
  video: YouTubeVideo;
  onClick: () => void;
}

const VideoCard = ({ video, onClick }: Props) => {
  return (
    <div
      className="cursor-pointer hover:shadow-lg transition p-2 rounded-lg border border-gray-300 bg-gray-100"
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
    </div>
  );
};

export default VideoCard;
