import { useEffect, useState } from "react";
import { fetchArchivedVideos } from "../services/YoutubeApi";
import type { YouTubeVideo } from "../types/Youtube";
import VideoCard from "../components/VideoCard";
import VideoModal from "../components/VideoModal";
import { Helmet } from "@dr.pogodin/react-helmet";

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
    <>
      <Helmet>
        <title>Archived Sermons | Faith Stream</title>
        <meta
          name="description"
          content="Browse archived sermons and watch inspiring messages from Living Faith Church, Ota."
        />
        <meta property="og:title" content="Archived Sermons - Faith Stream" />
        <meta
          property="og:description"
          content="Catch up with past sermons and grow spiritually with our inspiring messages."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-r from-yellow-100 via-white to-red-100 py-6 px-4 sm:px-6 lg:px-8 text-gray-800 my-16 md:my-0">
        <h1 className="text-2xl font-bold mb-6">Archived Sermons</h1>

        <div className="w-full grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {videos ? (
            videos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onClick={() => setSelectedVideo(video.id)}
              />
            ))
          ) : (
            <p className="text-lg text-gray-500 font-black">
              No Archived Sermons Available
            </p>
          )}
        </div>

        {selectedVideo && (
          <VideoModal
            videoId={selectedVideo}
            onClose={() => setSelectedVideo(null)}
          />
        )}
      </div>
    </>
  );
};

export default Sermons;
