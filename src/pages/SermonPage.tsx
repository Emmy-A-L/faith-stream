import { useEffect, useState } from 'react';
import { fetchArchivedVideos } from '../services/YoutubeApi';
import type { YouTubeVideo } from '../types/Youtube';
import VideoCard from '../components/VideoCard';
import VideoModal from '../components/VideoModal';

const Sermons = () => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useEffect(() => {
    const loadVideos = async () => {
      const res = await fetchArchivedVideos();
      setVideos(res);
    };

    loadVideos();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-100 via-white to-red-100 py-6 px-4 sm:px-6 lg:px-8 text-gray-800 my-16 md:my-0">
      <h1 className="text-2xl font-bold mb-6">Archived Sermons</h1>

      <div className="w-full grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {videos ? videos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            onClick={() => setSelectedVideo(video.id)}
          />
        )) : (
          <p className="text-lg text-gray-500 font-black">No Archived Sermons Available</p>
        )}
      </div>

      {selectedVideo && (
        <VideoModal videoId={selectedVideo} onClose={() => setSelectedVideo(null)} />
      )}
    </div>
  );
};

export default Sermons;
