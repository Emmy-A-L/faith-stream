import { IoClose } from "react-icons/io5";


interface Props {
  videoId: string;
  onClose: () => void;
}

const VideoModal = ({ videoId, onClose }: Props) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center px-4">
      <div className="relative w-full max-w-3xl bg-black rounded-lg overflow-hidden shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-xl z-10"
        >
          <IoClose className="text-[36px]" />
        </button>

        <div className="aspect-w-16 aspect-h-9 w-full">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="YouTube Sermon Player"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
