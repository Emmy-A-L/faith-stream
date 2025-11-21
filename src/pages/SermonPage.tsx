import { useEffect, useState } from "react";
import { fetchArchivedVideos } from "../services/YoutubeApi";
import type { YouTubeVideo } from "../types/Youtube";
import VideoModal from "../components/VideoModal";
import { Helmet } from "@dr.pogodin/react-helmet";
import { GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";

const Sermons = () => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const res = await fetchArchivedVideos();
        setVideos(res);
      } catch (error) {
        console.error("Failed to load sermons", error);
      } finally {
        setLoading(false);
      }
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
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-20">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <Link to="/" className="text-sm text-gray-500 hover:text-gray-900 mb-4 inline-block">← Back to Home</Link>
                <h1 className="text-4xl font-bold text-gray-900 mb-2 font-serif">Sermon Archive</h1>
                <p className="text-lg text-gray-600 max-w-2xl">
                  Explore our collection of life-changing messages and teachings.
                </p>
              </div>
              {/* Placeholder for search/filter if needed later */}
              {/* <div className="relative">
                <GoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search sermons..." 
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent w-full md:w-64"
                />
              </div> */}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {loading ? (
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 aspect-video rounded-xl mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : videos && videos.length > 0 ? (
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map((video) => (
                <div key={video.id} className="group cursor-pointer" onClick={() => setSelectedVideo(video.id)}>
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-4 bg-gray-100 shadow-sm group-hover:shadow-md transition-all">
                    <img 
                      src={video.snippet.thumbnails.medium.url} 
                      alt={video.snippet.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300 shadow-lg">
                        <GoDotFill className="text-red-600 text-xl" />
                      </div>
                    </div>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 leading-tight mb-2 group-hover:text-red-600 transition-colors">
                    {video.snippet.title}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{video.snippet.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="inline-block p-4 rounded-full bg-gray-100 mb-4">
                <GoDotFill className="text-4xl text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Sermons Found</h3>
              <p className="text-gray-500">Check back later for new uploads.</p>
            </div>
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
